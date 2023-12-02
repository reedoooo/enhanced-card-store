import React from 'react';
import { Box, Grid } from '@mui/material';
import FormTextField from './FormTextField';

const CustomerInfoFields = () => {
  return (
    <Grid>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <FormTextField label="First Name" />
        <FormTextField label="Last Name" />
        <FormTextField label="Street Address" />
        <FormTextField label="City" />
        <FormTextField label="State" />
        <FormTextField type="number" label="Zip" />
      </Box>
    </Grid>
  );
};

export default CustomerInfoFields;
