import React, { useEffect } from 'react';
import { Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import CartContent from '../layout/cart/CartContent';
import { useMode } from '../context';
import Checkout from '../layout/cart/cartPageContainers/Checkout';
import PageLayout from '../layout/REUSABLE_COMPONENTS/PageLayout';
import { useLoading } from '../context/hooks/useLoading';
import CartSummary from '../layout/cart/CartSummary';
import { useCartManager } from '../context/MAIN_CONTEXT/CartContext/useCartManager';
import LoadingOverlay from '../layout/REUSABLE_COMPONENTS/LoadingOverlay';
const CartPage = () => {
  const { theme } = useMode();
  const {
    cart,
    addCardsToCart,
    removeCardsFromCart,
    fetchUserCart,
    cartCardQuantity,
    totalCost,
  } = useCartManager();
  const { startLoading, stopLoading, setError, isPageLoading } = useLoading();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetchUserCart(); // Assuming fetchUserCart updates cartData
  //     } catch (error) {
  //       console.error('Error fetching cart data:', error);
  //       setError(error.message || 'Failed to fetch cart data');
  //     }
  //   };
  //   if (!cart) {
  //     fetchData();
  //   }
  // }, [fetchUserCart]);
  // Modify this function based on how your cart store manages items
  // const handleModifyItemInCart = async (cardId, operation) => {
  //   // convert card to be that card but in an array
  //   const card = [cardId];
  //   try {
  //     operation === 'add'
  //       ? addCardsToCart(card, cart)
  //       : removeCardsFromCart(card);
  //   } catch (e) {
  //     console.error('Failed to adjust quantity in cart:', e);
  //   }
  // };
  // Function to render the checkout and summary section

  return (
    <PageLayout>
      {isPageLoading && <LoadingOverlay />}
      <Box
        sx={{
          overflow: 'auto',
          p: theme.spacing(3),
          m: 'auto',
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.greenAccent.contrastText,
        }}
      >
        <Card
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.greenAccent.contrastText,
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.greenAccent.contrastText,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CartContent />
              </Grid>{' '}
              <Grid item xs={12} lg={6}>
                <Checkout />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 'auto',
                    width: '100%',
                    height: '20%',
                    justifyContent: 'left',
                  }}
                >
                  <CartSummary
                    quantity={cartCardQuantity}
                    totalCost={totalCost}
                  />
                </Box>
              </Grid>{' '}
            </Grid>
          </CardContent>
        </Card>{' '}
      </Box>
    </PageLayout>
  );
};
export default CartPage;
