// CartContainer.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import useCartStyles from '../../context/hooks/useCartStyles';

const CartContainer = ({ children }) => {
  const { cartContainerStyles, cartTitleStyles } = useCartStyles();

  return (
    <Box sx={cartContainerStyles}>
      <Typography variant="h4" sx={cartTitleStyles}>
        Your Cart
      </Typography>
      {children}
    </Box>
  );
};

export default CartContainer;
