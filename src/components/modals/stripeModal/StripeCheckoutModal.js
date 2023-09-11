import React from 'react';
import { Modal, Backdrop, Fade, Box, Typography } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from '../../forms/StripeForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
console.log('Stripe key: ', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutModal = ({ open, onClose, onToken, purchases, total }) => {
  // Rest of your component code...
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            zIndex: 2000, // add this line
            width: 400,
            backgroundColor: '#fff',
            boxShadow: 24,
            borderRadius: '8px',
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
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
            }}
          >
            <Typography variant="subtitle1">Total:</Typography>
            <Typography variant="subtitle1">${total}</Typography>
          </Box>
          <Elements stripe={stripePromise}>
            <StripeForm total={total} onToken={onToken} />
          </Elements>
        </Box>
      </Fade>
    </Modal>
  );
};

export default StripeCheckoutModal;
