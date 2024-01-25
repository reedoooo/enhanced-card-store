import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import CartContent from '../layout/cart/CartContent';
import { useCartStore, useMode, usePageContext } from '../context';
import Checkout from '../containers/cartPageContainers/Checkout';
import CartSummary from '../components/other/dataDisplay/CartSummary';

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
  const { loadingStatus, returnDisplay, setLoading } = usePageContext();
  const calculateTotalPrice = getTotalCost();

  // useEffect hook to fetch cart data for user
  useEffect(() => {
    const fetchData = async () => {
      setLoading('isPageLoading', true);
      try {
        await fetchCartForUser(); // Assuming fetchUserCart updates cartData
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading('isPageLoading', false);
      }
    };

    // Fetch cart data if not already loaded
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
  // Function to render the cart content grid
  const renderCartContent = () => (
    <Grid item xs={12} lg={6}>
      <CartContent
        cartData={cartData}
        calculateTotalPrice={calculateTotalPrice}
        onQuantityChange={handleModifyItemInCart}
      />
    </Grid>
  );
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
          {renderCartContent()}
          {renderCheckoutAndSummary()}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <React.Fragment>
      {/* <PageLayout> */}
      {loadingStatus?.isPageLoading && returnDisplay()}
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
    </React.Fragment>
  );
};
export default CartPage;
