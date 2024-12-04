import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const UsersPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f4f6f8',
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflowX: 'hidden', // Prevent horizontal scrolling on the entire page
        boxSizing: 'border-box', // Ensure padding and border are within the element's width
      }}
    >
      <Container
        sx={{
          maxWidth: '1200px',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          flexGrow: 1,
          width: '100%',
          overflowX: 'hidden', // Prevent overflow in container
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#2c3e50',
            mb: 2,
            letterSpacing: '0.05em',
          }}
        >
          Manage Users
        </Typography>

        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden', // Hide any overflow
            maxHeight: 'calc(100vh - 15rem)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              color: '#34495e',
              mb: 2,
            }}
          >
            Add New User
          </Typography>
          <UserForm />
        </Box>

        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            flexGrow: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden', // Hide any overflow
            maxHeight: 'calc(100vh - 15rem)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              color: '#34495e',
              mb: 2,
            }}
          >
            User List
          </Typography>
          <UserTable />
        </Box>
      </Container>
    </Box>
  );
};

export default UsersPage;
