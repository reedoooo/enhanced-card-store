import React from 'react';
import { Box } from '@mui/material';
import CartSummary from '../../other/CartSummary';
import OrderSubmitButton from '../../buttons/other/OrderSubmitButton';

const CartActions = ({ quantity, getTotalCost, handleModalOpen }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CartSummary quantity={quantity} getTotalCost={getTotalCost} />
      <OrderSubmitButton onClick={handleModalOpen} />
    </Box>
  );
};

export default CartActions;
