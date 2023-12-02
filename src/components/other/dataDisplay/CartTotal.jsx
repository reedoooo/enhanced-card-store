import React from 'react';
import { Typography } from '@mui/material';

const CartTotal = ({ total }) => (
  // <Typography variant="h5" sx={{ color: '#333', marginTop: '1rem' }}>
  //   Total: ${total}
  // </Typography>
  // console.log(total),
  <Typography variant="h6">
    {`Total: $${total}`} {/* Ensure this is a string or number */}
  </Typography>
);

export default CartTotal;
