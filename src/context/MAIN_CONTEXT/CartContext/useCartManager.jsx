import { useCallback, useState, useEffect, useMemo } from 'react';
import useManageCookies from '../../hooks/useManageCookies';
import useLocalStorage from '../../hooks/useLocalStorage';
import useLogger from '../../hooks/useLogger';
import { useLoading } from '../../hooks/useLoading';
import useFetchWrapper from '../../hooks/useFetchWrapper';

const defaultCart = {
  userId: '',
  _id: '',
  items: [],
  itemIds: [],
  quantity: 0,
  totalPrice: 0,
  totalQuantity: 0,
};

export const useCartManager = () => {
  const { addCookies, getCookie, deleteCookies } = useManageCookies();
  const { userId, isLoggedIn } = getCookie(['userId', 'isLoggedIn']);
  const [cart, setCart] = useLocalStorage('cart', defaultCart);
  const [hasFetched, setHasFetched] = useState(false);
  const { fetchWrapper } = useFetchWrapper();
  const logger = useLogger('CartHook');
  const { isLoading, status } = useLoading();
  const createApiUrl = useCallback(
    (path) => `${process.env.REACT_APP_SERVER}/api/users/${userId}/cart${path}`,
    [userId]
  );
  const updateCartLocally = useCallback(
    (newCartData) => {
      setCart(newCartData);
    },
    [setCart]
  );
  const fetchUserCart = useCallback(async () => {
    // if (!userId || isLoading('fetchUserCart') || !hasFetched)
    if (!userId || !isLoggedIn || status === 'loading' || !hasFetched) return;

    try {
      const response = await fetchWrapper(
        `${process.env.REACT_APP_SERVER}/api/users/${userId}/cart`,
        'GET',
        null,
        'fetchUserCart'
      );
      updateCartLocally(response.data);
      setHasFetched(true);
    } catch (error) {
      logger.logError('Error fetching user cart', error);
    }
  }, [userId, isLoading, fetchWrapper, updateCartLocally, logger]);
  const createUserCart = useCallback(
    async (cartData, operation = 'create') => {
      if (!userId) return;
      try {
        const response = await fetchWrapper(
          `${process.env.REACT_APP_SERVER}/api/users/${userId}/cart/create`,
          operation === 'create' ? 'POST' : 'PUT',
          cartData,
          'createUserCart'
        );
        updateCartLocally(response.data);
      } catch (error) {
        logger.logError(`Error ${operation} user cart`, error);
      }
    },
    [userId, cart, fetchWrapper, updateCartLocally, logger]
  );
  const addCardsToCart = useCallback(
    async (cards, cartObj) => {
      console.log('ADD CARDS TO CART: ', cards, cartObj);
      const newCards = [];
      const updatedCards = [];

      for (const card of cards) {
        const existingCard = cartObj?.items?.find((c) => c.id === card.id);

        if (existingCard) {
          existingCard.tag = 'incremented';
          updatedCards.push(existingCard);
        } else {
          card.tag = 'added';
          newCards.push({ ...card, quantity: 1 });
        }
      }

      // Add new cards to the cart
      if (newCards.length > 0) {
        logger.logEvent('addCardsToCart ADD', { newCards, cartObj });
        const response = await fetchWrapper(
          createApiUrl('/add'),
          'POST',
          { userId, cartUpdates: newCards, method: 'POST', type: 'addNew' },
          'addCardsToCart'
        );
        updateCartLocally(response.data);
      }

      // Update existing cards in the cart
      if (updatedCards.length > 0) {
        logger.logEvent('addCardsToCart UPDATE', { updatedCards, cartObj });
        const response = await fetchWrapper(
          createApiUrl('/update'),
          'PUT',
          {
            userId,
            cartUpdates: updatedCards,
            method: 'PUT',
            type: 'increment',
          }.cartUpdates,
          'addCardsToCart'
        );
        updateCartLocally(response.data);
      }
    },
    [createApiUrl, fetchWrapper, updateCartLocally, logger]
  );
  const removeCardsFromCart = useCallback(
    async (cards, cardIds, data) => {
      const cardsToRemove = [];
      const cardsToDecrement = [];

      for (const card of cards) {
        const existingCard = cart?.items?.find((c) => c.id === card.id);
        if (existingCard) {
          if (existingCard.quantity > 1) {
            existingCard.tag = 'decremented';
            cardsToDecrement.push(existingCard);
          } else {
            card.tag = 'removed';
            cardsToRemove.push(card);
          }
        }
      }

      // Remove cards from the cart
      try {
        if (cardsToRemove.length > 0) {
          logger.logEvent('removeCardsFromCart REMOVE', {
            cardsToRemove,
          });
          const response = await fetchWrapper(
            createApiUrl('/remove'),
            'DELETE',
            { cards: cardsToRemove },
            'removeCardsFromCart'
          );
          updateCartLocally(response.data);
        }

        if (cardsToDecrement.length > 0) {
          logger.logEvent('removeCardsFromCart DECREMENT', {
            cardsToDecrement,
          });
          const response = await fetchWrapper(
            createApiUrl('/update'),
            'PUT',
            {
              userId,
              cart: cardsToDecrement,
              method: 'PUT',
              type: 'decrement',
            },
            'removeCardsFromCart'
          );
          updateCartLocally(response.data);
        }
      } catch (error) {
        logger.logEvent('removeCardsFromCart error', error);
        throw error;
      }
    },
    [createApiUrl, fetchWrapper, updateCartLocally, logger, cart, userId]
  );
  // useEffect(() => {
  //   updateCartLocally(defaultCart);
  // }, []);
  useEffect(() => {
    fetchUserCart();
  }, []);

  // Calculate totals, quantities using useMemo for performance
  const totalCost = useMemo(
    () => cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart.items]
  );

  return {
    cart,
    totalCost,
    cartCardQuantity: cart.items.length,
    fetchUserCart,
    createUserCart,
    updateCartLocally,
    addCardsToCart,
    removeCardsFromCart,
    addOneToCart: (cardInfo) => addCardsToCart([cardInfo], cart),
    removeOneFromCart: (cardInfo) =>
      removeCardsFromCart([cardInfo], [cardInfo.id], cart),
  };
};
