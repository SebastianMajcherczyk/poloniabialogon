import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MaterialImageList } from '../image-list/materialImageList';
import { storageService } from '../../services/storage.services';

export const Gallery = () => {
	const [gallery, setGallery] = useState([]);
	useEffect(() => {
		(async () => {
			const referencies = await storageService.getReferencesOfAllPicturesInFolder(
				`gallery`,
				true
			);

			const requestOfAllPictures = referencies.map(reference =>
				storageService.getImageByPath(reference)
			);

			const responses = await Promise.all(requestOfAllPictures);

			const data = responses.map(item => ({ src: item }));
			setGallery(data);
		})();
	}, []);
	return (
		<Box
			sx={{
				margin: '90px 10px 10px 10px',
				textAlign: 'center',
			}}>
			<Paper
				elevation={10}
				sx={{
					width: '90%',
					m: '10px auto',
					p: 4,
					textAlign: 'center',
				}}>
				<Typography
					variant='h4'
					sx={{
						textTransform: 'uppercase',
						margin: 3,
					}}>
					Galeria klubu
				</Typography>
				<MaterialImageList photos={gallery} variant='woven' itemsOnPage={16}/>
			</Paper>
		</Box>
	);
};
