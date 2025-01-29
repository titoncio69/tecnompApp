import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#326B92", // Azul corporativo
        color: "white", // Texto blanco
        textAlign: "center",
        py: 2, // Espaciado vertical
        mt: 5, // Margen superior
        fontFamily: "'Poppins', sans-serif", // Aplica la misma fuente
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: "bold", 
          fontSize: "1rem", // Ajuste de tamaño
          textTransform: "none", // Evita mayúsculas forzadas
          letterSpacing: "0.5px" // Ajuste de espaciado
        }}
      >
        © 2025. Derechos Reservados TECNO MP Ingeniería Eléctrica y Redes.
      </Typography>
    </Box>
  );
}

export default Footer;
