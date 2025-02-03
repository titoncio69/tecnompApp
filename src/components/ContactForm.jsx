import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Snackbar, Alert } from '@mui/material';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Solicitud',
    message: '',
    file: null
  });

  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB max
        setError('El archivo es demasiado grande. Máximo 2MB.');
        return;
      }
      setFormData({ ...formData, file });
      setError('');
    }
  };

  const handleFileRemove = () => {
    setFormData({ ...formData, file: null });
    setSnackbar({ open: true, message: 'Archivo eliminado', severity: 'info' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("message", formData.message);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const response = await fetch("/send_email.php", { 
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.status === "success") {
        setSnackbar({ open: true, message: 'Mensaje enviado correctamente 🚀', severity: 'success' });

        // 🧹 Limpia todos los campos después del envío
        setFormData({
          name: '',
          email: '',
          subject: 'Solicitud',
          message: '',
          file: null
        });
      } else {
        setSnackbar({ open: true, message: result.message || 'Error al enviar el mensaje.', severity: 'error' });
      }
    } catch (error) {
      console.error("Error enviando el formulario", error);
      setSnackbar({ open: true, message: 'Error de conexión. Revisa tu servidor.', severity: 'error' });
    }
  };

  return (
    <Container
      id="contacto"
      sx={{
        mt: { xs: 5, md: 10 },  // Ajuste para móviles
        py: 5,
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: "100%" // Asegura que el contenido se adapte correctamente
      }}
    >
      {/* ✅ Asegura que el título se vea bien y centrado en móviles */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'acumin-pro', sans-serif",
          fontWeight: "700",
          fontSize: { xs: "32px", md: "42px" },
          color: "black",
          mb: 3,
          textAlign: "center",
          width: "100%",
        }}
      >
        CONTÁCTANOS
      </Typography>

      {/* Contenedor del formulario con ajustes de diseño mejorados */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: { xs: "100%", sm: 600, md: 900 }, // Se adapta a pantallas pequeñas
          width: "90%", // Evita que quede demasiado ancho en móviles
          backgroundColor: '#f5f5f5',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "left", // Asegura buena alineación del texto dentro del formulario
        }}
      >
        <TextField 
          label="Nombre" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          fullWidth 
          required 
          sx={{ mb: 2, fontFamily: "'acumin-pro', sans-serif" }} 
        />
        <TextField 
          label="Correo Electrónico" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          fullWidth 
          required 
          sx={{ mb: 2, fontFamily: "'acumin-pro', sans-serif" }} 
        />
        <TextField 
          select 
          label="Asunto" 
          name="subject" 
          value={formData.subject} 
          onChange={handleChange} 
          fullWidth 
          required 
          sx={{ mb: 2, fontFamily: "'acumin-pro', sans-serif" }}
        >
          <MenuItem value="Solicitud">Solicitud</MenuItem>
          <MenuItem value="Contacto">Contacto</MenuItem>
        </TextField>
        <TextField 
          label="Mensaje" 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          fullWidth 
          required 
          multiline 
          rows={4} 
          sx={{ mb: 2, fontFamily: "'acumin-pro', sans-serif" }} 
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Button variant="contained" component="label">
            Seleccionar archivo
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {formData.file && (
            <>
              <Typography variant="body2">{formData.file.name}</Typography>
              <Button variant="outlined" color="error" onClick={handleFileRemove}>Eliminar</Button>
            </>
          )}
        </Box>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ fontFamily: "'acumin-pro', sans-serif" }}
        >
          ENVIAR MENSAJE
        </Button>
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ContactForm;
