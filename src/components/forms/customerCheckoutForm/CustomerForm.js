import React, { useState, useCallback } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useCartStore } from '../../../context/CartContext/CartContext';
import CustomerInfoFields from './CustomerInfoFields';
import CartActions from './CartActions';
import StripeCheckoutModal from '../../modals/stripeModal/StripeCheckoutModal';

const CustomerForm = () => {
  const { getTotalCost, cartData } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  const onToken = useCallback(
    (token) => {
      console.log(token);
      handleModalClose();
    },
    [handleModalClose]
  );

  console.log('CUSTOMER FORM QUANTITY FROM CARTDATA', cartData.quantity);
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CustomerInfoFields />
            <CartActions
              quantity={cartData.quantity}
              getTotalCost={getTotalCost}
              handleModalOpen={handleModalOpen}
            />
          </Box>
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
