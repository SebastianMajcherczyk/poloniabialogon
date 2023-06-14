import { Circle } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { storageService } from '../../services/storage.services';
import { MaterialImageList } from '../image-list/materialImageList';

export const Article = ({ article, folderName }) => {
	const [photos, setPhotos] = useState([]);
	useEffect(() => {
		(async () => {
			const referencies = await storageService.getReferencesOfAllPicturesInFolder(
				`${folderName}/${article.id}`
			);

			const requestOfAllPictures = referencies.map(reference =>
				storageService.getImageByPath(reference)
			);

			const responses = await Promise.all(requestOfAllPictures);

			const data = responses.map(item => ({ src: item }));
			setPhotos(data);
		})();
	}, [article]);
	const convertToDate = time => {
		const fireBaseTime = new Date(
			time.seconds * 1000 + time.nanoseconds / 1000000
		);
		const date = fireBaseTime.toLocaleDateString();
		return date;
	};
	return (
		<Paper
			elevation={15}
			sx={{
				padding: {
					xs: '7px',
					md: '15px',
				},
				width: { xs: '93%', md: '80%' },
				margin: '30px auto',
			}}>
			<Box
				sx={{
					width: { sm: '95%', md: '80%' },
					margin: '0 auto',
				}}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Circle size='large' />
					<Typography variant='h5' sx={{ margin: 3 }}>
						{article.title}
					</Typography>
					
				</Box>
				{/* {folderName === 'articles-photos' && <Typography variant='h6' sx={{
						margin: 3,
						fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
					}}>
						{convertToDate(article.createdAt)}
					</Typography>} */}
				<Box
					sx={{
						margin: 3,
						fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
					}}
					dangerouslySetInnerHTML={{ __html: article.description.replace(/\n/g, '<br>') }} />
					{/* {article.description} */}
				
				<MaterialImageList photos={photos} elevation={10} variant='quilted' itemsOnPage={4}/>
			</Box>
		</Paper>
	);
};
