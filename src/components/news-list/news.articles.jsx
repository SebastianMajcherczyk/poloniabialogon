import { Box, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { firestoreService } from '../../services/firestore.services';
import { Article } from '../article/article';

export const NewsArticles = () => {
	const [news, setNews] = useState([])


	useEffect(() => {
		(async () => {
			const data = await firestoreService.getContentByCollectionName(
				'blog-posts', true
			);

			setNews(data);
			console.log(data)
		})();
	
	}, []);


	

	//Pagination start//
	const [page, setPage] = useState(1);
	const rowsPerPage = 3;

	useEffect(() => {
		setPage(1);
	}, [news]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const displayedNews = news?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

	//Pagination end//
	return (
		<Box
			sx={{
				paddingTop: 10,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}>
			{displayedNews?.map((item, index) => (
				<Article key={index} article={item} folderName='articles-photos' />
			))}
			<Pagination
				sx={{ alignSelf: 'center', margin: 2 }}
				color='primary'
				count={Math.ceil(news?.length / rowsPerPage)}
				page={page}
				onChange={handleChangePage}
			/>
		</Box>
	);
};
