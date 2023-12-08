import React from 'react';
import { Typography } from '@mui/material';
import CartContainer from './CartContainer';
import CartItem from '../../components/grids/CartItem';
import CartTotal from '../../components/other/dataDisplay/CartTotal';
import { useCartStore } from '../../context/CartContext/CartContext';

const CartContent = () => {
  const { cartData, getTotalCost } = useCartStore();

  return (
    <CartContainer>
      {cartData?.cart?.length > 0 ? (
        cartData.cart.map((card, index) => (
          <CartItem
            key={card.id + index}
            index={index}
            card={card}
            context={'Cart'}
          />
        ))
      ) : (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      )}
      {cartData?.cart?.length > 0 && <CartTotal total={getTotalCost()} />}
    </CartContainer>
  );
};

export default CartContent;
