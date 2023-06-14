import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { firestoreService } from '../../services/firestore.services';
import bar from './bar.jpg'

export const AboutClub = () => {
	const [about, setAbout] = useState({});
	useEffect(() => {
		(async () => {
			const data = await firestoreService.getAbout();

			setAbout(data);
		})();
	}, []);
	return (
		<Box pt={12} pb={3}>
			<Paper
				elevation={8}
				sx={{
					width: '90%',
					m: '10px auto',
					p: 4,
					textAlign: 'center',
				}}>
				<Typography
					variant='h4'
					sx={{
						textTransform: 'uppercase',
						margin: 3,
					}}>
					O klubie
				</Typography>
				<Typography variant='h6' sx={{ textAlign: 'left' }}>
					Historia
				</Typography>
				<img src={bar} alt='bar' width='250' height='6' style={{float: 'left'}}/>
				<Typography align='left' sx={{margin: '15px 0 35px'}}>
					Klub PKS Polonia Białogon Kielce powstał 12 grudnia 1993r.
					Założycielami klubu są ksiądz Andrzej Drapała oraz obecny
					Świętokrzyski Kurator oświaty - Kazimierz Mądzik. Ich głównym zamysłem
					była organizacja wolnego czasu dla dzieci z dzielnicy Białogon. Już w
					1996r. klub zrzeszał około setki dzieci w róznym wieku, uprawiające
					różne dyscypliny: tenis stołowy, kolarstwo czy siatkówka.
				</Typography>
				<Typography variant='h6' sx={{ textAlign: 'left' }}>
					Teraźniejszość
				</Typography>
				<img src={bar} alt='bar' width='250' height='6' style={{float: 'left'}}/>
				<Typography align='left' sx={{margin: '15px 0 35px'}}>
					W klubie obecnie funkcjonują trzy grupy młodzieżowe oraz drużyna
					seniorów grająca w Klasie Okręgowej. Misją klubu jest szkolenie
					młodzieży oraz godne reprezentowanie Miasta Kielce w różych
					rozgrywkach ligowych.
				</Typography>
				<Typography variant='h6' sx={{ textAlign: 'left' }}>
					Wychowankowie
				</Typography>
				<img src={bar} alt='bar' width='250' height='6' style={{float: 'left'}}/>
				<Typography align='left' sx={{margin: '15px 0 35px'}}>
					W kadrze drużyny seniorskiej obecnie występuje 8 wychowanków. Nasze
					zespoły chcemy opierać na zawodnikach, którzy pierwsze piłkarskie
					kroki stawiali w naszym klubie.
					<br />
					<br />
					Wychowankami Polonii Białogon Kielce są m. inn. :
					<br />
					Paweł Brożek - ponad 300 występów w ekstraklasie, ponad 140 goli w
					ekstraklasie, 8x Mistrz Polski, 9 goli w reprezentacji Polski.
					<br />
					Piotr Brożek - ponad 250 występów w ekstraklasie, 15 goli w
					ekstraklasie, 5x Mistrz Polski, 5 występów w reprezentacji Polski.
				</Typography>
				{/* <Box>{about.title}</Box>
				<Box>{about.description}</Box> */}
			</Paper>
		</Box>
	);
};
