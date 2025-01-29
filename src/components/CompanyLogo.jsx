import React from 'react';
import { Box } from '@mui/material';

function CompanyLogo() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <img 
        src="/images/vertor.png"  // Asegúrate de que la ruta es correcta
        alt="TECNO MP Logo" 
        style={{ width: '400px', height: 'auto' }} // Ajusta el tamaño aquí
      />
    </Box>
  );
}

export default CompanyLogo;
