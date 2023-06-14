import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Pagination from '@mui/material/Pagination';

export const MaterialImageList = ({ photos, variant, itemsOnPage }) => {
	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

	const itemsPerPage = itemsOnPage;
	const [page, setPage] = useState(1);

	const handleImageClick = e => {
		const data = e.target.src;
		const foundIndex = photos.findIndex(item => data.includes(item.src));

		setCurrentImage(foundIndex);
		setViewerIsOpen(true);
	};

	const closeLightbox = () => {
		setCurrentImage(0);
		setViewerIsOpen(false);
	};

	const handleChange = (event, value) => { 
		setPage(value);
	};

	const theme = useTheme();
	const small = useMediaQuery(theme.breakpoints.up('sm'));
	const medium = useMediaQuery(theme.breakpoints.up('md'));

	let cols = 1;
	let gap = 1;
	if (photos.length >= 2 && (small || medium)) {
		cols = 2;
		gap = 3;
	}

	if (photos.length >= 3 && (small || medium)) {
		cols = 3;
		gap = 3;
	}

	if (photos.length >= 4 && medium) {
		cols = 4;
		gap = 8;
	}

	const pagedPhotos = photos.slice((page - 1) * itemsPerPage, page * itemsPerPage); 

	return (
		<Box sx={{ width: '100%' }}>
			<ImageList variant={variant} cols={cols} gap={gap}>
				{pagedPhotos.map((item, index) => (
					<ImageListItem key={index}>
						<img
							src={`${item.src}?w=248&fit=crop&auto=format`}
							srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
							alt='Footbal players'
							loading='lazy'
							onClick={handleImageClick}
						/>
					</ImageListItem>
				))}
			</ImageList>
			<Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}> 
				<Pagination count={Math.ceil(photos.length / itemsPerPage)} page={page} onChange={handleChange} />
			</Box>
			<ModalGateway>
				{viewerIsOpen ? (
					<Modal onClose={closeLightbox}>
						<Carousel
							currentIndex={currentImage}
							views={photos.map(x => ({
								...x,
								srcset: x.srcSet,
								caption: x.title,
							}))}
						/>
					</Modal>
				) : null}
			</ModalGateway>
		</Box>
	);
};
