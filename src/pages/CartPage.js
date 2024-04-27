import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import CartContent from '../layout/cart/CartContent';
import { useMode, useUserContext } from '../context';
import Checkout from '../layout/cart/cartPageContainers/Checkout';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';
import useManager from '../context/useManager';

const CartPage = () => {
  const { theme } = useMode();
  const [activeStep, setActiveStep] = React.useState(0);
  const { user } = useUserContext();
  return (
    <PageLayout>
      <MDBox sx={{ width: '100%', height: '100%' }}>
        <Card
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: 'relative',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Toolbar theme={theme}>
              <Typography variant="h6" color="inherit" noWrap>
                {`${user && user?.username}'s Shopping Cart`}
              </Typography>
            </Toolbar>
          </AppBar>
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
