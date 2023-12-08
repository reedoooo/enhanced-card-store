import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import CustomerForm from '../components/forms/customerCheckoutForm/CustomerForm';
import CartContent from '../containers/cartPageContainers/CartContent';
import { useCartStore, usePageContext } from '../context';

const CartPage = () => {
  const [cookies] = useCookies(['user']);
  const theme = useTheme();
  const { user } = cookies;
  const userId = user?.id;

  const {
    cartData,
    addOneToCart,
    removeOneFromCart,
    fetchUserCart,
    getTotalCost,
  } = useCartStore();

  const {
    isPageLoading,
    setIsPageLoading,
    pageError,
    setPageError,
    logPageData,
  } = usePageContext();

  useEffect(() => {
    if (!userId) return;

    const initializeCart = () => {
      setIsPageLoading(true);
      try {
        if (!cartData || Object.keys(cartData).length === 0) {
          fetchUserCart();
        }
        logPageData('CartPage', cartData);
      } catch (e) {
        setPageError(e);
      } finally {
        setIsPageLoading(false);
      }
    };

    initializeCart();
  }, [cartData?.cart]);

  const handleModifyItemInCart = async (cardId, operation) => {
    try {
      operation === 'add' ? addOneToCart(cardId) : removeOneFromCart(cardId);
    } catch (e) {
      console.error('Failed to adjust quantity in cart:', e);
      setPageError(e);
    }
  };

  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;

  const hasItems = cartData?.cart?.length > 0;
  const calculateTotalPrice = getTotalCost();
  return (
    <Box sx={{ overflow: 'auto', p: theme.spacing(3), m: 'auto' }}>
      <Card
        sx={{ width: '100%', backgroundColor: theme.palette.background.paper }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <CartContent
                cartData={cartData}
                calculateTotalPrice={calculateTotalPrice}
                onQuantityChange={handleModifyItemInCart}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <CustomerForm />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CartPage;
