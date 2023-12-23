import React, { useCallback, useContext } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useCartStore } from '../../../context/CartContext/CartContext';
import CustomerInfoFields from './CustomerInfoFields';
import StripeCheckoutModal from '../../dialogs/stripeModal/StripeCheckoutModal';
import { ModalContext } from '../../../context/ModalContext/ModalContext';
import CartSummary from '../../other/dataDisplay/CartSummary';
import OrderSubmitButton from '../../buttons/other/OrderSubmitButton';

const CustomerForm = () => {
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const { cartData, cartCardQuantity, totalCost } = useCartStore();

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
                <OrderSubmitButton onClick={handleModalToggle} />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
      <StripeCheckoutModal
        open={isModalOpen}
        onClose={handleModalToggle}
        purchases={cartData.cart}
        total={totalCost}
      />
    </Container>
  );
};

export default CustomerForm;
