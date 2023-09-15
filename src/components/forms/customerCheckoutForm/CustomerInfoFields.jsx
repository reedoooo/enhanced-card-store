import React from 'react';
import { Box } from '@mui/material';
import FormTextField from './FormTextField';

const CustomerInfoFields = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormTextField label="First Name" />
      <FormTextField label="Last Name" />
      <FormTextField label="Street Address" />
      <FormTextField label="City" />
      <FormTextField label="State" />
      <FormTextField type="number" label="Zip" />
    </Box>
  );
};

export default CustomerInfoFields;
