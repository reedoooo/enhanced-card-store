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
import { useUserContext } from '../UserContext/UserContext.js';
import moment from 'moment';
// import { useUserContext } from '../UserContext/UserContext.js';
export const CollectionContext = createContext(null);
const filterOutDuplicateYValues = (datasets) => {
  console.log('DATASETS:', datasets);
  const seenYValues = new Set();
  return datasets?.filter((data) => {
    const yValue = data?.y;
    if (seenYValues.has(yValue)) {
      return false;
    }
    seenYValues.add(yValue);
    return true;
  });
};

const transformChartData = (chartData) => {
  let pointsArray = [];

  if (Array.isArray(chartData?.datasets)) {
    chartData?.datasets?.forEach((dataset) => {
      dataset.data?.forEach((dataEntry) => {
        const { x, y } = dataEntry.xy;
        if (x && y !== undefined) {
          pointsArray.push(dataEntry.xy);
        }
      });
    });
  } else {
    console.error(
      'Expected chartData.datasets to be an array, but got:',
      chartData
    );
  }

  return pointsArray;
};

const createDataset = (label, priceData) => ({
  name: label,
  color: 'blue',
  data: priceData?.map(({ x, y }) => ({ x, y })),
});

const handleCardAddition = (currentCards, cardToAdd) => {
  // Check if the card already exists in the currentCards array
  const cardToAddId =
    typeof cardToAdd.id === 'number' ? String(cardToAdd.id) : cardToAdd.id;

  const matchingCard = currentCards.find((c) => c.id === cardToAddId);

  if (matchingCard) {
    matchingCard.quantity++;
    return [...currentCards];
  } else {
    return [...currentCards, { ...cardToAdd, id: cardToAddId, quantity: 1 }];
  }
};

const handleCardRemoval = (currentCards, cardToRemove) => {
  // Convert the cardToRemove's id to a string if it's a number
  const cardToRemoveId =
    typeof cardToRemove.id === 'number'
      ? String(cardToRemove.id)
      : cardToRemove.id;

  const matchingCard = currentCards.find((c) => c.id === cardToRemoveId);

  if (!matchingCard) {
    console.error('Card not found in the collection.');
    return [...currentCards];
  }

  if (matchingCard.quantity > 1) {
    matchingCard.quantity--;
    return [...currentCards];
  } else {
    return currentCards.filter((card) => card.id !== cardToRemoveId);
  }
};

export const CollectionProvider = ({ children }) => {
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;
  const [cookies] = useCookies(['userCookie']);
  const { triggerCronJob } = useUserContext();

  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
  const chartData = selectedCollection?.chartData || {};
  // const datasets = chartData?.datasets || [];
  const userId = cookies.userCookie?.id;
  const totalCost = useMemo(
    () => getTotalCost(selectedCollection),
    [selectedCollection]
  );

  const calculateTotalFromAllCardPrices = (allCardPrices) => {
    if (!Array.isArray(allCardPrices)) return 0;
    return allCardPrices.reduce(
      (total, price) => total + ensureNumber(price, 0),
      0
    );
  };

  const ensureNumber = (value, defaultValue = 0) => {
    let num = parseFloat(value);
    return isNaN(num) ? defaultValue : num;
  };

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
        collection.totalPrice = calculateTotalFromAllCardPrices(
          collection.allCardPrices
        );
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

  const createUserCollection = async (
    userId,
    collection,
    name,
    description
  ) => {
    if (!selectedCollection || !userId) {
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

      const initialData = {
        name: collection?.name || '',
        description: collection?.description || '',
        userId: collection?.userId,
        totalCost: 0,
        totalPrice: 0,
        quantity: 0,
        totalQuantity: 0,
        allCardPrices: [],
        cards: [],
      };

      const response = await fetchWrapper(url, 'POST', initialData);
      if (response.error) {
        console.error('Failed to create a new collection:', response.error);
        return;
      }

      const { savedCollection } = response;

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

  const getUpdatedCards = (activeCollection, card, operation) => {
    const cardsToUpdate =
      operation === 'add'
        ? handleCardAddition(activeCollection?.cards, card)
        : handleCardRemoval(activeCollection?.cards, card);

    return cardsToUpdate.map((card) => {
      const cardPrice = card.card_prices?.[0]?.tcgplayer_price;
      const computedPrice = cardPrice * card.quantity;
      const allDatasets = [
        ...(card?.chart_datasets || []),
        { x: moment().format('YYYY-MM-DD HH:mm'), y: computedPrice },
      ];
      card.chart_datasets = filterOutDuplicateYValues(allDatasets);
      card.price = cardPrice;
      card.totalPrice = computedPrice;
      return card;
    });
  };

  const getNewChartData = (activeCollection, updatedPrice, newDataSet) => ({
    name: `Chart for Collection: ${activeCollection?.name}`,
    userId: userId,
    updatedPrice: updatedPrice,
    datasets: [...(selectedCollection?.chartData?.datasets || []), newDataSet],
    allXYValues: [
      ...(selectedCollection?.chartData?.datasets?.flatMap(
        (dataset) => dataset.data
      ) || []),
      newDataSet.data[0].xy,
    ],
  });

  const addOrRemoveCard = useCallback(
    async (card, cardInfo, operation) => {
      const collectionId = selectedCollection?._id || allCollections[0]?._id;
      if (!collectionId) {
        console.error('No valid collection selected.');
        return;
      }

      const updatedCards = getUpdatedCards(selectedCollection, card, operation);
      const allCardPrices = updatedCards.flatMap((card) =>
        Array(card.quantity).fill(card.card_prices?.[0]?.tcgplayer_price)
      );
      const initialPrice = selectedCollection?.totalPrice;
      const updatedPrice = calculateTotalFromAllCardPrices(allCardPrices);
      const priceDifference =
        updatedPrice - (selectedCollection.chartData?.updatedPrice || 0);
      const newDataSet = {
        data: [
          {
            xy: {
              label: `Update Number ${
                selectedCollection?.chartData?.datasets?.length + 1 || 1
              }`,
              x: moment().format('YYYY-MM-DD HH:mm'),
              y: updatedPrice,
            },
            additionalPriceData: {
              priceChanged: priceDifference !== 0,
              initialPrice: initialPrice,
              updatedPrice: updatedPrice,
              priceDifference: priceDifference,
              priceChange:
                Math.round((priceDifference / (initialPrice || 1)) * 100) / 100,
            },
          },
        ],
      };

      const updateInfo = {
        ...cardInfo,
        cards: updatedCards,
        userId: userId,
        totalCost: updatedPrice,
        quantity: updatedCards.length,
        totalQuantity: updatedCards.reduce(
          (acc, card) => acc + card.quantity,
          0
        ),
        chartData: getNewChartData(
          selectedCollection,
          updatedPrice,
          newDataSet
        ),
        allCardPrices: allCardPrices,
        _id: collectionId,
      };

      const updatedCollection = { ...selectedCollection, ...updateInfo };
      await updateActiveCollection(updatedCollection);
      updateCollectionData(updatedCollection, 'selectedCollection');
      updateCollectionData(updatedCollection, 'allCollections');
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
      if (!updatedCollectionData?._id) {
        console.error('Collection ID or Data is undefined.');
        return;
      }
      const url = `${BASE_API_URL}/${userId}/collections/${updatedCollectionData._id}`;
      try {
        const { updatedCollection } = await fetchWrapper(
          url,
          'PUT',
          updatedCollectionData
        );
        const newChartData = {
          ...updatedCollection.chartData,
          datasets: [
            ...(updatedCollection.chartData?.datasets || []),
            {
              data: [
                {
                  xy: {
                    x: moment().format('YYYY-MM-DD HH:mm'),
                    y: updatedCollection.totalPrice,
                  },
                  additionalPriceData: {
                    priceChanged: false,
                    initialPrice:
                      updatedCollection.chartData?.updatedPrice || 0,
                    updatedPrice: updatedCollection.totalPrice,
                    priceDifference: 0,
                    priceChange: 0,
                  },
                },
              ],
            },
          ],
        };
        updatedCollection.chartData = newChartData;
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
      // DATA
      allCollections,
      selectedCollection,
      collectionData,
      totalCost,
      // FUNCTIONS
      calculateTotalPrice: () => getCardPrice(selectedCollection),
      getTotalCost: () => getTotalCost(selectedCollection),
      // FUNCTIONS
      createUserCollection: (collection, name, description) =>
        createUserCollection(userId, collection, name, description),
      removeCollection: (collection) => removeCollection(collection),
      fetchAllCollectionsForUser: fetchAndSetCollections,
      setSelectedCollection: updateActiveCollection,
      setAllCollections: (collections) => setAllCollections(collections),
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
