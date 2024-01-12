/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { useCookies } from 'react-cookie';
import { createApiUrl } from '../Helpers.jsx';
import { BASE_API_URL } from '../Helpers.jsx';
import {
  calculateAndUpdateTotalPrice,
  removeDuplicateDecks,
  formatCardData,
  defaultContextValue,
  handleCardAddition,
  handleCardUpdate,
} from './helpers.jsx';
import useFetchWrapper from '../hooks/useFetchWrapper.jsx';

export const DeckContext = createContext(defaultContextValue);

export const DeckProvider = ({ children }) => {
  const [cookies] = useCookies(['authUser']);
  const userId = cookies?.authUser?.userId;
  const fetchWrapper = useFetchWrapper();
  const [prevUserId, setPrevUserId] = useState(null);
  const [deckData, setDeckData] = useState({});
  const [allDecks, setAllDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState({});
  const [selectedCards, setSelectedCards] = useState(selectedDeck?.cards || []);

  const fetchDecksForUser = useCallback(async () => {
    if (!userId) {
      console.error('No user ID found.');
      return null;
    }
    try {
      const url = `${BASE_API_URL}/${userId}/decks`;
      return await fetchWrapper(url, 'GET');
    } catch (error) {
      console.error(`Failed to fetch decks for user: ${error.message}`);
      return null;
    }
  }, [userId]);
  const fetchAndSetDecks = useCallback(async () => {
    try {
      const { message, data } = await fetchDecksForUser();
      console.log('Response from server for fetch decks:', message, data);

      if (data && data?.length > 0) {
        const uniqueDecks = removeDuplicateDecks(data);
        setAllDecks((prevDecks) =>
          removeDuplicateDecks([...prevDecks, ...uniqueDecks])
        );
        setDeckData(uniqueDecks[0] || {});
      } else {
        console.log('No decks found for user.', data.data);
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

  const addCardToDeck = async (newCard, deckId) => {
    if (!newCard) {
      console.error('Invalid card data', newCard);
      return;
    }
    if (!deckId) {
      setSelectedDeck(allDecks[0]);
      console.warn('No deck ID provided. Adding card to first deck in list.');
      deckId = allDecks[0]?._id;
    }
    try {
      // Update deck data locally
      const url = `${BASE_API_URL}/${userId}/decks/${deckId}/add`;
      const responseData = await fetchWrapper(url, 'POST', {
        cards: [newCard],
      });

      if (selectedDeck._id === deckId) {
        const updatedCards = handleCardAddition(selectedDeck.cards, newCard);
        setSelectedDeck({ ...selectedDeck, cards: updatedCards });
      }
      updateAndSyncDeck(responseData.allDecks);
    } catch (error) {
      console.error(`Failed to add card to deck: ${error.message}`);
    }
  };
  const removeCardFromDeck = async (deckId, card) => {
    if (!card) {
      console.error('Invalid card data', card);
      return;
    }
    if (!deckId) {
      setSelectedDeck(allDecks[0]);
      console.warn('No deck ID provided. Adding card to first deck in list.');
      deckId = allDecks[0]._id;
    }
    try {
      const url = `${BASE_API_URL}/${userId}/decks/${deckId}/remove`;
      const responseData = await fetchWrapper(url, 'POST', {
        cards: [card],
      });

      // Update deck data remotely
      updateAndSyncDeck(responseData.allDecks);

      // Update deck data locally
      if (selectedDeck._id === deckId) {
        const updatedDeck = responseData.allDecks.find(
          (deck) => deck._id === deckId
        ).cards;
        const updatedCards = updatedDeck?.cards;
        setSelectedDeck({ ...selectedDeck, cards: updatedCards });
      }
    } catch (error) {
      console.error(`Failed to remove card from deck: ${error.message}`);
    }
  };
  const updateCardInDeck = async (updatedCard, deckId) => {
    if (!deckId || !updatedCard || !updatedCard.id) {
      console.error('Invalid card data', deckId, updatedCard);
      return;
    }

    try {
      const currentDeck = allDecks.find((deck) => deck._id === deckId);
      if (!currentDeck) {
        throw new Error('Deck not found locally');
      }

      const originalCard = currentDeck?.cards?.find(
        (card) => card.id === updatedCard.id
      );
      if (originalCard && originalCard.quantity === updatedCard.quantity) {
        console.log('No change in card quantity. Skipping update.');
        return; // Skip update if quantity hasn't changed
      }

      const updatedCards = handleCardUpdate(currentDeck.cards, updatedCard);
      const updatedDeck = { ...currentDeck, cards: updatedCards };

      if (selectedDeck._id === deckId) {
        setSelectedDeck(updatedDeck);
      }

      updateAndSyncDeck([
        ...allDecks.filter((deck) => deck._id !== deckId),
        updatedDeck,
      ]);

      const url = `${BASE_API_URL}/${userId}/decks/${deckId}/update`;
      await fetchWrapper(url, 'PUT', { cards: [updatedCard] });
    } catch (error) {
      console.error(`Failed to update card in deck: ${error.message}`);
    }
  };
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
    // Fetch decks if there was no previous user and now there is one
    // or if the user has changed
    return (!prevUserId && currentUserId) || prevUserId !== currentUserId;
  };

  const contextValue = {
    deckData,
    allDecks,
    selectedDeck,
    userDecks: allDecks,
    selectedCards,
    setSelectedCards,
    totalQuantity: getCardQuantity,
    getCardQuantity: getCardQuantity,
    getTotalCost: () =>
      selectedDeck?.cards?.reduce((acc, card) => acc + (card.cost || 0), 0) ||
      0,
    setSelectedDeck,
    // addOneToDeck: (card) => addOrRemoveCard(card, true, false),
    // removeOneFromDeck: (card) => addOrRemoveCard(card, false, true),
    addOneToDeck: (card, deckId) => addCardToDeck(card, deckId),
    removeOneFromDeck: (card, deckId) => removeCardFromDeck(card, deckId),
    updateOneInDeck: (card, deckId, userId) =>
      updateCardInDeck(card, deckId, userId),
    updateDeckDetails: (deckId, updatedInfo) =>
      updateDeckDetails(deckId, updatedInfo),
    createUserDeck,
    deleteUserDeck,

    updateAndSyncDeck,
    fetchAllDecksForUser: fetchAndSetDecks,
    // addCardsToDeck: addCardToDeck,
    // removeCardsFromDeck: removeCardFromDeck,
    // updateCardsInDeck: updateCardInDeck,
  };

  useEffect(() => {
    console.log('DECKCONTEXT:', contextValue);
  }, [
    contextValue.deckData,
    contextValue.allDecks,
    contextValue.selectedDeck,
    contextValue.selectedCards,
  ]);
  useEffect(() => {
    if (shouldFetchDecks(prevUserId, userId)) {
      fetchAndSetDecks();
      setPrevUserId(userId); // Update the previous userId
    }
  }, [userId, fetchAndSetDecks]);

  return (
    <DeckContext.Provider value={contextValue}>{children}</DeckContext.Provider>
  );
};

export const useDeckStore = () => {
  const context = useContext(DeckContext);
  if (!context)
    throw new Error('useDeckStore must be used within a DeckProvider');
  return context;
};
