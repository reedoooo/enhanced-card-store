import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Box,
  Card as CardElement,
  CardContent,
  Container,
} from '@mui/material';
import { useCartStore } from '../context/CartContext/CartContext';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import CartContentContainer from '../components/CartContentContainer';
import CustomerFormContainer from '../components/CustomerFormContainer';

const CartPage = () => {
  const [cookies] = useCookies(['userCookie']);
  const user = cookies.userCookie;
  const userId = user?.id;

  const {
    cartData,
    addOneToCart,
    removeOneFromCart,
    getTotalCost,
    loading,
    error,
  } = useCartStore();

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(!(userId && cartData.cart && cartData.cart.length > 0));
  }, [cartData, userId]);

  if (pageLoading || loading) {
    return <LoadingIndicator />;
  }

  const calculateTotalPrice = getTotalCost();

  const handleModifyItemInCart = async (cardId, operation) => {
    try {
      if (operation === 'add') {
        addOneToCart(cardId);
      } else if (operation === 'remove') {
        removeOneFromCart(cardId);
      }
    } catch (error) {
      console.error('Failed to adjust quantity in cart: ', error);
    }
  };

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1',
        }}
      >
        <CardElement sx={{ width: '90%', padding: '1rem' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexGrow: '1',
              }}
            >
              <CartContentContainer
                cartData={cartData.cart}
                calculateTotalPrice={calculateTotalPrice}
                onQuantityChange={handleModifyItemInCart}
              />
              <CustomerFormContainer
                calculateTotalPrice={calculateTotalPrice}
              />
            </Box>
          </CardContent>
        </CardElement>
      </Box>
    </Container>
  );
};

export default CartPage;
