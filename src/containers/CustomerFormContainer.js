import React from 'react';
import { Box } from '@mui/system';
import CustomerForm from '../components/forms/customerCheckoutForm/CustomerForm';

const CustomerFormContainer = ({ calculateTotalPrice }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <CustomerForm calculateTotalPrice={calculateTotalPrice} />
    </Box>
  );
};

export default CustomerFormContainer;
