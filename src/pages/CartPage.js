import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Box,
  Card as CardElement,
  CardContent,
  Container,
} from '@mui/material';
import { useCartStore } from '../context/CartContext/CartContext';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import CartContentContainer from '../containers/cartPageContainers/CartContentContainer';
import CustomerFormContainer from '../containers/cartPageContainers/CustomerFormContainer';
import useUpdateAppContext from '../context/hooks/useUpdateContext';

const CartPage = () => {
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const userId = user?.id;

  const {
    cartData,
    addOneToCart,
    removeOneFromCart,
    cartCardQuantity,
    getTotalCost,
    loading,
    error,
  } = useCartStore();

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    console.log('CART PAGE (CARTDATA):', cartData);
    setPageLoading(!(userId && cartData.cart && cartData.cart.length > 0));
  }, [cartData, userId]);

  if (pageLoading || loading) {
    return <LoadingIndicator />;
  }
  console.log('CART PAGE (QUANTITY):', cartCardQuantity);
  const calculateTotalPrice = getTotalCost;

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
              <CustomerFormContainer />
            </Box>
          </CardContent>
        </CardElement>
      </Box>
    </Container>
  );
};

export default CartPage;
