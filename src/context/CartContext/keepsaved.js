// /* eslint-disable @typescript-eslint/no-empty-function */
// import React, { createContext, useState, useEffect, useCallback } from 'react';
// import { useCookies } from 'react-cookie';
// import { useCardStore } from './CardStore';

// export const CartContext = createContext({
//   cart: [],
//   getCardQuantity: () => {},
//   addOneToCart: () => {},
//   removeOneFromCart: () => {},
//   deleteFromCart: () => {},
//   getTotalCost: () => {},
//   setCart: () => {},
//   fetchUserCart: () => {},
// });

// export const CartProvider = ({ children }) => {
//   const [cartData, setCartData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { getCardData } = useCardStore();
//   const [cookies, setCookie] = useCookies(['userCookie', 'cart']);

//   const userId = cookies.userCookie?.id; // Update the way to get the userId
//   console.log('cartData', cartData);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchAndSetUserCart = async (userId) => {
//       try {
//         setLoading(true);
//         const cartData = await fetchUserCart(userId);
//         console.log('Fetched cartData:', cartData);

//         if (isMounted) {
//           setCartData(cartData);
//           setLoading(false);
//         }
//       } catch (error) {
//         if (isMounted) {
//           setError(`Failed to fetch user cart data: ${error.message}`);
//           setLoading(false);
//         }
//       }
//     };

//     if (userId && typeof userId === 'string') {
//       fetchAndSetUserCart(userId);
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [userId]);

//   // Add new function here
//   const createUserCart = async (userId) => {
//     const newCartResponse = await fetch(
//       `${process.env.REACT_APP_SERVER}/api/carts/newCart/${userId}`,
//       {
//         method: 'POST',
//       }
//     );

//     if (!newCartResponse.ok) {
//       throw new Error(`HTTP error! status: ${newCartResponse.status}`);
//     }

//     const newCartData = await newCartResponse.json();
//     console.log('CART CREATED:', newCartData);
//     const newCartItems = Array.isArray(newCartData.cart)
//       ? newCartData.cart
//       : [];
//     setCookie('activeCartCardsArray', newCartItems, { path: '/' });
//     setCookie('allCarts', newCartItems, { path: '/' });
//     return newCartItems;
//   };

//   const fetchUserCart = useCallback(
//     async (userId) => {
//       const response = await fetch(
//         `${process.env.REACT_APP_SERVER}/api/carts/userCart/${userId}`
//       );

//       if (!response.ok) {
//         if (response.status === 404) {
//           // Call the new function here
//           return createUserCart(userId);
//         } else {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//       } else {
//         const data = await response.json();
//         console.log('CART EXISTS:', data);
//         setCookie(
//           'activeCartCardsArray',
//           Array.isArray(data.cart) ? data.cart : [],
//           {
//             path: '/',
//           }
//         );
//         setCookie('allCarts', Array.isArray(data) ? data : {}, {
//           path: '/',
//         });
//         return data;
//       }
//     },
//     [setCookie, createUserCart] // Added createUserCart to the dependencies array
//   );

//   const updateCartInBackend = async (cartId, cartData) => {
//     console.log('received values:', 'cartId', cartId, 'cartData', cartData);

//     // Ensure cartData is in the correct format
//     const formattedCartData = cartData.map((item) => ({
//       cardId: item.id,
//       quantity: item.quantity,
//     }));

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_SERVER}/api/carts/${cartId}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formattedCartData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(`Failed to update cart in backend: ${error.message}`);
//     }
//   };

//   const getCardQuantity = (cardInfo) => {
//     const cartItem = cartData?.cart?.find((item) => item.id === cardInfo.id);
//     return cartItem ? cartItem.quantity : 0;
//   };

//   const addOneToCart = async (cardInfo) => {
//     const itemExistsInCart = cartData?.cart?.some(
//       (item) => item.id === cardInfo.id
//     );

//     let updatedCart;
//     if (itemExistsInCart) {
//       updatedCart =
//         cartData?.cart?.map((item) => {
//           if (item.id === cardInfo.id) {
//             return {
//               ...item,
//               quantity: item.quantity + 1,
//             };
//           }
//           return item;
//         }) ?? [];
//     } else {
//       updatedCart = [...(cartData?.cart || []), { ...cardInfo, quantity: 1 }];
//     }

//     const newCartData = await updateCartInBackend(cartData?._id, updatedCart);
//     setCartData(newCartData || []);
//   };

//   const removeOneFromCart = async (cardInfo) => {
//     const quantity = getCardQuantity(cardInfo.id);
//     const updatedCart =
//       quantity === 1
//         ? cartData?.cart?.filter(
//             (currentCard) => currentCard.id !== cardInfo.id
//           ) ?? []
//         : cartData?.cart?.map((card) =>
//             card.id === cardInfo.id
//               ? { ...card, quantity: card.quantity - 1 }
//               : card
//           ) ?? [];

//     const newCartData = await updateCartInBackend(cartData?._id, updatedCart);
//     setCartData(newCartData || []);
//   };

//   const deleteFromCart = async (cardInfo) => {
//     const updatedCart =
//       cartData?.cart?.filter(
//         (currentCard) => currentCard.cardId !== cardInfo.id
//       ) ?? [];

//     const newCartData = await updateCartInBackend(cartData?._id, updatedCart);
//     setCartData(newCartData || []);
//   };

//   const getTotalCost = () => {
//     if (!cartData?.cart || cartData.cart.length === 0) {
//       return 0;
//     }

//     console.log('cartData:', cartData);
//     return cartData.cart.reduce((totalCost, cartItem) => {
//       const cardData = getCardData(cartItem.id);
//       return totalCost + cardData.price * cartItem.quantity;
//     }, 0);
//   };

//   const setCart = async (cart) => {
//     const updatedCart = Array.isArray(cart) ? cart : [];
//     setCartData(updatedCart);
//     // update in backend
//     const newCartData = await updateCartInBackend(cartData?._id, updatedCart);
//     setCartData(newCartData || []);
//   };

//   const contextValue = {
//     cart: cartData.cart,
//     getCardQuantity,
//     addOneToCart,
//     createUserCart,
//     removeOneFromCart,
//     fetchUserCart,
//     deleteFromCart,
//     getTotalCost,
//     setCart,
//     loading,
//     error,
//   };

//   return (
//     <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
//   );
// };

// export default CartProvider;
