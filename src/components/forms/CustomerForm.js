import React, { useState, useCallback } from 'react';
import { Box, Container, Typography } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import OrderSubmitButton from '../buttons/OrderSubmitButton';
import CartSummary from '../CartSummary';
import StripeCheckoutModal from '../modals/stripeModal/StripeCheckoutModal';
import FormTextField from './FormTextField';
import { useCartStore } from '../../context/CartContext/CartContext';

const CustomerForm = () => {
  const { getTotalCost, cartData } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onToken = useCallback(
    (token) => {
      console.log(token);
      handleModalClose();
    },
    [handleModalClose]
  );

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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '1rem',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormTextField label="First Name" />
                <FormTextField label="Last Name" />
                <FormTextField label="Street Address" />
                <FormTextField label="City" />
                <FormTextField label="State" />
                <FormTextField type="number" label="Zip" />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Shows summary or items and total */}
              <CartSummary
                quantity={cartData.quantity}
                getTotalCost={getTotalCost}
              />
              {/* Submit button opens Stripe Modal */}
              <OrderSubmitButton onClick={handleModalOpen} />
            </Box>
          </Box>
        </form>
      </Box>
      {/* Modal for displaying the Stripe checkout */}
      <StripeCheckoutModal
        open={isModalOpen}
        onClose={handleModalClose}
        purchases={cartData.cart}
        total={getTotalCost()}
        onToken={onToken}
      />
    </Container>
  );
};

export default CustomerForm;
