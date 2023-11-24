import React from 'react';
import { Box } from '@mui/system';
import CustomerForm from '../../components/forms/customerCheckoutForm/CustomerForm';

const CustomerFormContainer = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <CustomerForm />
    </Box>
  );
};

export default CustomerFormContainer;
