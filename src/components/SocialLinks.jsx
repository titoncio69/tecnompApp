import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function SocialLinks() {
  return (
    <Container id="redes-sociales" sx={{ mt: 10, py: 5, textAlign: 'center' }}>
      {/* ✅ Título corregido para que se vea igual que "Nuestros Valores" */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'acumin-pro', sans-serif",
          fontWeight: "700",
          fontSize: "42px",
          color: "black",
          mb: 3,
        }}
      >
        ¡VISITA NUESTRAS OBRAS EN REDES SOCIALES!
      </Typography>

      {/* ✅ Contenedor de iconos con más espacio para mayor claridad */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
        <IconButton
          component="a"
          href="https://www.instagram.com/tecno_mp/"
          target="_blank"
          sx={{
            color: '#E4405F',
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.2)" }, // Efecto hover
          }}
        >
          <InstagramIcon sx={{ fontSize: 60 }} /> {/* ✅ Aumenté el tamaño del icono */}
        </IconButton>

        <IconButton
          component="a"
          href="https://www.linkedin.com/in/tecno-mp-ingeniería-37b858155"
          target="_blank"
          sx={{
            color: '#0077B5',
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.2)" }, // Efecto hover
          }}
        >
          <LinkedInIcon sx={{ fontSize: 60 }} /> {/* ✅ Aumenté el tamaño del icono */}
        </IconButton>
      </Box>
    </Container>
  );
}

export default SocialLinks;
