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
import { createApiUrl } from '../../Helpers.jsx';
import { BASE_API_URL } from '../../Helpers.jsx';
import {
  calculateAndUpdateTotalPrice,
  removeDuplicateDecks,
  formatCardData,
  defaultContextValue,
  handleCardAddition,
  handleCardUpdate,
} from './helpers.jsx';
import useFetchWrapper from '../../hooks/useFetchWrapper.jsx';
import { useAuthContext } from '../../AuthContext/authContext.js';
// import useCounter from '../hooks/useCounter.jsx';
import useLogger from '../../hooks/useLogger.jsx';
import useApiResponseHandler from '../../hooks/useApiResponseHandler.jsx';

export const DeckContext = createContext(defaultContextValue);

export const DeckProvider = ({ children }) => {
  const { userId, authUser } = useAuthContext();
  const fetchWrapper = useFetchWrapper();
  const prevUserIdRef = useRef(userId);
  const [deckData, setDeckData] = useState({});
  const [allDecks, setAllDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState({});
  const [selectedCards, setSelectedCards] = useState(selectedDeck?.cards || []);
  const handleApiResponse = useApiResponseHandler();
  const createApiUrl = useCallback(
    (path) =>
      `${process.env.REACT_APP_SERVER}/api/users/${userId}/decks${path}`,
    [userId]
  );
  const cardExists = (cardId, deck) =>
    deck?.cards?.some((card) => card.id === cardId);
  const logger = useLogger('DeckProvider');
  const fetchDecksForUser = useCallback(async () => {
    if (!userId) {
      console.error('No user ID found.');
      return null;
    }
    logger.logEvent('fetchDecksForUser', {});
    try {
      const url = `${BASE_API_URL}/${userId}/decks/allDecks`;
      const response = await fetchWrapper(url, 'GET');
      const data = handleApiResponse(response, 'fetchDecksForUser');

      return data;
    } catch (error) {
      console.error(`Failed to fetch decks for user: ${error.message}`);
      return null;
    }
  }, [userId]);
  const fetchAndSetDecks = useCallback(async () => {
    try {
      const data = await fetchDecksForUser();
      // console.log('Response from server for fetch decks:', data);

      if (data && data?.length > 0) {
        const uniqueDecks = removeDuplicateDecks(data);
        setAllDecks((prevDecks) =>
          removeDuplicateDecks([...prevDecks, ...uniqueDecks])
        );
        setDeckData(uniqueDecks[0] || {});
      } else {
        console.log('No decks found for user.', data);
        // No decks found for user
        const shouldCreateDeck = window.confirm(
          'No decks found. Would you like to create a new one?'
        );

        if (shouldCreateDeck) {
          const deckName = prompt('Enter the deck name:');
          const deckDescription = prompt('Enter the deck description:');
          await createUserDeck(userId, {
            name: deckName,
            description: deckDescription,
          });
        }
      }
    } catch (error) {
      console.error(`Failed to fetch decks: ${error.message}`);
    }
  }, [fetchDecksForUser, userId]);
  const updateAndSyncDeck = async (newDeckData) => {
    try {
      if (Array.isArray(newDeckData)) {
        // Handle array of deck data
        newDeckData.forEach(async (deck) => {
          // Update each deck in the array
          setAllDecks((prevDecks) => {
            const updatedDecks = prevDecks.map((d) =>
              d._id === deck._id ? deck : d
            );
            return prevDecks.some((d) => d._id === deck._id)
              ? updatedDecks
              : [...updatedDecks, deck];
          });

          // Synchronize each deck with backend
          if (deck._id && userId) {
            const url = `${BASE_API_URL}/${userId}/decks/${deck._id}/updateDeck`;
            console.log('Updating deck in backend:', deck);
            await fetchWrapper(url, 'PUT', { deck });
          } else {
            console.error('No deck ID or user ID found.');
          }
        });
        setSelectedDeck(newDeckData[0]);
      } else if (newDeckData && typeof newDeckData === 'object') {
        // Handle single deck object
        setSelectedDeck(newDeckData);
        setDeckData(newDeckData);
        setAllDecks((prevDecks) => {
          const newAllDecks = prevDecks.map((deck) =>
            deck._id === newDeckData._id ? newDeckData : deck
          );
          return prevDecks.some((deck) => deck._id === newDeckData._id)
            ? newAllDecks
            : [...newAllDecks, newDeckData];
        });

        // Synchronize with backend
        if (newDeckData._id && userId) {
          const url = `${BASE_API_URL}/${userId}/decks/${newDeckData._id}/updateDeck`;
          console.log('Updating deck in backend:', newDeckData);
          await fetchWrapper(url, 'PUT', { deck: newDeckData });
        } else {
          console.error('No deck ID or user ID found.');
        }
      } else {
        console.warn(
          'Unable to determine the type of deck data for update.',
          newDeckData
        );
        return;
      }
    } catch (error) {
      console.error(`Failed to update deck in backend: ${error.message}`);
    }
  };
  const createUserDeck = async (userId, newDeckInfo) => {
    try {
      const url = `${BASE_API_URL}/${userId}/decks/createDeck`;
      // const cards = Array.isArray(newDeckInfo.cards)
      //   ? newDeckInfo.cards.map(formatCardData)
      //   : [];
      console.log('NEW DECK INFO:', newDeckInfo);
      const data = await fetchWrapper(url, 'POST', {
        cards: [],
        totalPrice: 0,
        description: newDeckInfo?.description || '',
        name: newDeckInfo?.name || '',
        tags: newDeckInfo?.tags || [],
        color: newDeckInfo?.color || '',
      });
      console.log('NEW DECK DATA:', data);
      setDeckData(data.data);
      setSelectedDeck(data.data);
      setAllDecks((prevDecks) => [...prevDecks, data.data]);
    } catch (error) {
      console.error(`Failed to create a new deck: ${error.message}`);
    }
  };
  const deleteUserDeck = async (deckId) => {
    // if (!deckId) {
    //   setSelectedDeck(allDecks[0]);
    //   console.warn('No deck ID provided. Adding card to first deck in list.');
    // }

    try {
      // Making API call to delete the deck
      const url = `${BASE_API_URL}/${userId}/decks/${deckId}/deleteDeck`;
      await fetchWrapper(url, 'DELETE');

      // Update local state to reflect the deletion
      setAllDecks((prevDecks) =>
        prevDecks.filter((deck) => deck._id !== deckId)
      );
      if (selectedDeck?._id === deckId) {
        setSelectedDeck(null); // Clear the selected deck if it's the one being deleted
      }
    } catch (error) {
      console.error(`Failed to delete deck: ${error.message}`);
    }
  };
  const addCardToDeck = async (cards, deck) => {
    if (!deck) {
      console.error('Invalid deck data', deck);
      return;
    }

    try {
      const deckId = deck._id;
      const updates = cards.map((card) => {
        const existsInDeck = cardExists(card.id, deckId);
        return existsInDeck
          ? updateCardInDeck(deckId, card, 'increment')
          : addNewCardToDeck(deckId, card);
      });

      await Promise.all(updates);

      // Fetch and update the deck with new data
      const updatedDeck = await fetchDeckData(deckId);
      updateAndSyncDeck(updatedDeck);
    } catch (error) {
      console.error(`Failed to add card(s) to deck: ${error.message}`);
    }
  };

  const addNewCardToDeck = async (deckId, card) => {
    const response = await fetchWrapper(createApiUrl(`${deckId}/add`), 'POST', {
      cards: [{ ...card, quantity: 1 }],
    });
    return handleApiResponse(response, 'addCardToDeck');
  };

  const removeCardFromDeck = async (deckId, card) => {
    if (!deckId || !card) {
      console.error('Invalid deck or card data', deckId, card);
      return;
    }

    try {
      await fetchWrapper(createApiUrl(`${deckId}/remove`), 'POST', {
        cards: [card],
      });

      // Fetch and update the deck with new data
      const updatedDeck = await fetchDeckData(deckId);
      updateAndSyncDeck(updatedDeck);
    } catch (error) {
      console.error(`Failed to remove card from deck: ${error.message}`);
    }
  };

  const updateCardInDeck = async (deckId, card, action) => {
    try {
      const response = await fetchWrapper(
        createApiUrl(`${deckId}/updateCard`),
        'PUT',
        { card, action }
      );
      return handleApiResponse(response, 'updateCardInDeck');
    } catch (error) {
      console.error(`Failed to update card in deck: ${error.message}`);
    }
  };

  const fetchDeckData = async (deckId) => {
    try {
      const response = await fetchWrapper(createApiUrl(`${deckId}`), 'GET');
      return handleApiResponse(response, 'fetchDeckData');
    } catch (error) {
      console.error(`Failed to fetch deck data: ${error.message}`);
      return null;
    }
  };

  // const updateAndSyncDeck = (updatedDeck) => {
  //   setAllDecks((prevDecks) =>
  //     prevDecks.map((deck) =>
  //       deck._id === updatedDeck._id ? updatedDeck : deck
  //     )
  //   );
  //   if (selectedDeck._id === updatedDeck._id) {
  //     setSelectedDeck(updatedDeck);
  //   }
  // };

  // const addCardToDeck = async (cards, deck) => {
  //   if (!deck) {
  //     console.error('Invalid deck data', deck);
  //     return;
  //   }
  //   if (cardExists(cards[0].id, deck)) {
  //     return updateCardInDeck(deck, cards, 'increment');
  //   }
  //   let newCards = []; // Array to hold cards that are new to the collection
  //   let existingCards = []; // Array to hold cards that already exist in the collection

  //   logger.logEvent('addCardToDeck start', {
  //     cards,
  //     deck,
  //   });
  //   // Splitting the cards into new and existing ones based on their presence in the collection
  //   for (const card of cards) {
  //     if (cardExists(card.id, deck._id)) {
  //       // log card quantities
  //       console.log('Card exists in deck:', card.quantity);
  //       existingCards.push(card);
  //     } else {
  //       newCards.push(card);
  //     }
  //   }

  //   // Update existing cards if any
  //   if (existingCards.length > 0) {
  //     await updateCardInDeck(deck._id, existingCards, 'increment');
  //   }
  //   try {
  //     // Add new cards if any
  //     if (newCards.length > 0) {
  //       logger.logEvent('Add Card', {
  //         newCards,
  //         deck,
  //       });
  //       // TODO increment quantity of new cards
  //       newCards = newCards.map((card) => ({ ...card, quantity: 1 }));
  //       const response = await fetchWrapper(
  //         createApiUrl(`${deck._id}/add`),
  //         'POST',
  //         {
  //           cards: newCards,
  //         }
  //       );
  //       const { data } = handleApiResponse(response, 'addCardsToCollection');
  //       // respons data only has one collection not allCollections
  //       updateAndSyncDeck(data);
  //     }
  //   } catch (error) {
  //     console.error(`Failed to add card to deck: ${error.message}`);
  //   }
  // };
  // const removeCardFromDeck = async (deckId, card) => {
  //   if (!card) {
  //     console.error('Invalid card data', card);
  //     return;
  //   }
  //   if (!deckId) {
  //     setSelectedDeck(allDecks[0]);
  //     console.warn('No deck ID provided. Adding card to first deck in list.');
  //     deckId = allDecks[0]._id;
  //   }
  //   try {
  //     const url = `${BASE_API_URL}/${userId}/decks/${deckId}/remove`;
  //     const responseData = await fetchWrapper(url, 'POST', {
  //       cards: [card],
  //     });

  //     // Update deck data remotely
  //     updateAndSyncDeck(responseData.allDecks);

  //     // Update deck data locally
  //     if (selectedDeck._id === deckId) {
  //       const updatedDeck = responseData.allDecks.find(
  //         (deck) => deck._id === deckId
  //       ).cards;
  //       const updatedCards = updatedDeck?.cards;
  //       setSelectedDeck({ ...selectedDeck, cards: updatedCards });
  //     }
  //   } catch (error) {
  //     console.error(`Failed to remove card from deck: ${error.message}`);
  //   }
  // };
  // const updateCardInDeck = async (updatedCard, deckId, increment) => {
  //   if (!deckId || !updatedCard || !updatedCard.id) {
  //     console.error('Invalid card data', deckId, updatedCard);
  //     return;
  //   }

  //   try {
  //     const currentDeck = allDecks.find((deck) => deck._id === deckId);
  //     if (!currentDeck) {
  //       throw new Error('Deck not found locally');
  //     }

  //     const originalCard = currentDeck?.cards?.find(
  //       (card) => card.id === updatedCard.id
  //     );
  //     if (originalCard && originalCard.quantity === updatedCard.quantity) {
  //       console.log('No change in card quantity. Skipping update.');
  //       return; // Skip update if quantity hasn't changed
  //     }

  //     const updatedCards = handleCardUpdate(currentDeck.cards, updatedCard);
  //     const updatedDeck = { ...currentDeck, cards: updatedCards };

  //     if (selectedDeck._id === deckId) {
  //       setSelectedDeck(updatedDeck);
  //     }

  //     updateAndSyncDeck([
  //       ...allDecks.filter((deck) => deck._id !== deckId),
  //       updatedDeck,
  //     ]);

  //     const url = `${BASE_API_URL}/${userId}/decks/${deckId}/update`;
  //     await fetchWrapper(url, 'PUT', { cards: [updatedCard] });
  //   } catch (error) {
  //     console.error(`Failed to update card in deck: ${error.message}`);
  //   }
  // };
  const updateDeckDetails = async (deckId, updatedInfo) => {
    const { name, description, tags, color } = updatedInfo;
    console.log('Updating deck details:', updatedInfo);
    if (!userId) {
      console.error('User ID is missing.');
      return;
    }
    if (!deckId) {
      console.error('Deck ID is missing.');
      return;
    }

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
      await fetchWrapper(deckEndpoint, 'PUT', {
        name: name,
        description: description,
        tags: tags,
        color: color,
      });
    } catch (error) {
      console.error('Error updating deck details:', error);
    }
  };
  const getCardQuantity = (cardId) => {
    const foundCard = selectedDeck?.cards.find((item) => item.id === cardId);
    return foundCard?.quantity || 0;
  };
  const shouldFetchDecks = (prevUserId, currentUserId) => {
    return prevUserId !== currentUserId && currentUserId != null;
  };

  const contextValue = useMemo(
    () => ({
      deckData,
      allDecks,
      selectedDeck,
      userDecks: allDecks,
      selectedCards,
      setSelectedCards,
      totalQuantity: getCardQuantity,
      getTotalCost: () =>
        selectedDeck?.cards?.reduce((acc, card) => acc + (card.cost || 0), 0) ||
        0,
      setSelectedDeck,
      addOneToDeck: (card, deck) => addCardToDeck([card], deck),
      removeOneFromDeck: (card, deck) => removeCardFromDeck(deck._id, card),
      updateOneInDeck: (card, deckId) => updateCardInDeck(card, deckId),
      updateDeckDetails: (deckId, updatedInfo) =>
        updateDeckDetails(deckId, updatedInfo),
      createUserDeck,
      deleteUserDeck,
      updateAndSyncDeck,
      fetchAllDecksForUser: fetchAndSetDecks,
    }),
    [
      selectedDeck,
      allDecks,
      selectedCards,
      userId,
      deckData,
      addCardToDeck,
      removeCardFromDeck,
      updateCardInDeck,
      createUserDeck,
      deleteUserDeck,
      updateAndSyncDeck,
      fetchAndSetDecks,
    ]
  );

  useEffect(() => {
    console.log('DECKCONTEXT:', contextValue);
  }, [contextValue]);

  useEffect(() => {
    if (shouldFetchDecks(prevUserIdRef.current, userId)) {
      fetchAndSetDecks();
    }
    prevUserIdRef.current = userId;
  }, [userId, fetchAndSetDecks]);

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
