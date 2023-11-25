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
