import { Box, Link, Paper } from '@mui/material';
import React from 'react';
import { Element } from 'react-scroll';
import { FooterCard } from '../../styled/footerCard';

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
					<li>
						<FooterCard>
							<p>PARAFIALNY KLUB SPORTOWY </p> <p>POLONIA BIAŁOGON KIELCE </p>
							<p>adres: Siedem Źródeł 9</p>
							<p>25-819 Kielce </p>
							<p>
								telefon:{' '}
								<Link
									sx={{ color: 'text.primary', textDecoration: 'none' }}
									href='tel:533499477'>
									533 499 477
								</Link>{' '}
							</p>
							<p>
								e-mail:{' '}
								<Link
									sx={{ color: 'text.primary', textDecoration: 'none' }}
									href='mailto:poloniabialogon.kielce@wp.pl'>
									poloniabialogon.kielce@wp.pl
								</Link>
							</p>
						</FooterCard>
					</li>
					<li>
						<FooterCard>
							<p>Prezes Zarządu:</p>
							<p>Paweł Kowalski </p>
							<p>
								tel:{' '}
								<Link
									href='tel:533 499 477'
									sx={{ color: 'text.primary', textDecoration: 'none' }}>
									{' '}
									533 499 477
								</Link>
							</p>
						</FooterCard>
					</li>
					
					<li>
						{' '}
						<FooterCard>
							<p>Wiceprezes Zarządu:</p>
							<p>Tomek Cieślik</p>
							<p>
								tel:{' '}
								<Link
									
									sx={{ color: 'text.primary', textDecoration: 'none' }}
									href='tel:510993333'>
									510 993 333
								</Link>
							</p>
						</FooterCard>
					</li>
					<li>
						<FooterCard>
							<p>Skarbnik:</p>
							<p>Katarzyna Dziedzic</p>
							<p>
								tel: <Link sx={{ color: 'text.primary', textDecoration: 'none' }}href='tel:694'>694 733 798</Link>
							</p>
						</FooterCard>
					</li>
				</ul>
			</Box>
		</Element>
	);
};
