import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
} from '@mui/material';
import axios from 'axios';

interface Role {
  id: number;
  name: string;
  permissions: string;
}

const parsePermissions = (permissions: string): string[] => {
  if (!permissions || permissions === '{}') return [];
  return permissions.replace(/[{}]/g, '').split(',').map((perm) => perm.trim());
};

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/role/');
      setRoles(response.data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || 'Failed to fetch roles.');
      setSnackbarOpen(true);
    }
  };

  const handleEditClick = (role: Role) => {
    setEditRole(role); 
    setRoleName(role.name); 
    setPermissions(parsePermissions(role.permissions));
    setOpenDialog(true); 
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };

  const handlePermissionChange = (permission: string) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSaveChanges = async () => {
    if (editRole) {
      try {

        const response = await axios.put(`http://127.0.0.1:8000/role/${editRole.id}`, {
          name: roleName, 
          permissions, 
        });

        setRoles((prevRoles) =>
          prevRoles.map((role) => (role.id === editRole.id ? { ...role, name: roleName, permissions: permissions.join(', ') } : role))
        );
        setOpenDialog(false); 
      } catch (error: any) {
        setErrorMessage(error.response?.data?.detail || 'Failed to update role.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/role/${id}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || 'Failed to delete role.');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        margin: '20px auto',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {/* Remove the ID column header */}
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <TableRow key={role.id}>
                {/* Remove the ID column data */}
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {parsePermissions(role.permissions).join(', ') || 'No Permissions'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditClick(role)} 
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleDeleteClick(role.id)} 
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No roles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
            {roleName} 
          </Typography>
          <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleTable;
