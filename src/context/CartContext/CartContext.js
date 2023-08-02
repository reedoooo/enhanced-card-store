/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useCardStore } from '../CardContext/CardStore';

export const CartContext = createContext({
  cartData: {
    _id: '',
    cart: [],
  },
  getCardQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  setCart: () => {},
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
    const data = await fetchFromServer(`/api/carts/${cartId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedCartData),
    });
    setCartDataAndCookie(data);
  };

  //Context functions
  const createUserCart = useCallback(
    async (userId) => {
      const newCartData = await fetchFromServer(
        `/api/carts/newCart/${userId}`,
        { method: 'POST' }
      );
      setCookie('cart', newCartData.cart || [], { path: '/' });
      return newCartData.cart || [];
    },
    [setCookie]
  );

  const fetchUserCart = useCallback(
    async (userId) => {
      try {
        const data = await fetchFromServer(`/api/carts/userCart/${userId}`);
        setCookie('cart', data.cart || [], { path: '/' });
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
      fetchUserCart(userId).then((data) => {
        if (data && data.cart) {
          setCartDataAndCookie(data);
        }
      });
    }
  }, [userId, fetchUserCart]);

  const setCartDataAndCookie = (newCartData) => {
    setCartData(newCartData);
    setCookie('cart', newCartData, { path: '/' });
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
      updatedCart.push({ ...cardInfo, quantity: 1 });
    }
    updateCart(cartData._id, updatedCart);
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
      updateCart(cartData._id, updatedCart);
    }
  };

  const deleteFromCart = async (cardInfo) => {
    const updatedCart = cartData.cart.filter((item) => item.id !== cardInfo.id);
    updateCart(cartData._id, updatedCart);
  };

  const getTotalCost = () =>
    cartData.cart.reduce(
      (total, item) =>
        total + item.quantity * item.card_prices[0].tcgplayer_price,
      0
    );

  useEffect(() => {
    const totalQuantity = cartData.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartDataAndCookie((prevState) => ({
      ...prevState,
      quantity: totalQuantity,
      totalPrice: getTotalCost(),
    }));
  }, [cartData.cart]);

  console.log('CART CONTEXT: ', {
    cartData,
    getCardQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    fetchUserCart,
    createUserCart,
  });

  return (
    <CartContext.Provider
      value={{
        cartData,
        getCardQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        fetchUserCart,
        createUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
