import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import axios from '../services/api';

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    axios.get('/roles').then((response) => setRoles(response.data));
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Role Name</TableCell>
          <TableCell>Permissions</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell>{role.id}</TableCell>
            <TableCell>{role.name}</TableCell>
            <TableCell>{role.permissions.join(', ')}</TableCell>
            <TableCell>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RoleTable;
