import React, { useState } from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import GalleryModal from "./GalleryModal";

const clients = [
  { name: "Red de Salud UC CHRISTUS", image: "/images/c1.png" },
  { name: "Dávila", image: "/images/c2.png" },
  { name: "Universidad Andrés Bello", image: "/images/c3.png" },
  { name: "Cliente 4", image: "/images/c4.png" },
  { name: "Cliente 6", image: "/images/c6.png" },
  { name: "Cliente 7", image: "/images/c7.png" },
  { name: "Cliente 8", image: "/images/c8.png" },
];

function ClientsGallery() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <Container id="nuestros-clientes" sx={{ mt: 5, textAlign: "center" }}>
      {/* Título con la nueva tipografía y tamaño ajustado */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Poppins', sans-serif", // Fuente similar a la otra sección
          fontWeight: "700", // Negrita fuerte
          fontSize: "42px", // Tamaño grande
          color: "black",
          mb: 3,
        }}
      >
        NUESTROS CLIENTES
      </Typography>

      {/* Muestra solo 3 imágenes con efecto hover */}
      <Grid container spacing={3} justifyContent="center">
        {clients.slice(0, 3).map((client, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                cursor: "pointer",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" }, // Efecto hover
              }}
              onClick={() => handleOpen(index)}
            >
              <CardMedia
                component="img"
                image={client.image}
                alt={client.name}
                sx={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain", // Se asegura de que la imagen no se recorte
                }}
              />
              <CardContent>
                <Typography variant="h6">{client.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Galería Modal con todas las imágenes */}
      <GalleryModal
        images={clients.map((client) => client.image)}
        open={open}
        onClose={() => setOpen(false)}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </Container>
  );
}

export default ClientsGallery;
