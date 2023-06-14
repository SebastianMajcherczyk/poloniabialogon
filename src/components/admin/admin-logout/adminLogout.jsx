import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/auth.services';


export const AdminLogout = () => {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'flex-end',
				m: '75px auto 5px auto',
				p: '20px',
			}}>
			<Typography>Administrator zalogowany</Typography>
			<Button
				onClick={() => {
					authService.logout();
					navigate('');
				}}>
				Wyloguj
			</Button>
		</Box>
	);
};
