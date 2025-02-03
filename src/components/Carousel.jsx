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
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth: '900px', 
        margin: '0 auto',  // ✅ Centra el carrusel
        mt: 4, 
        px: { xs: 0, md: 2 }, // ✅ Elimina el padding en móviles para evitar desplazamiento lateral
        display: 'flex',
        justifyContent: 'center', // ✅ Centra el contenido
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%' }}> {/* ✅ Asegura que el Slider se mantenga centrado */}
        <Slider {...settings}>
          {images.map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              alt={`Slide ${index}`}
              sx={{
                width: '100%',
                height: { xs: '320px', sm: '400px', md: '500px' }, // ✅ Ajuste de altura según pantalla
                maxHeight: '80vh',
                objectFit: 'cover',
                borderRadius: 2,
                display: 'block',
                margin: '0 auto', // ✅ Centra las imágenes correctamente
              }}
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Carousel;
