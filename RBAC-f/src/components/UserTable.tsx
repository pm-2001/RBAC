import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper } from '@mui/material';
import axios from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  status: boolean;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('/users').then((response) => setUsers(response.data));
  }, []);

  const toggleStatus = (id: number, currentStatus: boolean) => {
    axios.put(`/users/${id}`, { status: !currentStatus }).then(() => {
      setUsers(users.map(user => (user.id === id ? { ...user, status: !currentStatus } : user)));
    });
  };

  return (
    <Paper sx={{ overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', mb: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>Username</TableCell>
            <TableCell sx={{ fontWeight: '600', color: '#3f3f3f', backgroundColor: '#f4f6f8' }}>Email</TableCell>
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
                  Toggle Status
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
