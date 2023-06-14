import React, { useContext, useMemo, useState } from 'react';
import {
	Box,
	Button,
	ButtonGroup,
	Checkbox,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../contexts/App.context';
import { firestoreService } from '../../../services/firestore.services';
import { AdminContext } from '../../../contexts/Admin.Context';
import { ImageUploader } from './imageUploader';
import { uid } from 'uid';
import { storageService } from '../../../services/storage.services';
import { useEffect } from 'react';

export const ArticleForm = () => {
	const { loggedIn } = useContext(AppContext);
	const { getNews } = useContext(AdminContext);
	const [article, setArticle] = useState({
		title: '',
		description: '',
		active: 'false',
	});
	const [images, setImages] = useState([]);
	const [photoUrlList, setPhotoUrlList] = useState([]);
	const [activeFoto, setActiveFoto] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();
	const isInEditMode = useMemo(() => id !== undefined, [id]);
	const [selectedRadio, setSelectedRadio] = useState('');
	const [articleActive, setArticleActive] = useState(false);
	const handleChange = e => {
		const { name, value } = e.target;
		if (name === 'description') {
			setArticle({ ...article, [name]: value.replace(/\n/g, '<br>') });
		} else {
			setArticle({ ...article, [name]: value });
		}
	};

	const handleCheckBox = () => setArticleActive(!articleActive);

	const loadArticle = async () => {
		const data = await firestoreService.getArticleById(id);
		setArticle(data);
		setArticleActive(data.active);

		/*On the list of photos from server find a photo with type 'main' and  set this photo as an activeFoto state  */
		const mainFoto = data.photos.find(({ type }) => type === 'main');

		if (mainFoto) {
			setActiveFoto({
				type: 'from-server',
				name: mainFoto.fileName,
			});
		}
	};

	useEffect(() => {
		if (isInEditMode) loadArticle();
	}, [isInEditMode, id]);

	useEffect(() => {
		(async () => {
			const promiseArray = [];
			const photoFileNameArray = [];
			if (article && Array.isArray(article.photos)) {
				article.photos.forEach(photo => {
					if (photo.fileName) {
						const path = `articles-photos/${id}/${photo.fileName}`;
						promiseArray.push(storageService.getImageByPath(path));
						photoFileNameArray.push(photo.fileName);
					}
				});
			}
			const urls = await Promise.all(promiseArray);
			const configs = urls.map((url, index) => ({
				url,
				fileName: photoFileNameArray[index],
			}));
			setPhotoUrlList(configs);
		})();
	}, [article, id]);

	const removePicture = async fileName => {
		await firestoreService.deletePhotoDataByIdAndFileName(id, fileName);
		const path = `articles-photos/${id}/${fileName}`;
		await storageService.deleteImage(path);
		await loadArticle();
	};

	const saveContent = async e => {
		e.preventDefault();
		if (isInEditMode) {
			const articleClone = {
				...article,
				photos: [...article.photos],
				active: articleActive,
			};
			articleClone.photos = articleClone.photos.map(photo => {
				return {
					...photo,
					type:
						activeFoto.type === 'from-server' &&
						activeFoto.name === photo.fileName
							? 'main'
							: 'standard',
				};
			});
			for await (const imageData of images) {
				const { file } = imageData;
				const uniqueId = uid(4);
				const type = file.name.split('.').pop();
				const photoId = `${uniqueId}.${type}`;
				const path = `articles-photos/${id}/${photoId}`;
				await storageService.addImage(path, file);
				articleClone.photos.push({
					fileName: photoId,
					name: 'Article',
					type:
						activeFoto.type === 'new' &&
						activeFoto.name === `${file.lastModified}-${file.name}`
							? 'main'
							: 'standard',
				});
			}

			await firestoreService.editArticleByFirestoreId(
				article.firestoreId,
				articleClone
			);
		} else {
			const articleId = uid();
			const articleClone = { ...article, id: articleId, photos: [] };
			for await (const imageData of images) {
				const { file } = imageData;
				const id = uid(5);
				const type = file.name.split('.').pop();
				const photoId = `${id}.${type}`;
				const path = `articles-photos/${articleId}/${photoId}`;
				await storageService.addImage(path, file);
				articleClone.photos.push({
					fileName: photoId,
					name: 'Event description',
					type: images.indexOf(imageData) === 0 ? 'main' : 'standard',
				});
			}
			await firestoreService.addArticle(articleClone);
		}

		setImages([]);
		getNews();
	};
	const saveAndExit = e => {
		saveContent(e);
		navigate('/admin/articles');
	};
	return (
		<Box>
			{loggedIn && (
				<Box
					className='anyClass'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<FormControl
						sx={{
							width: '100%',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							alignItems: 'center',
							flexGrow: 1,
							m: '25px auto 5px auto',
							p: '10px',
						}}>
						<TextField
							id='title'
							label='Tytuł'
							variant='outlined'
							name='title'
							color='info'
							sx={{ width: '100%', m: 3 }}
							value={article.title}
							onChange={handleChange}
						/>
						<TextField
							id='description'
							label='Treść'
							name='description'
							variant='outlined'
							multiline
							minRows='10'
							color='info'
							sx={{ width: '100%', height: '300px', m: 3, flex: 1 }}
							value={article.description}
							onChange={handleChange}
						/>
					</FormControl>

					<RadioGroup
						value={selectedRadio}
						onChange={e => setSelectedRadio(e.target.value)}
						sx={{ width: '100%', padding: '0 10px' }}>
						<Box
							sx={{
								border: '1px solid lightgrey',
								width: '100%',
							}}>
							<Typography sx={{ m: 1 }}>Aktualne zdjęcia artykułu:</Typography>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									flexWrap: 'wrap',
									justifyContent: 'center',
									width: '100%',
								}}>
								{photoUrlList.map((photoConfig, index) => (
									<Box
										key={index}
										sx={{
											margin: 3,
											display: 'flex',
											flexDirection: 'column',
											width: 'auto',
										}}>
										<img
											src={photoConfig.url}
											alt='event'
											style={{
												height: '100px',
												width: 'auto',
												maxWidth: '100%',
												objectFit: 'contain',
											}}
										/>
										<Box sx={{ display: 'flex', flexDirection: 'column' }}>
											<FormControlLabel
												value={photoConfig.fileName}
												control={<Radio type='radio' name='main' />}
												label='Ustaw jako główne'
												checked={
													activeFoto?.type === 'from-server' &&
													activeFoto?.name === photoConfig.fileName
												}
												onChange={() => {
													const config = {
														type: 'from-server',
														name: photoConfig.fileName,
													};

													setActiveFoto(config);
												}}
											/>
											<Button
												onClick={() => removePicture(photoConfig.fileName)}>
												Usuń
											</Button>
										</Box>
									</Box>
								))}
							</Box>
						</Box>

						<ImageUploader
							images={images}
							setImages={setImages}
							selectedRadio={selectedRadio}
							setSelectedRadio={setSelectedRadio}
							setActiveFoto={setActiveFoto}
							component='article'
						/>
					</RadioGroup>
					<FormControlLabel
						control={
							<Checkbox checked={articleActive} onChange={handleCheckBox} />
						}
						label='Pokaż artykuł na stronie'
					/>
					<ButtonGroup
						variant='text'
						sx={{ display: 'flex', justifyContent: 'center', margin: 5 }}>
						<Button onClick={() => navigate('/admin/articles')}>
							Wyjdź bez zapisywania
						</Button>
						<Button onClick={saveContent}>Zapisz</Button>
						<Button onClick={saveAndExit}>Zapisz i wyjdź</Button>
					</ButtonGroup>
				</Box>
			)}
		</Box>
	);
};
