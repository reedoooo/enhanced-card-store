/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
  useMemo,
} from 'react';
import { useCookies } from 'react-cookie';
import { useUserContext } from '../UserContext/UserContext';
import { getCardQuantity } from './helpers';
import useFetchWrapper from '../hooks/useFetchWrapper';

export const CartContext = createContext({
  cartData: {
    _id: '',
    cart: [],
    quantity: 0, // Total quantity of items
    totalPrice: 0, // Total price of items
  },
  cart: [],
  getCardQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  fetchUserCart: () => {},
  createUserCart: () => {},
});

export const CartProvider = ({ children }) => {
  // const { user, setUser } = useUserContext();
  // const userId = user?.id;
  const fetchWrapper = useFetchWrapper();
  const [cartData, setCartData] = useState({
    _id: '',
    cart: [],
    quantity: 0, // Total quantity of items
    totalPrice: 0, // Total price of items
  });
  const [cookies, setCookie] = useCookies(['authUser', 'isLoggedIn', 'userId']);
  const { authUser, isLoggedIn, userId } = cookies;
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalCost = () => {
    return cartData?.cart?.reduce(
      (acc, card) => acc + card.card_prices[0].tcgplayer_price * card.quantity,
      0
    );
  };

  const totalCost = useMemo(
    () =>
      cartData?.cart?.reduce(
        (total, item) =>
          total + item.quantity * item.card_prices[0].tcgplayer_price,
        0
      ),
    [cartData.cart]
  );
  const createUserCart = useCallback(async () => {
    if (!userId) return;
    try {
      const newCartData = await fetchWrapper(
        // `${process.env.REACT_APP_SERVER}/api/carts/createEmptyCart`,
        `${process.env.REACT_APP_SERVER}/api/users/${userId}/cart/createCart`,
        'POST',
        JSON.stringify({ userId })
      );
      const { message, data } = newCartData;
      console.log('CREATE CART: -----> response message', message);
      console.log('CART DATA: -----> response data', data);
      setCartDataAndCookie(data);
    } catch (error) {
      console.error('Error creating cart:', error);

      if (error.message.includes('404')) {
        await createUserCart();
      }

      if (error.message.includes('500')) {
        throw new Error('Failed to create cart');
      }
    }
  }, [userId]);

  const fetchUserCart = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await fetchWrapper(
        `${process.env.REACT_APP_SERVER}${`/api/users/${userId}/cart`}`,
        'GET'
      );
      console.log('FETCHED USER CART:', response);
      setCartDataAndCookie(response);
    } catch (error) {
      console.error('Error fetching user cart:', error);
      // if (error.message.includes('404')) {
      //   console.log('404 ERROR', error);
      //   // await createUserCart();
      // }
    }
  }, [userId]);

  // Set cart data and cookie
  const setCartDataAndCookie = useCallback(
    (newCartData) => {
      if (newCartData && Array.isArray(newCartData?.cart)) {
        setCartData(newCartData);
        setCookie('cartData', newCartData, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
        setCookie('cart', newCartData?.cart, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
      }
    },
    [setCookie]
  );

  // useEffect to fetch and set cart data
  useEffect(() => {
    if (userId && isLoggedIn) {
      fetchUserCart().catch((error) =>
        console.error('Failed to fetch or create cart:', error)
      );
    }
  }, [userId, fetchUserCart]);
  useEffect(() => {
    const newTotalQuantity = cartData?.cart?.reduce(
      (total, item) => total + item?.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
    setTotalPrice(totalCost);
  }, [cartData.cart, totalCost]);

  const updateCart = useCallback(
    async (cartId, updatedCart, method) => {
      if (!userId || !cartId) return;

      const formattedCartData = {
        userId: userId,
        cart: updatedCart.map((item) => ({
          id: item.id, // assuming id is the unique identifier for each cart item
          quantity: item.quantity, // ensure this is the current quantity to be updated in the cart
          price: item.price, // ensure this is the current price of the item
          // Include other necessary fields as per your cart item structure
        })),
        method: method, // 'POST' for adding items, 'DELETE' for removing items, 'PUT' for updating items
        // Calculating total quantity and total price outside of the cart array
        quantity: updatedCart.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedCart.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        ),
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/api/users/${userId}/cart/${cartId}/update`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedCartData),
          }
        );

        const { message, data } = await response.json();
        console.log('PUT: /cart -----> response message', message);
        if (response.ok) {
          console.log('PUT: /cart -----> response data', data);
          setCartDataAndCookie(data); // Update your cart state and cookie here
        } else {
          console.error(
            'Failed to update cart: ',
            data?.error || 'Error occurred'
          );
          // Handle errors appropriately (e.g., show an error message to the user)
        }
      } catch (error) {
        console.error('Error updating cart: ', error);
        // Handle errors appropriately (e.g., show an error message to the user)
      }
    },
    [userId, setCartDataAndCookie] // dependencies array
  );
  const updateItemQuantity = (cart, cardInfo, increment = true) => {
    const itemIndex = cart.findIndex((item) => item.id === cardInfo.id);

    // If item is found in the cart
    if (itemIndex !== -1) {
      const existingItem = cart[itemIndex];
      const updatedQuantity = increment
        ? existingItem.quantity + 1
        : existingItem.quantity - 1;

      // Update item's quantity and total price or remove if quantity is 0
      if (updatedQuantity > 0) {
        cart[itemIndex] = {
          ...existingItem,
          quantity: updatedQuantity,
          totalPrice: updatedQuantity * existingItem.price,
        };
      } else {
        cart.splice(itemIndex, 1); // Remove the item if quantity becomes 0
      }
    } else if (increment) {
      // Add new item if it doesn't exist in the cart
      cart.push({
        ...cardInfo,
        quantity: 1,
        totalPrice: cardInfo.price,
      });
    }

    return cart;
  };
  const addOneToCart = useCallback(
    async (cardInfo) => {
      if (!cartData._id) return;

      const updatedCart = updateItemQuantity(
        [...cartData.cart],
        cardInfo,
        true
      );
      const method = 'PUT'; // Always 'PUT' because we're updating the cart

      const updatedCartData = await updateCart(
        cartData._id,
        updatedCart,
        method
      );
      if (updatedCartData) setCartData(updatedCartData);
    },
    [cartData, updateCart, setCartData]
  );
  const removeOneFromCart = useCallback(
    async (cardInfo) => {
      const updatedCart = updateItemQuantity(
        [...cartData.cart],
        cardInfo,
        false
      );
      const method =
        updatedCart.length < cartData.cart.length ? 'DELETE' : 'PUT';

      const updatedCartData = await updateCart(
        cartData._id,
        updatedCart,
        method
      );
      if (updatedCartData) setCartData(updatedCartData);
    },
    [cartData, updateCart, setCartData]
  );
  const deleteFromCart = useCallback(
    async (cardInfo) => {
      const updatedCart = cartData.cart.filter(
        (item) => item.id !== cardInfo.id
      );
      const updatedCartData = await updateCart(cartData._id, updatedCart);
      if (updatedCartData) setCartData(updatedCartData);
    },
    [cartData._id, cartData.cart, updateCart]
  );
  const contextValue = useMemo(
    () => ({
      cartData,
      totalCost,
      totalQuantity,
      totalPrice,
      cart: cartData?.cart,
      cartCardQuantity: cartData?.cart?.reduce(
        (acc, card) => acc + card.quantity,
        0
      ),
      cartCardCount: cartData?.cart?.length,
      cartValue: cartData?.cart?.reduce(
        (acc, card) =>
          acc + card.card_prices[0].tcgplayer_price * card.quantity,
        0
      ),
      getTotalCost,
      getCardQuantity,
      addOneToCart,
      removeOneFromCart,
      deleteFromCart,
      fetchCartForUser: fetchUserCart,
      createUserCart,
    }),
    [
      totalQuantity,
      totalPrice,
      getCardQuantity,
      addOneToCart,
      removeOneFromCart,
      deleteFromCart,
      cartData,
      fetchUserCart,
      createUserCart,
    ]
  );

  useEffect(() => {
    console.log('CART CONTEXT: ', contextValue);
    if (userId && typeof userId === 'string') {
      fetchUserCart();
    }
  }, [userId, fetchUserCart]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCartStore = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
