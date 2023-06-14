import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ButtonStyled } from '../../styled/button';
import { storageService } from '../../services/storage.services';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const InfoCard = ({ article, folderName, navigateTarget }) => {
	const [photo, setPhoto] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				if (article) {
					const mainPhoto =
						article?.photos.find(element => element.type === 'main') ||
						article?.photos.find(element => element.type === 'standard');
					const serverFilePath = `${folderName}/${article?.id}/${mainPhoto?.fileName}`;
					const url = await storageService.getImageByPath(serverFilePath);
					setPhoto(url);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [article]);
	return (
		<Card
			sx={{
				width: 345,
				height: 650,
				margin: '30px',
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-around',
				transition: 'transform 0.5s',
				'&:hover': {
					transform: 'scale(1.1)',
				},
			}}
			elevation={24}>
			<Box>
				<CardMedia
					sx={{ height: 250, m: 2 }}
					image={photo}
					title='Main photo'
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{article.title}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{article.description.length > 130
							? `${article.description.substring(0, 130)}...`
							: article.description}
					</Typography>
				</CardContent>
			</Box>

			<CardActions>
				<ButtonStyled
					sx={{ color: 'primary.contrastText' }}
					onClick={() => {
						navigate(`${navigateTarget}`);
					}}>
					Więcej
				</ButtonStyled>
			</CardActions>
		</Card>
	);
};
