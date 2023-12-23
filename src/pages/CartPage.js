import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import CustomerForm from '../components/forms/customerCheckoutForm/CustomerForm';
import CartContent from '../layout/CartContent';
import { useCartStore, useMode, usePageContext } from '../context';
import PageLayout from '../layout/PageLayout';
import Checkout from '../containers/cartPageContainers/Checkout';
import CartSummary from '../components/other/dataDisplay/CartSummary';

const CartPage = () => {
  const [cookies] = useCookies(['user']);
  const { theme } = useMode();
  const { user } = cookies;
  const userId = user?.id;

  const {
    cartData,
    addOneToCart,
    removeOneFromCart,
    fetchUserCart,
    getTotalCost,
    cartCardQuantity,
    totalCost,
  } = useCartStore();

  const {
    isPageLoading,
    setIsPageLoading,
    pageError,
    setPageError,
    logPageData,
  } = usePageContext();

  // useEffect(() => {
  //   if (!userId) return;

  //   const initializeCart = () => {
  //     setIsPageLoading(true);
  //     try {
  //       if (!cartData || Object.keys(cartData).length === 0) {
  //         fetchUserCart();
  //       }
  //       logPageData('CartPage', cartData);
  //     } catch (e) {
  //       setPageError(e);
  //     } finally {
  //       setIsPageLoading(false);
  //     }
  //   };

  //   initializeCart();
  // }, [cartData?.cart]);

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

  const calculateTotalPrice = getTotalCost();
  return (
    <PageLayout>
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
            f
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
                {/* <CustomerForm /> */}
                <Checkout /> {/* Include Checkout component */}
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
                  {/* <OrderSubmitButton onClick={handleModalToggle} /> */}
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
