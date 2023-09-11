import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from '../cleanUp/ProductCard';
import { useCartStore } from '../../context/CartContext/CartContext';
import GenericCard from '../cards/GenericCard';

const CartContent = () => {
  const { cartData, getTotalCost } = useCartStore();

  const page = 'cart';

  return (
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
      {cartData.cart && cartData.cart.length > 0 ? (
        cartData.cart.map((card, index) =>
          card ? (
            <Box
              key={card.id + index}
              sx={{ marginBottom: '1rem', flexGrow: '1' }}
            >
              <GenericCard card={card} page={page} />
            </Box>
          ) : null
        )
      ) : (
        <Typography variant="h6" sx={{ color: '#666' }}>
          Your cart is empty.
        </Typography>
      )}
      {cartData.cart && cartData.cart.length > 0 && (
        <Typography variant="h5" sx={{ color: '#333', marginTop: '1rem' }}>
          Total: ${getTotalCost()}
        </Typography>
      )}
    </Box>
  );
};

export default CartContent;
