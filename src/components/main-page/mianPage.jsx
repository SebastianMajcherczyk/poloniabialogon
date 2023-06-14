import { Box } from '@mui/material';
import React from 'react';
import { HeroPage } from '../main-page-sections/hero-page';

import { News } from '../main-page-sections/news';
import { Sections } from '../main-page-sections/sections';

export const MainPage = () => {
	return (
		<Box>
			<HeroPage />
			<Sections />
			<News />
		</Box>
	);
};
