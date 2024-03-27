import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import CartContent from '../layout/cart/CartContent';
import { useCartStore, useMode } from '../context';
import Checkout from '../layout/cart/cartPageContainers/Checkout';
import PageLayout from '../layout/REUSABLE_COMPONENTS/PageLayout';
import { useLoading } from '../context/hooks/useLoading';
import CartSummary from '../layout/cart/CartSummary';
const CartPage = () => {
  const { theme } = useMode();
  const {
    cartData,
    addOneToCart,
    removeOneFromCart,
    fetchCartForUser,
    getTotalCost,
    cartCardQuantity,
    totalCost,
  } = useCartStore();
  const { startLoading, stopLoading, setError, isPageLoading } = useLoading();
  const calculateTotalPrice = getTotalCost();

  useEffect(() => {
    const fetchData = async () => {
      startLoading('isPageLoading');
      try {
        await fetchCartForUser(); // Assuming fetchUserCart updates cartData
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setError(error.message || 'Failed to fetch cart data');
      } finally {
        stopLoading('isPageLoading');
      }
    };
    if (!cartData) {
      fetchData();
    }
  }, [cartData, fetchCartForUser]);
  // Modify this function based on how your cart store manages items
  const handleModifyItemInCart = async (cardId, operation) => {
    try {
      operation === 'add' ? addOneToCart(cardId) : removeOneFromCart(cardId);
    } catch (e) {
      console.error('Failed to adjust quantity in cart:', e);
    }
  };
  // Function to render the checkout and summary section
  const renderCheckoutAndSummary = () => (
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
        <CartSummary quantity={cartCardQuantity} totalCost={totalCost} />
      </Box>
    </Grid>
  );
  // Function to render the overall cart layout
  const renderCartLayout = () => (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.backgroundA.lightest,
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.backgroundA.lightest,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <CartContent
              cartData={cartData}
              calculateTotalPrice={calculateTotalPrice}
              onQuantityChange={handleModifyItemInCart}
            />
          </Grid>{' '}
          {renderCheckoutAndSummary()}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      {/* <React.Fragment> */}
      {/* <PageLayout> */}
      {isPageLoading && <div>Loading...</div>}
      {/* {loadingStatus?.isLoading && returnDisplay()} */}
      <Box
        sx={{
          overflow: 'auto',
          p: theme.spacing(3),
          m: 'auto',
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.backgroundA.lightest,
        }}
      >
        {renderCartLayout()}
      </Box>
      {/* </PageLayout> */}
      {/* </React.Fragment> */}
    </PageLayout>
  );
};
export default CartPage;
