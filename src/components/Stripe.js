// src/components/Stripe.js
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = () => {
  const onToken = (token) => {
    console.log(token);
  };

  return (
    <StripeCheckout
      token={onToken}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    />
  );
};

export default Stripe;
