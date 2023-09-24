import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  marginTop: '1rem',
  backgroundColor: '#1976d2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
});

const OrderSubmitButton = ({ onClick }) => {
  return (
    <StyledButton variant="contained" onClick={onClick}>
      Checkout
    </StyledButton>
  );
};

export default OrderSubmitButton;
