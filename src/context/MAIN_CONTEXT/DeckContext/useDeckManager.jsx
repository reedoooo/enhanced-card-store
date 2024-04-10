import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import useLogger from '../../hooks/useLogger';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import useSelectedDeck from './useSelectedDeck';
import useManageCookies from '../../hooks/useManageCookies';

const useDeckManager = () => {
  const { fetchWrapper, status } = useFetchWrapper();
  const { getCookie } = useManageCookies();
  const { isLoggedIn, userId } = getCookie(['isLoggedIn', 'userId']);
  const logger = useLogger('useDeckManager');
  const {
    selectedDeckId,
    addOrUpdateDeck,
    // updateDeckField,
    updateSelectedDeck,
    removeCardFromSelectedDeck,
    removeDeck,
    setCustomError: setSelectedDeckError,
    refreshDecks,
  } = useSelectedDeck();
  const [error, setError] = useState(null);
  const [hasFetchedDecks, setHasFetchedDecks] = useState(false);
  const handleError = useCallback(
    (error, actionName) => {
      const errorMessage = error.message || 'Failed to perform action';
      setError(errorMessage);
      logger.logError(`Error in ${actionName}: ${errorMessage}`, error);
    },
    [logger]
  );
  const baseUrl = `${process.env.REACT_APP_SERVER}/api/users/${userId}/decks`;
  const createApiUrl = useCallback((path) => `${baseUrl}/${path}`, [baseUrl]);
  const performFetchAndUpdate = useCallback(
    async (urlSuffix, method, deckData = null, actionName) => {
      if (!userId || !isLoggedIn || status === 'loading') {
        setError('User is not logged in or request is in loading state.');
        return;
      }

      const url = createApiUrl(urlSuffix);
      try {
        const response = await fetchWrapper(url, method, deckData, actionName);
        if (response.data) {
          if (method === 'GET') {
            response.data.forEach((deck) => addOrUpdateDeck(deck));
          } else if (
            actionName === 'addCardsToDeck' ||
            actionName === 'removeCardsFromDeck'
          ) {
            console.log('CARD RESPONSE', response.data?.data?.cards);
            updateSelectedDeck(
              response.data?.data?._id,
              'cards',
              response.data?.data?.cards
            );

            let updatedTotalQuantity = response.data?.data?.totalQuantity;
            // let updatedTotalPrice = response.data?.data?.totalPrice;
            if (actionName === 'addCardsToDeck') {
              // updatedTotalQuantity++;
              // updatedTotalPrice += response.data?.data?.price;
            } else if (actionName === 'removeCardsFromDeck') {
              updatedTotalQuantity--;
              // updatedTotalPrice -= response.data?.data?.price;
            }
            updateSelectedDeck(
              response.data?.data?._id,
              'totalQuantity',
              updatedTotalQuantity
            );
            // addOrUpdateDeck(response.data?.data);
          } else if (actionName === 'deleteDeck') {
            removeDeck(response.data?.data);
          }
          console.log(`${actionName} succeeded.`);
          // refreshDecks();
        }
      } catch (error) {
        handleError(error, actionName);
      }
    },
    [userId, isLoggedIn, status, fetchWrapper, addOrUpdateDeck, handleError]
  );
  const fetchDecks = () =>
    performFetchAndUpdate('allDecks', 'GET', null, 'fetchDecks');

  const createNewDeck = (deckData) =>
    performFetchAndUpdate('create', 'POST', deckData, 'createNewDeck');

  const updateDeckDetails = (deckId, deckData) =>
    performFetchAndUpdate(
      `${deckId}/deckDetails`,
      'PUT',
      deckData,
      'updateDeckDetails'
    );

  const deleteDeckAction = (deckId) => {
    // removeDeck(deckId); // Optimistically remove the deck first for instant UI feedback
    performFetchAndUpdate(`${deckId}/delete`, 'DELETE', {}, 'deleteDeck');
  };

  const addCardsToDeck = (newCards, deckId) => {
    // INCREASE QTY OF CARDS IN DECK BY 1
    // newCards.quantity = newCards.quantity + 1;
    console.log('ADDCARDSTODECK PARAMS: ', newCards, deckId);
    console.log('ADDCARDSTODECK PARAMS: ', newCards, selectedDeckId);
    // addCardToSelectedDeck(newCards, deckId);
    performFetchAndUpdate(
      `${selectedDeckId}/cards/add`,
      'POST',
      { cards: newCards, type: 'addNew' },
      'addCardsToDeck'
    );
    fetchDecks();
  };
  const removeCardsFromDeck = (cards, deck) => {
    console.log('REMOVING CARDS FROM DECK', cards, deck);
    removeCardFromSelectedDeck(cards, deck);
    performFetchAndUpdate(
      `${deck?._id}/cards/remove`,
      'PUT',
      { cards: cards, type: 'decrement' },
      'removeCardsFromDeck'
    );
  };
  return {
    fetchDecks,
    createNewDeck,
    deleteDeck: deleteDeckAction,
    // updateDeck,
    hasFetchedDecks,
    handleError,
    addCardsToDeck,
    removeCardsFromDeck,
    addOneToDeck: (cards, deck) => addCardsToDeck(cards, deck),
    removeOneFromDeck: (cards, deck) => removeCardsFromDeck(cards, deck),
    updateDeckDetails,
  };
};

export default useDeckManager;
