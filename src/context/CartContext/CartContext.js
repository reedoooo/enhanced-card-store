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
import { fetchWrapper } from '../Helpers';
import { getCardQuantity } from './helpers';

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
  const [cartData, setCartData] = useState({
    _id: '',
    cart: [],
    quantity: 0, // Total quantity of items
    totalPrice: 0, // Total price of items
  });
  const [cookies, setCookies] = useCookies(['user', 'cart']);
  const userId = cookies?.user?.id;
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalCost = () => {
    return cartData.cart.reduce(
      (acc, card) => acc + card.card_prices[0].tcgplayer_price * card.quantity,
      0
    );
  };

  const totalCost = useMemo(
    () =>
      cartData.cart.reduce(
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

      setCartDataAndCookie(newCartData);
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
      setCartDataAndCookie(response);
    } catch (error) {
      console.error('Error fetching user cart:', error);
      if (error.message.includes('404')) {
        await createUserCart();
      }
    }
  }, [userId, setCookies]);

  // Set cart data and cookie
  const setCartDataAndCookie = useCallback(
    (newCartData) => {
      if (newCartData && Array.isArray(newCartData.cart)) {
        setCartData(newCartData);
        setCookies('cart', newCartData.cart, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
      }
    },
    [setCookies]
  );

  // useEffect to fetch and set cart data
  useEffect(() => {
    if (userId) {
      fetchUserCart().catch((error) =>
        console.error('Failed to fetch or create cart:', error)
      );
    }
  }, [userId, fetchUserCart]);
  useEffect(() => {
    const newTotalQuantity = cartData.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
    setTotalPrice(totalCost);
  }, [cartData.cart, totalCost]);
  const updateCart = useCallback(
    async (cartId, updatedCart) => {
      if (!userId) return;
      if (!cartId) return;
      const formattedCartData = {
        cartItems: updatedCart.map((item) => ({
          ...item,
          id: item.id,
          quantity: item.quantity,
        })),
        userId: userId,
      };
      // const response = await fetchWrapper(
      //   `${process.env.REACT_APP_SERVER}${`/api/carts/userCart/${userId}`}`,
      //   'GET'
      // );
      const data = await fetchWrapper(
        `${process.env.REACT_APP_SERVER}/api/users/${userId}/cart/${cartId}/update`,
        'PUT',
        formattedCartData
        // JSON.stringify(formattedCartData)
      );
      setCartDataAndCookie(data);
      return data;
    },
    [fetchWrapper, setCartDataAndCookie]
  );
  const addOneToCart = useCallback(
    async (cardInfo) => {
      if (!cartData._id) return;
      console.log('Adding one to cart', cardInfo);
      const { quantityOfSameId, totalItems } = getCardQuantity(
        cartData,
        cardInfo.id
      );
      if (quantityOfSameId >= 3) return;
      let updatedCart = cartData.cart.map((item) =>
        item.id === cardInfo.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      if (!cartData.cart.some((item) => item.id === cardInfo.id)) {
        updatedCart = [...updatedCart, { ...cardInfo, quantity: 1 }];
      }
      const updatedCartData = await updateCart(cartData._id, updatedCart);
      console.log('UPDATED CART DATA:', updatedCartData);
      if (updatedCartData) setCartData(updatedCartData);
    },
    [cartData._id, cartData.cart, getCardQuantity, updateCart]
  );
  const removeOneFromCart = useCallback(
    async (cardInfo) => {
      if (cartData.cart.some((item) => item.id === cardInfo.id)) {
        const updatedCart = cartData.cart
          .map((item) =>
            item.id === cardInfo.id && item.quantity > 0
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);
        const updatedCartData = await updateCart(cartData._id, updatedCart);
        if (updatedCartData) setCartData(updatedCartData);
      }
    },
    [cartData._id, cartData.cart, updateCart]
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
      cartCardCount: cartData.cart?.length,
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
      fetchUserCart,
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
