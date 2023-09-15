import React from 'react';
import { Typography } from '@mui/material';

const CartTotal = ({ total }) => (
  <Typography variant="h5" sx={{ color: '#333', marginTop: '1rem' }}>
    Total: ${total}
  </Typography>
);

export default CartTotal;
