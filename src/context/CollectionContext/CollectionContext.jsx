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
import {
  initialCollectionState,
  fetchWrapper,
  removeDuplicateCollections,
  calculateAndUpdateTotalPrice,
  calculateTotalPrice,
  getTotalCost,
  getCardPrice,
} from './exampleImport.js';
import {
  filterOutDuplicateYValues,
  transformChartData,
  convertData,
  isEmpty,
  validateData,
  handleCardAddition,
  handleCardRemoval,
  getUniqueFilteredXYValues,
  calculateTotalFromAllCardPrices,
  ensureNumber,
  findCollectionIndex,
  createApiUrl,
  handleApiResponse,
  BASE_API_URL,
} from './collectionUtility.jsx';
import { useCombinedContext } from '../CombinedProvider.jsx';
import { useUserContext } from '../UserContext/UserContext.js';
import moment from 'moment';
// // import { useUserContext } from '../UserContext/UserContext.js';
// // 1. Define a default context value
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

// // 2. Replace null with the default value when creating the context
export const CollectionContext = createContext(defaultContextValue);

export const CollectionProvider = ({ children }) => {
  // const { cardPrices } = useCombinedContext();
  const [cookies] = useCookies(['user']);
  const { triggerCronJob } = useUserContext();
  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);

  // const [allCollections, setAllCollections] = useState(() => {
  //   // Retrieve from local storage when initializing
  //   const savedCollections = localStorage.getItem('allCollections');
  //   return savedCollections ? JSON.parse(savedCollections) : [];
  // });
  const [allCardPrices, setAllCardPrices] = useState([]);
  const updateLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
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
  const userId = cookies.user?.id;
  const totalCost = useMemo(
    () => getTotalCost(selectedCollection),
    [selectedCollection]
  );
  const lastFetchedTime = useRef(null);

  const fetchCollections = useCallback(async (userId) => {
    if (!userId) {
      console.warn('userId is not set, aborting fetchCollections.');
      return null;
    }

    try {
      //       // console.log('Fetching collections...');
      const response = await fetchWrapper(
        `${BASE_API_URL}/${userId}/collections`,
        'GET'
      );
      const collections = response?.data?.allCollections;
      console.log('Fetched collections:', collections);
      return collections;
    } catch (error) {
      //       // Your error handling logic here
      return null;
    }
  }, []);

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

    // Update local state
    setAllCollections(validCollections);

    // Save to localStorage
    // localStorage.setItem('allCollections', JSON.stringify(validCollections));

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
  }, []);

  const fetchAndSetCollections = useCallback(async () => {
    // Get the current time
    const currentTime = new Date().getTime();

    // Check if enough time (1 minute = 60000 ms) has passed since the last fetch
    if (
      lastFetchedTime.current &&
      currentTime - lastFetchedTime.current < 60000
    ) {
      console.log('You must wait for 1 minute before fetching again.');
      return;
    }

    // Perform the fetch operation
    const collections = await fetchCollections(userId);
    if (collections) {
      setCollections(collections);
    }

    // Update the last fetched time
    lastFetchedTime.current = currentTime;
  }, [userId, fetchCollections, setCollections]);

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
    newCollectionInfo,
    name,
    description
  ) => {
    if (!userId) {
      console.error('User ID is undefined.');
      return;
    }
    if (
      !validateData(
        newCollectionInfo,
        'Create User Collection',
        'createUserCollection'
      )
    ) {
      console.error('Validation failed for collection data.');
      return;
    }

    const payload = {
      name: name || newCollectionInfo.name,
      description: description || newCollectionInfo.description,
      userId: userId || newCollectionInfo.userId,
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

      //       // const updatedCards = getUpdatedCards(selectedCollection, card, operation);
      let updatedCards;
      if (operation === 'update') {
        updatedCards = [...selectedCollection.cards];
        const cardIndex = updatedCards?.findIndex((c) => c.id === card.id);
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
            xys: [
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
      const isCreatingNew = !collectionData?._id;
      const isNewCollectionEndpoint =
        collectionData?.endpoint === 'newCollection';

      const endpoint = createApiUrl(
        `${userId}/collections${isCreatingNew ? '' : `/${collectionData._id}`}`
      );

      let method = isCreatingNew ? 'POST' : 'PUT';
      console.log(`Debug: Fetching ${method} ${endpoint}`);

      if (!isCreatingNew && isNewCollectionEndpoint) {
        method = 'POST';
      }

      try {
        const response = await fetchWrapper(endpoint, method, collectionData);
        const updatedCollection = handleApiResponse(response, method);

        if (!isCreatingNew && !updatedCollection) {
          throw new Error('Failed to update the existing collection');
        }

        const updateNumber =
          updatedCollection?.chartData?.datasets?.length + 1 || 1;
        const timestamp = moment().format('YYYY-MM-DD HH:mm');
        const price = updatedCollection.totalPrice;

        const newDataEntry = {
          x: timestamp,
          y: price,
        };

        const newLabelData = {
          label: `Update Number ${updateNumber}`,
          data: newDataEntry,
        };

        const newAdditionalPriceData = {
          priceChanged: false, // Set this according to your logic
          initialPrice: updatedCollection.chartData?.updatedPrice || 0,
          updatedPrice: price,
          priceDifference: 0, // Set this according to your logic
          priceChange: 0, // Set this according to your logic
        };

        const newDataset = {
          name: `Dataset ${updateNumber}`,
          data: [
            {
              xys: [newLabelData],
              additionalPriceData: [newAdditionalPriceData],
            },
          ],
        };

        const newChartData = {
          ...updatedCollection.chartData,
          name: updatedCollection.name, // You may need to set this according to your logic
          userId: updatedCollection.userId, // You may need to set this according to your logic
          xys: [...(updatedCollection.chartData?.xys || []), newLabelData],
          datasets: [
            ...(updatedCollection.chartData?.datasets || []),
            newDataset,
          ],
        };

        updatedCollection.chartData = newChartData;
        const convertedData = convertData(newChartData);
        updatedCollection.xys = convertedData;

        xyData.push(...convertedData.finalDataForChart);
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

      //       // Check if this is the special tagged card
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
      //       // DATA
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
      createUserCollection: (userId, newCollectionInfo) =>
        createUserCollection(
          userId,
          newCollectionInfo,
          newCollectionInfo.name,
          newCollectionInfo.description
        ),
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
    // Save to local storage whenever it changes
    localStorage.setItem('allCollections', JSON.stringify(allCollections));
  }, [allCollections]);

  useEffect(() => {
    console.log('COLLECTION CONTEXT: ', {
      contextValue,
    });
  }, [contextValue, updatedPricesFromCombinedContext]);

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

// // useCollectionStore.js
// // import { useContext } from 'react';
// // import { CollectionContext } from '../CollectionContext/CollectionContext';

export const useCollectionStore = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      'useCollectionStore must be used within a CollectionProvider'
    );
  }
  return context;
};
