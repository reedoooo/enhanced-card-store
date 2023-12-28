import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import CustomerForm from '../components/forms/customerCheckoutForm/CustomerForm';
import CartContent from '../layout/cart/CartContent';
import { useCartStore, useMode, usePageContext } from '../context';
import PageLayout from '../layout/PageLayout';
import Checkout from '../containers/cartPageContainers/Checkout';
import CartSummary from '../components/other/dataDisplay/CartSummary';

const CartPage = () => {
  const { theme } = useMode();
  const {
    cartData,
    addOneToCart,
    removeOneFromCart,
    fetchUserCart,
    getTotalCost,
    cartCardQuantity,
    totalCost,
  } = useCartStore();
  const { loadingStatus, returnDisplay, setLoading } = usePageContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading('isPageLoading', true);
      try {
        await fetchUserCart(); // Assuming fetchUserCart updates cartData
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
  }, [cartData, fetchUserCart, setLoading]);

  // Modify this function based on how your cart store manages items
  const handleModifyItemInCart = async (cardId, operation) => {
    try {
      operation === 'add' ? addOneToCart(cardId) : removeOneFromCart(cardId);
    } catch (e) {
      console.error('Failed to adjust quantity in cart:', e);
    }
  };

  const calculateTotalPrice = getTotalCost();
  return (
    <PageLayout>
      {loadingStatus?.isPageLoading && returnDisplay()}

      <Box
        sx={{
          overflow: 'auto',
          p: theme.spacing(3),
          m: 'auto',
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Card
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6} lg={6}>
                <CartContent
                  cartData={cartData}
                  calculateTotalPrice={calculateTotalPrice}
                  onQuantityChange={handleModifyItemInCart}
                />
              </Grid>
              <Grid item xs={6} lg={6}>
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
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </PageLayout>
  );
};

export default CartPage;
