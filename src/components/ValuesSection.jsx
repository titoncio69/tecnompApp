import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VerifiedIcon from "@mui/icons-material/Verified";

const values = [
  {
    title: "VISIÓN",
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "white" }} />,
    description:
      "Ser una empresa de proyectos y ejecución en el área de ingeniería eléctrica y corrientes débiles de referencia nacional, por su calidad, seguridad y confiabilidad de sus soluciones especializadas para la industria.",
  },
  {
    title: "MISIÓN",
    icon: <HandshakeIcon sx={{ fontSize: 40, color: "white" }} />,
    description:
      "Asistir integralmente a nuestros clientes a través de un equipo altamente profesional y humano, basados en soluciones seguras y que contengan un gran valor agregado.",
  },
  {
    title: "VALORES",
    icon: <VerifiedIcon sx={{ fontSize: 40, color: "white" }} />,
    description:
      "Vivimos y soñamos con la seguridad de todos nuestros servicios y productos, manteniendo siempre nuestro foco en que: seguridad y calidad de su proyecto es nuestro valor principal.",
  },
];

function ValuesSection() {
  return (
    <Box sx={{ py: 5, textAlign: "center" }}>
      {/* Título con la nueva tipografía Poppins */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Poppins', sans-serif", // Fuente Poppins
          fontWeight: "700", // Negrita
          fontSize: "42px", // Tamaño grande
          color: "black",
          mb: 3,
        }}
      >
        NUESTROS VALORES
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          px: 2,
        }}
      >
        {values.map((value, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 320,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#EF7A3B", // Fondo naranjo
              color: "white",
              textAlign: "center",
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" }, // Efecto hover
            }}
          >
            <CardContent>
              {value.icon}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mt: 1,
                  fontSize: "20px", // Ajuste del tamaño para mayor visibilidad
                }}
              >
                {value.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  fontWeight: "bold", // Hace el texto más visible
                  fontSize: "1.1rem", // Aumenta el tamaño del texto
                  lineHeight: 1.6, // Mejora la legibilidad
                }}
              >
                {value.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default ValuesSection;
