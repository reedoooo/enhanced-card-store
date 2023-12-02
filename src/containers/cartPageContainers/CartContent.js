import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { useCartStore } from '../../context/CartContext/CartContext';
import CartContainer from './CartContainer';
import CartItem from '../../components/grids/CartItem';
import CartTotal from '../../components/other/dataDisplay/CartTotal';
import { useMode } from '../../context';

const CartContent = () => {
  const { theme } = useMode();
  const { cartData, getTotalCost } = useCartStore();

  return (
    <CartContainer>
      {cartData?.cart && cartData?.cart.length > 0 ? (
        cartData.cart.map(
          (card, index) =>
            card && (
              <CartItem
                key={card.id + index}
                index={index}
                card={card}
                context={'Cart'}
              />
            )
        )
      ) : (
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
          Your cart is empty.
        </Typography>
      )}
      {cartData?.cart && cartData?.cart.length > 0 && (
        <CartTotal total={getTotalCost()} />
      )}
    </CartContainer>
  );
};

export default CartContent;
