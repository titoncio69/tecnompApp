import React, { useState } from "react";
import { Container, Typography, Box, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion"; // Importamos Framer Motion

const clients = [
  { name: "Red de Salud UC CHRISTUS", image: "/images/c1.png" },
  { name: "Dávila", image: "/images/c2.png" },
  { name: "Universidad Andrés Bello", image: "/images/c3.png" },
  { name: "INGEVEC", image: "/images/c4.png" },
  { name: "INIA", image: "/images/c6.png" },
  { name: "ROVILL", image: "/images/c7.png" },
  { name: "CREA", image: "/images/c8.png" },
  { name: "ARAYANAIS LTDA", image: "/images/v2.png" },
  { name: "PAICAVÍ", image: "/images/v3.png" },
  { name: "CPA", image: "/images/v4.png" },
  { name: "Dirección ChileCompra", image: "/images/v5.png" },
  { name: "ENFLEX", image: "/images/v6.png" },
  { name: "SERCOAC S.A.", image: "/images/v7.png" },
  { name: "ACHOCLONADOS", image: "/images/v8.png" },
  { name: "ALTIUS", image: "/images/v9.png" },
  { name: "BRIDAK", image: "/images/v10.png" },
  { name: "APROMAD", image: "/images/v11.png" },
  { name: "BRAMAL", image: "/images/v12.png" },
  { name: "DDAF", image: "/images/v13.png" },
  { name: "Universidad San Sebastian", image: "/images/v14.png" },
  { name: "RAPAK CHILE", image: "/images/v15.png" },
  { name: "UIDAT", image: "/images/v16.png" }
];

function ClientsGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: hacia la derecha, -1: hacia la izquierda

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? clients.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === clients.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container id="nuestros-clientes" sx={{ mt: 15, py: 5, textAlign: "center" }}>
      {/* ✅ Título corregido para que se vea igual que en la imagen */}
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
        NUESTROS CLIENTES
      </Typography>

      {/* ✅ Contenedor del carrusel con mejor alineación */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", maxWidth: "100%", margin: "auto" }}>
        {/* Flecha Izquierda */}
        <IconButton onClick={prevImage} sx={{ position: "absolute", left: -50, color: "black", zIndex: 10 }}>
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>

        {/* Animación de entrada y salida */}
        <Box sx={{ width: 320, height: 320, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ x: direction * 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 100, opacity: 0 }}
              transition={{ type: "tween", duration: 0.5 }}
              style={{ position: "absolute" }}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  width: 300,
                  boxShadow: 3,
                  textAlign: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={clients[currentIndex].image}
                  alt={clients[currentIndex].name}
                  sx={{
                    width: "100%",
                    height: "250px",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'acumin-pro', sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {clients[currentIndex].name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Flecha Derecha */}
        <IconButton onClick={nextImage} sx={{ position: "absolute", right: -50, color: "black", zIndex: 10 }}>
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Box>
    </Container>
  );
}

export default ClientsGallery;
