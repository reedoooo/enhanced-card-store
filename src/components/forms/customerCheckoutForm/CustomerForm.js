import React, { useState, useCallback, useContext } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useCartStore } from '../../../context/CartContext/CartContext';
import CustomerInfoFields from './CustomerInfoFields';
import CartActions from './CartActions';
import StripeCheckoutModal from '../../modals/stripeModal/StripeCheckoutModal';
import { ModalContext } from '../../../context/ModalContext/ModalContext';

const CustomerForm = () => {
  const { getTotalCost, cartData } = useCartStore();
  const {
    openModalWithCard,
    closeModal,
    isModalOpen,
    setModalOpen,
    modalContent,
  } = useContext(ModalContext);
  const { cartCardQuantity, totalCost } = useCartStore();

  const handleModalOpen = useCallback(() => setModalOpen(true), [setModalOpen]);
  const handleModalClose = useCallback(
    () => setModalOpen(false),
    [setModalOpen]
  );
  const onToken = useCallback(
    (token) => {
      console.log(token);
      handleModalClose();
    },
    [handleModalClose]
  );

  console.log('CUSTOMER FORM QUANTITY FROM CARTDATA', cartCardQuantity);

  return (
    <Container maxWidth={false}>
      <Box sx={{ width: '100%', padding: '2rem' }}>
        <Typography
          variant="h5"
          sx={{ marginBottom: '1.5rem', fontWeight: 'bold' }}
        >
          Customer Info
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <CustomerInfoFields />
            </Grid>
            <Grid item xs={12} md={4}>
              {/* This space can be used for additional components if needed */}
            </Grid>
            <Grid item xs={12}>
              <CartActions
                quantity={cartCardQuantity}
                totalCost={totalCost}
                handleModalOpen={handleModalOpen}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
      <StripeCheckoutModal
        open={isModalOpen}
        onClose={handleModalClose}
        purchases={cartData.cart}
        total={getTotalCost}
        onToken={onToken}
      />
    </Container>
  );
};

export default CustomerForm;
