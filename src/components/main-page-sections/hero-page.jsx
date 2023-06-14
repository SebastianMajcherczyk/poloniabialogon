import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { ButtonStyled } from '../../styled/button';
import { ContainerStyled } from '../../styled/container';
import { useNavigate } from 'react-router-dom';

export const HeroPage = () => {
	const navigate = useNavigate()
	return (
		<div>
			<ContainerStyled
				sx={{
					backgroundImage: `url('/soccer-1457988_960_720.jpg')`,
				}}>
				<Box
					mt={10}
					sx={{ maxWidth: { xs: '100%', sm: '90%', md: '80%' },
					 flexShrink: 2 }}>
					<video autoPlay loop muted width='95%'>
						<source src='/Polonia_header_2.mp4' />
					</video>
				</Box>

				<Typography
					variant='h2'
					sx={{
						textTransform: 'uppercase',
						fontWeight: '800',
					}}>
					Polonia Białogon
				</Typography>
				<Typography
					variant='h4'
					sx={{
						maxWidth: '500px',
						margin: 5,
					}}>
					Klub sportowy z tradycjami.
				</Typography>
				<ButtonStyled variant='outlined' onClick={() => navigate('/about')}>O klubie</ButtonStyled>
			</ContainerStyled>
			<Divider
				sx={{ height: '30px', backgroundColor: '#f8df45', borderBottom: 0 }}
			/>
		</div>
	);
};
