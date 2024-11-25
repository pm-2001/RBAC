import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 3,
        backgroundColor: '#ff6f61',
        color: '#fff',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'bold',
          letterSpacing: '0.05em',
        }}
      >
        © 2024 RBAC Dashboard
      </Typography>
      <Typography
        variant="body2"
        sx={{
          // mt: 1,
          fontSize: '0.9rem',
          opacity: 0.9,
        }}
      >
        Empowering secure access control management
      </Typography>
    </Box>
  );
};

export default Footer;
