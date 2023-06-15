import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { SponsorLogo } from '../../styled/sponsorLogo';
import Formaster from './Formaster.jpg';
import Miasto_Kielce from './Miasto_Kielce.jpg';
import SZPN from './SZPN.jpg';
import Boramax from './Boramax.jpg';
import UMWS from './UMWS.jpg';
import K2 from './K2.jpg';
import Industria from './Industria.jpg';
import CRM from './CRM.jpg';
import Wodociagi from './Wodociagi.jpg';
import Digital from './Digital.jpg';
import Metbud from './Metbud.jpg';
import Rokar from './Rokar.jpg';
import Orto from './Orto.jpg';
import SantoSerwis from './SantoSerwis.jpg';

export const Sponsors = () => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

	let variant;
	if (isSmallScreen) {
	  variant = 'h5';
	} else if (isMediumScreen) {
	  variant = 'h4';
	} else {
	  variant = 'h3'; // default to 'h4' for larger screens
	}
  
	return (
		<Box
			sx={{
				margin: '90px 0',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<Typography
				variant={variant}
				sx={{ margin: 3, textAlign: 'center', textTransform: 'uppercase' }}>
				Sponsorzy klubu
			</Typography>
			<Box
				sx={{
					margin: '30px auto 10px',
					width: {
						xs: '95%',

						md: '80%',
					},
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
				}}>
				<SponsorLogo src={Formaster} alt='Logo Formaster' />
				<SponsorLogo src={Miasto_Kielce} alt='Logo Miasto Kielce' />
				<SponsorLogo src={SZPN} alt='Logo SZPN' />
				<SponsorLogo src={Boramax} alt='Logo Boramax' />
				<SponsorLogo src={UMWS} alt='Logo UMWS' />
				<SponsorLogo src={K2} alt='Logo K2' />
				<SponsorLogo src={Industria} alt='Logo Industria' />
				<SponsorLogo src={CRM} alt='Logo CRM' />
				<SponsorLogo src={Wodociagi} alt='Logo Wodociagi' />
				<SponsorLogo src={Digital} alt='Logo Digital' />
				<SponsorLogo src={Metbud} alt='Logo Metbud' />
				<SponsorLogo src={Rokar} alt='Logo Rokar' />
				<SponsorLogo src={Orto} alt='Logo Orto' />
				<SponsorLogo src={SantoSerwis} alt='Logo SantoSerwis' />
			</Box>
		</Box>
	);
};
