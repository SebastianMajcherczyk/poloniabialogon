import React from 'react';
import { Paper, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { AppContext } from './contexts/App.context';
import { basicTheme } from './themes/basic.theme';
import { darkTheme } from './themes/dark.theme';
import { ResponsiveAppBar } from './components/main-page-sections/navbar/navbar';

import { useEffect } from 'react';
import { NewsArticles } from './components/news-list/news.articles';
import { MainPage } from './components/main-page/mianPage';
import { Route, Routes } from 'react-router-dom';

import { SectionsList } from './components/section-list/section-list';

import { AboutClub } from './components/about/about';
import { Gallery } from './components/gallery/gallery';
import { Footer } from './components/footer/footer';

import { ArticleForm } from './components/admin/article-form/articleForm';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { AdminPanel } from './components/admin/admin-panel/adminPanel';
import { AdminArticleList } from './components/admin/admin-article-list/adminArticleList';
import { Sponsors } from './components/sponsors/sponsors';
import { SupportClub } from './components/support-club/supportClub';
import { AdminGalleryForm } from './components/admin/adminGalleryForm/adminGalleryForm';

function App() {
	const [theme, setTheme] = useState('light');

	const [loggedIn, setLoggedIn] = useState(false);
	const [isConnected, setIsConnected] = useState(false);

	const handleThemeChange = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else if (theme === 'light') {
			setTheme('dark');
		}
	};
	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, user => {
			setIsConnected(true);
			if (user) {
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			}
		});
	}, []);
	if (!isConnected) {
		return <></>;
	}
	return (
		<AppContext.Provider
			value={{
				theme,
				handleThemeChange,
				loggedIn,
				setLoggedIn,
			}}>
			<ThemeProvider theme={theme === 'light' ? basicTheme : darkTheme}>
				<Paper>
					<ResponsiveAppBar />
					<Routes>
						<Route path='about' element={<AboutClub />} />
						<Route path='sections' element={<SectionsList />} />
						<Route path='news' element={<NewsArticles />} />
						<Route path='gallery' element={<Gallery />} />
						<Route path='sponsors' element={<Sponsors />} />
						<Route path='support' element={<SupportClub />} />
						<Route path='admin' element={<AdminPanel />}>
							<Route path='articles' element={<AdminArticleList />} />
							<Route path='articles/article/add' element={<ArticleForm />} />
							<Route
								path='articles/article/edit/:id'
								element={<ArticleForm />}
							/>
							<Route path='gallery' element={<AdminGalleryForm />} />
						</Route>
						<Route path='' element={<MainPage />} />
					</Routes>
					<Footer />
				</Paper>
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export default App;
