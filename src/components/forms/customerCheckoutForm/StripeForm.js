import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './StripeForm.css';

const StripeForm = ({ total, onToken }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
      setLoading(false);
    } else {
      const { id } = paymentMethod;
      onToken(id);
      const amountInCents = Math.round(total * 100);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/stripe/checkout`,
          { id, amount: amountInCents }
        );

        setLoading(false);

        if (response.data.success) {
          setPaymentSuccess('Payment Successful!');
          setPaymentError(null);
        } else {
          setPaymentError('Payment failed: ' + response.data.message);
          setPaymentSuccess(null);
        }
      } catch (err) {
        setLoading(false);
        setPaymentError('Error processing payment: ' + err.message);
        setPaymentSuccess(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <CardElement className="card-element" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="pay-button"
      >
        {loading ? 'Processing...' : `Pay $${total}`}
      </button>
      {paymentError && <p className="error-message">{paymentError}</p>}
      {paymentSuccess && <p className="success-message">{paymentSuccess}</p>}
    </form>
  );
};

export default StripeForm;
