import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import useLogger from '../../hooks/useLogger';
import { DEFAULT_COLLECTION } from '../../constants';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import { useAuthContext } from '../..';
import { useCookies } from 'react-cookie';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSelectedDeck from './useSelectedDeck';

const useDeckManager = () => {
  const { fetchWrapper, status } = useFetchWrapper();
  const { userId, isLoggedIn } = useAuthContext();
  const logger = useLogger('useDeckManager');
  const {
    selectedDeck,
    allDecks,
    selectedDeckId,
    updateMultipleDecks,
    handleSelectDeck,
    addCardToSelectedDeck,
    setCustomError: setSelectedDeckError,
  } = useSelectedDeck();
  const [decks] = useLocalStorage('decks', []);
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

  const fetchDecks = useCallback(async () => {
    if (!userId || !isLoggedIn || status === 'loading') return;
    try {
      const responseData = await fetchWrapper(
        createApiUrl('allDecks'),
        'GET',
        null,
        'fetchDecks'
      );
      updateMultipleDecks(responseData?.data);

      // handleSelectDeck(responseData?.data[decks?.byId?.[selectedDeckId]]);
      setHasFetchedDecks(true);
    } catch (error) {
      handleError(error, 'fetchDecks');
    }
  }, [
    userId,
    isLoggedIn,
    status,
    fetchWrapper,
    createApiUrl,
    updateMultipleDecks,
    handleError,
    handleSelectDeck,
  ]);

  const performAction = useCallback(
    async (path, method, data, actionName, options = {}) => {
      if (!userId || !isLoggedIn || status === 'loading') {
        setError('User is not logged in or request is in loading state.');
        return;
      }
      if (!selectedDeck) {
        setSelectedDeckError('No deck selected');
        return;
      }

      options.beforeAction?.();
      console.log(
        'PERFORM ACTION',
        path,
        method,
        data,
        actionName,
        options.paramTypes
      );

      try {
        await fetchWrapper(path, method, data, actionName);
        options.afterAction?.();
        fetchDecks(); // Refresh decks after any action
      } catch (error) {
        handleError(error, actionName);
      }
    },
    [
      userId,
      isLoggedIn,
      status,
      fetchWrapper,
      createApiUrl,
      fetchDecks,
      handleError,
      setSelectedDeckError,
      selectedDeck,
    ]
  );

  const createNewDeck = (data) =>
    performAction(createApiUrl('create'), 'POST', data, 'createNewDeck');
  const deleteDeck = (deckId) =>
    performAction(createApiUrl(`${deckId}/delete`), 'DELETE', {}, 'deleteDeck');
  const updateDeck = (deckId, updatedData) =>
    performAction(
      createApiUrl(`${deckId}/update`),
      'PUT',
      updatedData,
      'updateDeck'
    );
  const updateDeckDetails = useCallback(
    async (deckId, updatedInfo) => {
      const loadingID = 'updateDeckDetails';
      setError(null);
      const { name, description, tags, color } = updatedInfo;

      // Find and update the specific deck
      let updatedDeck = {};
      updateDeck((prevDecks) => {
        return prevDecks.map((deck) => {
          if (deck._id === deckId) {
            updatedDeck = { ...deck, name, description, tags, color };
            return updatedDeck;
          }
          return deck;
        });
        // setDecks((prevDecks) => {
        //   return prevDecks.map((deck) => {
        //     if (deck._id === deckId) {
        //       updatedDeck = { ...deck, name, description, tags, color };
        //       return updatedDeck;
        //     }
        //     return deck;
        //   });
      });

      try {
        const deckEndpoint = createApiUrl(`/${deckId}/deckDetails`);
        await fetchWrapper(
          deckEndpoint,
          'PUT',
          { name, description, tags, color },
          loadingID
        );
      } catch (error) {
        setError(error);
        console.error('Error updating deck details:', error);
      }

      return updatedDeck; // Return updated deck for any further operations
    },
    [createApiUrl, fetchWrapper, updateDeck, userId]
  );
  const addCardsToDeck = useCallback(
    (newCards, deck) => {
      if (selectedDeck?._id === 'selectedDeckId')
        return console.log('Deck ID has not been set');

      // CHECK FOR EXISTING CARD IN DECK (newCards[0])
      const existingCard = deck?.cards?.find(
        (card) => card.id === newCards[0].id
      );

      const options = {
        beforeAction: () => {
          if (existingCard) {
            console.log('Card already exists in deck');
            return;
          }
        },
        afterAction: () => {
          if (existingCard) {
            console.log('Card already exists in deck');
            return;
          }
        },
        paramTypes: {
          deckId: selectedDeckId,
        },
      };

      if (existingCard) {
        // UPDATE EXISTING CARD
        const cardParams = { cards: [newCards] };
        const fullParams = { ...cardParams, type: 'increment' };
        performAction(
          createApiUrl(`${selectedDeck?._id}/cards/update`),
          'PUT',
          fullParams,
          'addCardsToDeck',
          options
        );
      } else {
        // ADD NEW CARD
        const cardParams = { cards: newCards };
        const fullParams = { ...cardParams, type: 'addNew' };
        addCardToSelectedDeck(newCards);

        performAction(
          createApiUrl(`${selectedDeck?._id}/cards/add`),
          'POST',
          fullParams,
          'addCardsToDeck',
          options
        );
        // updateSelectedDeck(cardParams);
      }
    },
    [performAction, createApiUrl, selectedDeckId, selectedDeck?._id]
  );

  const removeCardsFromDeck = useCallback(
    (cards, cardIds, deckId) => {
      if (!deckId) {
        console.error(
          'No deck selected or deck ID is missing.',
          cards,
          cardIds,
          deckId
        );
        return;
      }
      const arrayOfCards = [cards];
      const arrayOfCardIds = [cardIds];

      performAction(
        createApiUrl(`${deckId}/cards/remove`),
        'PUT',
        { cards: arrayOfCards, cardIds: arrayOfCardIds },
        'removeCardsFromDeck',
        { paramTypes: ['object', 'array'] }
      );
    },
    [performAction, createApiUrl]
  );

  return {
    fetchDecks,
    createNewDeck,
    deleteDeck,
    updateDeck,
    selectedDeck,
    allDecks,
    error,
    hasFetchedDecks,
    handleError,
    setSelectedDeckError,
    addCardsToDeck,
    removeCardsFromDeck,
    addOneToDeck: (cards, deck) => addCardsToDeck(cards, deck),
    removeOneFromDeck: (cards, cardIds, deck) =>
      removeCardsFromDeck(cards, cardIds, deck),
    updateDeckDetails,
  };
};

export default useDeckManager;
