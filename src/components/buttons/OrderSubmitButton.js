import React from 'react';
import { Button } from '@mui/material';

const OrderSubmitButton = () => {
  return (
    <Button
      variant="contained"
      sx={{
        marginTop: '1rem',
        backgroundColor: '#1976d2',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      }}
      onClick={(event) => {
        event.preventDefault();
        alert('Thank you for your purchase!');
      }}
    >
      Submit Order
    </Button>
  );
};

export default OrderSubmitButton;
