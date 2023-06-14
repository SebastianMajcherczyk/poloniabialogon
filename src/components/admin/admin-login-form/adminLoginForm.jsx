import React, { useState, useContext } from 'react';
import { Button, TextField, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { authService } from '../../../services/auth.services';
import './adminLoginForm.css';
import { AppContext } from '../../../contexts/App.context';

// const authService = {}

export const AdminLoginForm = () => {
	const theme = useTheme();

	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [shakeForm, setShakeForm] = useState(false);

	const errorHandler = errorMessage => {
		setErrorMessage(errorMessage);
		setTimeout(() => setErrorMessage(''), 1200);
		setShakeForm(true);
		setTimeout(() => setShakeForm(false), 820);
	};

	const logIn = async e => {
		e.preventDefault();
		try {
			const { email, password } = loginData;
			await authService.login(email, password);
			// if (!user) {
			// 	errorHandler('Dane logowania nieprawidłowe');
			// }
		} catch (error) {
			errorHandler(error.message);
		}

		setLoginData({ email: '', password: '' });
	};

	const handleChange = e => {
		// e.preventDefault();
		const { name, value } = e.target;
		setLoginData({ ...loginData, [name]: value });
	};

	return (
		<Box
			component='form'
			autoComplete='off'
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				m: '75px auto 5px auto',
				p: '20px',
			}}>
			<Box
				className={shakeForm ? 'shake' : ''}
				sx={{
					width: '200px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}>
				<TextField
					error={errorMessage !== ''}
					id='email'
					label='Email'
					variant='outlined'
					type='email'
					name='email'
					sx={{
						marginBottom: '10px',
						color: theme.palette.primary.main,
						'& label': {
							color: theme.palette.primary.main,
						},
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: theme.palette.primary.main,
							},
							'&:hover fieldset': {
								borderColor: theme.palette.primary.main,
							},
							'&.Mui-focused fieldset': {
								borderColor: theme.palette.primary.main,
							},
						},
					}}
					color='primary'
					value={loginData.email}
					onChange={handleChange}
				/>
				<TextField
					error={errorMessage !== ''}
					id='password'
					label='password'
					name='password'
					variant='outlined'
					type='password'
					sx={{
						color: theme.palette.primary.main,
						'& label': {
							color: theme.palette.primary.main,
						},
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: theme.palette.primary.main,
							},
							'&:hover fieldset': {
								borderColor: theme.palette.primary.main,
							},
							'&.Mui-focused fieldset': {
								borderColor: theme.palette.primary.main,
							},
						},
					}}
					color='primary'
					value={loginData.password}
					onChange={handleChange}
				/>
			</Box>
			<Box sx={{ minHeight: '30px' }}>
				{errorMessage && (
					<Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
				)}
			</Box>
			<Button onClick={logIn}>Zaloguj</Button>
		</Box>
	);
};
