import React from 'react';
import Button from '@mui/material/Button';

const SimpleReusableButton = ({ variant, onClick, color, children }) => {
  return (
    <Button variant={variant} onClick={onClick} color={color}>
      {children}
    </Button>
  );
};

export default SimpleReusableButton;
