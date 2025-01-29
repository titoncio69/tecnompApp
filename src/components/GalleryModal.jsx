import React from "react";
import { Modal, Box, IconButton, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const GalleryModal = ({ images, open, onClose, currentIndex, setCurrentIndex }) => {
  if (!open) return null;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Fondo oscuro difuminado
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          {/* Botón de Cerrar */}
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 20, right: 20, color: "#fff" }}>
            <CloseIcon fontSize="large" />
          </IconButton>

          {/* Flecha Izquierda */}
          <IconButton onClick={prevImage} sx={{ position: "absolute", left: 20, color: "#fff" }}>
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>

          {/* Imagen Central */}
          <Box
            component="img"
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
            sx={{
              width: "90vw",
              height: "80vh",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />

          {/* Flecha Derecha */}
          <IconButton onClick={nextImage} sx={{ position: "absolute", right: 20, color: "#fff" }}>
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GalleryModal;
