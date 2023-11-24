import React from 'react';
import { Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from '../../forms/customerCheckoutForm/StripeForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutModal = ({ open, onClose, onToken, purchases, total }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        open={open}
        onClose={onClose}
        timeout={500}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} // Ensures the backdrop is above other elements but below the modal
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute', // Needed for proper positioning within the backdrop
              zIndex: 2000, // Ensure this is above the backdrop
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
              maxHeight: '80vh',
              overflow: 'auto',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Your Purchases
            </Typography>
            {purchases.map((purchase, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography>{purchase.name}</Typography>
                <Typography>
                  ${purchase.card_prices[0].tcgplayer_price}
                </Typography>
              </Box>
            ))}
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">${total}</Typography>
            </Box>
            <Elements stripe={stripePromise}>
              <StripeForm total={total} onToken={onToken} />
            </Elements>
          </Box>
        </Fade>
      </Backdrop>
    </Modal>
  );
};

export default StripeCheckoutModal;
