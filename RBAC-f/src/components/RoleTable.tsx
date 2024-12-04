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
} from '@mui/material';
import axios from 'axios';

// Interface for Role
interface Role {
  id: number;
  name: string;
  permissions: string;
}

// Function to parse the permissions string into an array
const parsePermissions = (permissions: string): string[] => {
  if (!permissions || permissions === '{}') return [];
  return permissions.replace(/[{}]/g, '').split(',').map((perm) => perm.trim());
};

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  // For editing role
  const [openDialog, setOpenDialog] = useState(false);
  const [editRole, setEditRole] = useState<Role | null>(null);

  // Permissions as a state
  const [permissions, setPermissions] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
  });

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/role/');
      setRoles(response.data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || 'Failed to fetch roles.');
      setSnackbarOpen(true);
    }
  };

  // Edit role handler
  const handleEditClick = (role: Role) => {
    console.log(role)
    setEditRole(role); // Set the role to edit
    const rolePermissions = parsePermissions(role.permissions);
    setPermissions({
      create: rolePermissions.includes('create'),
      read: rolePermissions.includes('read'),
      update: rolePermissions.includes('update'),
      delete: rolePermissions.includes('delete'),
    });
    setOpenDialog(true); // Open the edit dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleSaveChanges = async () => {
    if (editRole) {
      // Generate the permissions string in the expected format (e.g., '{create, read, update}')
      const selectedPermissions = Object.keys(permissions)
        .filter((perm) => permissions[perm as keyof typeof permissions])
        .join(', '); // Join them as a comma-separated string
  
      try {
        console.log(permissions)
        const response = await axios.put(`http://127.0.0.1:8000/role/${editRole.id}`, {
          name: editRole.name, // Keep role name fixed
          permissions: `{${selectedPermissions}}`, // Format permissions as a string like '{create, read, update}'
        });
        setRoles(roles.map((role) => (role.id === editRole.id ? response.data : role)));
        setOpenDialog(false); // Close the dialog after saving
      } catch (error: any) {
        setErrorMessage(error.response?.data?.detail || 'Failed to update role.');
        setSnackbarOpen(true);
      }
    }
  };

  // Delete role handler
  const handleDeleteClick = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/role/${id}`);
      setRoles(roles.filter((role) => role.id !== id)); 
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || 'Failed to delete role.');
      setSnackbarOpen(true);
    }
  };

  // Fetch roles when the component is mounted
  useEffect(() => {
    fetchRoles();
  }, []);

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Handle checkbox changes
  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPermissions((prev) => ({
      ...prev,
      [name]: checked,
    }));
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
            <TableCell>ID</TableCell>
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {/* Display permissions as a comma-separated list */}
                  {parsePermissions(role.permissions).join(', ') || 'No Permissions'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditClick(role)}  // Trigger edit on click
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleDeleteClick(role.id)} // Trigger delete on click
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No roles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Snackbar for error messages */}
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

      {/* Dialog to edit role */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          {editRole && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.create}
                    onChange={handlePermissionChange}
                    name="create"
                  />
                }
                label="Create"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.read}
                    onChange={handlePermissionChange}
                    name="read"
                  />
                }
                label="Read"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.update}
                    onChange={handlePermissionChange}
                    name="update"
                  />
                }
                label="Update"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.delete}
                    onChange={handlePermissionChange}
                    name="delete"
                  />
                }
                label="Delete"
              />
            </>
          )}
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
