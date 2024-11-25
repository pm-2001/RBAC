import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import RoleTable from '../components/RoleTable';
import RoleForm from '../components/RoleForm';

const RolesPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f9fafc', // Light background for the entire page
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden', // Prevent page scrolling
        padding: '2rem',
      }}
    >
      <Container
        sx={{
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          padding: '2rem',
          backgroundColor: '#ffffff', // White container background
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: '700',
            textAlign: 'center',
            color: '#1a202c', // Dark theme text color
            mb: 4,
            letterSpacing: '0.1em',
          }}
        >
          Manage Roles
        </Typography>

        <Box
          sx={{
            backgroundColor: '#f4f6f8', // Slightly darker card background
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for the card
            padding: '2rem',
            mb: 5,
            overflow: 'auto',
            maxHeight: 'calc(100vh - 15rem)', // Prevent overflow
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#2d3748', // Subtle dark text color
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}
          >
            Add New Role
          </Typography>
          <RoleForm />
        </Box>

        <Box
          sx={{
            backgroundColor: '#f4f6f8', // Slightly darker card background
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for the card
            padding: '2rem',
            overflow: 'auto',
            maxHeight: 'calc(100vh - 15rem)', // Prevent overflow
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#2d3748', // Subtle dark text color
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}
          >
            Role List
          </Typography>
          <RoleTable />
        </Box>
      </Container>
    </Box>
  );
};

export default RolesPage;
