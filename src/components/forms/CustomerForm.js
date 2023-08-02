import React, { useContext, useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CartContext } from '../../context/CartContext/CartContext';
import OrderSubmitButton from '../buttons/OrderSubmitButton';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';

function FormTextField({ id = 'outlined', label, type }) {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      fullWidth
      sx={{
        marginBottom: '0.8rem',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
          },
        },
      }}
    />
  );
}

const CartSummary = ({ quantity, getTotalCost }) => {
  return (
    <Box sx={{ alignSelf: 'center' }}>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h6">Items:</Typography>
        <Typography variant="h6">{`${quantity}`}</Typography>
      </Box>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h6">Grand Total:</Typography>
        <Typography variant="h6">${getTotalCost()}</Typography>
      </Box>
    </Box>
  );
};

const CustomerForm = () => {
  const { getTotalCost, cartData } = useContext(CartContext);
  // const stripe = useStripe();
  // const elements = useElements();
  const [error, setError] = useState(null);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardElement);

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card: cardElement,
  //   });

  //   if (error) {
  //     setError(error.message);
  //   } else {
  //     // TODO: send the paymentMethod.id to your server
  //     console.log('PaymentMethod:', paymentMethod.id);
  //   }
  // };

  // const Stripe = () => {
  const onToken = (token) => {
    console.log(token);
  };
  // };

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
                {/* <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                /> */}
                <StripeCheckout
                  token={onToken}
                  stripeKey={process.env.REACT_APP_STRIPE_KEY}
                />
              </Box>
              <FormTextField label="Street Address" />
              <FormTextField label="City" />
              <FormTextField label="State" />
              <FormTextField type="number" label="Zip" />
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
              <CartSummary
                quantity={cartData.quantity}
                getTotalCost={getTotalCost}
              />
              {/* <OrderSubmitButton onClick={handleSubmit} /> */}
              <OrderSubmitButton />
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CustomerForm;
