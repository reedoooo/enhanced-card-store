import React from 'react';
import { Button } from '@mui/material';
import { useMode } from '../../../context';

const OrderSubmitButton = ({ onClick }) => {
  const { theme } = useMode();
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        mt: 1,
        mb: 1,
        border: `1px solid ${theme.palette.success.darker}`,
        backgroundColor: theme.palette.success.main,
        '&:hover': { backgroundColor: theme.palette.success.darker },
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      Checkout
    </Button>
  );
};

export default OrderSubmitButton;
