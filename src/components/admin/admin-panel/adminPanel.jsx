import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import React from 'react';
import { AdminLoginForm } from '../admin-login-form/adminLoginForm';
import { useContext } from 'react';
import { AppContext } from '../../../contexts/App.context';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminLogout } from '../admin-logout/adminLogout';
import { Outlet } from 'react-router-dom';
import { AdminContext } from '../../../contexts/Admin.Context';
import { useState } from 'react';
import { firestoreService } from '../../../services/firestore.services';
import { useEffect } from 'react';
import { FormLabel } from '@material-ui/core';

export const AdminPanel = () => {
	const navigate = useNavigate();
	const [news, setNews] = useState([]);
	const { loggedIn } = useContext(AppContext);
	const [editSection, setEditSection] = useState('articles');
	const location = useLocation();
	const getNews = async () => {
		const data = await firestoreService.getContentByCollectionName(
			'blog-posts',
			false
		);
		setNews(data);
	};
	useEffect(() => {
		getNews();
	}, []);
	useEffect(() => {
		if (location.pathname === '/admin') {
			navigate('/admin/articles');
		}
		if (location.pathname === '/admin/gallery'){
			setEditSection('gallery')
		}
	}, []);
	const handleSectionChange = () => {
		const newSection = editSection === 'articles' ? 'gallery' : 'articles';
		setEditSection(newSection);
		navigate(`/admin/${newSection}`);
	};

	return (
		<AdminContext.Provider value={{ news, getNews }}>
			<Box
				sx={{
					width: {
						xs: '100%',
						md: '80%',
					},
					margin: '0 auto',
					minHeight: '300px',
					display: 'flex',
					flexDirection: 'column',
				}}>
				{!loggedIn && <AdminLoginForm />}
				{loggedIn && <AdminLogout />}
				{loggedIn && (
					<FormControl>
						<FormLabel>Wybierz sekcję, którą chcesz edytować</FormLabel>
						<RadioGroup value={editSection} onChange={handleSectionChange}>
							<FormControlLabel
								value='articles'
								control={<Radio />}
								label='Artykuły'
							/>
							<FormControlLabel
								value='gallery'
								control={<Radio />}
								label='Galerię'
							/>
						</RadioGroup>
					</FormControl>
				)}

				<Outlet />
			</Box>
		</AdminContext.Provider>
	);
};
