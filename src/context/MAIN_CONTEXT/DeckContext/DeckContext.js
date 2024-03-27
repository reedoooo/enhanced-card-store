// /* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import {
  BASE_API_URL,
  calculateAndUpdateTotalPrice,
  getCardQuantity,
} from '../../Helpers.jsx';
import { useAuthContext } from '../AuthContext/authContext.js';
import useFetchWrapper from '../../hooks/useFetchWrapper.jsx';
import useLogger from '../../hooks/useLogger.jsx';
import useApiResponseHandler from '../../hooks/useApiResponseHandler.jsx';
import { useLoading } from '../../hooks/useLoading.jsx';
import useSelectedDeck from './useSelectedDeck.jsx'; // Import the deck management hook
import useDeckManager from './useDeckManager.jsx'; // Import the deck management hook

export const DeckContext = createContext();

export const DeckProvider = ({ children }) => {
  const { userId } = useAuthContext();
  const handleApiResponse = useApiResponseHandler();
  const logger = useLogger('DeckProvider');
  const { fetchWrapper } = useFetchWrapper();
  const { startLoading, stopLoading, isLoading } = useLoading();

  // Utilizing useSelectedDeck hook for managing selected deck and its operations
  const {
    selectedDeck,
    allDecks,
    setSelectedDeck,
    fetchAndUpdateDecks,
    updateDeckDetails,
    createUserDeck,
    deleteUserDeck,
    addCardToDeck,
    removeCardFromDeck,
  } = useSelectedDeck();

  const {
    fetchDecks,
    createNewDeck,
    deleteDeck,
    updateDeck,
    error,
    hasFetchedDecks,
    handleError,
    setSelectedDeckError,
    addCardsToDeck,
    removeCardsFromDeck,
    addOneToDeck,
    removeOneFromDeck,
  } = useDeckManager();

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
      handleApiResponse,
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
      removeCardFromDeck,
      createApiUrl,
      isLoading,
      startLoading,
      stopLoading,
      fetchWrapper,
      handleApiResponse,
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

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useCallback,
//   useContext,
//   useRef,
//   useMemo,
// } from 'react';
// import { BASE_API_URL } from '../../Helpers.jsx';
// import {
//   calculateAndUpdateTotalPrice,
//   defaultContextValue,
//   getCardQuantity,
//   shouldFetchDecks,
// } from './helpers.jsx';
// import { useAuthContext } from '../AuthContext/authContext.js';
// import useFetchWrapper from '../../hooks/useFetchWrapper.jsx';
// import useLogger from '../../hooks/useLogger.jsx';
// import useApiResponseHandler from '../../hooks/useApiResponseHandler.jsx';
// import { useLoading } from '../../hooks/useLoading.jsx';
// import { DEFAULT_DECK } from '../../constants.jsx';
// import useSelectedDeck from './useSelectedDeck.jsx'; // Import your newly created hook

// export const DeckContext = createContext(defaultContextValue);

// export const DeckProvider = ({ children }) => {
//   const { userId, authUser } = useAuthContext();
//   const handleApiResponse = useApiResponseHandler();
//   const logger = useLogger('DeckProvider');
//   const { fetchWrapper, responseCache } = useFetchWrapper();
//   const prevUserIdRef = useRef(userId);
//   const [deckData, setDeckData] = useState({});
//   // const [allDecks, setAllDecks] = useState([DEFAULT_DECK]);
//   // const [selectedDeck, setSelectedDeck] = useState(DEFAULT_DECK);
//   const [selectedCards, setSelectedCards] = useState(selectedDeck?.cards || []);
//   const [hasFetchedDecks, setHasFetchedDecks] = useState(false);
//   const [error, setError] = useState(null);
//   const { startLoading, stopLoading, isLoading } = useLoading();
//   const {
//     selectedDeckId,
//     selectedDeck,
//     allDecks,
//     updateDeckField,
//     addNewDeck,
//     removeDeck,
//     setSelectedDeck,
//   } = useSelectedDeck();
//   const updateStates = useCallback((data) => {
//     setDeckData(data);
//     setAllDecks(data?.data || []);
//     setSelectedDeck(data?.data?.[0] || {});
//   }, []);
//   const createApiUrl = useCallback(
//     (path) =>
//       `${process.env.REACT_APP_SERVER}/api/users/${userId}/decks${path}`,
//     [userId]
//   );
//   const updateSelectedDeck = useCallback((newDeck) => {
//     console.log('Updating selected deck:', newDeck);
//     setSelectedDeck(newDeck);
//     setSelectedCards(newDeck?.cards || []);
//   }, []);
//   const fetchAndUpdateDecks = useCallback(async () => {
//     const loadingID = 'fetchAndUpdateDecks';
//     if (!userId || isLoading(loadingID) || hasFetchedDecks) return;
//     try {
//       const responseData = await fetchWrapper(
//         createApiUrl('/allDecks'),
//         'GET',
//         null,
//         loadingID
//       );

//       if (
//         (responseData && responseData?.status === 200) ||
//         responseData?.status === 201
//       ) {
//         console.log('SUCCESS: fetching decks');
//         updateStates(responseData);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(error.message || 'Failed to fetch decks');
//       logger.logEvent('Failed to fetch decks', error.message);
//     } finally {
//       setHasFetchedDecks(true);
//     }
//   }, [
//     userId,
//     isLoading,
//     hasFetchedDecks,
//     createApiUrl,
//     fetchWrapper,
//     responseCache,
//     startLoading,
//     stopLoading,
//     logger,
//     setError,
//     setDeckData,
//     setAllDecks,
//     setSelectedDeck,
//     setHasFetchedDecks,
//   ]);
//   const updateDeckDetails = async (deckId, updatedInfo) => {
//     const loadingID = 'updateDeckDetails';
//     setError(null);
//     const { name, description, tags, color } = updatedInfo;
//     console.log('Updating deck details:', updatedInfo);
//     const updatedDeck = {
//       ...selectedDeck,
//       name,
//       description,
//       tags,
//       color,
//     };

//     setSelectedDeck(updatedDeck);
//     setAllDecks((prevDecks) =>
//       prevDecks.map((deck) => (deck._id === deckId ? updatedDeck : deck))
//     );

//     try {
//       const deckEndpoint = createApiUrl(
//         `${userId}/decks/${deckId}/deckDetails`
//       );
//       await fetchWrapper(
//         deckEndpoint,
//         'PUT',
//         {
//           name: name,
//           description: description,
//           tags: tags,
//           color: color,
//         },
//         loadingID
//       );
//     } catch (error) {
//       setError(error);
//       console.error('Error updating deck details:', error);
//     }
//   };
//   const createUserDeck = async (userId, newDeckInfo) => {
//     const loadingID = 'createUserDeck';
//     setError(null);
//     try {
//       const url = `${BASE_API_URL}/${userId}/decks/createDeck`;
//       // const cards = Array.isArray(newDeckInfo.cards)
//       //   ? newDeckInfo.cards.map(formatCardData)
//       //   : [];
//       console.log('NEW DECK INFO:', newDeckInfo);
//       const data = await fetchWrapper(
//         url,
//         'POST',
//         {
//           cards: [],
//           totalPrice: 0,
//           description: newDeckInfo?.description || '',
//           name: newDeckInfo?.name || '',
//           tags: newDeckInfo?.tags || [],
//           color: newDeckInfo?.color || '',
//         },
//         loadingID
//       );
//       console.log('NEW DECK DATA:', data);
//       setDeckData(data.data);
//       setSelectedDeck(data.data);
//       setAllDecks((prevDecks) => [...prevDecks, data.data]);
//     } catch (error) {
//       setError(error);
//       console.error(`Failed to create a new deck: ${error.message}`);
//     }
//   };
//   const deleteUserDeck = async (deckId) => {
//     const loadingID = 'deleteUserDeck';
//     setError(null);
//     try {
//       const response = await fetchWrapper(
//         `/${deckId}/deleteDeck`,
//         'DELETE',
//         {
//           deckId,
//         },
//         loadingID
//       );
//       // Update local state to reflect the deletion
//       setAllDecks((prevDecks) =>
//         prevDecks.filter((deck) => deck._id !== deckId)
//       );
//       if (selectedDeck?._id === deckId) {
//         setSelectedDeck(null); // Clear the selected deck if it's the one being deleted
//       }
//       return response;
//     } catch (error) {
//       setError(error);
//       logger.logEvent(`Failed to delete deck: ${error.message}`, error);

//       throw error;
//     }
//   };
//   const addCardToDeck = async (cards, deck) => {
//     const loadingID = 'addCardToDeck';
//     setError(null);
//     const newCards = [];
//     const updatedCards = [];

//     for (const card of cards) {
//       const existingCard = deck?.cards?.find((c) => c.id === card.id);

//       if (existingCard) {
//         // Assuming there's a function to update cards in a deck
//         existingCard.tag = 'incremented';
//         updatedCards.push(existingCard);
//       } else {
//         card.tag = 'added';
//         newCards.push({ ...card, quantity: 1 });
//       }
//     }

//     if (newCards.length > 0) {
//       logger.logEvent('addCardsToDeck ADD', {
//         newCards,
//         deck,
//       });
//       const response = await fetchWrapper(
//         createApiUrl(`/${deck._id}/add`),
//         'POST',
//         { cards: newCards },
//         loadingID
//       );
//       const data = handleApiResponse(response, 'addCardsToDeck');
//       updateSelectedDeck(data.deck); // Assuming a function to update the current deck
//     }
//     if (updatedCards.length > 0) {
//       logger.logEvent('addCardsToDeck UPDATE', {
//         updatedCards,
//         deck,
//       });
//       const response = await fetchWrapper(
//         createApiUrl(`/${deck._id}/update`),
//         'PUT',
//         { cards: updatedCards, type: 'increment' },
//         loadingID
//       );
//       const data = handleApiResponse(response, 'addCardsToDeck');
//       updateSelectedDeck(data.deck); // Assuming a function to update the current deck
//     }
//   };
//   const removeCardFromDeck = async (cards, cardIds, deck) => {
//     const loadingID = 'removeCardFromDeck';
//     setError(null);
//     const deckId = deck?._id;
//     const cardsToRemove = [];
//     const cardsToDecrement = [];

//     for (const card of cards) {
//       const existingCard = deck?.cards?.find((c) => c.id === card.id);
//       if (existingCard) {
//         if (existingCard?.quantity > 1) {
//           // Decrement card quantity
//           existingCard.tag = 'decremented';
//           cardsToDecrement.push(existingCard);
//         } else {
//           // Quantity is 1, remove the card
//           card.tag = 'removed';
//           cardsToRemove.push(card);
//         }
//       }
//     }

//     try {
//       if (cardsToRemove.length > 0) {
//         logger.logEvent(
//           'removeCardsFromDeck REMOVE',
//           {
//             deckId,
//             cardsToRemove,
//           },
//           loadingID
//         );
//         const response = await fetchWrapper(
//           createApiUrl(`/${deckId}/remove`),
//           'DELETE',
//           { cards: cardsToRemove }
//         );
//         const data = handleApiResponse(response, 'removeCardsFromDeck');
//         updateSelectedDeck(data); // Assuming a function to update the current deck
//       }

//       if (cardsToDecrement.length > 0) {
//         logger.logEvent('removeCardsFromDeck DECREMENT', {
//           deckId,
//           cardsToDecrement,
//         });
//         const response = await fetchWrapper(
//           createApiUrl(`/${deckId}/update`),
//           'PUT',
//           { cards: cardsToDecrement, type: 'decrement' },
//           loadingID
//         );
//         const data = handleApiResponse(response, 'removeCardsFromDeck');
//         if (data.includes('cards')) {
//           updateSelectedDeck(data); // Assuming a function to update the current deck
//         }
//       }
//     } catch (error) {
//       setError(error);
//       logger.logEvent('removeCardsFromDeck error', error);
//       throw error;
//     }
//   };

//   const contextValue = useMemo(
//     () => ({
//       error,

//       deckData,
//       allDecks,
//       selectedDeck,
//       userDecks: allDecks,
//       selectedCards,
//       setSelectedCards,
//       // totalQuantity: selectedDeck?.cards?.length || 0,
//       getCardQuantity: (cardId) => getCardQuantity(cardId, selectedDeck),
//       // getTotalCost: () =>
//       //   selectedDeck?.cards?.reduce((acc, card) => acc + (card.cost || 0), 0) ||
//       //   0,
//       setSelectedDeck,
//       getTotalCost: () => calculateAndUpdateTotalPrice(selectedDeck),
//       addOneToDeck: (card, deck) => addCardToDeck([card], deck),
//       removeOneFromDeck: (card, deck) => removeCardFromDeck([card], deck),
//       // addOneToDeck: (card, deck) => handleCardAddition(card, deck),
//       // removeOneFromDeck: (card, deck) => handleCardUpdate(card, deck),
//       updateDeckDetails: (deckId, updatedInfo) =>
//         updateDeckDetails(deckId, updatedInfo),
//       createUserDeck,
//       deleteUserDeck,
//       // updateAndSyncDeck,
//       fetchAllDecksForUser: fetchAndUpdateDecks,
//     }),
//     [
//       selectedDeck,
//       allDecks,
//       selectedCards,
//       userId,
//       deckData,
//       addCardToDeck,
//       removeCardFromDeck,
//       createUserDeck,
//       deleteUserDeck,
//       updateDeckDetails,
//       fetchAndUpdateDecks,
//     ]
//   );
//   return (
//     <DeckContext.Provider value={contextValue}>{children}</DeckContext.Provider>
//   );
// };

// export const useDeckStore = () => {
//   const context = useContext(DeckContext);
//   if (!context) {
//     throw new Error('useDeckStore must be used within a DeckProvider');
//   }
//   return context;
// };
