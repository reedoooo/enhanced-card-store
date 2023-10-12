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
  const [cartData, setCartData] = useState({
    _id: '', // Cart id
    cart: [], // Cart items
    quantity: 0, // Total quantity of items
    totalPrice: 0, // Total price of items
  });
  const [cookies, setCookie] = useCookies(['userCookie', 'cart']);
  const userId = cookies.userCookie?.id;
  const { getCardData } = useCardStore();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  //Utility functions
  const fetchFromServer = async (url, options = {}) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}${url}`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const updateCart = async (cartId, updatedCart) => {
    const formattedCartData = updatedCart.map((item) => ({
      ...item,
      quantity: item.quantity,
    }));
    const data = await fetchFromServer(`/api/carts/${cartId}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedCartData),
    });
    setCartDataAndCookie(data);
  };

  const createUserCart = useCallback(
    async (userId) => {
      const newCartData = await fetchFromServer(
        `/api/carts/${userId}/newCart`,
        { method: 'POST' }
      );
      const newCartItems = Array.isArray(newCartData.cart)
        ? newCartData.cart
        : [];
      setCookie('cart', newCartItems, {
        // Changed this line
        path: '/',
        secure: true,
        sameSite: 'none',
      });
      return newCartItems;
    },
    [setCookie]
  );

  const fetchUserCart = useCallback(
    async (userId) => {
      try {
        const data = await fetchFromServer(`/api/carts/userCart/${userId}`);
        setCookie('cart', data.cart || [], {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
        return data;
      } catch (error) {
        if (error.message === 'HTTP error! status: 404') {
          return createUserCart(userId);
        } else {
          console.error(error.message);
        }
      }
    },
    [createUserCart, setCookie]
  );

  useEffect(() => {
    if (userId && typeof userId === 'string') {
      // console.log('Fetching user cart');
      fetchUserCart(userId)
        .then((data) => {
          if (data && data.cart) {
            setCartDataAndCookie(data);
          }
        })
        .catch((error) => console.log('Error fetching user cart:', error));
    }
  }, [userId, fetchUserCart]);

  const setCartDataAndCookie = (newCartData) => {
    setCartData(newCartData);
    setCookie('cart', newCartData.cart, {
      // Changed this line
      path: '/',
      secure: true,
      sameSite: 'none',
    });
  };

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

  const addOneToCart = async (cardInfo) => {
    if (!cartData._id) return;
    const { quantityOfSameId } = getCardQuantity(cardInfo.id);
    if (quantityOfSameId >= 3) return;
    let updatedCart = cartData.cart.map((item) =>
      item.id === cardInfo.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    if (!cartData.cart.some((item) => item.id === cardInfo.id)) {
      updatedCart = [...updatedCart, { ...cardInfo, quantity: 1 }];
    }
    const updatedCartData = await updateCart(cartData._id, updatedCart);
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

  useEffect(() => {
    if (userId && typeof userId === 'string' && isMounted.current) {
      fetchUserCart(userId)
        .then((data) => {
          if (isMounted.current && data && data.cart) {
            setCartDataAndCookie(data);
          }
        })
        .catch((error) => console.log('Error fetching user cart:', error));
    }
  }, [userId, fetchUserCart]);

  const getTotalCost = useMemo(
    () =>
      cartData.cart.reduce(
        (total, item) =>
          total + item.quantity * item.card_prices[0].tcgplayer_price,
        0
      ),
    [cartData.cart]
  );

  useEffect(() => {
    if (!isMounted.current) return;

    const totalQuantity = cartData.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (
      cartData.quantity !== totalQuantity ||
      cartData.totalPrice !== getTotalCost
    ) {
      setCartDataAndCookie((prevState) => ({
        ...prevState,
        quantity: totalQuantity,
        totalPrice: getTotalCost,
      }));
    }
  }, [cartData.cart, cartData.quantity, cartData.totalPrice, getTotalCost]);

  // const logUpdate = (funcName, newState) => {
  //   console.log(`Update from ${funcName}:`, newState);
  // };

  const value = {
    cartData,
    getCardQuantity,
    cartCardQuantity: cartData.cart?.reduce(
      (acc, card) => acc + card.quantity,
      0
    ),
    cartCardCount: cartData.cart?.length,
    cartValue: cartData.cart?.reduce(
      (acc, card) => acc + card.card_prices[0].tcgplayer_price * card.quantity,
      0
    ),
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    fetchUserCart,
    createUserCart,
  };

  useEffect(() => {
    console.log('CART CONTEXT: ', {
      cartData,
      // getTotalCost,
      // // getCardQuantity,
      // fetchUserCart,
      // addOneToCart,
      // removeOneFromCart,
      // deleteFromCart,
      // createUserCart,
    });
  }, [cartData]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartStore = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
