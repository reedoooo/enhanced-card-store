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
  handleCardAddition,
  handleCardRemoval,
  createApiUrl,
  fetchWrapper,
  getTotalCost,
  initialCollectionState,
  getCardPrice,
  defaultContextValue,
  validateUserIdAndData,
  getUpdatedChartData,
  getPriceChange,
  constructPayloadWithDifferences,
  getCurrentChartDataSets,
} from './collectionUtility.jsx';
import moment from 'moment';
import { createNewDataSet } from './cardHelpers.jsx';
import { chunkPayload, sendChunks } from './ChunkPaylod.jsx';

export const CollectionContext = createContext(defaultContextValue);

function transformPriceHistoryToXY(collectionPriceHistory) {
  return collectionPriceHistory.map((entry) => ({
    x: entry.timestamp, // x represents the timestamp
    y: entry.num, // y represents the numerical value
    label: `Price at ${entry.timestamp}`, // label can be customized as needed
  }));
}

export const CollectionProvider = ({ children }) => {
  const [cookies] = useCookies(['user']);
  const [selectedCollection, setSelectedCollection] = useState(
    initialCollectionState
  );
  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allCardPrices, setAllCardPrices] = useState([]);
  const [
    updatedPricesFromCombinedContext,
    setUpdatedPricesFromCombinedContext,
  ] = useState([]);

  const [xyData, setXyData] = useState([]);
  const [currentChartDataSets, setCurrentChartDataSets] = useState([]);
  const [currentChartDataSets2, setCurrentChartDataSets2] = useState([]);
  const [openChooseCollectionDialog, setOpenChooseCollectionDialog] =
    useState(false);
  const userId = cookies.user?.id;
  // const currentChartDataSets = getCurrentChartDatasets(
  //   selectedCollection?.chartData
  // );
  const totalCost = useMemo(
    () => getTotalCost(selectedCollection),
    [selectedCollection]
  );
  // console.log('CURRENT CHART DATASETS:', currentChartDataSets);
  const lastFetchedTime = useRef(null);
  const calculateTotalPrice = (collection) =>
    collection.cards.reduce(
      (total, card) => total + (card.price || 0) * (card.quantity || 0),
      0
    );

  const fetchAndSetCollections = useCallback(async () => {
    // Throttle the fetch calls
    const currentTime = Date.now();
    const fetchDelay = 60000; // 1 minute
    if (
      lastFetchedTime.current &&
      currentTime - lastFetchedTime.current < fetchDelay
    )
      return;
    lastFetchedTime.current = currentTime;

    try {
      const response = await fetchWrapper(
        createApiUrl(`${userId}/collections`),
        'GET'
      );

      console.log('FETCHED COLLECTIONS:', response);
      console.log('5. Fetched and set collections:', response);

      setAllCollections(response.data || []);
      setCollectionData(response.data?.[0] || initialCollectionState);
      setSelectedCollection(response.data?.[0] || initialCollectionState);
    } catch (error) {
      console.error(`Failed to fetch collections: ${error}`);
    }
  }, [userId]);

  const updateCollectionData = useCallback(
    (newData, collectionType) => {
      switch (collectionType) {
        case 'allCollections':
          setAllCollections((prev) =>
            prev.findIndex((c) => c._id === newData._id) === -1
              ? [...prev, newData]
              : prev.map((c) => (c._id === newData._id ? newData : c))
          );
          break;
        case 'selectedCollection':
          setSelectedCollection(newData);
          break;
        case 'collectionData':
          setCollectionData(newData);
          break;
        default:
          console.warn(
            '6. Unknown collection type for update:',
            collectionType
          );
      }
    },
    [setAllCollections, setSelectedCollection, setCollectionData]
  );

  const createUserCollection = async (
    userId,
    newCollectionInfo,
    name,
    description
  ) => {
    if (
      !userId ||
      !name ||
      !validateUserIdAndData(
        userId,
        newCollectionInfo,
        'create a new collection'
      )
    ) {
      console.warn('Invalid inputs for creating user collection.');
      return;
    }

    // const payload = createPayload(newCollectionInfo, name, description, userId);
    const payload = {
      ...newCollectionInfo,
      name,
      description,
      userId,
    };
    const url = createApiUrl(`${userId}/collections`);
    console.log('Creating user collection with data:', {
      userId,
      newCollectionInfo,
      name,
      description,
    });
    console.log('Payload for user collection:', payload);

    const response = await fetchWrapper(url, 'POST', payload);
    console.log('6. Saved collection:', response);
    console.log('6. Saved collection:', response.data);
    console.log('6. Saved collection:', response.message);
    updateCollectionData(response.data, 'allCollections');
    updateCollectionData(response.data, 'collectionData');
    updateCollectionData(response.data, 'selectedCollection');
  };

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

  const getUpdatedCards = (activeCollection, cardUpdate, operation) => {
    console.log('CARD UPDATE:', cardUpdate);
    console.log('OPERATION', operation);

    let cardsToUpdate;

    switch (operation) {
      case 'add':
        cardsToUpdate = handleCardAddition(activeCollection?.cards, cardUpdate);
        break;
      case 'remove':
        cardsToUpdate = handleCardRemoval(activeCollection?.cards, cardUpdate);
        break;
      case 'update':
        // Find the card by some unique identifier, e.g., id
        // eslint-disable-next-line no-case-declarations
        const cardIndex = activeCollection.cards.findIndex(
          (c) => c.id === cardUpdate.id
        );
        if (cardIndex === -1) {
          console.error('Card not found in the collection.');
          return activeCollection.cards; // Return the unchanged cards array
        }

        // eslint-disable-next-line no-case-declarations
        const existingCard = activeCollection.cards[cardIndex];

        // eslint-disable-next-line no-case-declarations
        const updatedCard = {
          ...existingCard,
          latestPrice: cardUpdate.latestPrice, // assuming latestPrice is an object { num, timestamp, _id }
          lastSavedPrice: cardUpdate.lastSavedPrice, // assuming lastSavedPrice is an object { num, timestamp, _id }
          name: cardUpdate.name,
          quantity: cardUpdate.quantity,
          tag: cardUpdate.tag,
          // Update priceHistory, ensure it's an array and append the new price
          priceHistory: Array.isArray(existingCard.priceHistory)
            ? [...existingCard.priceHistory, cardUpdate.priceHistory[0]]
            : [cardUpdate.priceHistory[0]],
        };
        console.log('UPDATED CARD:', updatedCard);

        // Replace the old card with the updated card
        cardsToUpdate = [
          ...activeCollection.cards.slice(0, cardIndex),
          updatedCard,
          ...activeCollection.cards.slice(cardIndex + 1),
        ];
        console.log('UPDATED CARD:', updatedCard);
        return cardsToUpdate; // Directly return the updated array of cards

      default:
        console.error('Unsupported operation:', operation);
        cardsToUpdate = activeCollection.cards; // Return the unchanged cards array
    }

    console.log('CARDS TO UPDATE:', cardsToUpdate);
    return cardsToUpdate.map((existingCard) => {
      console.log('EXISTING CARD BEFORE UPDATE:', existingCard);

      // Calculate new card values
      let cardPrice = null;
      if (existingCard.price) {
        cardPrice = existingCard.price;
      } else {
        cardPrice = existingCard.card_prices[0].tcgplayer_price;
      }

      console.log('EXISTING CARD PRICE:', cardPrice);
      const computedPrice =
        cardPrice * (cardUpdate.quantity || existingCard.quantity);
      console.log('EXISTING CARD TOTALPRICE:', computedPrice);

      // Generate chart data and price history
      const newChartDataEntry = {
        x: moment().format('YYYY-MM-DD HH:mm'),
        y: computedPrice,
      };
      const newPriceHistoryEntry = createPriceHistoryObject(computedPrice);
      const valueOfMostRecentEntry = computedPrice;
      // existingCard.chart_datasets?.[existingCard.chart_datasets?.length - 1]
      //   ?.data?.y -
      // existingCard.chart_datasets?.[existingCard.chart_datasets?.length - 2]
      //   ?.data?.y;
      console.log('VALUE OF MOST RECENT ENTRY:', computedPrice);

      const updatedCard = {
        ...existingCard,
        price: cardPrice,
        totalPrice: computedPrice,
        tag: 'monitored',
        chart_datasets: [
          ...(existingCard.chart_datasets || []),
          newChartDataEntry,
        ],
        priceHistory:
          existingCard.priceHistory &&
          existingCard.priceHistory[existingCard.priceHistory.length - 1] !==
            valueOfMostRecentEntry // Check if the new price history entry is different from the last one
            ? [...existingCard.priceHistory, newPriceHistoryEntry]
            : [newPriceHistoryEntry],
      };

      console.log('UPDATED CARD:', updatedCard);
      return updatedCard;
    });
  };

  const createPriceHistoryObject = (price) => ({
    timestamp: new Date().toISOString(),
    num: price,
  });

  const getUpdatedCollection = async (
    collectionWithCards,
    cardUpdate,
    operation
  ) => {
    const collectionId = selectedCollection._id || null;
    if (collectionId) {
      console.log('COLLECTION ID:', collectionId);
    }
    const isCreating = !collectionId;
    const method = isCreating ? 'POST' : 'PUT';
    const updatedTotalPrice = calculateTotalPrice(collectionWithCards);
    const newCollectionPriceHistoryObject =
      createPriceHistoryObject(updatedTotalPrice);

    // UPDATE CARDS IN COLLECTION WITH CARDS ENDPOINT ---------------------------
    console.log('CARD UPDATE:', cardUpdate);
    const updatedCards = collectionWithCards.cards;
    let cardsPayload = {
      cards: updatedCards,
    };
    let cardsEndpoint = createApiUrl(
      `${userId}/collections/${collectionWithCards._id}/updateCards`
    );
    console.log(
      `Sending ${method} request to ${cardsEndpoint} with payload:`,
      cardsPayload
    );
    let cardsResponse = await fetchWrapper(cardsEndpoint, method, cardsPayload);
    console.log('Cards Update Response:', cardsResponse);
    console.log('Cards Update Response Data:', cardsResponse.data);
    console.log('Cards Update Response Message:', cardsResponse.message);

    // UPDATE CHARTS IN COLLECTION WITH CHARTS ENDPOINT --------------------------------
    const updatedChartData = {
      ...selectedCollection.chartData,
      allXYValues: [
        ...(selectedCollection.chartData?.allXYValues || []),
        {
          label: `Update - ${new Date().toISOString()}`,
          x: new Date().toISOString(),
          y: updatedTotalPrice,
        },
      ],
      datasets: [
        ...(selectedCollection.chartData?.datasets || []),
        createNewDataSet(updatedTotalPrice, selectedCollection),
      ],
    };

    const testData = getUpdatedChartData(selectedCollection, updatedTotalPrice);
    console.log('TEST DATA:', testData);
    let chartDataPayload = {
      chartData: updatedChartData,
    };
    let chartDataEndpoint = createApiUrl(
      `${userId}/collections/${collectionWithCards._id}/updateChartData`
    );
    console.log(
      `Sending ${method} request to ${chartDataEndpoint} with payload:`,
      chartDataPayload
    );
    let chartDataResponse = await fetchWrapper(
      chartDataEndpoint,
      method,
      chartDataPayload
    );
    console.log('Chart Data Update Response:', chartDataResponse);
    console.log('Chart Data Update Response Data:', chartDataResponse.data);
    console.log(
      'Chart Data Update Response Message:',
      chartDataResponse.message
    );

    // UPDATE COLLECTION WITH COLLECTION ENDPOINT --------------------------------
    const updatedCollection = {
      // ...selectedCollection,
      allCardPrices: updatedCards.flatMap((card) =>
        Array(card.quantity).fill(card.price)
      ),
      description: collectionWithCards.description,
      name: collectionWithCards.name,
      userId: userId,
      totalPrice: updatedTotalPrice,
      totalCost: updatedTotalPrice.toString(),
      totalQuantity: updatedCards.reduce((acc, card) => acc + card.quantity, 0),
      quantity: updatedCards.length,
      _id: collectionId,
      chartData: updatedChartData,
      cards: updatedCards,
      dailyPriceChange: getPriceChange(
        selectedCollection?.collectionPriceHistory
      ),
      currentChartDataSets: getCurrentChartDataSets(updatedChartData),
      currentChartDataSets2: transformPriceHistoryToXY(
        selectedCollection.collectionPriceHistory
      ),
      collectionPriceHistory: selectedCollection.collectionPriceHistory
        ? [
            ...selectedCollection.collectionPriceHistory,
            newCollectionPriceHistoryObject,
          ]
        : [newCollectionPriceHistoryObject],
    };
    // Check if creating a new collection or updating an existing one
    const endpoint = createApiUrl(
      `${userId}/collections/${collectionId || ''}`
    );

    const { nonMatchingKeys, payload } = constructPayloadWithDifferences(
      selectedCollection,
      updatedCollection,
      true
    ); // Assume constructPayload does the necessary processing
    console.log('NON-MATCHING KEYS:', nonMatchingKeys);
    console.log(
      `Sending ${method} request to ${endpoint} with payload:`,
      payload
    );
    setCurrentChartDataSets2(
      transformPriceHistoryToXY(selectedCollection.collectionPriceHistory)
    );
    // Break the payload into chunks if necessary
    const chunks = chunkPayload(payload);

    console.log(
      `Sending ${method} request to ${endpoint} with ${chunks.length} chunks.`
    );

    const response = await fetchWrapper(endpoint, method, payload);
    console.log('RESPONSE', response);
    const updatedCollectionPostServer = response.data;

    // const combinedCollectionUpdate = {
    //   ...updatedCard

    console.log('UPDATED COLLECTION POST SERVER:', updatedCollectionPostServer);
    updateCollectionData(updatedCollectionPostServer, 'allCollections');
    updateCollectionData(updatedCollectionPostServer, 'collectionData');
    updateCollectionData(updatedCollectionPostServer, 'selectedCollection');

    return updatedCollection;
  };

  const handleCardOperation = async (card, operation) => {
    if (!card) {
      console.error('Card is undefined.', card);
      return;
    }

    const updatedCards = getUpdatedCards(selectedCollection, card, operation);
    console.log('UPDATED CARDS:', updatedCards);
    const collectionWithCards = { ...selectedCollection, cards: updatedCards };
    console.log('COLLECTION WITH CARDS:', collectionWithCards);
    const updatedCollection = await getUpdatedCollection(
      collectionWithCards,
      card,
      operation
    );
    console.log('UPDATED COLLECTION POST OP HANDLING:', updatedCollection);
    updateCollectionData(updatedCollection, 'selectedCollection');

    return updatedCollection;
  };

  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      collectionData,
      totalCost,
      totalPrice,
      allCardPrices: selectedCollection?.allCardPrices || [],
      xys: xyData || [],
      openChooseCollectionDialog,
      setAllCardPrices,
      setXyData,
      setUpdatedPricesFromCombinedContext,
      setOpenChooseCollectionDialog,
      calculateTotalPrice: () => getCardPrice(selectedCollection),
      getTotalPrice: () => calculateTotalPrice(allCardPrices),
      getTotalCost: () => getTotalCost(selectedCollection),
      getCardQuantity: (cardId) =>
        selectedCollection?.cards?.find((c) => c?.id === cardId)?.quantity || 0,
      createUserCollection: (userId, newCollectionInfo, name, description) =>
        createUserCollection(userId, newCollectionInfo, name, description),
      removeCollection,
      addOneToCollection: (card) => handleCardOperation(card, 'add'),
      removeOneFromCollection: (card) => handleCardOperation(card, 'remove'),
      updateOneFromCollection: (card) => handleCardOperation(card, 'update'),
      fetchAllCollectionsForUser: fetchAndSetCollections,
      fetchAllCollections: fetchAndSetCollections,
      setSelectedCollection,
      setAllCollections,
    }),
    [allCollections, selectedCollection, totalCost, totalPrice, xyData]
  );

  useEffect(() => {
    console.log('CONTEXT STATE:', {
      totalCost,
      totalPrice,
      selectedCollection,
      allCollections,
      collectionData,
      updatedPricesFromCombinedContext,
      xyData,
    });
  }, [allCollections, selectedCollection, totalCost, totalPrice, xyData]);

  // useEffect(() => {
  //   console.log('UPDATED COLLECTION DATA POST SERVER:', collectionData);
  // }, [collectionData]);

  useEffect(() => {
    if (userId) fetchAndSetCollections();
  }, [userId]);

  useEffect(() => {
    if (selectedCollection.chartData)
      setCurrentChartDataSets(
        getCurrentChartDataSets(selectedCollection.chartData)
      );
    console.log('CURRENT CHART DATASETS:', currentChartDataSets);
  }, [selectedCollection]);

  useEffect(() => {
    if (selectedCollection.cards) {
      setTotalPrice(calculateTotalPrice(selectedCollection));
    }
    console.log('TOTAL PRICE:', totalPrice);
  }, [selectedCollection]);

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
