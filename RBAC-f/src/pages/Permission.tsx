import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import PermissionMatrix from '../components/PermissionMatrix';
const PermissionsPage: React.FC = () => {
  const [rolePermissions, setRolePermissions] = useState<string[]>(['read', 'write']);
  const permissions = ['read', 'write', 'delete', 'execute'];
  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setRolePermissions([...rolePermissions, permission]);
    } else {
      setRolePermissions(rolePermissions.filter((perm) => perm !== permission));
    }
  };
  const handleSave = () => {
    console.log('Updated Permissions:', rolePermissions);
    // Add API call logic here
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Manage Permissions
      </Typography>
      <Box sx={{ mb: 4 }}>
        <PermissionMatrix
          permissions={permissions}
          rolePermissions={rolePermissions}
          onPermissionChange={handlePermissionChange}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Permissions
      </Button>
    </Container>
  );
};
export default PermissionsPage;