import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import CustomerForm from '../components/forms/customerCheckoutForm/CustomerForm';
import CartContent from '../containers/cartPageContainers/CartContent';
import { useCartStore, usePageContext } from '../context';

const CartPage = () => {
  const [cookies] = useCookies(['user']);
  const theme = useTheme();
  const { user } = cookies;
  const userId = user?.id;

  const {
    cartData,
    addOneToCart,
    removeOneFromCart,
    fetchUserCart,
    getTotalCost,
  } = useCartStore();

  const {
    isPageLoading,
    setIsPageLoading,
    pageError,
    setPageError,
    logPageData,
  } = usePageContext();

  useEffect(() => {
    if (!userId) return;

    const initializeCart = () => {
      setIsPageLoading(true);
      try {
        if (!cartData || Object.keys(cartData).length === 0) {
          fetchUserCart(userId);
        }
        logPageData('CartPage', cartData);
      } catch (e) {
        setPageError(e);
      } finally {
        setIsPageLoading(false);
      }
    };

    initializeCart();
  }, [
    userId,
    cartData,
    fetchUserCart,
    logPageData,
    setPageError,
    setIsPageLoading,
  ]);

  const handleModifyItemInCart = async (cardId, operation) => {
    try {
      operation === 'add' ? addOneToCart(cardId) : removeOneFromCart(cardId);
    } catch (e) {
      console.error('Failed to adjust quantity in cart:', e);
      setPageError(e);
    }
  };

  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;

  const hasItems = cartData?.cart?.length > 0;
  const calculateTotalPrice = getTotalCost();
  return (
    <Box sx={{ overflow: 'auto', p: theme.spacing(3), m: 'auto' }}>
      <Card
        sx={{ width: '100%', backgroundColor: theme.palette.background.paper }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <CartContent
                cartData={cartData}
                calculateTotalPrice={calculateTotalPrice}
                onQuantityChange={handleModifyItemInCart}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <CustomerForm />
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardContent>
          <Grid container spacing={3}>
            {hasItems ? (
              <Grid
                item
                xs={6}
                lg={hasItems ? 6 : 12}
                sx={{
                  flexGrow: 1,
                }}
              >
                <CartContent
                  cartData={cartData}
                  calculateTotalPrice={calculateTotalPrice}
                  onQuantityChange={handleModifyItemInCart}
                />
              </Grid>
            ) : (
              <Typography variant="h6" align="center">
                No items in the cart
              </Typography>
            )}
            {hasItems && (
              <Grid item xs={6} lg={6}>
                <CustomerForm />
              </Grid>
            )}
          </Grid>
        </CardContent> */}
      </Card>
    </Box>
  );
};

export default CartPage;
//   return (
//     <Box
//       sx={{
//         overflow: 'auto',
//         display: 'flex',
//         flexDirection: 'column',
//         p: theme.spacing(3),
//         m: 'auto',
//       }}
//     >
//       <Card
//         sx={{ width: '100%', backgroundColor: theme.palette.background.paper }}
//       >
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={hasItems ? 6 : 12}>
//               {hasItems ? (
//                 <CartContent
//                   cartData={cartData}
//                   calculateTotalPrice={calculateTotalPrice}
//                   onQuantityChange={handleModifyItemInCart}
//                 />
//               ) : (
//                 <Typography variant="h6" align="center">
//                   No items in the cart
//                 </Typography>
//               )}
//             </Grid>
//             {hasItems && (
//               <Grid item xs={12} md={6}>
//                 <CustomerForm />
//               </Grid>
//             )}
//           </Grid>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default CartPage;

// import React, { useEffect } from 'react';
// import { useCookies } from 'react-cookie';
// import {
//   Box,
//   Card as CardElement,
//   CardContent,
//   Container,
//   Grid,
// } from '@mui/material';
// import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
// import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
// // import CartContentContainer from '../containers/cartPageContainers/CartContentContainer';
// import { usePageContext } from '../context/PageContext/PageContext';
// import { useCartStore, useMode } from '../context';
// import { styled } from '@mui/styles';
// import CustomerForm from '../components/forms/customerCheckoutForm/CustomerForm';
// import CartContent from '../containers/cartPageContainers/CartContent';
// import { CartBox, CartContainer } from './pageStyles/StyledComponents';

// const CartPage = () => {
//   const [cookies] = useCookies(['user']);
//   const theme = useMode();
//   const user = cookies.user;
//   const userId = user?.id;

//   const {
//     cartData,
//     addOneToCart,
//     removeOneFromCart,
//     fetchUserCart,
//     cartCardQuantity,
//     getTotalCost,
//   } = useCartStore();

//   const {
//     isPageLoading,
//     setIsPageLoading,
//     pageError,
//     setPageError,
//     logPageData,
//   } = usePageContext();

//   // CartBox;
//   useEffect(() => {
//     setIsPageLoading(true); // Start the loading state
//     try {
//       if (!userId) {
//         setIsPageLoading(false); // End the loading state
//         return;
//       }

//       // if theres no cartData or cartData object is empty, fetch the user's cart
//       if (!cartData || Object.keys(cartData).length === 0) {
//         // fetchUserCart(userId);
//         setIsPageLoading(false); // End the loading state
//         return;
//       }
//       // Your logic to check cart data
//       if (userId && cartData.cart && cartData.cart.length > 0) {
//         logPageData('CartPage', cartData); // Log the cart data
//         console.log('CART PAGE (CART_QUANTITY):', cartCardQuantity);
//       }
//     } catch (e) {
//       setPageError(e); // Handle any errors
//     } finally {
//       setIsPageLoading(false); // End the loading state
//     }
//   }, [userId, cartData, setPageError]);

//   const calculateTotalPrice = getTotalCost;
//   const hasItems = cartData?.cart?.length > 0;

//   const handleModifyItemInCart = async (cardId, operation) => {
//     try {
//       if (operation === 'add') {
//         addOneToCart(cardId);
//       } else if (operation === 'remove') {
//         removeOneFromCart(cardId);
//       }
//     } catch (e) {
//       console.error('Failed to adjust quantity in cart:', e);
//       setPageError(e); // Set the error
//     }
//   };

//   if (isPageLoading) return <LoadingIndicator />;
//   if (pageError) return <ErrorIndicator error={pageError} />;

//   return (
//     <CartBox>
//       <CartContainer>
//         <Box
//           sx={{
//             // marginTop: '2rem',
//             display: 'flex',
//             justifyContent: 'center',
//             flexGrow: 1,
//           }}
//         >
//           <CardElement sx={{ width: '100%', padding: '1rem' }}>
//             <CardContent>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   flexGrow: 1,
//                   margin: '1rem',
//                   padding: '1rem',
//                   backgroundColor: theme.palette.background.paper,
//                   borderRadius: theme.shape.borderRadius,
//                 }}
//               >
//                 <Grid item xs={12} md={hasItems ? 6 : 12}>
//                   <Box sx={{ flex: 1, marginRight: '2rem', flexGrow: '1' }}>
//                     {hasItems ? (
//                       <CartContent
//                         cartData={cartData}
//                         calculateTotalPrice={calculateTotalPrice}
//                         onQuantityChange={handleModifyItemInCart}
//                       />
//                     ) : (
//                       <LoadingIndicator />
//                     )}
//                   </Box>
//                 </Grid>
//                 {hasItems && (
//                   <Grid item xs={12} md={6}>
//                     <CustomerForm />
//                   </Grid>
//                 )}
//               </Box>
//             </CardContent>
//           </CardElement>
//         </Box>
//       </CartContainer>
//     </CartBox>
//   );
// };

// export default CartPage;
