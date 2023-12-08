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
import { useCardStore } from '../CardContext/CardStore';
import { useUserContext } from '../UserContext/UserContext';

export const CartContext = createContext({
  cartData: {
    _id: '',
    cart: [],
    quantity: 0, // Total quantity of items
    totalPrice: 0, // Total price of items
  },
  getCardQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  fetchUserCart: () => {},
  createUserCart: () => {},
});

export const CartProvider = ({ children }) => {
  const { user, setUser } = useUserContext();
  const userId = user?.id;

  const [cartData, setCartData] = useState({
    _id: '', // Cart id
    cart: [], // Cart items
    quantity: 0, // Total quantity of items
    totalPrice: 0, // Total price of items
  });
  const [cookie, setCookie] = useCookies(['user', 'cart']);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCardQuantity = (cardId) => {
    let totalItems = 0;
    let quantityOfSameId = 0;
    cartData.cart.forEach((item) => {
      totalItems += item.quantity;
      if (item.id === cardId) {
        quantityOfSameId += item.quantity;
      }
    });
    return { totalItems, quantityOfSameId };
  };
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
  const fetchFromServer = async (url, options = {}) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}${url}`,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching from server:', error);
      throw error; // Rethrow the error for handling in calling functions
    }
  };

  const createUserCart = useCallback(async () => {
    try {
      const newCartData = await fetchFromServer('/api/carts/createEmptyCart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      setCartDataAndCookie(newCartData);
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  }, [userId, setCookie]);

  const fetchUserCart = useCallback(async () => {
    try {
      const data = await fetchFromServer(`/api/carts/userCart/${userId}`);
      setCartDataAndCookie(data);
    } catch (error) {
      console.error('Error fetching user cart:', error);
      if (error.message.includes('404')) {
        await createUserCart();
      }
    }
  }, [userId, createUserCart]);

  const setCartDataAndCookie = (newCartData) => {
    if (newCartData && Array.isArray(newCartData.cart)) {
      setCartData(newCartData);
      setCookie('cart', newCartData.cart, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
    }
  };

  // useEffect(() => {
  //   const totalQuantity = cartData.cart.reduce(
  //     (total, item) => total + item.quantity,
  //     0
  //   );
  //   const calculatedTotalPrice = getTotalCost();
  //   if (
  //     cartData.quantity !== totalQuantity ||
  //     cartData.totalPrice !== calculatedTotalPrice
  //   ) {
  //     setCartData((prevState) => ({
  //       ...prevState,
  //       quantity: totalQuantity,
  //       totalPrice: calculatedTotalPrice,
  //     }));
  //   }
  // }, [cartData?.cart]);
  useEffect(() => {
    const newTotalQuantity = cartData.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newTotalPrice = getTotalCost();
    setTotalQuantity(newTotalQuantity);
    setTotalPrice(newTotalPrice);
  }, [cartData.cart]);

  const updateCart = async (cartId, updatedCart) => {
    if (!cartId) return;
    const formattedCartData = {
      cartItems: updatedCart.map((item) => ({
        ...item,
        id: item.id, // Make sure 'id' is a number
        quantity: item.quantity,
      })),
      userId: userId,
    };
    const data = await fetchFromServer(`/api/carts/${cartId}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedCartData),
    });
    setCartDataAndCookie(data);
    return data;
  };
  const addOneToCart = async (cardInfo) => {
    if (!cartData._id) return;
    console.log('Adding one to cart', cardInfo);
    const { quantityOfSameId, totalItems } = getCardQuantity(cardInfo.id);
    if (quantityOfSameId >= 3) return;
    let updatedCart = cartData.cart.map((item) =>
      item.id === cardInfo.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    if (!cartData.cart.some((item) => item.id === cardInfo.id)) {
      updatedCart = [...updatedCart, { ...cardInfo, quantity: 1 }];
    }
    const updatedCartData = await updateCart(cartData._id, updatedCart);
    console.log('UPDATED CART DATA:', updatedCartData);
    if (updatedCartData) setCartData(updatedCartData);
  };
  const removeOneFromCart = async (cardInfo) => {
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
  };
  const deleteFromCart = async (cardInfo) => {
    const updatedCart = cartData.cart.filter((item) => item.id !== cardInfo.id);
    const updatedCartData = await updateCart(cartData._id, updatedCart);
    if (updatedCartData) setCartData(updatedCartData);
  };
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
      getCardQuantity,
      getTotalCost,
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
      getTotalCost,
      addOneToCart,
      removeOneFromCart,
      deleteFromCart,
      cartData,
    ]
  );

  useEffect(() => {
    console.log('CART CONTEXT: ', cartData);
  }, [cartData]);

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
