import React, { useContext, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CartContext } from '../../context/CartContext/CartContext';
import OrderSubmitButton from '../buttons/OrderSubmitButton';
import CartSummary from '../CartSummary';
import StripeCheckoutModal from '../modals/StripeCheckoutModal';
import FormTextField from './FormTextField';

const CustomerForm = () => {
  const { getTotalCost, cartData } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onToken = (token) => {
    console.log(token);
    handleModalClose(); // Close the modal after successful token creation
  };

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
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormTextField type="number" label="Card Number" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ margin: '0.8rem 0' }}
                    label="Expiration Date"
                  />
                </LocalizationProvider>
                <FormTextField type="number" label="CVV" />
              </Box>
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
