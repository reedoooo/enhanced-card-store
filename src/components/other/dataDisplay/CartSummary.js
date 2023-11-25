import React from 'react';
import { Box, Typography } from '@mui/material';

const CartSummary = ({ quantity, totalCost }) => {
  console.log('CARTSUMMARY QUANTITY:', quantity);
  console.log('CARTSUMMARY GETTOTALCOST:', totalCost);
  return (
    <Box sx={{ alignSelf: 'center' }}>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h6">Items:</Typography>
        <Typography variant="h6">{`${quantity}`}</Typography>
      </Box>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h6">Grand Total:</Typography>
        <Typography variant="h6">${totalCost}</Typography>
      </Box>
    </Box>
  );
};

export default CartSummary;
