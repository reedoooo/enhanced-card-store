/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useCardStore } from '../CardContext/CardStore';

export const DeckContext = createContext({
  deckData: {
    _id: '',
    deck: [],
  },
  // searchData: [],
  getCardQuantity: () => {},
  addOneToDeck: () => {},
  removeOneFromDeck: () => {},
  deleteFromDeck: () => {},
  getTotalCost: () => {},
  setDeck: () => {},
  fetchUserDeck: () => {},
  createUserDeck: () => {},
});

export const DeckProvider = ({ children }) => {
  const [deckData, setDeckData] = useState({
    _id: '', // Deck id
    deck: [], // Deck items
    quantity: 0, // Total quantity of items
    totalPrice: 0, // Total price of items
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getCardData } = useCardStore();
  const [cookies, setCookie] = useCookies(['userCookie', 'deck']);

  const userId = cookies.userCookie?.id;

  const createUserDeck = async (userId) => {
    const newDeckResponse = await fetch(
      `${process.env.REACT_APP_SERVER}/api/decks/newDeck/${userId}`,
      {
        method: 'POST',
      }
    );

    if (!newDeckResponse.ok) {
      throw new Error(`HTTP error! status: ${newDeckResponse.status}`);
    }

    const newDeckData = await newDeckResponse.json();
    console.log('DECK CREATED:', newDeckData);
    const newDeckItems = Array.isArray(newDeckData.deck)
      ? newDeckData.deck
      : [];
    setCookie('deck', newDeckItems, { path: '/' });
    return newDeckItems;
  };

  const fetchUserDeck = useCallback(
    async (userId) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/api/decks/userDeck/${userId}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            return createUserDeck(userId);
          } else if (response.status === 500) {
            setError('An unexpected error occurred. Please try again later.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          console.log('DECK EXISTS:', data);
          setCookie('deck', Array.isArray(data.deck) ? data.deck : [], {
            path: '/',
          });
          setLoading(false);
          return data;
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    },
    [setCookie]
  );

  useEffect(() => {
    if (userId && typeof userId === 'string') {
      fetchUserDeck(userId).then((data) => {
        if (data && data.deck) {
          setDeckDataAndCookie(data);
        } else {
          console.error('Deck data was not retrieved for user', userId);
        }
      });
    }
  }, [userId, fetchUserDeck]);

  const updateDeckInBackend = async (deckId, updatedDeck) => {
    const formattedDeckData = updatedDeck.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      frameType: item.frameType,
      desc: item.desc,
      atk: item.atk,
      def: item.def,
      level: item.level,
      race: item.race,
      attribute: item.attribute,
      card_images: item.card_images,
      card_prices: item.card_prices,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/decks/${deckId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedDeckData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('data:', data);
      return data;
    } catch (error) {
      console.error(`Failed to update deck in backend: ${error.message}`);
    }
  };

  const getCardQuantity = (cardId) => {
    let totalItems = 0;
    let quantityOfSameId = 0;

    deckData.deck?.forEach((item) => {
      totalItems += item.quantity;

      if (item.id === cardId) {
        quantityOfSameId += item.quantity;
      }
    });

    return { totalItems, quantityOfSameId };
  };

  const addOneToDeck = async (cardInfo) => {
    console.log('deckData at addOneToDeck:', deckData);
    console.log('deckData._id at addOneToDeck:', deckData?._id);

    if (!deckData?._id) {
      console.log('A valid deck has not been fetched from the backend yet.');
      return;
    }

    let quantityOfSameId = 0;
    for (let item of deckData.deck) {
      if (item.id === cardInfo.id) {
        quantityOfSameId += item.quantity;
      }
    }

    if (quantityOfSameId >= 3) {
      console.log('Cannot add more than 3 cards with the same ID to the deck.');
      return;
    }

    const itemExistsInDeck = deckData.deck.some(
      (item) => item.id === cardInfo.id
    );

    let updatedDeck;
    if (itemExistsInDeck) {
      updatedDeck = deckData.deck.map((item) => {
        if (item.id === cardInfo.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      updatedDeck = [...deckData.deck, { ...cardInfo, quantity: 1 }];
    }

    const newDeckData = await updateDeckInBackend(deckData._id, updatedDeck);
    setDeckDataAndCookie(newDeckData || []);
  };

  const decreaseItemQuantity = async (deckId, cardId, deckData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/decks/${deckId}/decrease`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cardId, deckData }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to decrease item quantity: ${error.message}`);
    }
  };

  const removeOneFromDeck = async (cardId) => {
    if (!deckData?._id) {
      console.log('A valid deck has not been fetched from the backend yet.');
      return;
    }

    const itemExistsInDeck = deckData.deck.some((item) => item.id === cardId);

    if (!itemExistsInDeck) {
      console.log('Cannot decrease quantity. Item does not exist in the deck.');
      return;
    }

    let updatedDeck = deckData.deck.map((item) => {
      if (item.id === cardId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    // Remove item from deck if quantity is 0
    updatedDeck = updatedDeck.filter((item) => item.quantity !== 0);

    const newDeckData = await decreaseItemQuantity(
      deckData._id,
      cardId,
      updatedDeck
    );
    setDeckDataAndCookie(newDeckData || []);
  };

  const deleteFromDeck = async (cardId) => {
    if (!deckData?._id) {
      console.log('A valid deck has not been fetched from the backend yet.');
      return;
    }

    const itemExistsInDeck = deckData.deck.some((item) => item.id === cardId);

    if (!itemExistsInDeck) {
      console.log('Cannot delete item. It does not exist in the deck.');
      return;
    }

    const updatedDeck = deckData.deck.filter((item) => item.id !== cardId);

    const newDeckData = await updateDeckInBackend(deckData._id, updatedDeck);
    setDeckDataAndCookie(newDeckData || []);
  };

  const getTotalCost = () => {
    let totalCost = 0;

    deckData.deck?.forEach((item) => {
      const cardCost = item.card_prices ? item.card_prices.tcgplayer.price : 0;
      totalCost += cardCost * item.quantity;
    });

    return totalCost;
  };

  const setDeck = (deckData) => {
    setDeckData(deckData);
  };

  const setDeckDataAndCookie = (newDeckData) => {
    setDeckData(newDeckData);
    setCookie('deck', newDeckData, { path: '/' });
  };

  console.log('DECK CONTEXT: ', {
    deckData,
    getCardQuantity,
    addOneToDeck,
    removeOneFromDeck,
    deleteFromDeck,
    getTotalCost,
    setDeck,
    fetchUserDeck,
    createUserDeck,
  });

  return (
    <DeckContext.Provider
      value={{
        deckData,
        getCardQuantity,
        addOneToDeck,
        removeOneFromDeck,
        deleteFromDeck,
        getTotalCost,
        setDeck,
        fetchUserDeck,
        createUserDeck,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
