import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { ContainerStyled } from '../../styled/container';
import { InfoCard } from './info-card';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { firestoreService } from '../../services/firestore.services';

export const News = () => {
	const navigate = useNavigate()
	// const { news } = useContext(AppContext);
	const [news, setNews] = useState([])
	useEffect(() => {
		(async () => {
			const data = await firestoreService.getContentByCollectionName(
				'blog-posts', true, 3
			);

			setNews(data);
		})();
	}, []);
	

	return (
		<ContainerStyled
			sx={{
				backgroundImage: `url('/action-1834465_960_720.jpg')`,
			}}>
			<Typography
				variant='h2'
				sx={{ textAlign: 'center', textTransform: 'uppercase', mt: 5, cursor: 'pointer' }} onClick={ () => navigate('/news')}>
				Aktualności
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					flexWrap: 'wrap',
				}}>
				{news?.map((article, index) => (
					<InfoCard key={index} article={article} folderName='articles-photos' navigateTarget="news"></InfoCard>
				))}
			</Box>
		</ContainerStyled>
	);
};
