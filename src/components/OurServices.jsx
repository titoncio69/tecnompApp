import React, { useState } from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "MONTAJE ELÉCTRICO",
    description: "Ejecución de proyectos en baja y media tensión, instalaciones de fuerza, alumbrado, cableado y sistema de control, cumpliendo con normativa SEC NCh Elec. 4/2003.",
    image: "/images/p1.png",
  },
  {
    title: "CABLEADO ESTRUCTURADO",
    description: "Instalaciones de distintas categorías de cableado UTP y Fibra Óptica (5E, 6 y 6A, OM1, OM3, OM4), certificación de redes y mantenimiento de sala de datos.",
    image: "/images/p2.png",
  },
  {
    title: "CONECTIVIDAD Y REDES",
    description: "Instalaciones de enlaces punto a punto de 2.4 y 5 GHz, alineación de enlaces, instalación de antenas sectoriales, concentradores y distribución de datos.",
    image: "/images/p3.png",
  },
];

function OurServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: derecha, -1: izquierda

  const prevService = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const nextService = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container id="nuestros-servicios" sx={{ mt: 10, py: 5, textAlign: "center", maxWidth: "100%" }}>
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
        NUESTROS SERVICIOS
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "450px",
          borderRadius: 2,
          backgroundColor: "#333",
          overflow: "hidden",
          position: "relative",
          color: "white",
          padding: "40px",
          maxWidth: "90%", // ✅ Se asegura que el carrusel no sea demasiado ancho
          margin: "auto",
        }}
      >
        {/* Contenido de texto */}
        <Box sx={{ width: "45%", textAlign: "left", position: "relative", zIndex: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "'acumin-pro', sans-serif", fontWeight: "700", fontSize: "32px", color: "white", mb: 1 }}
          >
            {services[currentIndex].title}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "'acumin-pro', sans-serif", fontSize: "1.1rem", fontWeight: "bold", color: "#ddd" }}>
            {services[currentIndex].description}
          </Typography>
        </Box>

        {/* Contenedor de la imagen con flechas */}
        <Box sx={{ width: "50%", height: "100%", position: "relative" }}>
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ x: direction * 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 100, opacity: 0 }}
              transition={{ type: "tween", duration: 0.6 }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${services[currentIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.6)",
              }}
            />
          </AnimatePresence>

          {/* 🔹 Flechas movidas dentro del contenedor de imagen */}
          <IconButton onClick={prevService} sx={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#fff", zIndex: 3 }}>
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={nextService} sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#fff", zIndex: 3 }}>
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}

export default OurServices;
