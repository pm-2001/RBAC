import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

const UserForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<string[]>([]); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(true); 

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://rbac-plx8.onrender.com/role/');
        setRoles(response.data.map((role: any) => role.name)); 
        setLoadingRoles(false);
      } catch (error) {
        setErrorMessage('Failed to load roles.');
        setSnackbarOpen(true);
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://rbac-plx8.onrender.com/user/', {
        username,
        email,
        role,
      });
      setSuccessMessage(response.data.message || 'User has been added successfully!');
      setSnackbarOpen(true);
      setUsername('');
      setEmail('');
      setRole('');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || 'Failed to add user.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        padding: 4,
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
        }}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
        }}
      />
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        {loadingRoles ? (
          <CircularProgress size={24} />
        ) : (
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
            }}
          >
            {roles.map((roleName) => (
              <MenuItem key={roleName} value={roleName}>
                {roleName}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#4a90e2',
          },
        }}
        disabled={loadingRoles}
      >
        Submit
      </Button>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {successMessage ? (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default UserForm;
