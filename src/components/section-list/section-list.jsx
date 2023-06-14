import { Box } from '@mui/material';
import React, {  useEffect, useState } from 'react';

import { firestoreService } from '../../services/firestore.services';
import { Article } from '../article/article';

export const SectionsList = () => {
	const [sections, setSections] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await firestoreService.getContentByCollectionName(
				'sections-list', true
			);

			setSections(data);
		})();
	}, []);
	return (
		<Box
			sx={{
				paddingTop: 10,
			}}>
			{sections?.map((item, index) => (
				<Article key={index} article={item} folderName='sections-photos' />
			))}
		</Box>
	);
};
