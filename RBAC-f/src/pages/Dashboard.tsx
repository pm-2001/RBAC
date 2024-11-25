import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '83vh',
        background: 'linear-gradient(135deg, #ff9a8b, #fecf6d)',
        color: '#333',
      }}
    >
      {/* Outer Box with Glass Effect */}
      <Box
        sx={{
          position: 'relative',
          width: '90%',
          height: '85%',
          maxWidth: '600px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Inner Content */}
        <Container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            padding: 4,
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              letterSpacing: '0.08em',
              mb: 2,
              color: '#ff6f61',
              textTransform: 'uppercase',
            }}
          >
            Welcome
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              mb: 3,
              color: '#666',
              lineHeight: 1.5,
            }}
          >
            Simplify user, role, and permission management. Experience intuitive workflows and seamless control.
          </Typography>

          {/* Action Button */}
          <Button
            variant="contained"
            size="large"
            href="/users"
            sx={{
              background: '#ff6f61',
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '8px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s ease, background 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                background: '#fecf6d',
                color: '#333',
              },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
