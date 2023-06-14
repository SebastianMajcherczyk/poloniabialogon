import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { InfoCard } from './info-card';
import { ContainerStyled } from '../../styled/container';
import { useNavigate } from 'react-router-dom';

import { firestoreService } from '../../services/firestore.services';

export const Sections = () => {
	const [sections, setSections] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const data = await firestoreService.getContentByCollectionName(
				'sections-list', true, 3
			);

			setSections(data);
		})();
	}, []);
	return (
		<div>
			<ContainerStyled
				sx={{
					backgroundImage: `url('/sport-5052424_960_720.jpg')`,
				}}>
				<Typography
					variant='h2'
					sx={{
						textAlign: 'center',
						textTransform: 'uppercase',
						mt: 5,
						cursor: 'pointer',
					}}
					onClick={() => navigate('/sections')}>
					Sekcje
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-around',
						flexWrap: 'wrap',
					}}>
					{sections?.map((article, index) => (
						<InfoCard
							article={article}
							key={index}
							folderName='sections-photos'
							navigateTarget='sections'></InfoCard>
					))}
				</Box>
			</ContainerStyled>
			<Divider
				sx={{ height: '30px', backgroundColor: '#f8df45', borderBottom: 0 }}
			/>
		</div>
	);
};
