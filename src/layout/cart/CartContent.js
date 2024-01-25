import React from 'react';
import { Typography, Skeleton, Box, Grid, Container } from '@mui/material';
import CartContainer from './CartContainer';
import CartItem from '../../components/grids/gridItems/CartItem';
import CartTotal from '../../components/other/dataDisplay/CartTotal';
import { useCartStore } from '../../context/CartContext/CartContext';
import Checkout from '../../containers/cartPageContainers/Checkout';
import { useMode } from '../../context';

const CartContent = () => {
  const { theme } = useMode();
  const { getProductGridContainerStyle } = theme.responsiveStyles;
  // const containerStyles = responsiveStyles.getProductGridContainerStyle;
  const { cartData, isLoading } = useCartStore();

  const renderCartItems = () => {
    if (isLoading) {
      return <SkeletonCartItem />;
    }

    return (
      <Container
        sx={{
          ...theme.responsiveStyles.getProductGridContainerStyle,
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Grid container spacing={3}>
          {cartData?.cart?.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CartItem
                key={card.id + index}
                index={index}
                card={card}
                context={'Cart'}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };

  if (!isLoading && (!cartData?.cart || cartData.cart.length === 0)) {
    return (
      <CartContainer>
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      </CartContainer>
    );
  }

  return <CartContainer>{renderCartItems()}</CartContainer>;
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
