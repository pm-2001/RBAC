import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

const RoleForm: React.FC = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handlePermissionChange = (permission: string) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSubmit = async () => {
    try {
      console.log(permissions)
      const response = await axios.post('http://127.0.0.1:8000/role/', {
        name: roleName,
        permissions,
      });

      setSuccessMessage(response.data.message || 'Role added successfully!');
      setSnackbarOpen(true);
      setRoleName('');
      setPermissions([]);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || 'Failed to add role.');
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
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        />

        <FormGroup>
          {['create', 'read', 'update', 'delete'].map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
              }
              label={permission.charAt(0).toUpperCase() + permission.slice(1)}
              sx={{
                color: '#4a90e2',
              }}
            />
          ))}
        </FormGroup>

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
        >
          Submit
        </Button>
      </form>

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

export default RoleForm;
