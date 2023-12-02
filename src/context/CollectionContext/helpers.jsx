import moment from 'moment';

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

export const determineCardPrice = (card, update) => {
  if (update?.latestPrice?.num) return update.latestPrice.num;
  if (card.price) return card.price;
  return card.card_prices[0].tcgplayer_price;
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
  const filteredCards = collection.cards.map((card) => {
    if (card.priceHistory) {
      // Remove null values, duplicates with less than 24 hours difference, and entries with num = 0
      const filteredPriceHistory = card.priceHistory.filter(
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
