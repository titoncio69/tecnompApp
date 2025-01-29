import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function SocialLinks() {
  return (
    <Container id="redes-sociales" sx={{ mt: 5, textAlign: 'center' }}>
      {/* Título con tipografía mejorada */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Poppins', sans-serif", // Fuente similar a las otras secciones
          fontWeight: "700", // Negrita fuerte
          fontSize: "42px", // Tamaño grande
          color: "black",
          mb: 3,
        }}
      >
        ¡VISITA NUESTRAS OBRAS EN REDES SOCIALES!
      </Typography>

      {/* Iconos con efecto hover */}
      <Box>
        <IconButton
          component="a"
          href="https://www.instagram.com/tecno_mp/"
          target="_blank"
          sx={{
            color: '#E4405F',
            mx: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.2)" }, // Efecto hover
          }}
        >
          <InstagramIcon sx={{ fontSize: 50 }} />
        </IconButton>

        <IconButton
          component="a"
          href="https://www.linkedin.com/in/tecno-mp-ingeniería-37b858155"
          target="_blank"
          sx={{
            color: '#0077B5',
            mx: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.2)" }, // Efecto hover
          }}
        >
          <LinkedInIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </Box>
    </Container>
  );
}

export default SocialLinks;
