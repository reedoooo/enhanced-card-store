// export const transformPriceHistoryToXY = (collectionPriceHistory) => {
//   return collectionPriceHistory?.map((entry) => ({
//     x: entry?.timestamp, // x represents the timestamp
//     y: entry?.num, // y represents the numerical value
//     label: `Price at ${entry?.timestamp}`, // label can be customized as needed
//   }));
// };

// export const logError = (source, action, error) => {
//   console.error(
//     `[${source.toUpperCase()}] Failed to ${action}: ${error.message}`
//   );
// };

/**
 * Checks if the given object is empty.
 * @param {Object} obj - Object to check.
 * @returns {Boolean} True if the object is empty, false otherwise.
 */
export const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
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
  console.log('CARD UPDATE QUANTITY TEST', cardUpdate);
  if (operation === 'remove' && cardUpdate?.quantity >= 1) {
    return 'PUT';
    // } else if (collection?.cards?.some((card) => card?.id === cardUpdate?.id)) {
  } else if (operation === 'remove') {
    return 'DELETE';
  } else if (operation === 'update') {
    return 'PUT';
  } else if (operation === 'add' && cardUpdate?.quantity >= 1) {
    return 'PUT';
  } else if (operation === 'add') {
    return 'POST';
  }
};
export const getTotalQuantityOfSelectedCollection = (selectedCollection) => {
  if (!selectedCollection) return 'n/a';
  return selectedCollection?.cards?.reduce(
    (total, card) => total + card.quantity,
    0
  );
};

export const createPriceHistoryObject = (price) => {
  return {
    num: price,
    timestamp: new Date(),
  };
};

export const getUpdatedCollectionPriceHistory = (
  selectedCollection,
  updatedPrice
) => {
  const updatedPriceHistory = selectedCollection?.collectionPriceHistory || [];
  return [...updatedPriceHistory, createPriceHistoryObject(updatedPrice)];
};
/**
 * Ensures a value is a number, providing a default if not.
 * @param {any} value - Value to check.
 * @param {Number} defaultValue - Default value if check fails.
 * @returns {Number} Ensured number.
 */
export const ensureNumber = (value, defaultValue = 0) => {
  const num = parseFloat(value);
  return isNaN(num) ? defaultValue : num;
};

export const getCardPrice = (collection) =>
  parseFloat(collection?.cards?.card_prices?.[0]?.tcgplayer_price || 0);

export const getAllCardPrices = (cards) =>
  cards.flatMap((card) => Array(card.quantity).fill(card.price));

export const determineCardPrice = (card, update) => {
  let price = 0;
  // console.log('CARD UPDATE:', update);
  if (card?.price !== update?.price) {
    price = update?.price;
  } else {
    price = card?.price;
  }

  return price || card?.card_prices[0]?.tcgplayer_price;
};

export const convertToXYLabelData = (collectionPriceHistory) => {
  return collectionPriceHistory?.map((item) => ({
    x: new Date(item?.timestamp).toLocaleDateString(), // Converts timestamp to a readable date string
    y: item?.num,
    label: `Price: $${item?.num} at ${new Date(
      item.timestamp
    ).toLocaleTimeString()}`, // Combines price and time for the label
  }));
};
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

export const createChartDataEntry = (chartDataSets) => {
  const chartData = {
    id: 'priceHistory',
    data: chartDataSets,
  };

  return [chartData];
};
