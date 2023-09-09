import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { useCookies } from 'react-cookie';
import { useCardStore } from '../CardContext/CardStore';

export const DeckContext = createContext(null);

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

  const formatDeckData = (deckId, updatedDeck) => ({
    _id: deckId,
    userId,
    name: deckData.name,
    description: deckData.description,
    cards: updatedDeck.map((card) => formatCardData(card)),
  });

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
    setDeckData(newDeckData);
    setAllDecks((prevDecks) => {
      const newAllDecks = prevDecks.map((deck) =>
        deck._id === newDeckData._id ? newDeckData : deck
      );
      return prevDecks.some((deck) => deck._id === newDeckData._id)
        ? newAllDecks
        : [...newAllDecks, newDeckData];
    });

    try {
      const url = `${apiBase}/users/${userId}/decks`; // Removed deckId from the URL
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
      const initialDeck = newDeckInfo.initialCard
        ? [formatCardData(newDeckInfo.initialCard)]
        : [];
      const data = await fetchWrapper(url, 'POST', {
        ...newDeckInfo,
        cards: initialDeck,
        userId,
      });
      setDeckData(data);
    } catch (error) {
      console.error(`Failed to create a new deck: ${error.message}`);
    }
  };

  const addOrRemoveCard = async (card, isAdding) => {
    setDeckData((prevState) => {
      const cardIndex = prevState.cards.findIndex(
        (item) => item.id === card.id
      );
      let newCards = [...prevState.cards];

      if (cardIndex !== -1) {
        newCards[cardIndex].quantity += isAdding ? 1 : -1;
        if (newCards[cardIndex].quantity <= 0) newCards.splice(cardIndex, 1);
      } else if (isAdding) {
        newCards.push({ ...card, quantity: 1 });
      }

      const updatedDeckData = { ...prevState, cards: newCards };
      updateAndSyncDeck(updatedDeckData);
      return updatedDeckData;
    });
  };

  // To get the quantity of a specific card in the deck
  // const getCardQuantity = (cardId) => {
  //   // if (Array.isArray(deckData)) {
  //   const card = deckData.cards?.find((item) => item.id === cardId);
  //   // }

  //   return card?.quantity || 0;
  // };

  // const getTotalCost = () =>
  //   deckData.cards.reduce((acc, card) => acc + (card.cost || 0), 0);

  const contextValue = {
    deckData,
    allDecks,
    selectedDeck,
    setSelectedDeck,
    addOneToDeck: (card) => addOrRemoveCard(card, true),
    removeOneFromDeck: (cardId) => addOrRemoveCard({ id: cardId }, false),
    getTotalCost: () =>
      deckData.cards?.reduce((acc, card) => acc + (card.cost || 0), 0) || 0,
    getCardQuantity: (cardId) =>
      deckData.cards?.find((item) => item.id === cardId)?.quantity || 0,
    updateAndSyncDeck,
    fetchAllDecksForUser: fetchAndSetDecks,
  };

  useEffect(() => {
    console.log('DECKCONTEXT:', contextValue);
    const userId = cookies.userCookie?.id;
    if (userId) {
      fetchAndSetDecks();
    }
  }, [fetchAndSetDecks, cookies.userCookie]);

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
