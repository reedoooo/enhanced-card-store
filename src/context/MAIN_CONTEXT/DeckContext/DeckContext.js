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
import { BASE_API_URL } from '../../Helpers.jsx';
import {
  calculateAndUpdateTotalPrice,
  defaultContextValue,
  getCardQuantity,
  shouldFetchDecks,
} from './helpers.jsx';
import { useAuthContext } from '../AuthContext/authContext.js';
import useFetchWrapper from '../../hooks/useFetchWrapper.jsx';
import useLogger from '../../hooks/useLogger.jsx';
import useApiResponseHandler from '../../hooks/useApiResponseHandler.jsx';
import { useLoading } from '../../hooks/useLoading.jsx';
import { DEFAULT_DECK } from '../../constants.jsx';

export const DeckContext = createContext(defaultContextValue);

export const DeckProvider = ({ children }) => {
  const { userId, authUser } = useAuthContext();
  const handleApiResponse = useApiResponseHandler();
  const logger = useLogger('DeckProvider');
  const { fetchWrapper, responseCache } = useFetchWrapper();
  const prevUserIdRef = useRef(userId);
  const [deckData, setDeckData] = useState({});
  const [allDecks, setAllDecks] = useState([DEFAULT_DECK]);
  const [selectedDeck, setSelectedDeck] = useState(DEFAULT_DECK);
  const [selectedCards, setSelectedCards] = useState(selectedDeck?.cards || []);
  const [hasFetchedDecks, setHasFetchedDecks] = useState(false);
  const [error, setError] = useState(null);
  const { startLoading, stopLoading, isLoading } = useLoading();
  const updateStates = useCallback((data) => {
    setDeckData(data);
    setAllDecks(data?.data || []);
    setSelectedDeck(data?.data?.[0] || {});
  }, []);
  const createApiUrl = useCallback(
    (path) =>
      `${process.env.REACT_APP_SERVER}/api/users/${userId}/decks${path}`,
    [userId]
  );
  const updateSelectedDeck = useCallback((newDeck) => {
    console.log('Updating selected deck:', newDeck);
    setSelectedDeck(newDeck);
    setSelectedCards(newDeck?.cards || []);
  }, []);
  const fetchAndUpdateDecks = useCallback(async () => {
    const loadingID = 'fetchAndUpdateDecks';
    if (!userId || isLoading(loadingID) || hasFetchedDecks) return;
    try {
      const responseData = await fetchWrapper(
        createApiUrl('/allDecks'),
        'GET',
        null,
        loadingID
      );

      if (
        (responseData && responseData?.status === 200) ||
        responseData?.status === 201
      ) {
        console.log('SUCCESS: fetching decks');
        updateStates(responseData);
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'Failed to fetch decks');
      logger.logEvent('Failed to fetch decks', error.message);
    } finally {
      setHasFetchedDecks(true);
    }
  }, [
    userId,
    isLoading,
    hasFetchedDecks,
    createApiUrl,
    fetchWrapper,
    responseCache,
    startLoading,
    stopLoading,
    logger,
    setError,
    setDeckData,
    setAllDecks,
    setSelectedDeck,
    setHasFetchedDecks,
  ]);
  const updateDeckDetails = async (deckId, updatedInfo) => {
    const loadingID = 'updateDeckDetails';
    setError(null);
    const { name, description, tags, color } = updatedInfo;
    console.log('Updating deck details:', updatedInfo);
    const updatedDeck = {
      ...selectedDeck,
      name,
      description,
      tags,
      color,
    };

    setSelectedDeck(updatedDeck);
    setAllDecks((prevDecks) =>
      prevDecks.map((deck) => (deck._id === deckId ? updatedDeck : deck))
    );

    try {
      const deckEndpoint = createApiUrl(
        `${userId}/decks/${deckId}/deckDetails`
      );
      await fetchWrapper(
        deckEndpoint,
        'PUT',
        {
          name: name,
          description: description,
          tags: tags,
          color: color,
        },
        loadingID
      );
    } catch (error) {
      setError(error);
      console.error('Error updating deck details:', error);
    }
  };
  const createUserDeck = async (userId, newDeckInfo) => {
    const loadingID = 'createUserDeck';
    setError(null);
    try {
      const url = `${BASE_API_URL}/${userId}/decks/createDeck`;
      // const cards = Array.isArray(newDeckInfo.cards)
      //   ? newDeckInfo.cards.map(formatCardData)
      //   : [];
      console.log('NEW DECK INFO:', newDeckInfo);
      const data = await fetchWrapper(
        url,
        'POST',
        {
          cards: [],
          totalPrice: 0,
          description: newDeckInfo?.description || '',
          name: newDeckInfo?.name || '',
          tags: newDeckInfo?.tags || [],
          color: newDeckInfo?.color || '',
        },
        loadingID
      );
      console.log('NEW DECK DATA:', data);
      setDeckData(data.data);
      setSelectedDeck(data.data);
      setAllDecks((prevDecks) => [...prevDecks, data.data]);
    } catch (error) {
      setError(error);
      console.error(`Failed to create a new deck: ${error.message}`);
    }
  };
  const deleteUserDeck = async (deckId) => {
    const loadingID = 'deleteUserDeck';
    setError(null);
    try {
      const response = await fetchWrapper(
        `/${deckId}/deleteDeck`,
        'DELETE',
        {
          deckId,
        },
        loadingID
      );
      // Update local state to reflect the deletion
      setAllDecks((prevDecks) =>
        prevDecks.filter((deck) => deck._id !== deckId)
      );
      if (selectedDeck?._id === deckId) {
        setSelectedDeck(null); // Clear the selected deck if it's the one being deleted
      }
      return response;
    } catch (error) {
      setError(error);
      logger.logEvent(`Failed to delete deck: ${error.message}`, error);

      throw error;
    }
  };
  const addCardToDeck = async (cards, deck) => {
    const loadingID = 'addCardToDeck';
    setError(null);
    const newCards = [];
    const updatedCards = [];

    for (const card of cards) {
      const existingCard = deck?.cards?.find((c) => c.id === card.id);

      if (existingCard) {
        // Assuming there's a function to update cards in a deck
        existingCard.tag = 'incremented';
        updatedCards.push(existingCard);
      } else {
        card.tag = 'added';
        newCards.push({ ...card, quantity: 1 });
      }
    }

    if (newCards.length > 0) {
      logger.logEvent('addCardsToDeck ADD', {
        newCards,
        deck,
      });
      const response = await fetchWrapper(
        createApiUrl(`/${deck._id}/add`),
        'POST',
        { cards: newCards },
        loadingID
      );
      const data = handleApiResponse(response, 'addCardsToDeck');
      updateSelectedDeck(data.deck); // Assuming a function to update the current deck
    }
    if (updatedCards.length > 0) {
      logger.logEvent('addCardsToDeck UPDATE', {
        updatedCards,
        deck,
      });
      const response = await fetchWrapper(
        createApiUrl(`/${deck._id}/update`),
        'PUT',
        { cards: updatedCards, type: 'increment' },
        loadingID
      );
      const data = handleApiResponse(response, 'addCardsToDeck');
      updateSelectedDeck(data.deck); // Assuming a function to update the current deck
    }
  };
  const removeCardFromDeck = async (cards, cardIds, deck) => {
    const loadingID = 'removeCardFromDeck';
    setError(null);
    const deckId = deck?._id;
    const cardsToRemove = [];
    const cardsToDecrement = [];

    for (const card of cards) {
      const existingCard = deck?.cards?.find((c) => c.id === card.id);
      if (existingCard) {
        if (existingCard?.quantity > 1) {
          // Decrement card quantity
          existingCard.tag = 'decremented';
          cardsToDecrement.push(existingCard);
        } else {
          // Quantity is 1, remove the card
          card.tag = 'removed';
          cardsToRemove.push(card);
        }
      }
    }

    try {
      if (cardsToRemove.length > 0) {
        logger.logEvent(
          'removeCardsFromDeck REMOVE',
          {
            deckId,
            cardsToRemove,
          },
          loadingID
        );
        const response = await fetchWrapper(
          createApiUrl(`/${deckId}/remove`),
          'DELETE',
          { cards: cardsToRemove }
        );
        const data = handleApiResponse(response, 'removeCardsFromDeck');
        updateSelectedDeck(data); // Assuming a function to update the current deck
      }

      if (cardsToDecrement.length > 0) {
        logger.logEvent('removeCardsFromDeck DECREMENT', {
          deckId,
          cardsToDecrement,
        });
        const response = await fetchWrapper(
          createApiUrl(`/${deckId}/update`),
          'PUT',
          { cards: cardsToDecrement, type: 'decrement' },
          loadingID
        );
        const data = handleApiResponse(response, 'removeCardsFromDeck');
        if (data.includes('cards')) {
          updateSelectedDeck(data); // Assuming a function to update the current deck
        }
      }
    } catch (error) {
      setError(error);
      logger.logEvent('removeCardsFromDeck error', error);
      throw error;
    }
  };

  const contextValue = useMemo(
    () => ({
      error,

      deckData,
      allDecks,
      selectedDeck,
      userDecks: allDecks,
      selectedCards,
      setSelectedCards,
      // totalQuantity: selectedDeck?.cards?.length || 0,
      getCardQuantity: (cardId) => getCardQuantity(cardId, selectedDeck),
      // getTotalCost: () =>
      //   selectedDeck?.cards?.reduce((acc, card) => acc + (card.cost || 0), 0) ||
      //   0,
      setSelectedDeck,
      getTotalCost: () => calculateAndUpdateTotalPrice(selectedDeck),
      addOneToDeck: (card, deck) => addCardToDeck([card], deck),
      removeOneFromDeck: (card, deck) => removeCardFromDeck([card], deck),
      // addOneToDeck: (card, deck) => handleCardAddition(card, deck),
      // removeOneFromDeck: (card, deck) => handleCardUpdate(card, deck),
      updateDeckDetails: (deckId, updatedInfo) =>
        updateDeckDetails(deckId, updatedInfo),
      createUserDeck,
      deleteUserDeck,
      // updateAndSyncDeck,
      fetchAllDecksForUser: fetchAndUpdateDecks,
    }),
    [
      selectedDeck,
      allDecks,
      selectedCards,
      userId,
      deckData,
      addCardToDeck,
      removeCardFromDeck,
      createUserDeck,
      deleteUserDeck,
      updateDeckDetails,
      fetchAndUpdateDecks,
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
// !--------------
// useEffect(() => {
//   if (userId && !hasFetchedDecks) {
//     fetchAndUpdateDecks();
//   }
// }, [userId, hasFetchedDecks, fetchAndUpdateDecks]);

// useEffect(() => {
//   // This effect seems to be redundant if hasFetchedDecks is properly set in fetchAndUpdateDecks
//   // Assuming deckData is the correct state being updated by fetchAndUpdateDecks
//   if (hasFetchedDecks && deckData?.length > 0) {
//     setAllDecks(deckData);
//     setSelectedDeck(deckData[0]);
//   }
// }, [hasFetchedDecks, deckData, setAllDecks, setSelectedDeck]);

// useEffect(() => {
//   console.log('DECKCONTEXT:', contextValue);
// }, [contextValue]);

// useEffect(() => {
//   if (shouldFetchDecks(prevUserIdRef.current, userId)) {
//     fetchAndUpdateDecks();
//   }
//   prevUserIdRef.current = userId;
// }, [userId, fetchAndUpdateDecks]); // fetchAndUpdateDecks is now stable and won't change unless necessary

// const updateAndSyncDeck = async (newDeckData) => {
//   try {
//     if (Array.isArray(newDeckData)) {
//       // Handle array of deck data
//       newDeckData.forEach(async (deck) => {
//         // Update each deck in the array
//         setAllDecks((prevDecks) => {
//           const updatedDecks = prevDecks.map((d) =>
//             d._id === deck._id ? deck : d
//           );
//           return prevDecks.some((d) => d._id === deck._id)
//             ? updatedDecks
//             : [...updatedDecks, deck];
//         });

//         // Synchronize each deck with backend
//         if (deck._id && userId) {
//           const url = `${BASE_API_URL}/${userId}/decks/${deck._id}/updateDeck`;
//           console.log('Updating deck in backend:', deck);
//           await fetchWrapper(url, 'PUT', { deck });
//         } else {
//           console.error('No deck ID or user ID found.');
//         }
//       });
//       setSelectedDeck(newDeckData[0]);
//     } else if (newDeckData && typeof newDeckData === 'object') {
//       // Handle single deck object
//       setSelectedDeck(newDeckData);
//       setDeckData(newDeckData);
//       setAllDecks((prevDecks) => {
//         const newAllDecks = prevDecks.map((deck) =>
//           deck._id === newDeckData._id ? newDeckData : deck
//         );
//         return prevDecks.some((deck) => deck._id === newDeckData._id)
//           ? newAllDecks
//           : [...newAllDecks, newDeckData];
//       });

//       // Synchronize with backend
//       if (newDeckData._id && userId) {
//         const url = `${BASE_API_URL}/${userId}/decks/${newDeckData._id}/updateDeck`;
//         console.log('Updating deck in backend:', newDeckData);
//         await fetchWrapper(url, 'PUT', { deck: newDeckData });
//       } else {
//         console.error('No deck ID or user ID found.');
//       }
//     } else {
//       console.warn(
//         'Unable to determine the type of deck data for update.',
//         newDeckData
//       );
//       return;
//     }
//   } catch (error) {
//     console.error(`Failed to update deck in backend: ${error.message}`);
//   }
// };
// !--------------
// const deleteUserDeck = async (deckId) => {
//   // if (!deckId) {
//   //   setSelectedDeck(allDecks[0]);
//   //   console.warn('No deck ID provided. Adding card to first deck in list.');
//   // }

//   try {
//     const url = `${BASE_API_URL}/${userId}/decks/${deckId}/deleteDeck`;
//     await fetchWrapper(url, 'DELETE');

//     // Update local state to reflect the deletion
//     setAllDecks((prevDecks) =>
//       prevDecks.filter((deck) => deck._id !== deckId)
//     );
//     if (selectedDeck?._id === deckId) {
//       setSelectedDeck(null); // Clear the selected deck if it's the one being deleted
//     }
//   } catch (error) {
//     console.error(`Failed to delete deck: ${error.message}`);
//   }
// };
// const updateCardInDeck = async (deckId, card, action) => {
//   try {
//     const response = await fetchWrapper(
//       createApiUrl(`${deckId}/updateCard`),
//       'PUT',
//       { card, action }
//     );
//     return handleApiResponse(response, 'updateCardInDeck');
//   } catch (error) {
//     console.error(`Failed to update card in deck: ${error.message}`);
//   }
// };
// const fetchDeckData = async (deckId) => {
//   try {
//     const response = await fetchWrapper(createApiUrl(`${deckId}`), 'GET');
//     return handleApiResponse(response, 'fetchDeckData');
//   } catch (error) {
//     console.error(`Failed to fetch deck data: ${error.message}`);
//     return null;
//   }
// };
// const fetchAndSetDecks = useCallback(async () => {
//   try {
//     const data = await fetchDecksForUser();
//     // console.log('Response from server for fetch decks:', data);

//     if (data && data?.length > 0) {
//       const uniqueDecks = removeDuplicateDecks(data);
//       setAllDecks((prevDecks) =>
//         removeDuplicateDecks([...prevDecks, ...uniqueDecks])
//       );
//       setDeckData(uniqueDecks[0] || {});
//     } else {
//       console.log('No decks found for user.', data);
//       // No decks found for user
//       const shouldCreateDeck = window.confirm(
//         'No decks found. Would you like to create a new one?'
//       );

//       if (shouldCreateDeck) {
//         const deckName = prompt('Enter the deck name:');
//         const deckDescription = prompt('Enter the deck description:');
//         await createUserDeck(userId, {
//           name: deckName,
//           description: deckDescription,
//         });
//       }
//     }
//   } catch (error) {
//     console.error(`Failed to fetch decks: ${error.message}`);
//   }
// }, [fetchDecksForUser, userId]);

// const fetchDecksForUser = useCallback(async () => {
//   if (!userId) {
//     console.error('No user ID found.');
//     return null;
//   }
//   logger.logEvent('fetchDecksForUser', {});
//   try {
//     const url = `${BASE_API_URL}/${userId}/decks/allDecks`;
//     const response = await fetchWrapper(url, 'GET');
//     const data = handleApiResponse(response, 'fetchDecksForUser');

//     return data;
//   } catch (error) {
//     console.error(`Failed to fetch decks for user: ${error.message}`);
//     return null;
//   }
// }, [userId]);
// const addNewCardToDeck = async (cards, deck) => {
//   const response = await fetchWrapper(
//     createApiUrl(`${deck._id}/add`),
//     'POST',
//     {
//       cards: cards,
//     }
//   );
//   return handleApiResponse(response, 'addCardToDeck');
// };
// const addCardToDeck = async (cards, deck) => {
//   if (!deck) {
//     console.error('Invalid deck data', deck);
//     return;
//   }

//   try {
//     const deckId = deck._id;
//     const updates = cards.map((card) => {
//       const existsInDeck = cardExists(card.id, deckId);
//       return existsInDeck
//         ? updateCardInDeck(deckId, card, 'increment')
//         : addNewCardToDeck(deckId, card);
//     });

//     await Promise.all(updates);

//     // Fetch and update the deck with new data
//     const updatedDeck = await fetchDeckData(deckId);
//     updateAndSyncDeck(updatedDeck);
//   } catch (error) {
//     console.error(`Failed to add card(s) to deck: ${error.message}`);
//   }
// };
