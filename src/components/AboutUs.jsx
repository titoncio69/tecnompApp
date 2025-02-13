import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function AboutUs() {
  return (
    <Container id="quienes-somos" sx={{ mt: 6, py: 5, textAlign: 'center' }}>
      {/* ✅ Título corregido para que se vea igual que "Nuestros Valores" */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'acumin-pro', sans-serif",
          fontWeight: "700",
          fontSize: "42px",
          color: "#000",
          mb: 3,
        }}
      >
        ¿QUIÉNES SOMOS?
      </Typography>

      {/* ✅ Caja con el fondo azul corregida */}
      <Box
        sx={{
          backgroundColor: '#326B92',
          p: 3,
          borderRadius: 2,
          maxWidth: "80%", // 🔹 Se ajustó el ancho para que no ocupe toda la pantalla
          margin: "auto", // 🔹 Centra el cuadro en la página
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
            fontFamily: "'acumin-pro', sans-serif",
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            lineHeight: '1.6',
          }}
        >
          TECNO MP Ingeniería ofrece soluciones en <strong>ingeniería eléctrica y telecomunicaciones</strong>, con más de 15 años de experiencia. Nos destacamos por <strong>nuestro compromiso con la calidad, seguridad y eficiencia en proyectos personalizados</strong> para el sector público y privado.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutUs;
