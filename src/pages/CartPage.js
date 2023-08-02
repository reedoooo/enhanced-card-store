import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Box,
  Card as CardElement,
  CardContent,
  Container,
} from '@mui/material';
import CartContent from '../components/content/CartContent';
import CustomerForm from '../components/forms/CustomerForm';
import { CartContext } from '../context/CartContext/CartContext';
import { BeatLoader } from 'react-spinners';

const LoadingIndicator = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BeatLoader color={'#123abc'} loading={true} size={24} />
    </div>
  );
};

const ErrorIndicator = ({ error }) => {
  return <div>Error: {error}</div>;
};

const CartContentContainer = ({
  cartData,
  calculateTotalPrice,
  onQuantityChange,
}) => {
  return (
    <Box sx={{ flex: 1, marginRight: '2rem', flexGrow: '1' }}>
      {cartData.length > 0 ? (
        <CartContent
          cartData={cartData}
          calculateTotalPrice={calculateTotalPrice}
          onQuantityChange={onQuantityChange}
        />
      ) : (
        <LoadingIndicator />
      )}
    </Box>
  );
};

const CustomerFormContainer = ({ calculateTotalPrice }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <CustomerForm calculateTotalPrice={calculateTotalPrice} />
    </Box>
  );
};

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
  } = useContext(CartContext);

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
