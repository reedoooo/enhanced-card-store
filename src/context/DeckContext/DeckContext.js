/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { useCookies } from 'react-cookie';
import { useCardStore } from '../CardContext/CardStore';

export const DeckContext = createContext({
  deckData: {}, // Provide default values for context properties
  allDecks: [],
  selectedDeck: {},
  setSelectedDeck: () => {},
  addOneToDeck: () => {},
  removeOneFromDeck: () => {},
  getTotalCost: () => 0,
  getCardQuantity: () => 0,
  updateAndSyncDeck: () => {},
  fetchAllDecksForUser: () => {},
});
const apiBase = `${process.env.REACT_APP_SERVER}/api`;

const fetchWrapper = async (url, method, body = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  };
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

const removeDuplicateDecks = (decks) => {
  const uniqueDecks = {};
  decks.forEach((deck) => (uniqueDecks[deck._id] = deck));
  return Object.values(uniqueDecks);
};
export const DeckProvider = ({ children }) => {
  const { getCardData } = useCardStore();
  const [cookies, setCookie] = useCookies(['userCookie']);
  const [deckData, setDeckData] = useState({});
  const [allDecks, setAllDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState({});
  const userId = cookies.userCookie?.id;

  const calculateAndUpdateTotalPrice = (deck) => {
    let totalPrice = 0;
    if (deck && deck.cards) {
      totalPrice = deck.cards.reduce((total, card) => {
        return total + card.price * card.quantity;
      }, 0);
    }
    return totalPrice;
  };

  const fetchDecksForUser = useCallback(async () => {
    try {
      const url = `${apiBase}/users/${userId}/decks`;
      return await fetchWrapper(url, 'GET');
    } catch (error) {
      console.error(`Failed to fetch decks for user: ${error.message}`);
      return null;
    }
  }, [userId]);

  const fetchAndSetDecks = useCallback(async () => {
    try {
      const userDecks = await fetchDecksForUser();

      if (userDecks && userDecks.length > 0) {
        const uniqueDecks = removeDuplicateDecks(userDecks);
        setAllDecks((prevDecks) =>
          removeDuplicateDecks([...prevDecks, ...uniqueDecks])
        );
        setDeckData(uniqueDecks[0] || {});
      } else {
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

  const formatCardData = (card) => ({
    id: card.id,
    ...Object.fromEntries(
      [
        'name',
        'type',
        'frameType',
        'description',
        'card_images',
        'archetype',
        'atk',
        'def',
        'level',
        'race',
        'attribute',
        'quantity',
      ].map((key) => [key, card[key] || null])
    ),
  });

  const updateAndSyncDeck = async (newDeckData) => {
    console.log('Updated Deck Name:', newDeckData.name);
    console.log('Updated Deck Description:', newDeckData.description);

    setDeckData(newDeckData);
    setSelectedDeck(newDeckData); // <-- This line ensures that the selected deck is updated
    setAllDecks((prevDecks) => {
      const newAllDecks = prevDecks.map((deck) =>
        deck._id === newDeckData._id ? newDeckData : deck
      );
      return prevDecks.some((deck) => deck._id === newDeckData._id)
        ? newAllDecks
        : [...newAllDecks, newDeckData];
    });

    try {
      const url = `${apiBase}/users/${userId}/decks/${selectedDeck._id}`; // Removed deckId from the URL
      const bodyData = {
        ...newDeckData,
        deckId: newDeckData._id, // Included deckId in the body
      };
      await fetchWrapper(url, 'PUT', bodyData);
    } catch (error) {
      console.error(`Failed to update deck in backend: ${error.message}`);
    }
  };

  const createUserDeck = async (userId, newDeckInfo) => {
    try {
      const url = `${apiBase}/newDeck/${userId}`;
      const cards = newDeckInfo.cards
        ? [formatCardData(newDeckInfo.cards)]
        : [];
      const data = await fetchWrapper(url, 'POST', {
        // ...newDeckInfo,
        cards: cards,
        userId,
        totalPrice: 0,
        description: newDeckInfo.description || '',
        name: newDeckInfo.name || '',
      });
      setDeckData(data);
    } catch (error) {
      console.error(`Failed to create a new deck: ${error.message}`);
    }
  };

  const addOrRemoveCard = async (card, isAdding, isRemoving) => {
    if (!selectedDeck || !selectedDeck._id) {
      console.error('No valid deck to add or remove a card.');
      return;
    }

    let cardPrice = 0;
    if (
      card.card_prices &&
      card.card_prices.length > 0 &&
      card.card_prices[0].tcgplayer_price
    ) {
      cardPrice = parseFloat(card.card_prices[0].tcgplayer_price);
    }

    // Create a copy of the current state
    const currentCards = [...(selectedDeck?.cards || [])];
    let currentTotalPrice = selectedDeck.totalPrice || 0;

    // Find the card index in the current state
    const cardIndex = currentCards.findIndex((item) => item.id === card.id);

    if (isAdding) {
      console.log('isAdding:', isAdding);
      if (cardIndex !== -1) {
        currentCards[cardIndex].quantity += 1;
      } else {
        currentCards.push({ ...card, quantity: 1, price: cardPrice });
      }
      currentTotalPrice += cardPrice;
    } else {
      console.log('isRemoving:', isRemoving);
      if (cardIndex !== -1) {
        currentCards[cardIndex].quantity -= 1;
        if (currentCards[cardIndex].quantity <= 0) {
          currentCards.splice(cardIndex, 1);
        }
        currentTotalPrice -= cardPrice;
      }
    }

    // Assuming you have a function to update the total price like in the example
    currentTotalPrice = calculateAndUpdateTotalPrice({
      ...selectedDeck,
      cards: currentCards,
    });

    try {
      const url = `${apiBase}/users/${userId}/decks/${selectedDeck._id}`;
      const updatedDeck = await fetchWrapper(url, 'PUT', {
        cards: currentCards,
        totalPrice: currentTotalPrice,
      });

      setSelectedDeck({
        ...updatedDeck,
        totalPrice: currentTotalPrice,
      });
      updateAndSyncDeck({ ...updatedDeck, totalPrice: currentTotalPrice });
    } catch (error) {
      console.error(`Failed to update the deck: ${error.message}`);
    }
  };

  const getQuantity = (cardId) => {
    const foundCard = selectedDeck?.cards?.find((item) => item.id === cardId);
    return foundCard?.quantity || 0;
  };

  const contextValue = {
    deckData,
    allDecks,
    selectedDeck,
    totalQuantity: getQuantity,
    setSelectedDeck,
    addOneToDeck: (card) => addOrRemoveCard(card, true, false),
    removeOneFromDeck: (card) => addOrRemoveCard(card, false, true),
    getTotalCost: () =>
      selectedDeck?.cards?.reduce((acc, card) => acc + (card.cost || 0), 0) ||
      0,
    getCardQuantity: (cardId) => {
      const foundCard = selectedDeck?.cards?.find((item) => item.id === cardId);
      return foundCard?.quantity || 0;
    },
    updateAndSyncDeck,
    fetchAllDecksForUser: fetchAndSetDecks,
  };

  useEffect(() => {
    console.log('DECKCONTEXT:', contextValue);
    const userId = cookies.userCookie?.id;
    if (userId) {
      fetchAndSetDecks();
    }
  }, [cookies.userCookie?.id, fetchAndSetDecks]);

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
