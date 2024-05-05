import React, { useEffect } from 'react';
import {
  AppBar,
  Card,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import CartContent from 'layout/cart';

import { MDBox, PageLayout } from 'layout/REUSABLE_COMPONENTS';
import Checkout from 'layout/cart/cartPageContainers/Checkout';

import { useMode, useManager } from 'context';

const CartPage = () => {
  const { theme } = useMode();
  const [activeStep, setActiveStep] = React.useState(0);
  const { cart, fetchCart, hasFetchedCart } = useManager();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCart(); // Assuming fetchUserCart updates cartData
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    if (!hasFetchedCart || !cart) {
      fetchData();
    }
  }, []);
  return (
    <PageLayout>
      <MDBox sx={{ width: '100%', height: '100%' }}>
        <Card
          sx={{
            width: '100%',
            height: '100%',
            boxShadow: 1,
            borderRadius: 2,
            bgcolor: theme.palette.background.default,
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
          theme={theme}
        >
          <CssBaseline />
          {/* CART PAGE HEADER */}
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: 'relative',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
              mt: theme.spacing(1),
            }}
            theme={theme}
          >
            <Toolbar theme={theme}>
              <MDBox
                sx={{
                  p: 2,
                  boxShadow: 1,
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  width: '110%',
                }}
              >
                <List>
                  <ListItem>
                    <IconButton
                      // onClick={onBack}
                      aria-label="Coninue Shopping"
                      color="inherit"
                      sx={{
                        marginRight: '6px',
                        background: 'white',
                      }}
                    >
                      <ArrowBackRoundedIcon color={theme.colorPrimary} />
                    </IconButton>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <TableChartOutlinedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          Your Cart Total: ${cart?.totalPrice || 0}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption">Total Value</Typography>
                      }
                    />
                  </ListItem>
                </List>
              </MDBox>
            </Toolbar>
          </AppBar>
          {/* CART PAGE CONTENT */}
          <Grid
            container
            spacing={1}
            sx={{ mt: theme.spacing(0.5), ml: theme.spacing(0.5) }}
          >
            {/* SECTION 1: CART ITEMS DISPLAY */}
            <Grid item xs={12} md={4} lg={4}>
              <CartContent
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>
            {/* SECTION 2: CART CHECKOUT */}
            <Grid item xs={12} md={8} lg={8}>
              <Checkout activeStep={activeStep} setActiveStep={setActiveStep} />
            </Grid>
          </Grid>
        </Card>
      </MDBox>
    </PageLayout>
  );
};
export default CartPage;
