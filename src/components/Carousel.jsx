import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';

const images = [
  '/images/o1.png',
  '/images/o2.png',
  '/images/o3.png',
  '/images/o4.png',
  '/images/o5.png',
];

function Carousel() {
  const settings = {
    dots: true,  
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: false, 
  };

  return (
    <Box 
      sx={{ 
        width: '100%',  
        margin: '0 auto',  
        mt: 4,  
        px: { xs: 0, md: 0 },  
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Slider {...settings}>
          {images.map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              alt={`Slide ${index}`}
              sx={{
                width: '100vw', // 🔹 Ahora ocupa todo el ancho de la ventana
                height: { xs: '350px', sm: '450px', md: '500px', lg: '550px' },
                maxHeight: '80vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Carousel;
