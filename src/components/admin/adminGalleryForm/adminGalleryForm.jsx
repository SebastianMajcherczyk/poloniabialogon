import { Box, Button, Pagination, Typography } from '@mui/material';
import { updateMetadata } from 'firebase/storage';
import React, { useEffect, useState, useContext } from 'react';
import { uid } from 'uid';
import { AppContext } from '../../../contexts/App.context';
import { firestoreService } from '../../../services/firestore.services';

import { storageService } from '../../../services/storage.services';
import { ImageUploader } from '../article-form/imageUploader';

export const AdminGalleryForm = () => {
	const [gallery, setGallery] = useState([]); /*Images list from server*/

	const [images, setImages] = useState([]); /* New added images list */
	const { loggedIn } = useContext(AppContext);
	const [selectedRadio, setSelectedRadio] = useState('');

	/*Pagination data and methods start*/
	const [page, setPage] = useState(1);
	const itemsPerPage = 30;
	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const galleryOnPage = gallery.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);
	/*Pagination data and methods end*/

	const getImageData = async () => {
		const referencies = await storageService.getReferencesOfAllPicturesInFolder(
			`gallery`
		);
    console.log(referencies);
		const requestOfAllPictures = referencies.map(async reference => {
			const imageUrl = await storageService.getImageByPath(reference);
			return {
				src: imageUrl,
				path: reference.fullPath,
			};
		});

		const responses = await Promise.all(requestOfAllPictures);

		setGallery(responses);
	};

	useEffect(() => {
		getImageData();
	}, []);
  const savePhotos = async () => {
    for await (const imageData of images) {
      const { file } = imageData;
      // const uniqueId = uid(4);
      const uniqueId = Date.now()
      console.log(uniqueId);
      const type = file.name.split('.').pop();
      const photoId = `${uniqueId}.${type}`;
      const path = `gallery/${photoId}`
  await storageService.addImage(path, file)
  
  }
  await getImageData();
  setImages([])
  }

	const removePicture = async path => {
		await storageService.deleteImage(path);
		getImageData();
	};
	return (
		<Box>
			{loggedIn && (
				<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
					<Typography>Aktualne zdjęcia w galerii</Typography>
					{galleryOnPage.map((photoConfig, index) => (
						<Box
							key={index}
							sx={{
								margin: 3,
								display: 'flex',
								flexDirection: 'column',
								width: 'auto',
							}}>
							<img
								src={photoConfig.src}
								alt='event'
								style={{
									height: '100px',
									width: 'auto',
									maxWidth: '100%',
									objectFit: 'contain',
								}}
							/>
							<Box sx={{ display: 'flex', flexDirection: 'column' }}>
								<Button onClick={() => removePicture(photoConfig.path)}>
									Usuń
								</Button>
							</Box>
						</Box>
					))}
				</Box>
			)}
			<Pagination
				count={Math.ceil(gallery.length / itemsPerPage)}
				page={page}
				onChange={handleChangePage}
			/>
			<ImageUploader images={images} setImages={setImages} />
      <Button sx={{margin: '20px', width: '100%'}} onClick={savePhotos}>Zapisz nowe zdjęcia</Button>
		</Box>
	);
};
