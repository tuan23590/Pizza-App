import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Link } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const images = [
  "https://cdn.pizzahut.vn/images/Web_V3/Homepage/Hometop-vie_B3X5M_030720240950.jpg",
  "https://cdn.pizzahut.vn/images/Web_V3/Homepage/Desktop%20-%20Vie_UCXMR_280520240753.jpg",
  "https://cdn.pizzahut.vn/images/Web_V3/Homepage/DESTKOP-VIE_MMAPX_260320240914.jpg",
  "https://cdn.pizzahut.vn/images/Web_V3/Homepage/VieHometop50_W6CIG_010720241005.jpg"
];

export default function SlideShow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const startSlideshow = () => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  const resetSlideshow = () => {
    clearInterval(intervalRef.current);
    startSlideshow();
  };

  useEffect(() => {
    startSlideshow();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetSlideshow();
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetSlideshow();
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '23vw',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {images.map((image, index) => (
        <Link href="/" key={index}>
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Slide ${index}`}
            sx={{
              width: '100%',
              height: 'auto',
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateX(${(index - currentImageIndex) * 100}%)`,
              transition: 'transform 1s ease-in-out'
            }}
          />
        </Link>
      ))}
      <IconButton
        onClick={handlePrevClick}
        sx={{
          position: 'absolute',
          left: '10px',
          top: '40%',
          borderRadius: '10px',
          paddingRight: '3px',
          paddingLeft: '13px',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'red',
          },
        }}
      >
        <ArrowBackIos sx={{ color: 'white' }} />
      </IconButton>
      <IconButton
        onClick={handleNextClick}
        sx={{
          position: 'absolute',
          right: '10px',
          top: '40%',
          borderRadius: '10px',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'red',
          },
        }}
      >
        <ArrowForwardIos sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
}
