import React from 'react';
import { Typography } from '@mui/material';
import { useCartStore } from '../../context/CartContext/CartContext';
import CartContainer from './CartContainer';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const CartContent = () => {
  const { cartData, getTotalCost } = useCartStore();
  const page = 'cart';

  return (
    <CartContainer>
      {cartData.cart && cartData.cart.length > 0 ? (
        cartData.cart.map((card, index) =>
          card ? (
            <CartItem key={card.id + index} card={card} page={page} />
          ) : null
        )
      ) : (
        <Typography variant="h6" sx={{ color: '#666' }}>
          Your cart is empty.
        </Typography>
      )}
      {cartData.cart && cartData.cart.length > 0 && (
        <CartTotal total={getTotalCost()} />
      )}
    </CartContainer>
  );
};

export default CartContent;
