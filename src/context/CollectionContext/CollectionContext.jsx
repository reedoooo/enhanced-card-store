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
  const [selectedCollection, setSelectedCollection] = useState({
    _id: '',
    cards: [],
    quantity: 0,
    totalPrice: 0,
  });
  const userId = cookies.userCookie?.id;

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
        card.card_prices[0] &&
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
        if (cardIndex !== -1) {
          currentCards[cardIndex].quantity += 1;
        } else {
          currentCards.push({ ...card, quantity: 1, price: cardPrice });
        }
        currentTotalPrice += cardPrice;
      } else {
        if (cardIndex !== -1) {
          currentCards[cardIndex].quantity -= 1;
          if (currentCards[cardIndex].quantity <= 0) {
            currentCards.splice(cardIndex, 1);
          }
          currentTotalPrice -= cardPrice;
        }
      }
      currentTotalPrice = Math.max(currentTotalPrice, 0);

      console.log('activeCollection:', activeCollection);
      const collectionId = activeCollection._id;
      console.log('currentCards:', currentCards);
      console.log('collectionId:', collectionId);
      try {
        // Replace this URL with your server's URL and route for updating the collection
        const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections/${collectionId}`;

        // Send a PUT request to the server to update the collection
        const updatedCollection = await fetchWrapper(url, 'PUT', {
          cards: currentCards,
          totalPrice: currentTotalPrice, // Updating the total price here
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
    [selectedCollection, allCollections, userId, updateCollectionData]
  );

  const saveEditedCollection = async (editedCollection) => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections/${editedCollection._id}`;

      // Send a PUT request to the server to update the collection
      const updatedCollection = await fetchWrapper(
        url,
        'PUT',
        editedCollection
      );

      // Update the local state with the updated collection. This is just a placeholder. The actual implementation might differ based on your state structure.
      updateCollectionData(updatedCollection, setAllCollections);
    } catch (error) {
      console.error(`Failed to update the collection: ${error.message}`);
    }
  };

  const contextValue = useMemo(
    () => ({
      collectionData,
      allCollections,
      selectedCollection,
      setSelectedCollection,
      fetchAllCollectionsForUser: fetchAndSetCollections,
      addOneToCollection: (card) => addOrRemoveCard(card, true),
      removeOneFromCollection: (card) => addOrRemoveCard(card, false),
      removeAllFromCollection: (card) => addOrRemoveCard(card, false),
      createUserCollection,
      saveEditedCollection,
      getCardQuantity: (cardId) =>
        selectedCollection?.cards?.find((item) => item.id === cardId)
          ?.quantity || 0,
      collectionCardQuantity: selectedCollection?.cards
        ? selectedCollection.cards.reduce((acc, card) => acc + card.quantity, 0)
        : 0,
      collectionValue: selectedCollection?.totalPrice || 0,
    }),
    [collectionData, allCollections, selectedCollection]
  );

  useEffect(() => {
    console.log('collectionData has been updated:', collectionData);
  }, [collectionData]);

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
