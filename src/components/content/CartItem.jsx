import React from 'react';
import { Box } from '@mui/material';
import GenericCard from '../cards/GenericCard';

const CartItem = ({ card, page }) => (
  <Box sx={{ marginBottom: '1rem', flexGrow: '1' }}>
    <GenericCard card={card} page={page} context={'Cart'} />
  </Box>
);

export default CartItem;
