import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  status: boolean;
  role: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/user/')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      });
  }, []);

  const toggleStatus = (id: number, currentStatus: boolean) => {
    axios
      .put(`http://127.0.0.1:8000/user/${id}`, { status: !currentStatus })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: !currentStatus } : user
          )
        );
      })
      .catch((err) => {
        console.error('Failed to update status:', err);
        alert('Error toggling user status. Please try again.');
      });
  };

  if (loading) {
    return (
      <Paper sx={{ padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ padding: 3 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        mb: 5,
        padding: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>Username</TableCell>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>Role</TableCell>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} sx={{ backgroundColor: user.status ? '#e8f5e9' : '#fbe9e7' }}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell sx={{ color: user.status ? '#388e3c' : '#d32f2f' }}>
                {user.status ? 'Active' : 'Inactive'}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => toggleStatus(user.id, user.status)}
                  variant="contained"
                  color={user.status ? 'error' : 'success'}
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: user.status ? '#d32f2f' : '#388e3c',
                    '&:hover': {
                      backgroundColor: user.status ? '#b71c1c' : '#2e7d32',
                    },
                  }}
                >
                  {user.status ? 'Deactivate' : 'Activate'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserTable;
