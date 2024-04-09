import React, { useCallback, useContext } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import CustomerInfoFields from './CustomerInfoFields';
import StripeCheckoutModal from '../../dialogs/stripeModal/StripeCheckoutModal';
import { ModalContext } from '../../../context/ModalContext/ModalContext';
import CartSummary from '../../other/dataDisplay/CartSummary';
import { useMode } from '../../../context';
import { useCartManager } from '../../../context/MAIN_CONTEXT/CartContext/useCartManager';

const CustomerForm = () => {
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const { cart, cartCardQuantity, totalCost } = useCartManager();
  const { theme } = useMode();

  const handleModalToggle = useCallback(
    () => setModalOpen((prev) => !prev),
    [setModalOpen]
  );

  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: { xs: '.5rem', lg: '1rem' }, // Reduce padding at xs breakpoint
          margin: 'auto',
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: '1.5rem', fontWeight: 'bold' }}
        >
          Customer Info
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <CustomerInfoFields />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: 'auto',
                  width: '100%',
                  justifyContent: 'left',
                }}
              >
                <CartSummary
                  quantity={cartCardQuantity}
                  totalCost={totalCost}
                />
                <Button
                  variant="contained"
                  onClick={handleModalToggle}
                  sx={{
                    mt: 1,
                    mb: 1,
                    border: `1px solid ${theme.palette.greenAccent.default}`,
                    backgroundColor: theme.palette.greenAccent.lightest,
                    '&:hover': {
                      backgroundColor: theme.palette.greenAccent.default,
                    },
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Checkout
                </Button>{' '}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
      <StripeCheckoutModal
        open={isModalOpen}
        onClose={handleModalToggle}
        purchases={cart?.items}
        total={totalCost}
      />
    </Container>
  );
};

export default CustomerForm;
