import React from 'react';
import { Box } from '@mui/material';
import CartSummary from '../../other/dataDisplay/CartSummary';
import OrderSubmitButton from '../../buttons/other/OrderSubmitButton';

const CartActions = ({ quantity, totalCost, handleModalOpen }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CartSummary quantity={quantity} totalCost={totalCost} />
      <OrderSubmitButton onClick={handleModalOpen} />
    </Box>
  );
};

export default CartActions;
