import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { useCookies } from 'react-cookie';
import {
  initialCollectionState,
  fetchWrapper,
  removeDuplicateCollections,
  calculateAndUpdateTotalPrice,
  calculateTotalPrice,
  getTotalCost,
  getCardPrice,
} from './exampleImport.js';
import { useCombinedContext } from '../CombinedProvider.jsx';
// import { useUserContext } from '../UserContext/UserContext.js';

export const CollectionContext = createContext(undefined);

const handleCardAddition = (currentCards, cardToAdd) => {
  const cardIndex = currentCards.findIndex((c) => c.id === cardToAdd.id);
  console.log('CARD INDEX:', cardIndex);
  console.log('CURRENT CARDS:', currentCards);
  console.log('CARD TO ADD:', cardToAdd);
  if (cardIndex !== -1) {
    currentCards[cardIndex].quantity++;
  } else {
    currentCards.push({ ...cardToAdd, quantity: 1 });
  }
  return currentCards.map((card) =>
    card.id === cardToAdd.id ? { ...card, quantity: card.quantity + 1 } : card
  );
};

const handleCardRemoval = (currentCards, cardToRemove) => {
  const cardIndex = currentCards.findIndex((c) => c.id === cardToRemove.id);
  if (cardIndex === -1) {
    console.error('Card not found in the collection.');
    return null;
  }
  currentCards[cardIndex].quantity--;
  if (currentCards[cardIndex].quantity <= 0) {
    currentCards.splice(cardIndex, 1);
  }
  return currentCards
    .map((card) =>
      card.id === cardToRemove.id
        ? { ...card, quantity: card.quantity - 1 }
        : card
    )
    .filter((card) => card.quantity > 0);
};

export const CollectionProvider = ({ children }) => {
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;
  const [cookies] = useCookies(['userCookie']);
  const userId = cookies.userCookie?.id;

  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  // const [selectedCollection, setSelectedCollection] = useState(
  //   initialCollectionState
  // );
  const { triggerCronJob } = useCombinedContext(); // Use the UtilityContext here
  // const { user } = useUserContext(); // Use the UserContext here
  const [selectedCollection, setSelectedCollection] = useState({});

  const totalCost = useMemo(
    () => getTotalCost(selectedCollection),
    [selectedCollection]
  );

  const fetchAndSetCollections = useCallback(async () => {
    if (!userId) return;

    try {
      const collections = await fetchWrapper(
        `${BASE_API_URL}/${userId}/collections`,
        'GET'
      );
      const uniqueCollections = removeDuplicateCollections(collections);
      // Filter out invalid collections
      const validCollections = uniqueCollections.filter(Boolean);

      validCollections.forEach((collection) => {
        collection.totalPrice = calculateAndUpdateTotalPrice(collection);
      });

      setAllCollections(validCollections);
      setCollectionData(
        validCollections.length === 0
          ? initialCollectionState
          : validCollections[0]
      );
      setSelectedCollection(
        validCollections.length === 0
          ? initialCollectionState
          : validCollections[0]
      );
    } catch (error) {
      console.error(`Failed to fetch collections: ${error.message}`);
      // Consider setting an error state here
    }
  }, [userId]);

  const findCollectionIndex = useCallback(
    (collections, id) =>
      collections?.findIndex((collection) => collection?._id === id) ?? -1,
    []
  );

  const updateCollectionData = useCallback(
    (newData, collectionType) => {
      if (collectionType === 'allCollections') {
        setAllCollections((prevCollections = []) => {
          const existingIndex = findCollectionIndex(
            prevCollections,
            newData?._id
          );
          if (existingIndex === -1) return [...prevCollections, newData];
          const updatedCollections = [...prevCollections];
          updatedCollections[existingIndex] = newData;
          return updatedCollections;
        });
      } else if (collectionType === 'selectedCollection') {
        setSelectedCollection(newData);

        // updateActiveCollection(newData);
      } else if (collectionType === 'collectionData') {
        setCollectionData(newData);
      }
    },
    [findCollectionIndex]
  );

  const createUserCollection = async (collection, name, description) => {
    if (!selectedCollection?._id) {
      console.error(
        'Selected collection is undefined or missing _id property.'
      );
      return;
    }

    console.log('COLLECTION:', collection);
    console.log('NAME:', name);
    console.log('DESCRIPTION:', description);
    console.log('SELECTED COLLECTION:', selectedCollection);

    try {
      const url = `${BASE_API_URL}/${collection.userId}/collections/newCollection/${collection.userId}`;

      // Filling the initialData object with provided values or fallbacks
      const initialData = {
        name: collection.name || '',
        description: collection.description || '',
        userId: collection.userId,
        totalPrice: 0,
        quantity: 0,
        allCardPrices: [],
        cards: [],
      };

      const response = await fetchWrapper(url, 'POST', initialData);
      if (response.error) {
        console.error('Failed to create a new collection:', response.error);
        return;
      }

      const { savedCollection } = response;
      // setAllCollections((prevCollections = []) => {
      //   const existingIndex = findCollectionIndex(
      //     prevCollections,
      //     savedCollection?._id
      //   );
      //   if (existingIndex === -1) return [...prevCollections, savedCollection];
      //   const updatedCollections = [...prevCollections];
      //   updatedCollections[existingIndex] = savedCollection;
      //   return updatedCollections;
      // });

      console.log('SAVED COLLECTION:', savedCollection);
      // Uncomment the lines below and provide the correct function implementation if necessary
      updateCollectionData(savedCollection, 'allCollections');
      updateCollectionData(savedCollection, 'collectionData');
    } catch (error) {
      console.error(`Failed to create a new collection: ${error.message}`);
    }
  };

  const removeCollection = async (collection) => {
    if (!collection._id) {
      console.error('Collection ID is undefined.');
      return;
    }

    const collectionId = collection._id;

    console.log('COLLECTION ID:', collection);

    try {
      const url = `${BASE_API_URL}/${userId}/collections/${collectionId}`;
      const response = await fetchWrapper(url, 'DELETE');
      if (response.error) {
        console.error('Failed to delete the collection:', response.error);
        return;
      }

      // Remove the deleted collection from allCollections
      setAllCollections((prevCollections) =>
        prevCollections.filter((collection) => collection._id !== collectionId)
      );

      // If the deleted collection is the currently selected one, reset selectedCollection
      if (selectedCollection._id === collectionId) {
        setSelectedCollection(initialCollectionState);
        setCollectionData(initialCollectionState);
      }
    } catch (error) {
      console.error(`Failed to delete the collection: ${error.message}`);
    }
  };

  const addOrRemoveCard = useCallback(
    async (card, cardInfo, operation) => {
      if (!selectedCollection?._id && !allCollections[0]?._id) {
        console.error('No valid collection selected.');
        return;
      }

      const collectionId = selectedCollection?._id || allCollections[0]._id;
      // const activeCollection = selectedCollection || allCollections[0];
      const activeCollection = selectedCollection;

      // const allCardQuantities = activeCollection?.cards?.reduce(
      //   (accumulator, currentCard) => {
      //     accumulator[currentCard?.id] = currentCard?.quantity;
      //     return accumulator;
      //   }
      // );

      let updatedCards =
        operation === 'add'
          ? handleCardAddition(activeCollection?.cards, card)
          : handleCardRemoval(activeCollection?.cards, card);

      console.log('UPDATED CARDS:', updatedCards);
      if (!updatedCards) return;

      const updateInfo = {
        ...cardInfo,
        cards: updatedCards,
        userId: userId,
        // totalPrice: calculateTotalPrice(updatedCards),
        totalPrice: getCardPrice(selectedCollection),
        quantity: updatedCards.length,
        _id: collectionId,
      };
      const updatedCollection = { ...activeCollection, ...updateInfo };
      updateCollectionData(updatedCollection, 'selectedCollection');
      updateCollectionData(updatedCollection, 'allCollections');

      await updateActiveCollection(updatedCollection);
    },
    [
      selectedCollection,
      allCollections,
      userId,
      handleCardAddition,
      handleCardRemoval,
      updateCollectionData,
    ]
  );

  const updateActiveCollection = useCallback(
    async (updatedCollectionData) => {
      if (!updatedCollectionData) {
        console.error('One of the required variables is undefined');
        return;
      }

      const collectionId = updatedCollectionData?._id;
      const url = `${BASE_API_URL}/${userId}/collections/${collectionId}`;

      // Log the URL and payload before making the request
      console.log('URL:', url);
      console.log('Payload:', updatedCollectionData);
      try {
        const { updatedCollection } = await fetchWrapper(
          url,
          'PUT',
          updatedCollectionData
        );

        console.log('UPDATED COLLECTION FROM SERVER:', updatedCollection);
        updateCollectionData(updatedCollection, 'selectedCollection');
        updateCollectionData(updatedCollection, 'allCollections');
      } catch (error) {
        console.error(`Failed to update the collection: ${error.message}`);
      }
    },
    [userId, updateCollectionData]
  );

  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      collectionData,
      calculateTotalPrice: () => getCardPrice(selectedCollection),
      totalCost,
      getTotalCost: () => getTotalCost(selectedCollection),
      createUserCollection,
      removeCollection,
      setAllCollections,
      setSelectedCollection: updateActiveCollection,
      // getTotalCost,
      fetchAllCollectionsForUser: fetchAndSetCollections,
      addOneToCollection: (card, cardInfo) =>
        addOrRemoveCard(card, cardInfo, 'add'),
      removeOneFromCollection: (card) => addOrRemoveCard(card, null, 'remove'),
    }),
    [allCollections, selectedCollection, totalCost]
  );

  useEffect(() => {
    console.log('COLLECTION CONTEXT: ', {
      contextValue,
    });
  }, [contextValue]);

  useEffect(() => {
    if (selectedCollection && totalCost) {
      // Trigger the cron job whenever the selectedCollection changes
      triggerCronJob();
    }
  }, [selectedCollection, triggerCronJob, totalCost]);

  useEffect(() => {
    console.log('Total Cost has been updated:', totalCost);
  }, [totalCost]);

  useEffect(() => {
    if (userId) fetchAndSetCollections();
  }, [fetchAndSetCollections, userId]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};
