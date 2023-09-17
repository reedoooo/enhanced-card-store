import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useCookies } from 'react-cookie';
import {
  initialCollectionState,
  fetchWrapper,
  removeDuplicateCollections,
  calculateAndUpdateTotalPrice,
  // getCardQuantity,
  getTotalCost,
  getCardPrice,
} from './exampleImport.js'; // Adjust the import according to where you store these functions

export const CollectionContext = createContext(undefined);

export const CollectionProvider = ({ children }) => {
  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  // const [totalCost, setTotalCost] = useState(0);
  const [allCardPrices, setAllCardPrices] = useState([]);
  const [prevQuantity, setPrevQuantity] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState(
    !allCollections.length > 0 ? initialCollectionState : null
  );
  const [cookies] = useCookies(['userCookie']);
  const userId = cookies.userCookie?.id;
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;

  // getCardPrice(selectedCollection);
  console.log(
    'SELECTED COLLECTION CARD PRICE:',
    getCardPrice(selectedCollection)
  );

  // Calculate the total cost of the selected collection
  const totalCost = useMemo(() => {
    return selectedCollection?.cards.reduce((total, card) => {
      return card.card_prices?.[0]?.tcgplayer_price
        ? total + parseFloat(card.card_prices[0].tcgplayer_price)
        : total;
    }, 0);
  }, [selectedCollection]);

  // const getCollectionQuantity = useCallback(() => {
  //   return (
  //     selectedCollection?.cards?.reduce(
  //       (acc, card) => acc + card.quantity,
  //       0
  //     ) || 0
  //   );
  // }, [selectedCollection]);
  const getCardQuantity = (cardId, cards) => {
    const card = cards?.find((item) => item.id === cardId);
    return card?.quantity || 0;
  };

  const fetchAndSetCollections = useCallback(async () => {
    if (!userId) return;
    try {
      const collections = await fetchWrapper(
        `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections`,
        'GET'
      );
      const uniqueCollections = removeDuplicateCollections(collections);
      uniqueCollections.forEach((collection) => {
        collection.totalPrice = calculateAndUpdateTotalPrice(collection);
      });
      setAllCollections(uniqueCollections);
      setSelectedCollection(uniqueCollections[0]);
      updateActiveCollection(
        uniqueCollections[0],
        uniqueCollections[0],
        setAllCollections
      );
    } catch (error) {
      console.error(`Failed to fetch collections: ${error.message}`);
    }
  }, [userId]);

  const findCollectionIndex = (collections, id) => {
    return collections?.findIndex((collection) => collection._id === id) ?? -1;
  };

  const updateCollectionData = useCallback((newData, updaterFn) => {
    updaterFn((prevCollections = []) => {
      const existingIndex = findCollectionIndex(prevCollections, newData._id);

      if (existingIndex === -1) return [...prevCollections, newData];

      const updatedCollections = [...prevCollections];
      updatedCollections[existingIndex] = newData;
      return updatedCollections;
    });
  }, []);

  const createUserCollection = async (userId, name, description) => {
    try {
      // Check if selectedCollection is defined and has _id property
      if (selectedCollection && selectedCollection._id) {
        const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections/newCollection/${userId}`;
        const initialData = {
          name,
          description,
          userId,
          totalPrice: totalCost,
          quantity: getCardQuantity(selectedCollection._id),
          allCardPrices: [],
          cards: [],
        };

        const { savedCollection } = await fetchWrapper(
          url,
          'POST',
          initialData
        );

        updateCollectionData(savedCollection, setAllCollections);
        setCollectionData(savedCollection);
        updateActiveCollection(
          savedCollection,
          savedCollection,
          setAllCollections
        );
      } else {
        console.error(
          'Selected collection is undefined or missing _id property.'
        );
      }
    } catch (error) {
      console.error(`Failed to create a new collection: ${error.message}`);
    }
  };

  const addOrRemoveCard = useCallback(
    async (card, cardInfo, operation) => {
      console.log('-----------OPERATION---------:', operation);
      // Validate required variables
      if (!selectedCollection?._id && !allCollections[0]?._id) {
        console.error('No valid collection selected.');
        return;
      }

      const collectionId = selectedCollection?._id || allCollections[0]._id;
      const activeCollection = selectedCollection || allCollections[0];

      let currentCards = activeCollection?.cards || [];
      let updatedCards;

      // This part checks the 'operation' parameter
      if (operation === 'add') {
        updatedCards = handleCardAddition(currentCards, card);
      } else if (operation === 'remove') {
        updatedCards = handleCardRemoval(currentCards, card);
        if (updatedCards === null) return;
      } else {
        console.error('Invalid operation.');
        return;
      }

      const currentTotalPrice = activeCollection.getCardPrice || 0;
      const updateInfo = {
        ...cardInfo,
        cards: updatedCards,
        userId: userId,
        totalPrice: currentTotalPrice,
      };

      // Update selected collection and all collections
      // setSelectedCollection({ ...activeCollection, ...updateInfo });

      setCollectionData({ ...activeCollection, ...updateInfo });
      updateCollectionData(updateInfo, setAllCollections);
      updateActiveCollection({
        ...updateInfo,
        // activeCollection,
        // setAllCollections,
      });
    },
    [selectedCollection, allCollections, userId]
  );

  const handleCardAddition = (currentCards, cardToAdd) => {
    const cardIndex = currentCards.findIndex((c) => c.id === cardToAdd.id);
    if (cardIndex !== -1) {
      currentCards[cardIndex].quantity++;
    } else {
      currentCards.push({ ...cardToAdd, quantity: 1 });
    }
    return [...currentCards];
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
    return currentCards;
  };

  const updateActiveCollection = async (updateInfo) => {
    if (!updateInfo) {
      console.error('One of the required variables is undefined');
      return;
    }

    try {
      const url = `${BASE_API_URL}/${updateInfo.userId}/collections/${updateInfo.activeCollection._id}`;
      const updatedCollection = await fetchWrapper(url, 'PUT', updateInfo);

      updateCollectionData(
        { ...updatedCollection, ...updateInfo },
        setAllCollections
      );
      setSelectedCollection(updatedCollection);
    } catch (error) {
      console.error(`Failed to update the collection: ${error.message}`);
    }
  };

  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      totalCost,
      createUserCollection,
      setSelectedCollection: updateActiveCollection,
      getTotalCost,
      // setSelectedCollection,
      fetchAllCollectionsForUser: fetchAndSetCollections,
      addOneToCollection: (card, cardInfo) =>
        addOrRemoveCard(card, cardInfo, 'add'),
      removeOneFromCollection: (card) => addOrRemoveCard(card, null, 'remove'),
    }),
    [allCollections, selectedCollection, totalCost]
  );

  useEffect(() => {
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
