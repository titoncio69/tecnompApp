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
  const [direction, setDirection] = useState(1);

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
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'acumin-pro', sans-serif",
          fontWeight: "700",
          fontSize: { xs: "32px", md: "42px" },
          color: "black",
          mb: 3,
        }}
      >
        NUESTROS SERVICIOS
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          height: { xs: "auto", md: "450px" },
          borderRadius: 2,
          backgroundColor: "#333",
          overflow: "hidden",
          position: "relative",
          color: "white",
          padding: { xs: "20px", md: "40px" },
          maxWidth: "95%",
          margin: "auto",
        }}
      >
        {/* Contenedor de Texto */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "center",
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'acumin-pro', sans-serif",
              fontWeight: "700",
              fontSize: "24px",
              color: "white",
              mb: 2,
            }}
          >
            {services[currentIndex].title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem", fontWeight: "bold", color: "#ddd", textAlign: "center" }}>
            {services[currentIndex].description}
          </Typography>
        </Box>

        {/* Contenedor de Imagen con puntas redondeadas */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "300px", md: "100%" },
            position: "relative",
            mt: { xs: 2, md: 0 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                minHeight: "300px",
                backgroundImage: `url(${services[currentIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "brightness(0.8)",
                borderRadius: "20px", // 🔹 Agrega puntas redondeadas a la imagen
              }}
            />
          </AnimatePresence>

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
