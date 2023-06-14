import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Button, ButtonBase } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { SwitchMode } from '../../../styled/switch';
import { AppContext } from '../../../contexts/App.context';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Link as ScrollLink } from 'react-scroll';
import { Facebook } from './facebook';
import { Instagram } from './instagram';
import './navbar.css';
import Logo from './polonia-small.PNG';

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
	height: '36px',
	margin: '16px 0px',
	padding: '6px 8px',
	fontWeight: 500,
	fontSize: '0.875rem',
	letterSpacing: '0.02857em',
	textTransform: 'uppercase',
	color: 'white',
	'&:hover': {
		textDecoration: 'none',
		backgroundColor: 'rgba(0, 0, 0, 0.04)',
	},
}));

export const ResponsiveAppBar = () => {
	const navigate = useNavigate();
	const { handleThemeChange } = useContext(AppContext);
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar
			position='fixed'
			sx={{ top: 0, zIndex: 10, backgroundColor: '#363636' }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Box onClick={() => navigate('/')}>
						<img src={Logo} alt='Logo' width='50px' height='50px' />
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							<MenuItem
								key='Home'
								onClick={() => {
									handleCloseNavMenu();
									navigate('/');
								}}>
								<Typography textAlign='center'>Home</Typography>
							</MenuItem>
							<MenuItem
								key='O klubie'
								onClick={() => {
									handleCloseNavMenu();
									navigate('/about');
								}}>
								<Typography textAlign='center'>O klubie</Typography>
							</MenuItem>
							<MenuItem
								key='Sekcje'
								onClick={() => {
									handleCloseNavMenu();
									navigate('/sections');
								}}>
								<Typography textAlign='center'>Sekcje</Typography>
							</MenuItem>
							<MenuItem
								key='Aktualności'
								onClick={() => {
									handleCloseNavMenu();
									navigate('/news');
								}}>
								<Typography textAlign='center'>Aktualności</Typography>
							</MenuItem>
							<MenuItem
								key='Galeria'
								onClick={() => {
									handleCloseNavMenu();
									navigate('/gallery');
								}}>
								<Typography textAlign='center'>Galeria</Typography>
							</MenuItem>
							<MenuItem
								key='Sponsorzy'
								onClick={() => {
									handleCloseNavMenu();
									navigate('/sponsors');
								}}>
								<Typography textAlign='center'>Sponsorzy</Typography>
							</MenuItem>
							<MenuItem
								key='Wesprzyj'
								onClick={() => {
									handleCloseNavMenu();
									navigate('/support');
								}}>
								<Typography textAlign='center'>Wesprzyj klub</Typography>
							</MenuItem>

							<MenuItem key='Kontakt' onClick={handleCloseNavMenu}>
								<ScrollLink
									to='footer'
									smooth={true}
									duration={1000}
									spy={true}>
									<Typography textAlign='center'>Kontakt</Typography>
								</ScrollLink>
							</MenuItem>
						</Menu>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Button
							key='Home'
							onClick={() => {
								handleCloseNavMenu();
								navigate('/');
							}}
							sx={{ my: 2, color: 'white', display: 'block', zIndex: '10' }}>
							Home
						</Button>
						<Button
							key='O klubie'
							onClick={() => {
								handleCloseNavMenu();
								navigate('/about');
							}}
							sx={{
								my: 2,
								color: 'white',
								display: 'block',
								zIndex: '10',
								whiteSpace: 'nowrap',
							}}>
							O klubie
						</Button>
						<Button
							key='Sekcje'
							onClick={() => {
								handleCloseNavMenu();
								navigate('/sections');
							}}
							sx={{ my: 2, color: 'white', display: 'block', zIndex: '10' }}>
							Sekcje
						</Button>
						<Button
							key='Aktualności'
							onClick={() => {
								handleCloseNavMenu();
								navigate('/news');
							}}
							sx={{ my: 2, color: 'white', display: 'block', zIndex: '10' }}>
							Aktualności
						</Button>
						<Button
							key='Galeria'
							onClick={() => {
								handleCloseNavMenu();
								navigate('/gallery');
							}}
							sx={{ my: 2, color: 'white', display: 'block', zIndex: '10' }}>
							Galeria
						</Button>
						<Button
							key='Sponsorzy'
							onClick={() => {
								handleCloseNavMenu();
								navigate('/sponsors');
							}}
							sx={{ my: 2, color: 'white', display: 'block', zIndex: '10' }}>
							Sponsorzy
						</Button>
						<Button
							key='Wesprzyj'
							onClick={() => {
								handleCloseNavMenu();
								navigate('/support');
							}}
							sx={{
								my: 2,
								color: 'white',
								display: 'block',
								zIndex: '10',
								whiteSpace: 'nowrap',
							}}>
							Wesprzyj klub
						</Button>
						<StyledButtonBase>
							<ScrollLink
								to='footer'
								spy={true}
								smooth={true}
								duration={1000}
								sx={{ color: 'white' }}
								key='Kontakt'
								onClick={handleCloseNavMenu}>
								Kontakt
							</ScrollLink>
						</StyledButtonBase>
					</Box>
					<Box
						sx={{
							width: '7%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-evenly',
							marginRight: '20px',
						}}>
						<Box
							sx={{
								width: '40px',
								height: '40px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<a
								href='https://www.facebook.com/PoloniaBialogonKielce'
								target='_blank'
								rel='noopener noreferrer'>
								<Facebook />
							</a>
						</Box>
						<Box
							sx={{
								width: '40px',
								height: '40px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<a
								href=' https://instagram.com/poloniabialogon?igshid=MzRlODBiNWFlZA=='
								target='_blank'
								rel='noopener noreferrer'>
								<Instagram />
							</a>
						</Box>
					</Box>

					<Box>
						<SwitchMode
							label='Theme'
							color='secondary'
							onChange={handleThemeChange}
						/>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
