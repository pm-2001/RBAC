import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const UsersPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f4f6f8', // Match dashboard theme
        minHeight: '100vh', // Full viewport height
        minWidth: '100vw', // Full viewport width
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden', // Prevent overall page scrolling
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
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#2c3e50', // Dashboard-like color
            mb: 2,
            letterSpacing: '0.05em',
          }}
        >
          Manage Users
        </Typography>

        {/* User Form Section */}
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
            overflow: 'auto', // Scrollable within the container
            maxHeight: 'calc(100vh - 15rem)', // Prevent overflow
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              color: '#34495e', // Matching color theme
              mb: 2,
            }}
          >
            Add New User
          </Typography>
          <UserForm />
        </Box>

        {/* User Table Section */}
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
            overflow: 'auto',
            maxHeight: 'calc(100vh - 15rem)', // Prevent overflow
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
