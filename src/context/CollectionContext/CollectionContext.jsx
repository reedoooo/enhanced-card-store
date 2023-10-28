/* eslint-disable @typescript-eslint/no-empty-function */

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
// 1. Define a default context value
const defaultContextValue = {
  allCollections: [],
  allCardPrices: [],
  xy: [],
  selectedCollection: {},
  collectionData: initialCollectionState,
  totalCost: 0,
  openChooseCollectionDialog: false,
  updatedPricesFromCombinedContext: {},
  setUpdatedPricesFromCombinedContext: () => {},
  setOpenChooseCollectionDialog: () => {},
  calculateTotalPrice: () => {},
  getTotalCost: () => {},
  createUserCollection: () => {},
  removeCollection: () => {},
  fetchAllCollectionsForUser: () => {},
  setSelectedCollection: () => {},
  setAllCollections: () => {},
  addOneToCollection: () => {},
  removeOneFromCollection: () => {},
};

// 2. Replace null with the default value when creating the context
export const CollectionContext = createContext(defaultContextValue);

const filterOutDuplicateYValues = (datasets) => {
  // console.log('DATASETS:', datasets);
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
        dataEntry.xys?.forEach((xyEntry) => {
          const { x, y } = xyEntry.data;
          if (x && y !== undefined) {
            pointsArray.push({ x, y });
          }
        });
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

function convertData(originalData) {
  let finalDataForChart = [];

  const { datasets } = originalData;

  if (Array.isArray(datasets) && datasets.length > 0) {
    datasets.forEach((dataset, index) => {
      // Loop over all datasets, not just the last one
      if (Array.isArray(dataset.data) && dataset.data.length > 0) {
        dataset.data.forEach((dataEntry) => {
          dataEntry.xys?.forEach((xyEntry) => {
            const { label, data } = xyEntry;
            // Assume that finalDataForChart has an array for each label
            finalDataForChart[label] = finalDataForChart[label] || [];

            data.forEach(({ x, y }) => {
              if (x && y !== undefined) {
                finalDataForChart[label].push({ x, y });
              }
            });
          });
        });
      }
    });
  }

  // Convert the data into the format expected by Nivo
  const nivoData = Object.keys(finalDataForChart).map((label) => ({
    id: label,
    data: finalDataForChart[label],
  }));

  return {
    ...originalData,
    finalDataForChart: nivoData, // Replace this line to return Nivo-formatted data
  };
}

const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};
const validateData = (data, eventName, functionName) => {
  const dataType = typeof data;
  console.log(
    `[Info] Received data of type: ${dataType} in ${functionName} triggered by event: ${eventName}`
  );
  if (data === null || data === undefined) {
    console.warn(
      `[Warning] Received null or undefined data in ${functionName} triggered by event: ${eventName}`
    );
    return false;
  }
  if (isEmpty(data)) {
    console.error(
      `[Error] Received empty data object or array in ${functionName} triggered by event: ${eventName}`
    );
    return false;
  }
  return true;
};

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
  // const { cardPrices } = useCombinedContext();
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;
  const [cookies] = useCookies(['userCookie']);
  const { triggerCronJob } = useUserContext();
  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  const [allCardPrices, setAllCardPrices] = useState([]);
  const [xyData, setXyData] = useState([
    // {
    //   label: '',
    //   data: [],
    // },
  ]); // New state to hold xy data
  // const [updatedPrices, setUpdatedPrices] = useState([]);
  const [
    updatedPricesFromCombinedContext,
    setUpdatedPricesFromCombinedContext,
  ] = useState({});
  const [selectedCollection, setSelectedCollection] = useState({});
  const [openChooseCollectionDialog, setOpenChooseCollectionDialog] =
    useState(false);
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

  // Function to fetch collections
  const fetchCollections = useCallback(async (userId) => {
    if (!userId) {
      console.warn('userId is not set, aborting fetchCollections.');
      return null;
    }

    try {
      // console.log('Fetching collections...');
      const response = await fetchWrapper(
        `${BASE_API_URL}/${userId}/collections`,
        'GET'
      );
      const collections = response?.data?.allCollections;
      console.log('Fetched collections:', collections);
      return collections;
    } catch (error) {
      // Your error handling logic here
      return null;
    }
  }, []);

  // Function to set collections
  const setCollections = useCallback((collections) => {
    if (!collections || !Array.isArray(collections)) {
      console.warn('Invalid collections array:', collections);
      return;
    }

    const uniqueCollections = removeDuplicateCollections(collections);
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
    // Your logic to set collections
  }, []);

  // Your original fetchAndSetCollections function, now simplified
  const fetchAndSetCollections = useCallback(async () => {
    const collections = await fetchCollections(userId);
    if (collections) {
      setCollections(collections);
    }
  }, [userId, fetchCollections, setCollections]);

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

  const createApiUrl = (path) => `${BASE_API_URL}/${path}`;

  const handleApiResponse = (response, method) => {
    // Handling POST requests
    if (method === 'POST' && response.data?.newCollection) {
      return response.data.newCollection;
    }

    // Handling PUT requests (updating a collection)
    if (method === 'PUT' && response.data?.data?.updatedCollection) {
      return response.data.data.updatedCollection;
    }

    throw new Error('Unexpected response format');
  };

  const createUserCollection = async (userId, collection) => {
    if (
      !validateData(
        collection,
        'Create User Collection',
        'createUserCollection'
      )
    ) {
      console.error('Validation failed for collection data.');
      return;
    }

    if (!userId) {
      console.error('User ID is undefined.');
      return;
    }

    const payload = {
      name: collection.name,
      description: collection.description,
      userId: collection.userId || userId,
      totalCost: 0,
      totalPrice: 0,
      quantity: 0,
      totalQuantity: 0,
      xys: xyData || [],
      allCardPrices: [],
      cards: [],
      chartData: {},
    };

    try {
      const url = createApiUrl(`${userId}/collections/newCollection/${userId}`);
      const response = await fetchWrapper(url, 'POST', payload);

      if (!response) {
        console.error('Failed to connect to the server.');
        return;
      }

      if (response.error) {
        console.error(
          `Failed to create a new collection: ${response.error.message}`
        );
        return;
      }

      const savedCollection = handleApiResponse(response, 'POST');
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

    try {
      const url = createApiUrl(`${userId}/collections/${collection._id}`);
      const response = await fetchWrapper(url, 'DELETE');

      if (response.error) {
        console.error('Failed to delete the collection:', response.error);
        return;
      }

      setAllCollections((prev) =>
        prev.filter((item) => item._id !== collection._id)
      );

      if (selectedCollection._id === collection._id) {
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
      console.log('COMPUTED PRICE:', computedPrice);
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

  const getUniqueFilteredXYValues = (allXYValues) => {
    const uniqueXValues = new Set();

    return allXYValues
      .filter((entry) => entry.y !== 0)
      .filter((entry) => {
        if (!uniqueXValues.has(entry.x)) {
          uniqueXValues.add(entry.x);
          return true;
        }
        return false;
      });
  };

  const getNewChartData = (activeCollection, updatedPrice, newDataSet) => {
    const combinedXYValues = [
      ...(selectedCollection?.chartData?.datasets?.flatMap(
        (dataset) => dataset.data
      ) || []),
      newDataSet.data[0].xy,
    ];

    const filteredXYValues = getUniqueFilteredXYValues(combinedXYValues);

    return {
      name: `Chart for Collection: ${activeCollection?.name}`,
      userId: userId,
      updatedPrice: updatedPrice,
      xys: xyData || [],
      datasets: [
        ...(selectedCollection?.chartData?.datasets || []),
        newDataSet,
      ],
      allXYValues: filteredXYValues,
    };
  };

  const addOrRemoveCard = useCallback(
    async (card, cardInfo, operation) => {
      const collectionId = selectedCollection?._id || allCollections[0]?._id;
      if (!collectionId) {
        console.error('No valid collection selected.');
        setOpenChooseCollectionDialog(true);
        return;
      }

      // const updatedCards = getUpdatedCards(selectedCollection, card, operation);
      let updatedCards;
      if (operation === 'update') {
        updatedCards = [...selectedCollection.cards];
        const cardIndex = updatedCards.findIndex((c) => c.id === card.id);
        if (cardIndex !== -1) {
          updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            ...card, // update card's details from the given card.
            quantity: updatedCards[cardIndex].quantity, // ensure quantity doesn't change.
          };
        }
      } else {
        updatedCards = getUpdatedCards(selectedCollection, card, operation);
      }
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
            xy: [
              {
                label: `Update Number ${
                  selectedCollection?.chartData?.datasets?.length + 1 || 1
                }`,
                x: moment().format('YYYY-MM-DD HH:mm'),
                y: updatedPrice,
              },
            ],
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
      console.log('XYDATASET-----1:', xyData);
      const updateInfo = {
        ...cardInfo,
        name: selectedCollection?.name,
        description: selectedCollection?.description,
        cards: updatedCards,
        userId: userId,
        totalCost: updatedPrice,
        totalPrice: updatedPrice,
        xys: xyData,
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
      console.log(
        'UPDATED COLLECTION DATA PRIOR TO SERVER UPDATE:',
        updatedCollection
      );
      await updateActiveCollection(updatedCollection);
      updateCollectionData(updatedCollection, 'selectedCollection');
      updateCollectionData(updatedCollection, 'allCollections');
    },
    [
      selectedCollection,
      allCollections,
      userId,
      openChooseCollectionDialog,
      handleCardAddition,
      handleCardRemoval,
      updateCollectionData,
      setOpenChooseCollectionDialog,
    ]
  );

  const updateActiveCollection = useCallback(
    async (collectionData, existingChartData = {}) => {
      // Added existingChartData as an optional parameter
      const isCreatingNew = !collectionData?._id;
      const endpoint = isCreatingNew
        ? createApiUrl(`${userId}/collections`)
        : createApiUrl(`${userId}/collections/${collectionData._id}`);
      const method = isCreatingNew ? 'POST' : 'PUT';

      try {
        const response = await fetchWrapper(endpoint, method, collectionData);
        const updatedCollection = handleApiResponse(response, method);

        if (!isCreatingNew && !updatedCollection) {
          throw new Error('Failed to update the existing collection');
        }
        const newChartData = {
          ...updatedCollection.chartData,
          xys: [
            ...(existingChartData.xys || []), // Spread existing xys data
            {
              label: `Update Number ${
                updatedCollection?.chartData?.datasets?.length + 1 || 1
              }`,
              data: [
                ...(existingChartData.data || []), // Spread existing data
                {
                  x: moment().format('YYYY-MM-DD HH:mm'),
                  y: updatedCollection.totalPrice,
                },
              ],
            },
          ],
          datasets: [
            ...(updatedCollection.chartData?.datasets || []),
            {
              data: [
                {
                  xys: [
                    {
                      label: `Update Number ${
                        updatedCollection?.chartData?.datasets?.length + 1 || 1
                      }`,
                      data: [
                        {
                          x: moment().format('YYYY-MM-DD HH:mm'),
                          y: updatedCollection.totalPrice,
                        },
                      ],
                    },
                  ],
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

        const convertedData = convertData(newChartData);
        updatedCollection.xys = convertedData;
        // setXyData(convertedData.finalDataForChart);
        xyData.push(...convertedData.finalDataForChart); // Spread to add to existing array
        updateCollectionData(updatedCollection, 'selectedCollection');
        updateCollectionData(updatedCollection, 'allCollections');
      } catch (error) {
        console.error(`Failed to update the collection: ${error.message}`);
      }
    },
    [userId, updateCollectionData]
  );
  // console.log(
  //   '<----------$$$$$$$$$CONVERTED DATA FOR CHART$$$$$$$$$---------->',
  //   xyData
  // );
  // useEffect(() => {
  //   // Check if the prices are updated or new cards are added
  //   const updatedPricesArray =
  //     updatedPricesFromCombinedContext?.updatedPrices || [];

  //   if (!Array.isArray(updatedPricesArray)) {
  //     return; // Exit the useEffect early if not an array
  //   }

  useEffect(() => {
    const updatedPricesArray = Object.keys(
      updatedPricesFromCombinedContext || {}
    ).map((cardId) => updatedPricesFromCombinedContext[cardId]);

    console.log(
      '[1][PRICE UPDATE: COMBINED CONTEXT IN COLLECTION][UPDATED PRICES]==========>',
      updatedPricesArray
    );

    const updatedCardPrices = [];

    updatedPricesArray.forEach((card) => {
      const currentCardPrice = selectedCollection?.cards[card?.id]?.price;

      // Check if this is the special tagged card
      if (card._tag === 'updated') {
        console.log('Found the special card:', card);
      }

      if (card?.updatedPrice !== currentCardPrice) {
        updatedCardPrices.push(card);
        console.log(
          '[2][PRICE UPDATE: COMBINED CONTEXT IN COLLECTION][CARD]==========>',
          card
        );
        console.log(
          'CARD FROM SELECTED COLLECTIONS:',
          selectedCollection.cards[card.id]
        );
      } else {
        console.log('Price has not been updated for card with ID:', card.id);
      }
    });

    if (updatedCardPrices.length > 0) {
      updatedCardPrices.forEach((card) => {
        addOrRemoveCard(card, { updated: true }, 'update');
      });
    }
  }, [updatedPricesFromCombinedContext]);

  const contextValue = useMemo(
    () => ({
      // DATA
      allCollections,
      selectedCollection,
      collectionData,
      totalCost,

      allCardPrices: selectedCollection?.allCardPrices || [],
      xys: xyData || [],
      openChooseCollectionDialog,
      updatedPricesFromCombinedContext,
      setUpdatedPricesFromCombinedContext: (updatedPrices) => {
        // This is the function that will be passed to the combined context to update the prices
        setUpdatedPricesFromCombinedContext(updatedPrices);
      },
      setOpenChooseCollectionDialog,
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
  }, [contextValue, updatedPricesFromCombinedContext]);
  // Assuming updatedPrices is passed as a prop or state

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
  }, [userId]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};

// useCollectionStore.js
// import { useContext } from 'react';
// import { CollectionContext } from '../CollectionContext/CollectionContext';

export const useCollectionStore = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      'useCollectionStore must be used within a CollectionProvider'
    );
  }
  return context;
};
