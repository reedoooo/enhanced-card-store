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
import { useCartManager } from './useCartManager';
import { getCartCardQuantity } from '../../Helpers';
const defaultCart = {
  userId: '',
  _id: '',
  items: [],
  quantity: 0, // Total quantity of items
  totalPrice: 0, // Total price of items
  totalQuantity: 0,
};
export const CartContext = createContext({
  cart: defaultCart,
  createUserCart: () => {},
  addCardsToCart: () => {},
  removeCardsFromCart: () => {},
  fetchCartForUser: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
});
export const CartProvider = ({ children }) => {
  const {
    cart,
    totalCost,
    createUserCart,
    addCardsToCart,
    removeCardsFromCart,
  } = useCartManager();
  const contextValue = useMemo(
    () => ({
      cart,
      totalCost,
      cartCardQuantity: cart?.items?.reduce(
        (acc, card) => acc + card.quantity,
        0
      ),
      cartCardCount: cart?.items?.length,
      cartValue: cart?.items?.reduce(
        (acc, card) =>
          acc + card.card_prices[0]?.tcgplayer_price * card.quantity,
        0
      ),
      // getTotalCost,
      getCardQuantity: getCartCardQuantity,
      addOneToCart: (cardInfo) => addCardsToCart([cardInfo], cart),
      removeOneFromCart: (cardInfo) =>
        removeCardsFromCart([cardInfo], [cardInfo.id], cart),
      // deleteFromCart,
      // fetchCartForUser: fetchUserCart,
      createUserCart,
    }),
    [getCartCardQuantity, cart, createUserCart]
  );

  // useEffect(() => {
  //   // console.log('CART CONTEXT: ', contextValue);
  //   if (userId && typeof userId === 'string') {
  //     fetchUserCart();
  //   }
  // }, [userId, fetchUserCart]);

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
