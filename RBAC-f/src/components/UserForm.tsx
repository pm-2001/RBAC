import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const UserForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = () => {
    console.log({ username, email, role });
    // Add API call logic here
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
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="viewer">Viewer</MenuItem>
        </Select>
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
      >
        Submit
      </Button>
    </Box>
  );
};

export default UserForm;
