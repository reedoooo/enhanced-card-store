import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const CartContainer = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: '90vh',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        borderRadius: '5px',
        padding: '1rem',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: '1rem',
          color: theme.palette.text.primary,
        }}
      >
        Your Cart
      </Typography>
      {children}
    </Box>
  );
};

export default CartContainer;
