import React from 'react';
import { Box } from '@mui/system';
import LoadingIndicator from '../../components/reusable/indicators/LoadingIndicator';
import CartContent from './CartContent';

const CartContentContainer = ({
  cartData,
  calculateTotalPrice,
  onQuantityChange,
}) => {
  return (
    <Box sx={{ flex: 1, marginRight: '2rem', flexGrow: '1' }}>
      {cartData.length > 0 ? (
        <CartContent
        // cartData={cartData}
        // calculateTotalPrice={calculateTotalPrice}
        // onQuantityChange={onQuantityChange}
        />
      ) : (
        <LoadingIndicator />
      )}
    </Box>
  );
};

export default CartContentContainer;
