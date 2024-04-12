// /* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  BASE_API_URL,
  calculateAndUpdateTotalPrice,
  getCardQuantity,
} from '../../Helpers.jsx';
import useFetchWrapper from '../../hooks/useFetchWrapper.jsx';
import useLogger from '../../hooks/useLogger.jsx';
import { useLoading } from '../../hooks/useLoading.jsx';
import useSelectedDeck from './useSelectedDeck.jsx'; // Import the deck management hook
import useDeckManager from './useDeckManager.jsx'; // Import the deck management hook
import useManageCookies from '../../hooks/useManageCookies.jsx';

export const DeckContext = createContext();

export const DeckProvider = ({ children }) => {
  const { addCookie, getCookie, deleteCookie } = useManageCookies();
  const { isLoggedIn, authUser, userId } = getCookie([
    'isLoggedIn',
    'authUser',
    'userId',
  ]);
  const logger = useLogger('DeckProvider');
  const { fetchWrapper } = useFetchWrapper();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const {
    selectedDeck,
    allDecks,
    handleSelectDeck: setSelectedDeck,
    addCardToSelectedDeck: addCardToDeck,
    updateDeck: updateDeckDetails,
  } = useSelectedDeck();

  const {
    fetchDecks,
    createNewDeck,
    deleteDeck,
    error,
    addOneToDeck,
    removeOneFromDeck,
  } = useDeckManager();
  useEffect(() => {
    console.log('SELECTED DECK: ', selectedDeck);
  }, [selectedDeck]);

  const createApiUrl = useCallback(
    (path) => `${BASE_API_URL}/api/users/${userId}/decks${path}`,
    [userId]
  );

  const contextValue = useMemo(
    () => ({
      selectedDeck,
      allDecks,
      setSelectedDeck,
      fetchAllDecksForUser: fetchDecks,
      updateDeckDetails: updateDeckDetails,
      cards: selectedDeck?.cards || [],
      createUserDeck: createNewDeck,
      deleteUserDeck: deleteDeck,
      addOneToDeck,
      removeOneFromDeck,
      // addOneToDeck: (card, deck) => addCardToDeck([card], deck),
      // removeOneFromDeck: (card, deck) => removeCardFromDeck([card], deck),
      createApiUrl,
      isLoading,
      startLoading,
      stopLoading,
      fetchWrapper,
      logger,
      error,
      getCardQuantity: (cardId) => getCardQuantity(cardId, selectedDeck),
      getTotalCost: () => calculateAndUpdateTotalPrice(selectedDeck),
      userDecks: allDecks,
    }),
    [
      selectedDeck,
      allDecks,
      setSelectedDeck,
      fetchDecks,
      updateDeckDetails,
      createNewDeck,
      deleteDeck,
      addCardToDeck,
      createApiUrl,
      isLoading,
      startLoading,
      stopLoading,
      fetchWrapper,
      logger,
    ]
  );

  return (
    <DeckContext.Provider value={contextValue}>{children}</DeckContext.Provider>
  );
};

export const useDeckStore = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error('useDeckStore must be used within a DeckProvider');
  }
  return context;
};
