import {
	Box,
	Button,
	FormControlLabel,
	Radio,
	Typography,
} from '@mui/material';
import React from 'react';
import ImageUploading from 'react-images-uploading';
export const ImageUploader = ({
	images,
	setImages,
	selectedRadio,
	setSelectedRadio,
	setActiveFoto,
	component
}) => {
	const onChange = (imageList, addUpdateIndex) => {
		
		setImages(imageList);
	};
	return (
		<ImageUploading
			multiple
			value={images}
			onChange={onChange}
			maxNumber={90}
			dataURLKey='data_url'>
			{({
				imageList,
				onImageUpload,
				onImageRemoveAll,
				onImageUpdate,
				onImageRemove,
				isDragging,
				dragProps,
			}) => (
				<Box
					sx={{
						margin: '10px 0',

						width: '100%',
						minHeight: '200px',
						display: 'flex',
						flexDirection: 'column',

						border: '1px solid rgba(0, 0, 0, 0.23)',
					}}>
					<Typography sx={{ m: 1 }}>Nowe zdjęcia:</Typography>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}>
						{imageList.map((image, index) => {
							const imageId = `${image.file.lastModified}-${image.file.name}`;
							return (
								<Box
									key={index}
									className='image-item'
									sx={{
										display: 'flex',
										flexDirection: 'column',
										margin: '3px 0',
									}}>
									<img
										src={image['data_url']}
										alt='Event'
										style={{
											height: '100px',
											width: 'auto',
											maxWidth: '100%',
											objectFit: 'contain',
										}}
									/>
									{component === 'article' && <FormControlLabel
										value={imageId}
										control={
											<Radio
												type='radio'
												name='main'
												checked={selectedRadio === imageId}
												onChange={() => {
													const config = {
														type: 'new',
														name: imageId,
													};
													setActiveFoto(config)
													setSelectedRadio(imageId);
												}}
											/>
										}
										label='Ustaw jako główne'
									/>}
									<div className='image-item__btn-wrapper'>
										<Button onClick={() => onImageUpdate(index)}>
											Zaktualizuj
										</Button>
										<Button onClick={() => onImageRemove(index)}>Usuń</Button>
									</div>
								</Box>
							);
						})}
					</Box>
					<Button
						variant='contained'
						style={isDragging ? { color: 'red' } : undefined}
						sx={{ maxHeight: '40px', width: '80%', margin: '0 auto' }}
						onClick={onImageUpload}
						{...dragProps}>
						Dodaj zdjęcia lub przeciągnij je tutaj
					</Button>
					&nbsp;
					<Button
						variant='contained'
						sx={{ maxHeight: '40px', width: '80%', margin: '0 auto' }}
						onClick={onImageRemoveAll}>
						Usuń wszystkie zdjęcia
					</Button>
				</Box>
			)}
		</ImageUploading>
	);
};
