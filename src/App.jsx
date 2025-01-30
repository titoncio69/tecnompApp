import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Carousel from './components/Carousel';
import AboutUs from './components/AboutUs';
import ClientsGallery from './components/ClientsGallery';
import SocialLinks from './components/SocialLinks';
import ContactForm from './components/ContactForm';
import './App.css';
import ValuesSection from "./components/ValuesSection"; 
import CompanyLogo from './components/CompanyLogo';
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import OurServices from "./components/OurServices";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', py: 1 }}>
        <Container>
          <Toolbar>
            {/* Logo de la empresa */}
            <Box 
              component="img" 
              src="/images/vertor.png" 
              alt="TECNO MP" 
              sx={{ width: 200, height: 'auto', mr: 3 }} 
            />

            {/* Menú en escritorio */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {[
                { text: "¿Quiénes Somos?", link: "#quienes-somos" },
                { text: "Nuestros Valores", link: "#nuestros-valores" },
                { text: "Nuestros Clientes", link: "#nuestros-clientes" },
                { text: "Nuestros Servicios", link: "#nuestros-servicios" },  // ✅ Añadido
                { text: "Redes Sociales", link: "#redes-sociales" },
                { text: "Contacto", link: "#contacto" }
              ].map((item, index) => (
                <Button
                  key={index}
                  href={item.link}
                  sx={{
                    color: 'black',
                    fontFamily: "'acumin-pro', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    mx: 1,
                    transition: "color 0.3s ease-in-out",
                    "&:hover": { color: "#326B92" }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Menú en dispositivos móviles */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton edge="end" aria-label="menu" onClick={handleMenuOpen}>
                <MenuIcon sx={{ color: 'black' }} />
              </IconButton>
            </Box>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {[
                { text: "¿Quiénes Somos?", link: "#quienes-somos" },
                { text: "Nuestros Valores", link: "#nuestros-valores" },
                { text: "Nuestros Clientes", link: "#nuestros-clientes" },
                { text: "Nuestros Servicios", link: "#nuestros-servicios" },  // ✅ Añadido
                { text: "Redes Sociales", link: "#redes-sociales" },
                { text: "Contacto", link: "#contacto" }
              ].map((item, index) => (
                <MenuItem key={index} onClick={handleMenuClose} component="a" href={item.link} 
                  sx={{ fontFamily: "'acumin-pro', sans-serif" }}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Secciones de la página */}
      <Carousel />
      <CompanyLogo />
      <AboutUs />
      <Box id="nuestros-valores">
        <ValuesSection />
      </Box>
      <ClientsGallery />
      <Box id="nuestros-servicios">
        <OurServices />
      </Box>
      <SocialLinks />
      <ContactForm />
      <Footer />

      {/* Botón flotante para subir al inicio */}
      <ScrollToTop />
    </>
  );
}

export default App;
