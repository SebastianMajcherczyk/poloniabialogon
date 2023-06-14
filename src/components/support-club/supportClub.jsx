/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box } from '@mui/material';
import React from 'react';
import podatekVertical from './podatekVertical.jpg';
import podatekHorizontal from './podatekHorizontal.jpg';

export const SupportClub = () => {
  const screenWidth = window.innerWidth;

  // Determine the image source based on screen width
  const imageSrc = screenWidth >= 768 ? podatekHorizontal : podatekVertical;

  return (
    <Box
      sx={{
        width: {xs: '95%',
		sm: '70%'},
        margin: '90px auto 10px',
      }}
    >
 
      <img
        src={imageSrc}
        alt="Podatek Image"
        style={{
          display: 'block',
          maxHeight: '80vh',
          width: '100%',
          margin: '0 auto',
          objectFit: 'scale-down',
        }}
      />
    </Box>
  );
};
