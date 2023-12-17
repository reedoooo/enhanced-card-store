import React from 'react';
import { Typography, Skeleton, Box } from '@mui/material';
import CartContainer from './CartContainer';
import CartItem from '../../components/grids/CartItem';
import CartTotal from '../../components/other/dataDisplay/CartTotal';
import { useCartStore } from '../../context/CartContext/CartContext';

const CartContent = () => {
  const { cartData, getTotalCost, isLoading } = useCartStore();

  return (
    <CartContainer>
      {isLoading ? (
        <SkeletonCartItem />
      ) : cartData?.cart?.length > 0 ? (
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

const SkeletonCartItem = () => (
  <Box sx={{ marginBottom: '1rem', flexGrow: '1' }}>
    <Skeleton variant="rectangular" width="100%" height={118} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
  </Box>
);
