/* eslint-disable @typescript-eslint/no-empty-function */

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from 'react';
import { useCookies } from 'react-cookie';
import { fetchWrapper, createApiUrl } from '../Helpers.jsx';
import {
  handleError,
  removeDuplicatesFromCollection,
  updateCollectionArray,
  filterNullPriceHistoryForCollection,
  filterNullPriceHistory,
  handleCardAddition,
  handleCardRemoval,
  handleCardUpdate,
  determineMethod,
  updateCollectionDataEndpoint,
  getTotalQuantityOfSelectedCollection,
  getUpdatedCollectionPriceHistory,
  getFilteredData2,
  getFilteredData,
  calculateCollectionValue,
  getUpdatedCollectionData,
  initialCollectionState,
  defaultContextValue,
  validateUserIdAndData,
  convertToXYLabelData,
  getFilteredChartData,
  filterUniqueDataPoints,
  getUniqueValidData,
  createPriceHistoryObject,
  determineCardPrice,
} from './helpers.jsx';

export const CollectionContext = createContext(defaultContextValue);

export const CollectionProvider = ({ children }) => {
  const [cookies] = useCookies(['user']);
  const user = cookies?.user;
  const userId = user?.id;
  // state for the collection context
  const [selectedCollection, setSelectedCollection] = useState(
    initialCollectionState
  );
  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  const [collectionsFetched, setCollectionsFetched] = useState(false);
  const [cardsUpdated, setCardsUpdated] = useState(false);
  // state for the collection context
  const [collectionPriceHistory, setCollectionPriceHistory] = useState([]);
  const [allXYValues, setAllXYValues] = useState([]);
  const [currentChartDataSets2, setCurrentChartDataSets2] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [lastSavedPrice, setLastSavedPrice] = useState({
    num: 0,
    timestamp: new Date(),
  });
  const [latestPrice, setLatestPrice] = useState({
    num: 0,
    timestamp: new Date(),
  });
  // state for the card in collection context
  const [quantityInCard, setQuantityInCard] = useState(0);
  const [priceInCard, setPriceInCard] = useState(0);

  const lastFetchedTime = useRef(null);
  const [unsavedCards, setUnsavedCards] = useState([]);
  const [
    updatedPricesFromCombinedContext,
    setUpdatedPricesFromCombinedContext,
  ] = useState([]);
  const [xyData, setXyData] = useState([]);

  // fetch all collections for user
  const fetchAndSetCollections = useCallback(async () => {
    const shouldFetch = () => {
      const fetchDelay = 60000; // 1 minute
      const currentTime = Date.now();
      return (
        !lastFetchedTime.current ||
        currentTime - lastFetchedTime.current >= fetchDelay
      );
    };

    if (!shouldFetch()) return;

    try {
      if (!handleError(userId, 'User ID is missing.')) return;
      const response = await fetchWrapper(
        createApiUrl(`${userId}/collections`),
        'GET'
      );
      const collections = response?.data || [];
      if (collections?.length > 0) {
        const uniqueCollections = collections?.map(
          removeDuplicatesFromCollection
        );

        setAllCollections(uniqueCollections);
        setCollectionData(uniqueCollections[0]);
        setSelectedCollection(uniqueCollections[0]);
        setCollectionsFetched(true);
      }
    } catch (error) {
      console.error(`Failed to fetch collections: ${error}`, error.message);
    }
  }, [userId, setAllCollections, setCollectionData, setSelectedCollection]);
  // set updated state for the collections
  const updateCollectionData = useCallback(
    (newData) => {
      try {
        // Function to safely check if an object has a property
        const has = (obj, prop) =>
          Object.prototype.hasOwnProperty.call(obj, prop);

        // Determine the type of the new data
        if (
          Array.isArray(newData) &&
          newData.every((item) => has(item, 'cards'))
        ) {
          // const filteredNewData = filterNullPriceHistory(newData);

          // If newData is an array of objects each containing 'cards', assume it's 'allCollections'
          setAllCollections((prev) => updateCollectionArray(prev, newData));
        } else if (
          newData &&
          typeof newData === 'object' &&
          has(newData, 'cards')
        ) {
          // If newData is an object with a 'cards' property, assume it's 'selectedCollection'
          // setSelectedCollection(filterNullPriceHistoryForCollection(newData));
          setSelectedCollection(newData);
        } else if (newData && typeof newData === 'object') {
          // If newData is a general object, assume it's 'collectionData'
          // setCollectionData(filterNullPriceHistoryForCollection(newData));
          setCollectionData(newData);
        } else {
          console.warn(
            'Unable to determine the type of collection data for update.',
            newData
          );
        }
      } catch (error) {
        console.error('Error updating collection data:', error);
      }
    },
    [setAllCollections, setSelectedCollection, setCollectionData]
  );
  // create a new collection for user
  const createUserCollection = async (
    userId,
    newCollectionInfo,
    actionDescription
  ) => {
    if (
      !userId ||
      !actionDescription ||
      !validateUserIdAndData(userId, newCollectionInfo, actionDescription)
    ) {
      console.warn(
        'Invalid inputs for creating user collection.',
        userId,
        newCollectionInfo,
        actionDescription
      );
      return;
    }

    const name = newCollectionInfo?.name || '';
    const description = newCollectionInfo?.description || '';
    const payload = {
      ...newCollectionInfo,
      name: name,
      description: description,
      userId: userId,
    };
    const url = createApiUrl(`${userId}/collections`);
    // console.log('Payload for user collection:', payload);
    const response = await fetchWrapper(url, 'POST', payload);
    updateCollectionData(response.data);
  };
  // remove a collection for user
  const removeCollection = async (collection) => {
    if (!collection._id) {
      console.error('Collection ID is undefined.');
      return;
    }

    const url = createApiUrl(`${userId}/collections/${collection._id}`);
    await fetchWrapper(url, 'DELETE');
    setAllCollections((prev) =>
      prev.filter((item) => item._id !== collection._id)
    );

    if (selectedCollection._id === collection._id) {
      setSelectedCollection(initialCollectionState);
      setCollectionData(initialCollectionState);
    }
  };
  // update cards in collection
  const getUpdatedCards = (collection, cardUpdate, operation) => {
    if (!collection?.cards || !Array.isArray(collection.cards)) {
      console.error('Invalid collection or cards data');
      return [];
    }
    let cardPrice;
    for (const card of collection.cards) {
      cardPrice = determineCardPrice(collection.cards, cardUpdate);
    }

    console.log('CPRICE', cardPrice);
    switch (operation) {
      case 'add':
        return handleCardAddition(collection.cards, cardUpdate);
      case 'remove':
        return handleCardRemoval(collection.cards, cardUpdate);
      case 'update':
        return handleCardUpdate(
          collection?.cards,
          cardUpdate,
          createPriceHistoryObject(
            cardUpdate(cardPrice * cardUpdate?.quantity)
          ),
          collection?._id,
          cardPrice
        );
      default:
        console.error('Unsupported operation:', operation);
        return [];
    }
  };
  // update collection data
  const getUpdatedCollection = async (
    collectionWithCards,
    cardToUpdate,
    operation,
    userId
  ) => {
    if (
      !collectionWithCards?.cards ||
      !Array.isArray(collectionWithCards.cards)
    ) {
      console.error('Invalid collection or cards data');
      return;
    }
    const collectionId = collectionWithCards?._id || '';
    if (!collectionId || !userId) {
      console.error('Missing collection ID or user ID.');
      return;
    }

    const method = determineMethod(operation);
    const endpoint = createApiUrl(
      `${userId}/collections/${collectionId}/${operation}`
    );
    let cardsPayload;
    const updatedCardsData = getUpdatedCards(
      collectionWithCards,
      cardToUpdate,
      operation
    );

    switch (operation) {
      case 'add':
      case 'update':
        cardsPayload = { cards: updatedCardsData };
        break;
      case 'remove':
        // console.log('UPDATED CARDS DATA', updatedCardsData.filter());
        cardsPayload = { updatedCards: [cardToUpdate] };
        break;
      default:
        console.error('Unsupported operation:', operation);
        return;
    }

    try {
      // REQUEST 1: CARDS
      const cardsResponse = await fetchWrapper(endpoint, method, cardsPayload);
      const updatedCards = cardsResponse?.cards || [];

      const chartPayload = getFilteredChartData(
        collectionWithCards?.chartData,
        calculateCollectionValue(updatedCards)
      );
      // REQUEST 2: CHART DATA
      const endpoint2 = createApiUrl(
        `${userId}/collections/${collectionId}/updateChartData`
      );
      const chartResponse = await fetchWrapper(endpoint2, 'PUT', chartPayload);
      console.log('UPDATED CHARTRESPONSE MESSAGE', chartResponse.message);
      console.log('UPDATED CHARTRESPONSE DATA', chartResponse.allXYValues);

      const updatedChartData = chartResponse?.allXYValues || [];
      console.log('UPDATED CHARTS', updatedChartData);

      const updatedCollectionUpdatedCards = getUpdatedCollectionData(
        collectionWithCards,
        calculateCollectionValue(updatedCards),
        getUpdatedCollectionPriceHistory(
          collectionWithCards,
          calculateCollectionValue(updatedCards)
        ),
        getTotalQuantityOfSelectedCollection(collectionWithCards),
        updatedCards,
        userId
      );
      // REQUEST 3: COLLECTION DATA
      const collectionResponse = await updateCollectionDataEndpoint(
        userId,
        collectionId,
        updatedCollectionUpdatedCards
      );
      const updatedCollection = { ...collectionResponse, cards: updatedCards };

      setTotalPrice(calculateCollectionValue(updatedCollection));
      setTotalQuantity(getTotalQuantityOfSelectedCollection(updatedCollection));
      setLastSavedPrice({
        num: updatedCollection?.lastSavedPrice?.num || 0,
        timestamp: new Date(),
      });
      setLatestPrice({
        num: updatedCollection?.totalPrice || 0,
        timestamp: new Date(),
      });
      setCollectionPriceHistory(
        getUpdatedCollectionPriceHistory(
          updatedCollection,
          updatedCollection?.totalPrice || 0
        )
      );
      setCurrentChartDataSets2(
        filterUniqueDataPoints(
          convertToXYLabelData(selectedCollection?.collectionPriceHistory)
        )
      );
      updateCollectionData(updatedCollection);

      return updatedCollection;
    } catch (error) {
      console.error(`Error in ${operation} operation:`, error);
    }
  };
  // update collection details (name, description, etc.)
  const updateCollectionDetails = async (updatedInfo, userId, collectionId) => {
    const { name, description } = updatedInfo;
    if (!selectedCollection || !collectionId) {
      console.error('Selected collection or collection ID is missing.');
      return;
    }
    if (collectionId) {
      const updatedCollection = {
        ...selectedCollection,
        name,
        description,
      };

      setSelectedCollection(updatedCollection);
      setAllCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection._id === collectionId ? updatedCollection : collection
        )
      );

      try {
        const collectionEndpoint = createApiUrl(
          `${userId}/collections/${collectionId}`
        );
        await fetchWrapper(collectionEndpoint, 'PUT', { updatedCollection });
      } catch (error) {
        console.error('Error updating collection details:', error);
      }
    } else {
      console.error('Collection ID is missing.');
    }
  };
  // handle card operations (add, remove, update)
  const handleCardOperation = async (card, operation, collection, userId) => {
    if (!card || !collection) {
      console.error('Card or collection is undefined.', card, collection);
      return;
    }

    try {
      const updatedCollection = await getUpdatedCollection(
        collection,
        card,
        operation,
        userId
      );

      // console.log('UPDATED COLLECTION:', updatedCollection);
      if (updatedCollection) {
        const collectionToSet = {
          ...updatedCollection.collectionData,
          cards: updatedCollection.cards,
        };

        updateCollectionData(collectionToSet);
        return updatedCollection;
      } else {
        console.error('Failed to update collection.');
      }
    } catch (error) {
      console.error(`Error handling card operation '${operation}':`, error);
    }
  };
  // this useEffect is for updating currentChartDatasets with allXYValues in the state if values are added and then we filter them to remove duplicate values
  useEffect(() => {
    if (
      !selectedCollection?.chartData?.allXYValues ||
      !Array.isArray(selectedCollection?.chartData?.allXYValues) ||
      !selectedCollection?.chartData?.allXYValues?.length > 0
    )
      return;
    setAllXYValues(
      filterUniqueDataPoints(
        convertToXYLabelData(selectedCollection?.collectionPriceHistory)
      )
    );
    setCurrentChartDataSets2(
      filterUniqueDataPoints(
        convertToXYLabelData(selectedCollection?.collectionPriceHistory)
      )
      // getUniqueValidData(selectedCollection?.chartData?.allXYValues)
    );
  }, [selectedCollection?.chartData?.allXYValues]);
  // useEffect to ensure a collection is always selected
  useEffect(() => {
    if (!allCollections || allCollections?.length === 0) return;
    fetchAndSetCollections();
    if (!selectedCollection) {
      setSelectedCollection(allCollections[0]);
    }
  }, []);
  // useEffect for updating cards
  useEffect(() => {
    if (collectionsFetched === true) {
      const updateCollectionWhenCardChanged = async (card, collection) => {
        try {
          if (!card || !collection) {
            throw new Error('Card or collection is undefined.');
          }

          const updatedQuantity = card.quantity;
          const updatedTotalPriceForCard = card.price * updatedQuantity;
          const newCardValueWithUpdatedPrice = {
            ...card,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPriceForCard,
          };
          // Update collection locally
          const updatedCollection = collection.cards.map((c) =>
            c.card.id === card.id ? newCardValueWithUpdatedPrice : c
          );

          // console.log('UPDATED CO', updatedCollection);

          // Reflect the change in the local state
          updateCollectionData(updatedCollection);

          // Send update to server
          handleCardOperation(
            newCardValueWithUpdatedPrice,
            'update',
            updatedCollection,
            userId
          );
        } catch (error) {
          console.error(
            `Error updating total price for card ID ${card?.id}: ${error.message}`,
            error
          );
        }
      };

      const processCollections = () => {
        allCollections.forEach((collection) => {
          if (!collection?._id) {
            console.error('No collectionId found in collection.');
            return;
          }
          collection?.cards?.forEach((card) => {
            if (!card) {
              console.warn('Card in collection is undefined.');
              return;
            }
            const originalTotalPrice = card.price * card.quantity;
            if (card.totalPrice !== originalTotalPrice) {
              updateCollectionWhenCardChanged(card, collection);
            }
          });
        });
      };

      processCollections();
    }
    setCollectionsFetched(false);
    setCardsUpdated(true);
  });
  // useEffect to ensure allXYValues is always updated (and if it is deleted, this will set the values again)
  function convertToLabelXYData(collectionPriceHistory) {
    return collectionPriceHistory?.map((entry) => ({
      label: entry._id,
      x: new Date(entry.timestamp),
      y: entry.num,
    }));
  }

  useEffect(() => {
    if (
      !selectedCollection?.chartData?.allXYValues ||
      !Array.isArray(selectedCollection?.chartData?.allXYValues) ||
      !selectedCollection?.chartData?.allXYValues?.length > 0
    ) {
      setAllXYValues(
        // ...selectedCollection.chartData.allXYValues,
        filterUniqueDataPoints(
          convertToLabelXYData(selectedCollection?.collectionPriceHistory)
        )
      );
      setCurrentChartDataSets2(
        filterUniqueDataPoints(
          convertToXYLabelData(selectedCollection?.collectionPriceHistory)
        )
      );
    }
  }, [selectedCollection?.chartData?.allXYValues]);

  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      collectionData,
      cards: selectedCollection?.cards,
      currentChartDataSets2: selectedCollection?.currentChartDataSets2,
      totalPrice: selectedCollection?.totalPrice,
      totalQuantity: selectedCollection?.totalQuantity,
      latestPrice: selectedCollection?.latestPrice,
      lastSavedPrice: selectedCollection?.lastSavedPrice,
      collectionPriceHistory: selectedCollection?.collectionPriceHistory || [],
      allXYValues: selectedCollection?.chartData?.allXYValues || [],
      setCurrentChartData2: (data) => setCurrentChartDataSets2(data),
      calculateCollectionValue,
      setTotalPrice,
      setXyData,
      setUpdatedPricesFromCombinedContext,
      getUpdatedCollection,
      updateCollectionState: updateCollectionData,
      updateCollectionDetails,
      fetchAllCollectionsForUser: fetchAndSetCollections,
      setSelectedCollection,
      setAllCollections,
      createUserCollection,
      removeCollection,
      getTotalPrice: () => calculateCollectionValue(selectedCollection),
      getNewTotalPrice: (values) => calculateCollectionValue(values),
      getCardQuantity: (cardId) =>
        selectedCollection?.cards?.find((c) => c?.id === cardId)?.quantity || 0,
      addOneToCollection: (card, collection) =>
        handleCardOperation(card, 'add', collection, userId),
      removeOneFromCollection: (card, collection) =>
        handleCardOperation(card, 'remove', collection, userId),
      updateOneFromCollection: (card, collection) =>
        handleCardOperation(card, 'update', collection, userId),
      updateCollection: (card, operation, collection) =>
        handleCardOperation(card, operation, collection, userId),
      updateAllCollectionState: (newData) => updateCollectionData(newData),
      externalCollectionUpdate: (newData) => getUpdatedCollection(newData),
      externalOperationHandler: (card, operation, collection) =>
        handleCardOperation(card, operation, collection, userId),
    }),
    [allCollections, selectedCollection, totalPrice, xyData]
  );

  useEffect(() => {
    console.log('COLLECTION CONTEXT:', {
      selectedCollection: contextValue.selectedCollection,
      allCollections: contextValue.allCollections,
      collectionData: contextValue.collectionData,

      cards: contextValue.cards,
      totalPrice: contextValue.totalPrice,
      totalQuantity: contextValue.totalQuantity,
      currentChartDataSets2: contextValue.currentChartDataSets2,
      collectionPriceHistory: contextValue.collectionPriceHistory,
      lastSavedPrice: contextValue.lastSavedPrice,
      latestPrice: contextValue.latestPrice,
      allXYValues: contextValue.allXYValues,
    });
  }, [selectedCollection]);

  useEffect(() => {
    if (!userId) return;
    fetchAndSetCollections();
  }, [userId]);

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

// ! This is the old code
// useEffect(() => {
//   const checkCardData = (card) => {
//     const fields = [
//       // 'name',
//       // 'type',
//       // 'desc',
//       // 'atk',
//       // 'def',
//       // 'level',
//       // 'race',
//       // 'attribute',
//       'card_images',
//       'card_prices',
//       'totalPrice',
//       'price',
//       // 'card_sets',

//       // Include other card fields as necessary
//     ];
//     return fields.filter(
//       (field) =>
//         !card[field] ||
//         card[field] === 0 ||
//         (Array.isArray(card[field]) && card[field].length === 0)
//     );
//   };

//   const updateCardData = async (card) => {
//     try {
//       const cardId = card?.id;
//       const response = await axios.patch(
//         `${process.env.REACT_APP_SERVER}/api/cards/ygopro/${cardId}`,
//         {
//           id: cardId,
//           user: user,
//           card_images: card?.card_images,
//           card_prices: card?.card_prices,
//           card_sets: card?.card_sets,
//           atk: card.atk,
//           def: card.def,
//           level: card.level,
//           attribute: card.attribute,
//           name: card.name,
//           type: card.type,
//           desc: card.desc,
//           price: card?.card_prices[0].tcgplayer_price,
//           totalPrice: card?.card_prices[0].tcgplayer_price * card?.quantity,
//           // Include other card fields as necessary
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       console.error('Error updating card:', card.id, error);
//       return null;
//     }
//   };

//   const processCollections = async () => {
//     for (const collection of allCollections) {
//       for (const card of collection.cards) {
//         const missingData = checkCardData(card);
//         if (missingData?.length > 0) {
//           console.log(
//             `Card ID ${card?.id} is missing: ${missingData.join(', ')}`
//           );
//           const updatedCardData = await updateCardData(card);
//           if (updatedCardData) {
//             // Update the card in the corresponding collection
//             handleCardOperation(
//               updatedCardData,
//               'update',
//               collection,
//               userId
//             ); // This function needs to be defined to handle updating the card within the state or context
//           }
//         }
//       }
//     }
//   };

//   processCollections();
// }, [allCollections, userId]); // Add other dependencies as needed

// Function to compare and log changes in collections
// useEffect(() => {
//   const compareAndLogChanges = (oldData, newData, collectionName) => {
//     const report = {};
//     for (const key in newData) {
//       if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
//         report[key] = {
//           oldValue: oldData[key],
//           newValue: newData[key],
//         };
//       }
//     }
//     console.log(`Changes in ${collectionName}:`, report);
//   };

//   compareAndLogChanges(
//     prevAllCollectionsRef.current,
//     allCollections,
//     'All Collections'
//   );
//   compareAndLogChanges(
//     prevSelectedCollectionRef.current,
//     selectedCollection,
//     'Selected Collection'
//   );
//   compareAndLogChanges(
//     prevCollectionDataRef.current,
//     collectionData,
//     'Collection Data'
//   );

//   // Update refs with the current state for the next comparison
//   prevAllCollectionsRef.current = allCollections;
//   prevSelectedCollectionRef.current = selectedCollection;
//   prevCollectionDataRef.current = collectionData;
// }, [allCollections, selectedCollection, collectionData]);
