import React from 'react';
import { Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from '../../forms/customerCheckoutForm/StripeForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutModal = ({ open, onClose, onToken, purchases, total }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
