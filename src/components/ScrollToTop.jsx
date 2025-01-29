import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  // Manejo del scroll: Muestra el botón solo si se baja 200px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para subir al inicio suavemente
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <Box
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 30,
          left: 20,
          width: 120, // 🔹 Aumentado para que el logo se vea mejor
          height: 120, // 🔹 Aumentado para que el logo se vea mejor
          borderRadius: "100%",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: 3,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": { transform: "scale(1.5)" },
        }}
      >
        <video
          src="/images/3d.mp4"
          autoPlay
          loop
          muted
          style={{
            width: "100%", // 🔹 Se ajusta dentro del botón más grande
            height: "100%", // 🔹 Se ajusta dentro del botón más grande
            borderRadius: "100%",
            animation: "rotateVideo 3s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes rotateVideo {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </Box>
    )
  );
}

export default ScrollToTop;
