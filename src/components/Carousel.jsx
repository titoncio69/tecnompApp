import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';

const images = [
  '/images/f1.png',
  '/images/f2.png',
  '/images/f3.png',
  '/images/f4.png',
  '/images/f5.png',
];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: 'auto', mt: 4 }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`Slide ${index}`}
            sx={{
              width: '100%',
              height: '500px',
              objectFit: 'contain',  // Evita que se corten
              borderRadius: 2
            }}
          />
        ))}
      </Slider>
    </Box>
  );
}

export default Carousel;
