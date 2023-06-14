import { Box } from '@mui/material';
import React from 'react';
import { Element } from 'react-scroll';

export const Footer = () => {
	return (
		<Element name='footer'>
			<Box
				sx={{
					width: '100%',

					backgroundColor: 'basicBackground',
					color: 'white',
					margin: '20px 0',
					padding: '10px 0',
				}}>
				<ul
					style={{
						height: '100%',
						width: '90%',
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-around',
						alignItem: 'center',
						listStyleType: 'none',
						margin: '0 auto',
					}}>
					<li style={{ margin: '10px 5px' }}>
						<p>PARAFIALNY KLUB SPORTOWY </p> <p>POLONIA BIAŁOGON KIELCE </p>
						<p>adres: Siedem Źródeł 9</p>
						<p>25-819 Kielce </p>
						<p>telefon: <a href="tel:533499477">533 499 477</a> </p>
						<p>
							e-mail:{' '}
							<a
								style={{ color: 'white' }}
								href='mailto:poloniabialogon.kielce@wp.pl'>
								poloniabialogon.kielce@wp.pl
							</a>
						</p>
					</li>
					<li style={{ margin: '30px 5px', minWidth: '150px' }}>
						<p>Prezes Zarządu:</p><p>Paweł Kowalski </p><a href="tel:533 499 477">533 499 477</a>
					</li>
					<li style={{ margin: '30px 5px', minWidth: '150px' }}>
						<p>Sekretarz:</p> <p>Marek Wyrębek</p><a href="tel:781152525">781 152 525</a> 
					</li>
					<li style={{ margin: '30px 5px', minWidth: '150px' }}>
						<p>Wiceprezes Zarządu:</p>
						<p>Tomek Cieślik</p>
						<a href="tel:510993333">510 993 333</a>
					</li>
					<li style={{ margin: '30px 5px', minWidth: '150px' }}>
						<p>Skarbnik:</p>
						<p>Katarzyna Dziedzic</p>
						<a href="tel:694">694 733 798</a>
					</li>
				</ul>
			</Box>
		</Element>
	);
};
