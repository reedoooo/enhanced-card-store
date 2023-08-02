import React from 'react';
import { Modal, Backdrop, Fade, Box, Typography } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutModal = ({ open, onClose, onToken, purchases, total }) => {
  console.log(purchases);
  console.log(total);
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
          <StripeCheckout
            token={onToken}
            stripeKey={process.env.STRIPE_SECRET_KEY}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default StripeCheckoutModal;
