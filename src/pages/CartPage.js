import React, { useEffect } from 'react';
import { Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import CartContent from '../layout/cart/CartContent';
import { useMode } from '../context';
import Checkout from '../layout/cart/cartPageContainers/Checkout';
import PageLayout from '../layout/REUSABLE_COMPONENTS/PageLayout';
import { useCartManager } from '../context/MAIN_CONTEXT/CartContext/useCartManager';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';

const CartPage = () => {
  const { theme } = useMode();
  const { cart, fetchUserCart } = useCartManager();
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserCart(); // Assuming fetchUserCart updates cartData
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    if (!cart) {
      fetchData();
    }
  }, [fetchUserCart]);

  return (
    <PageLayout>
      <MDBox sx={{ width: '100%', height: '100%' }}>
        <Card
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <CartContent
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Checkout activeStep={activeStep} setActiveStep={setActiveStep} />
            </Grid>
          </Grid>
        </Card>
      </MDBox>
    </PageLayout>
  );
};
export default CartPage;
