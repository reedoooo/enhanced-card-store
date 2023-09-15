import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useCookies } from 'react-cookie';

export const CollectionContext = createContext(undefined);

// Fetch function with proper error handling
const fetchWrapper = async (url, method, body = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  };
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

// Function to remove duplicate collections
const removeDuplicateCollections = (collections) => {
  const uniqueCollections = {};
  collections.forEach((collection) => {
    uniqueCollections[collection._id] = collection;
  });
  return Object.values(uniqueCollections);
};

export const CollectionProvider = ({ children }) => {
  const [cookies] = useCookies(['userCookie']);
  const [collectionData, setCollectionData] = useState({
    _id: '',
    cards: [],
    quantity: 0,
    totalPrice: 0,
  });
  const [allCollections, setAllCollections] = useState([]);
  const [allCardPrices, setAllCardPrices] = useState([]);
  const [prevTotalQuantity, setPrevTotalQuantity] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState({
    _id: '',
    cards: [],
    quantity: 0,
    totalPrice: 0,
  });
  const userId = cookies.userCookie?.id;

  const calculateAndUpdateTotalPrice = (collection) => {
    let totalPrice = 0;
    if (collection && collection.cards) {
      totalPrice = collection.cards.reduce((total, card) => {
        return total + card.price * card.quantity;
      }, 0);
    }
    return totalPrice;
  };

  const fetchCollectionsForUser = useCallback(async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections`;
      return await fetchWrapper(url, 'GET');
    } catch (error) {
      console.error(`Failed to fetch collections for user: ${error.message}`);
      return null;
    }
  }, [userId]);

  const updateCollectionData = useCallback((newData, updaterFn) => {
    updaterFn((prevCollections) => {
      const existingIndex = prevCollections.findIndex(
        (collection) => collection._id === newData._id
      );
      if (existingIndex === -1) return [...prevCollections, newData];
      const updatedCollections = [...prevCollections];
      updatedCollections[existingIndex] = newData;
      return updatedCollections;
    });
  }, []);

  const fetchAndSetCollections = useCallback(async () => {
    try {
      const userCollections = await fetchCollectionsForUser();
      if (userCollections && userCollections.length > 0) {
        const uniqueCollections = removeDuplicateCollections(userCollections);

        // Initialize totalPrice for each collection based on its cards
        uniqueCollections.forEach((collection) => {
          collection.totalPrice = calculateAndUpdateTotalPrice(collection);
        });

        setAllCollections(uniqueCollections);
        setCollectionData(uniqueCollections[0]);
      }
    } catch (error) {
      console.error(`Failed to fetch collections: ${error.message}`);
    }
  }, [fetchCollectionsForUser]);

  const createUserCollection = useCallback(
    async (userId, newCollectionInfo) => {
      try {
        const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections/newCollection`;
        const initialCollection = newCollectionInfo.initialCard
          ? [newCollectionInfo.initialCard]
          : [];
        const data = await fetchWrapper(url, 'POST', {
          ...newCollectionInfo,
          cards: initialCollection,
          userId,
        });
        setCollectionData(data);
        setSelectedCollection(data);
        updateCollectionData(data, setAllCollections);
      } catch (error) {
        console.error(`Failed to create a new collection: ${error.message}`);
      }
    },
    [updateCollectionData]
  );

  const addOrRemoveCard = useCallback(
    async (card, isAdding) => {
      if (
        !selectedCollection._id &&
        (!allCollections[0] || !allCollections[0]._id)
      ) {
        console.error('No valid collection to add or remove a card.');
        return;
      }
      const activeCollection = selectedCollection._id
        ? selectedCollection
        : allCollections[0];
      let cardPrice = 0;

      if (
        card.card_prices &&
        card.card_prices.length > 0 &&
        card.card_prices[0].tcgplayer_price
      ) {
        cardPrice = parseFloat(card.card_prices[0].tcgplayer_price);
      }

      // Create a copy of the current state
      const currentCards = [...(activeCollection?.cards || [])];
      let currentTotalPrice = activeCollection.totalPrice || 0;

      // Find the card index in the current state
      const cardIndex = currentCards.findIndex((item) => item.id === card.id);
      if (isAdding) {
        setAllCardPrices([...allCardPrices, { cardId: card.id, cardPrice }]);
        if (cardIndex !== -1) {
          currentCards[cardIndex].quantity += 1;
        } else {
          currentCards.push({ ...card, quantity: 1, price: cardPrice });
        }
        currentTotalPrice += cardPrice;
      } else {
        setAllCardPrices((prevCardValues) =>
          prevCardValues.filter((val) => val !== cardPrice)
        );

        if (cardIndex !== -1) {
          currentCards[cardIndex].quantity -= 1;
          if (currentCards[cardIndex].quantity <= 0) {
            currentCards.splice(cardIndex, 1);
          }
          currentTotalPrice -= cardPrice;
        }
      }
      currentTotalPrice = calculateAndUpdateTotalPrice({
        ...activeCollection,
        cards: currentCards,
      });
      console.log('activeCollection:', activeCollection);
      console.log('currentTotalPrice:', currentTotalPrice);
      const collectionId = activeCollection._id;
      console.log('currentCards:', currentCards);
      console.log('collectionId:', collectionId);
      try {
        // Replace this URL with your server's URL and route for updating the collection
        const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections/${collectionId}`;

        // Send a PUT request to the server to update the collection
        const updatedCollection = await fetchWrapper(url, 'PUT', {
          cards: currentCards,
          totalPrice: currentTotalPrice,
        });

        // Update the state based on the server's response
        setSelectedCollection({
          ...updatedCollection,
          totalPrice: currentTotalPrice,
        });
        updateCollectionData(
          { ...updatedCollection, totalPrice: currentTotalPrice },
          setAllCollections
        );
      } catch (error) {
        // If the PUT request fails, log the error and revert to the previous state
        console.error(`Failed to update the collection: ${error.message}`);
      }
    },
    [
      selectedCollection,
      allCollections,
      userId,
      updateCollectionData,
      allCardPrices,
    ]
  );

  const saveEditedCollection = useCallback(
    async (editedCollection) => {
      try {
        const { cards: editedCards } = editedCollection;
        const { cards: currentCards } = selectedCollection;

        const toMap = (cards) => new Map(cards.map((card) => [card.id, card]));

        const editedCardMap = toMap(editedCards);
        const currentCardMap = toMap(currentCards);

        // Determine which cards to add or remove
        editedCardMap.forEach((card, cardId) => {
          const currentCard = currentCardMap.get(cardId);
          const diff = currentCard
            ? card.quantity - currentCard.quantity
            : card.quantity;
          const toAdd = diff > 0;
          Array.from({ length: Math.abs(diff) }).forEach(() =>
            addOrRemoveCard(card, toAdd)
          );
        });

        // Remove cards not in the edited collection
        currentCardMap.forEach((card, cardId) => {
          if (!editedCardMap.has(cardId)) {
            Array.from({ length: card.quantity }).forEach(() =>
              addOrRemoveCard(card, false)
            );
          }
        });
      } catch (error) {
        console.error(`Failed to update the collection: ${error.message}`);
      }
    },
    [selectedCollection, addOrRemoveCard]
  );

  const contextValue = useMemo(
    () => ({
      collectionData,
      allCollections,
      allCardPrices,
      selectedCollection,
      setSelectedCollection,
      fetchAllCollectionsForUser: fetchAndSetCollections,
      addOneToCollection: (card) => addOrRemoveCard(card, true),
      removeOneFromCollection: (card) => addOrRemoveCard(card, false),
      removeAllFromCollection: (card) => addOrRemoveCard(card, false),
      createUserCollection,
      saveEditedCollection,
      getCardQuantity: (collectionId) => {
        const collection = allCollections?.find(
          (item) => item._id === collectionId
        );
        if (!collection) return 0;
        return collection.cards.reduce((acc, card) => acc + card.quantity, 0);
      },
      getCollectionCardDetails: (collectionId) => {
        const collection = allCollections?.find(
          (item) => item._id === collectionId
        );
        if (!collection || !collection.cards) return [0, []];

        const totalQuantity = collection.cards.reduce(
          (acc, card) => acc + card.quantity,
          0
        );
        const cardDetails = collection.cards.map((card) => ({
          name: card.name,
          quantity: card.quantity,
        }));

        return [totalQuantity, cardDetails];
      },
      // getCollectionValue, // add this
      // getCardQuantity, // add this
      // totalCardsInCollection, // add this
      // getCollectionCardDetails, // add this
    }),
    [collectionData, allCollections, selectedCollection, allCardPrices]
  );

  useEffect(() => {
    console.log('collectionData has been updated:', collectionData);
  }, [collectionData]);

  useEffect(() => {
    if (allCollections.length > 0) {
      const firstCollection = allCollections[0];
      const totalQuantity = firstCollection.cards.reduce(
        (acc, card) => acc + card.quantity,
        0
      );

      // Only log when a new card has been added
      if (totalQuantity > prevTotalQuantity) {
        const cardDetails = firstCollection.cards.map((card) => ({
          name: card.name,
          quantity: card.quantity,
        }));
        console.log(
          'A new card has been added. Updated totals:',
          totalQuantity,
          cardDetails
        );
      }

      // Update the previous total quantity
      setPrevTotalQuantity(totalQuantity);
    }
  }, [allCollections]);
  useEffect(() => {
    console.log('COLLECTIONCONTEXT:', contextValue);
    if (userId) fetchAndSetCollections();
  }, [fetchAndSetCollections, userId]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionStore = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      'useCollectionStore must be used within a CollectionProvider'
    );
  }
  return context;
};
