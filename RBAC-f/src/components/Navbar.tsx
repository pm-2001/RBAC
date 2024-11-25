import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        borderBottom: '2px solid #ffdd57',
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            color: '#ffdd57', // Bright yellow
            textTransform: 'uppercase',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          RBAC Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            href="/users"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                color: '#ffdd57',
                background: 'rgba(255, 221, 87, 0.2)',
              },
            }}
          >
            Users
          </Button>
          <Button
            href="/roles"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                color: '#ffdd57',
                background: 'rgba(255, 221, 87, 0.2)',
              },
            }}
          >
            Roles
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
