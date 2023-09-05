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
  deckData: { _id: '', cards: [] },
  allDecks: [],
  getCardQuantity: () => {}, // Dummy implementations to make ESLint happy
  addOneToDeck: () => {},
  removeOneFromDeck: () => {},
  deleteFromDeck: () => {},
  getTotalCost: () => {},
  setDeck: () => {}, // Dummy implementations to make ESLint happy
  // fetchAllDecks: () => {},
  fetchAllUserDecks: () => {},
  createUserDeck: () => {},
});

const apiBase = `${process.env.REACT_APP_SERVER}/api/decks`;

const fetchWrapper = async (url, method, body = null) => {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body && { body: JSON.stringify(body) }),
    };
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    throw error;
  }
};

export const DeckProvider = ({ children }) => {
  const { getCardData } = useCardStore();
  const [cookies, setCookie] = useCookies(['userCookie', 'deck']);
  const [deckData, setDeckData] = useState({ _id: '', deck: [] });
  const [allDecks, setAllDecks] = useState([]);
  const userId = cookies.userCookie?.id;
  const updateDeckList = (updatedDeck) => {
    const deckToUpdate = allDecks.find((deck) => deck._id === updatedDeck._id);
    if (deckToUpdate) {
      setAllDecks(
        allDecks.map((deck) =>
          deck._id === updatedDeck._id ? updatedDeck : deck
        )
      );
    } else {
      setAllDecks([...allDecks, updatedDeck]);
    }
  };

  const fetchAllDecksForUser = useCallback(async (userId) => {
    try {
      // Fetch the initial set of decks
      const fetchedDecks = await fetchWrapper(apiBase, 'GET');
      console.log('Initial fetched decks:', fetchedDecks);

      // Filter decks that belong to the user
      const userDecks = fetchedDecks.filter((deck) => deck.userId === userId);

      setAllDecks(userDecks); // Set the initial decks

      // Now loop to fetch additional times based on fetchedDecks.length
      const fetchCount = fetchedDecks.length;

      for (let i = 0; i < fetchCount; i++) {
        // Wait before the next fetch (optional but recommended)
        await new Promise((res) => setTimeout(res, 1000));

        const additionalFetchedDecks = await fetchWrapper(apiBase, 'GET');
        console.log(`Fetch ${i + 1}, fetched decks:`, additionalFetchedDecks);

        // Again, filter decks that belong to the user
        const additionalUserDecks = additionalFetchedDecks.filter(
          (deck) => deck.userId === userId
        );

        // Merge the new decks with the existing decks
        setAllDecks((prevDecks) => [...prevDecks, ...additionalUserDecks]);
      }
    } catch (error) {
      console.error(`Failed to fetch all decks for user ${userId}:`, error);
    }
  }, []);

  const updateDeckInBackend = async (deckId, updatedDeck) => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/api/decks/${deckId}`;
      return await fetchWrapper(
        url,
        'PUT',
        formatDeckData(deckId, updatedDeck)
      );
    } catch (error) {
      console.error(`Failed to update deck in backend: ${error.message}`);
    }
  };

  // To formatdeckId
  const formatDeckData = (deckId, updatedDeck) => {
    return {
      deckId: deckId,
      userId: userId,
      name: deckData.name, // assuming you have the name in your state
      description: deckData.description, // assuming you have the description in your state
      cards: updatedDeck.map((card) => formatCardData(card)),
    };
  };

  // To format card data before sending to backend
  const formatCardData = (card) => {
    return {
      id: card.id,
      name: card.name || null,
      type: card.type || null,
      frameType: card.frameType || null,
      description: card.description || null,
      card_images: card.card_images || null,
      archetype: card.archetype || null,
      atk: card.atk || null,
      def: card.def || null,
      level: card.level || null,
      race: card.race || null,
      attribute: card.attribute || null,
      quantity: card.quantity || null,
    };
  };

  // To get the quantity of a specific card in the deck
  const getCardQuantity = (cardId) => {
    // if (Array.isArray(deckData)) {
    const card = deckData.cards?.find((item) => item.id === cardId);
    // }

    return card?.quantity || 0;
  };

  // To add one card to the deck
  const addOneToDeck = async (card) => {
    try {
      // Check if deckData is an array
      if (!Array.isArray(allDecks)) {
        console.error('deckData is not an array.');
        return;
      }

      // Check if each object in deckData has an _id field
      const allDecksHaveID = allDecks.every((deck) =>
        Object.prototype.hasOwnProperty.call(deck, '_id')
      );

      if (!allDecksHaveID) {
        const shouldCreateDeck = window.confirm(
          "Some of your decks don't have an ID. Would you like to create a new one?"
        );
        if (shouldCreateDeck) {
          const deckName = prompt('Enter the deck name:');
          const deckDescription = prompt('Enter the deck description:');

          // Creating a new deck and populate it with the initial card
          await createUserDeck(userId, {
            name: deckName,
            description: deckDescription,
            initialCard: card,
          });

          // Re-fetch the user decks to make sure our newly created deck is there
          await fetchAllDecksForUser(userId);

          return;
        } else {
          return;
        }
      }
    } catch (error) {
      console.error(`Failed to add a card to the deck: ${error.message}`);
    }
  };

  const createUserDeck = async (userId, newDeckInfo) => {
    try {
      const { initialCard, ...rest } = newDeckInfo;
      const url = `${process.env.REACT_APP_SERVER}/api/decks/newDeck/${userId}`;

      // If initialCard is present, populate the new deck with it
      const initialDeck = initialCard ? [formatCardData(initialCard)] : [];

      const data = await fetchWrapper(url, 'POST', {
        ...rest, // This should now include name and description
        cards: initialDeck,
        userId,
      });

      setDeckData(data);
      updateDeckList(data);
    } catch (error) {
      console.error(`Failed to create a new deck: ${error.message}`);
    }
  };

  const removeOneFromDeck = async (cardId) => {
    try {
      // Find the card to remove
      const cardToRemove = deckData.cards?.find((item) => item.id === cardId);
      if (!cardToRemove) return;

      cardToRemove.quantity -= 1;

      // If the quantity reaches zero, remove the card from the deck array
      let newDeck;
      if (cardToRemove.quantity === 0) {
        newDeck = deckData.cards.filter((item) => item.id !== cardId);
      } else {
        newDeck = [...deckData.cards];
      }

      // Update the deck in the backend
      const updatedDeckData = await updateDeckInBackend(deckData._id, newDeck);
      setDeckData(updatedDeckData);
    } catch (error) {
      console.error(`Failed to remove a card from the deck: ${error.message}`);
    }
  };

  // To delete a card entirely from the deck
  const deleteFromDeck = async (cardId) => {
    try {
      const newDeck = deckData.deck.filter((item) => item.id !== cardId);
      const updatedDeckData = await updateDeckInBackend(deckData._id, newDeck);
      setDeckData(updatedDeckData);
    } catch (error) {
      console.error(`Failed to delete a card from the deck: ${error.message}`);
    }
  };

  // Implementing the missing setDeck function
  const setDeck = (newDeckData) => {
    setDeckData({
      ...newDeckData,
      name: newDeckData.name,
      description: newDeckData.description,
    });
    // Optionally update the deck in the backend as well
  };

  const getTotalCost = () => {
    // Dummy implementation, replace with actual logic
    return deckData.deck.reduce((acc, card) => acc + (card.cost || 0), 0);
  };

  const value = {
    deckData,
    allDecks,
    getCardQuantity,
    addOneToDeck,
    removeOneFromDeck,
    getTotalCost, // Added missing function
    deleteFromDeck,
    setDeck,
    // fetchAllDecks,
    fetchAllDecksForUser, // Include the new function in the context
    createUserDeck,
  };

  useEffect(() => {
    const userId = cookies.userCookie?.id;
    console.log('DECK CONTEXT:', value);
    if (userId) {
      // If userId exists, fetch all decks for that user
      fetchAllDecksForUser(userId);
    }
  }, [fetchAllDecksForUser, cookies.userCookie]);

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};

export const useDeckStore = () => {
  const context = useContext(DeckContext);
  if (!context)
    throw new Error('useDeckStore must be used within a DeckProvider');
  return context;
};
