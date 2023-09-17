import React from 'react';
import { Box, Typography } from '@mui/material';

const CartContainer = ({ children }) => (
  <Box
    sx={{
      width: '100%',
      flexGrow: '1',
      backgroundColor: '#f8f8f8',
      borderRadius: '5px',
      padding: '1rem',
    }}
  >
    <Typography
      variant="h4"
      sx={{ fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}
    >
      Your Cart
    </Typography>
    {children}
  </Box>
);

export default CartContainer;
