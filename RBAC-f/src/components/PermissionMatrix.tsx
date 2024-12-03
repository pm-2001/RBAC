import React from 'react';
import { Grid, Checkbox, Typography } from '@mui/material';

interface PermissionMatrixProps {
  permissions: string[];
  rolePermissions: string[];
  onPermissionChange: (permission: string, checked: boolean) => void;
}

const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ permissions, rolePermissions, onPermissionChange }) => {
  return (
    <Grid container spacing={2}>
      {permissions.map((permission) => (
        <Grid item key={permission}>
          <Typography>{permission}</Typography>
          <Checkbox
            checked={rolePermissions.includes(permission)}
            onChange={(e) => onPermissionChange(permission, e.target.checked)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PermissionMatrix;
