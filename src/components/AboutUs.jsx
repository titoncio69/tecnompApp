import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function AboutUs() {
  return (
    <Container id="quienes-somos" sx={{ mt: 5, textAlign: 'center' }}>
      {/* Sección del título con la nueva fuente */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Poppins', sans-serif", // Fuente similar a Stolzl
          fontWeight: "700", // Negrita
          fontSize: "42px", // Tamaño similar al de la imagen
          color: "#000", // Color negro
          mb: 2,
        }}
      >
        ¿QUIÉNES SOMOS?
      </Typography>

      {/* Caja con el fondo azul y el texto en blanco */}
      <Box
        sx={{
          backgroundColor: '#326B92',
          p: 3,
          borderRadius: 2,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)", // Efecto hover
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            fontSize: '1.125rem', // Tamaño de fuente aumentado
            fontWeight: 'bold', // Hace que el texto sea más visible
            lineHeight: '1.6', // Ajuste para mejorar la legibilidad
          }}
        >
          TECNO MP Ingeniería ofrece soluciones en <strong>ingeniería eléctrica y telecomunicaciones</strong>, con más de 15 años de experiencia. Nos destacamos por <strong>nuestro compromiso con la calidad, seguridad y eficiencia en proyectos personalizados</strong> para el sector público y privado.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutUs;
