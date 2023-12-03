import moment from 'moment';
import { createApiUrl, fetchWrapper } from '../Helpers';

export const transformPriceHistoryToXY = (collectionPriceHistory) => {
  return collectionPriceHistory?.map((entry) => ({
    x: entry?.timestamp, // x represents the timestamp
    y: entry?.num, // y represents the numerical value
    label: `Price at ${entry?.timestamp}`, // label can be customized as needed
  }));
};

export const getAllCardPrices = (cards) =>
  cards.flatMap((card) => Array(card.quantity).fill(card.price));

export const filterUniqueDataPoints = (dataArray) => {
  const uniqueRecords = new Map();

  dataArray?.forEach((item) => {
    const key = `${item?.label}-${item?.x}-${item?.y}`;
    if (!uniqueRecords.has(key)) {
      uniqueRecords.set(key, item);
    }
  });

  return Array.from(uniqueRecords.values());
};
/**
 * Calculates the difference between the updated price and the initial price.
 * @param {Number} updatedPrice - The updated price.
 * @param {Object} selectedCollection - The selected collection.
 * @returns {Number} The difference between the updated price and the initial price.
 * @example calculatePriceDifference(100, { totalPrice: 200 });
 * calculatePriceDifference(100, { totalPrice: 100 });
 **/
export const determineCardPrice = (card, update) => {
  let price = 0;
  console.log('CARD UPDATE:', update);
  if (card?.price) {
    price = card?.price;
  }

  if (update?.latestPrice?.num) {
    price = update?.latestPrice?.num;
  }
  return price || card?.card_prices[0]?.tcgplayer_price;
};

export const updatePriceHistory = (card, update) => {
  const newPriceHistoryEntry = createPriceHistoryObject(
    update?.latestPrice?.num
  );
  const lastPriceHistoryEntry =
    card?.priceHistory[card?.priceHistory?.length - 1];

  if (
    !lastPriceHistoryEntry ||
    lastPriceHistoryEntry?.num !== newPriceHistoryEntry?.num
  ) {
    return [...card.priceHistory, newPriceHistoryEntry];
  }
  return card?.priceHistory;
};

export const createChartDataEntry = (price) => {
  return {
    x: moment().format('YYYY-MM-DD HH:mm'),
    y: price,
  };
};

export const createPriceHistoryObject = (price) => {
  return {
    num: price,
    timestamp: new Date(),
  };
};

export const getFilteredChartData = (chartData, updatedTotalPrice) => {
  const filteredChartData = {
    ...chartData,
    allXYValues: filterUniqueDataPoints(chartData?.allXYValues),
    datasets: chartData?.datasets.map((dataset) => ({
      ...dataset,
      data: dataset?.data.map((dataEntry) => ({
        ...dataEntry,
        xys: filterUniqueDataPoints(dataEntry?.xys),
      })),
    })),
  };
  return {
    ...filteredChartData,
    allXYValues: [
      ...filteredChartData.allXYValues,
      {
        label: `Update - ${new Date().toISOString()}`,
        x: new Date().toISOString(),
        y: updatedTotalPrice,
      },
    ],
  };
};

export const replaceCardInArray = (cardsArray, newCard, index) => {
  return [
    ...cardsArray.slice(0, index),
    newCard,
    ...cardsArray.slice(index + 1),
  ];
};

export const updateCollectionArray = (collections, newData) => {
  const index = collections.findIndex((c) => c._id === newData?._id);
  return index === -1
    ? [...collections, newData]
    : collections.map((c) => (c._id === newData?._id ? newData : c));
};

export const removeDuplicatesFromCollection = (collection) => {
  const uniqueCardsMap = new Map();

  collection.cards.forEach((card) => {
    const uniqueKey = `${card.id}-${card.name}`;
    if (!uniqueCardsMap.has(uniqueKey)) {
      uniqueCardsMap.set(uniqueKey, card);
    }
  });

  return {
    ...collection,
    cards: Array.from(uniqueCardsMap.values()),
  };
};

export const handleError = (condition, errorMessage) => {
  if (!condition) {
    console.error(errorMessage);
    return false;
  }
  return true;
};

export const filterNullPriceHistory = (allCollections) => {
  return allCollections.map((collection) => {
    const filteredCards = collection.cards.map((card) => {
      if (card.priceHistory) {
        // Remove nulls and duplicates with less than 24 hours difference
        const filteredPriceHistory = card.priceHistory.filter(
          (price, index, array) => {
            if (!price) return false; // Filter out null values
            // Check for duplicates with less than 24 hours difference
            const nextPrice = array[index + 1];
            if (nextPrice) {
              const timeDiff =
                new Date(nextPrice.timestamp) - new Date(price.timestamp);
              const lessThan24Hours = timeDiff < 24 * 60 * 60 * 1000; // 24 hours in milliseconds
              return !(price.num === nextPrice.num && lessThan24Hours);
            }
            return true;
          }
        );

        return {
          ...card,
          priceHistory: filteredPriceHistory,
        };
      }
      return card;
    });

    return {
      ...collection,
      cards: filteredCards,
    };
  });
};

export const filterNullPriceHistoryForCollection = (collection) => {
  const filteredCards = collection?.cards?.map((card) => {
    if (card.priceHistory) {
      // Remove null values, duplicates with less than 24 hours difference, and entries with num = 0
      const filteredPriceHistory = card?.priceHistory?.filter(
        (price, index, array) => {
          if (!price || price.num === 0) return false; // Filter out null values and num = 0

          // Check for duplicates with less than 24 hours difference
          const nextPrice = array[index + 1];
          if (nextPrice) {
            const timeDiff =
              new Date(nextPrice.timestamp) - new Date(price.timestamp);
            const lessThan24Hours = timeDiff < 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            return !(price.num === nextPrice.num && lessThan24Hours);
          }
          return true;
        }
      );

      return {
        ...card,
        priceHistory: filteredPriceHistory,
      };
    }
    return card;
  });

  return {
    ...collection,
    cards: filteredCards,
  };
};
/**
 * Handles the addition of a new card to the collection.
 * @param {Array} currentCards - Current array of cards.
 * @param {Object} cardToAdd - Card object to add.
 * @returns {Array} Updated array of cards.
 */
export const handleCardAddition = (currentCards, cardToAdd) => {
  // Initialize currentCards to an empty array if it's not defined
  currentCards = currentCards || [];

  console.log('CURRENT CARDS:', currentCards);
  console.log('CARD TO ADD:', cardToAdd);
  const cardToAddId =
    typeof cardToAdd.id === 'number' ? String(cardToAdd.id) : cardToAdd.id;
  const matchingCard = currentCards.find((c) => c.id === cardToAddId);

  if (matchingCard) {
    matchingCard.quantity++;
    return [...currentCards];
  }

  return [...currentCards, { ...cardToAdd, id: cardToAddId, quantity: 1 }];
};

/**
 * Handles the removal of a card from the collection.
 * @param {Array} currentCards - Current array of cards.
 * @param {Object} cardToRemove - Card object to remove.
 * @returns {Array} Updated array of cards.
 */
export const handleCardRemoval = (currentCards, cardToRemove) => {
  // Initialize currentCards to an empty array if it's not defined
  currentCards = currentCards || [];

  console.log('CURRENT CARDS:', currentCards);
  console.log('CARD TO REMOVE:', cardToRemove);

  const cardToRemoveId =
    typeof cardToRemove.id === 'number'
      ? String(cardToRemove.id)
      : cardToRemove.id;

  // Find the card to remove in the current cards array
  const cardIndex = currentCards.findIndex((c) => c.id === cardToRemoveId);

  if (cardIndex === -1) {
    console.error('Card not found in the collection.');
    return [...currentCards];
  }

  const matchingCard = currentCards[cardIndex];

  // If the card has a quantity greater than 1, decrement it
  if (matchingCard.quantity > 1) {
    matchingCard.quantity--;
    return [...currentCards];
  } else {
    // Remove the card from the collection if quantity is 1 or less
    return currentCards.filter((card) => card.id !== cardToRemoveId);
  }
};

export const constructCardDifferencesPayload = (
  oldCollection,
  newCollection,
  debug = false
) => {
  const differences = {};

  newCollection.cards.forEach((newCard) => {
    const oldCard =
      oldCollection.cards.find((card) => card.id === newCard.id) || {};

    Object.keys(newCard).forEach((key) => {
      if (newCard[key] !== oldCard[key]) {
        if (!differences[newCard.id]) {
          differences[newCard.id] = { old: {}, new: {} };
        }
        differences[newCard.id].old[key] = oldCard[key];
        differences[newCard.id].new[key] = newCard[key];
      }
    });
  });

  if (debug && Object.keys(differences).length > 0) {
    console.log('Card Differences:', differences);
  }

  return differences;
};

export const determineMethod = (operation, cardUpdate, collection) => {
  if (operation === 'remove' && cardUpdate?.quantity === 1) {
    return 'DELETE';
  } else if (collection?.cards?.some((card) => card?.id === cardUpdate?.id)) {
    return 'PUT';
  } else {
    return 'POST';
  }
};

export const determineEndpointSuffix = (operation) => {
  return operation === 'remove' ? 'removeCards' : 'updateCards';
};

/**
 * Creates cards payload.
 * @param {Object} collection - The collection to update.
 * @param {Object} cardUpdate - The card update object.
 * @param {String} operation - The operation to perform.
 * @returns {Promise<Object>} The updated collection.
 */
export const createCardsPayload = (operation, updatedCards, cardUpdate) => {
  if (operation === 'remove') {
    const cardIds = updatedCards
      .filter((card) => card?.id !== cardUpdate?.id)
      .map((card) => ({ id: card?.id, _id: card?._id }));
    return { cardIds };
  } else {
    const allCardsWithIds = updatedCards.map((card) => ({
      id: card?.id,
      _id: card?._id,
    }));
    return { cards: updatedCards, cardIds: allCardsWithIds };
  }
};

/**
 * Handles the updating of a collection chart variable data
 * @param {Object} collection - The collection to update.
 * @param {Object} cardUpdate - The card update object.
 * @param {String} operation - The operation to perform.
 * @returns {Promise<Object>} The updated collection.
 */
export const updateChartData = async (
  userId,
  collectionId,
  updatedChartData
) => {
  const chartDataPayload = { chartData: updatedChartData };
  const chartDataEndpoint = createApiUrl(
    `${userId}/collections/${collectionId}/updateChartData`
  );
  return await fetchWrapper(chartDataEndpoint, 'PUT', chartDataPayload);
};

/**
 * Handles the updating of a collection.
 * @param {Object} collection - The collection to update.
 * @param {Object} cardUpdate - The card update object.
 * @param {String} operation - The operation to perform.
 * @returns {Promise<Object>} The updated collection.
 */
export const updateCollectionDataEndpoint = async (
  userId,
  collectionId,
  updatedCollection
) => {
  const collectionEndpoint = createApiUrl(
    `${userId}/collections/${collectionId}`
  );
  return await fetchWrapper(collectionEndpoint, 'PUT', { updatedCollection });
};

/**
 * Handles the updating of a collection.
 * @param {Object} collection - The collection to update.
 * @param {Object} cardUpdate - The card update object.
 * @param {String} operation - The operation to perform.
 * @returns {Promise<Object>} The updated collection.
 */
export const getPriceChange = (currentChartDataSets2) => {
  if (
    !Array.isArray(currentChartDataSets2) ||
    currentChartDataSets2?.length === 0
  ) {
    console.warn('Invalid or empty chart data sets provided');
    return [];
  }

  const sortedData = currentChartDataSets2
    .filter((dataPoint) => dataPoint && dataPoint?.x && dataPoint?.y != null) // Filter out invalid data points
    .sort((a, b) => new Date(a.x) - new Date(b.x));

  if (sortedData?.length === 0) {
    console.error('No valid chart data points after filtering');
    return [];
  }

  const latestDataPoint = sortedData[sortedData.length - 1];
  const latestTime = new Date(latestDataPoint.x).getTime();
  const twentyFourHoursAgo = latestTime - 24 * 60 * 60 * 1000;

  let closestIndex = -1;
  let closestTimeDifference = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < sortedData.length - 1; i++) {
    const time = new Date(sortedData[i].x).getTime();
    const timeDifference = Math.abs(time - twentyFourHoursAgo);

    if (timeDifference < closestTimeDifference) {
      closestTimeDifference = timeDifference;
      closestIndex = i;
    }
  }

  if (closestIndex !== -1) {
    const pastPrice = sortedData[closestIndex].y;
    const priceChange = latestDataPoint.y - pastPrice;
    const percentageChange = ((priceChange / pastPrice) * 100).toFixed(2);

    return [
      {
        startDate: sortedData[closestIndex].x,
        lowPoint: pastPrice.toFixed(2),
        highPoint: latestDataPoint?.y?.toFixed(2),
        endDate: latestDataPoint?.x,
        priceChange: priceChange.toFixed(2),
        percentageChange: `${percentageChange}%`,
        priceIncreased: priceChange > 0,
      },
    ];
  }

  return [];
};

/**
 * Filters out duplicate Y values from an array of datasets.
 * @param {Array} datasets - An array of dataset objects.
 * @returns {Array} Filtered datasets.
 */
export const filterOutDuplicateYValues = (datasets) => {
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

/**
 * Filters unique XY values with Y not equal to 0.
 * @param {Array} allXYValues - Array of XY value objects.
 * @returns {Array} Filtered array of XY value objects.
 */
export const getUniqueFilteredXYValues = (allXYValues) => {
  // Check if the input is an array and is not null/undefined
  if (!Array.isArray(allXYValues)) {
    // You can throw an error, return an empty array, or handle it as needed
    console.error('Invalid input: allXYValues should be an array', allXYValues);
    return [];
  }

  const uniqueXValues = new Set();
  return allXYValues
    .filter((entry) => {
      // Check if entry is an object and has property y with a number value
      return (
        entry &&
        typeof entry === 'object' &&
        typeof entry.y === 'number' &&
        entry.y !== 0
      );
    })
    .filter((entry) => {
      // Check if entry has property x with a valid value (not null/undefined)
      const hasValidX =
        entry && 'x' in entry && entry.x !== null && entry.x !== undefined;
      if (hasValidX && !uniqueXValues.has(entry.x)) {
        uniqueXValues.add(entry.x);
        return true;
      }
      return false;
    });
  // console.log('uniqueXValues', uniqueXValues);
};

export const getCollectionId = (selectedCollection, allCollections) => {
  return selectedCollection?._id || allCollections[0]?._id;
};

export const calculatePriceDifference = (updatedPrice, selectedCollection) => {
  return updatedPrice - (selectedCollection.chartData?.updatedPrice || 0);
};

export const createNewDataSet = (updatedPrice, selectedCollection) => {
  return {
    data: [
      {
        xys: [
          {
            label: `Update Number ${
              selectedCollection?.chartData?.datasets?.length + 1 || 1
            }`,
            data: {
              x: moment().format('YYYY-MM-DD HH:mm'),
              y: updatedPrice,
            },
          },
        ],
        additionalPriceData: {
          priceChanged:
            calculatePriceDifference(updatedPrice, selectedCollection) !== 0,
          initialPrice: selectedCollection?.totalPrice,
          updatedPrice: updatedPrice,
          priceDifference: calculatePriceDifference(
            updatedPrice,
            selectedCollection
          ),
          priceChange:
            Math.round(
              (calculatePriceDifference(updatedPrice, selectedCollection) /
                (selectedCollection?.totalPrice || 1)) *
                100
            ) / 100,
        },
      },
    ],
  };
};
