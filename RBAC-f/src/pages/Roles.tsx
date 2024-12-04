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
        overflowX: 'hidden', // Prevent page scrolling horizontally
        padding: '2rem',
        boxSizing: 'border-box', // Ensure padding doesn't affect width
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
          width: '100%',
          boxSizing: 'border-box',
          overflowX: 'hidden', // Prevent horizontal overflow
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
            backgroundColor: '#f4f6f8',
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            mb: 5,
            overflowY: 'auto', // Allow vertical scrolling if content overflows
            maxHeight: 'calc(100vh - 20rem)', // Adjust max height so it doesn't overflow
            width: '100%', // Ensure full width of the container
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#2d3748', 
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
            backgroundColor: '#f4f6f8', 
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
            padding: '2rem',
            overflowY: 'auto', // Allow vertical scrolling if content overflows
            maxHeight: 'calc(100vh - 20rem)', 
            width: '100%', // Ensure full width of the container
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#2d3748', 
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
