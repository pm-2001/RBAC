import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const RoleForm: React.FC = () => {
  const [roleName, setRoleName] = useState('');

  const handleSubmit = () => {
    console.log({ roleName });
    // Add API call logic here
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextField label="Role Name" value={roleName} onChange={(e) => setRoleName(e.target.value)} fullWidth />
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
};

export default RoleForm;
