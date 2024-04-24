const roundDecimalToWholeNumber = (value) => {
  return Math.round(value * 100) / 100;
};
export const roundToNearestTenth = (value) => {
  return Math.round(value * 10) / 10;
};
export const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;
export const createApiUrl = (path) => `${BASE_API_URL}/${path}`;
export const calculateAndUpdateTotalPrice = (collection) => {
  let totalPrice = 0;
  if (collection && collection.cards) {
    totalPrice = collection.cards.reduce((total, card) => {
      return total + card.price * card.quantity;
    }, 0);
  }
  return totalPrice;
};
export const getCardQuantity = (collectionId, allCollections) => {
  // Assuming allCollections is an array of collection objects
  const collection = allCollections.find((coll) => coll._id === collectionId);
  return collection ? collection.cards.length : 0;
};
export const getCartCardQuantity = (cart, cardId) => {
  let totalItems = 0;
  let quantityOfSameId = 0;
  cart?.items?.forEach((item) => {
    totalItems += item.quantity;
    if (item.id === cardId) {
      quantityOfSameId += item.quantity;
    }
  });
  return { totalItems, quantityOfSameId };
};
export const createNewPriceEntry = (price) => {
  return {
    num: price,
    timestamp: new Date(),
  };
};
export const calculateChangePercentage = (collectionData) => {
  const history = collectionData?.collectionValueHistory;
  if (!history || history.length < 2) return 'N/A';

  const oldValue = roundDecimalToWholeNumber(history[1]?.num || 0); // First entry's num value
  const newValue = roundDecimalToWholeNumber(
    history[history.length - 1]?.num || 0
  ); // Last entry's num value

  if (oldValue === 0) return 'N/A'; // Avoid division by zero

  const percentageChange = ((newValue - oldValue) / oldValue) * 100;
  return percentageChange?.toFixed(2) + '%'; // Format to 2 decimal places
};
export const formatDateBasedOnRange = (range) => {
  const formatMap = {
    '24hr': { format: '%H:%M', ticks: 'every hour' },
    '7d': { format: '%b %d', ticks: 'every day' },
    '30d': { format: '%b %d', ticks: 'every day' },
    '90d': { format: '%b %d', ticks: 'every 3 days' },
    '180d': { format: '%b %d', ticks: 'every 6 days' },
    '270d': { format: '%b %d', ticks: 'every 9 days' },
    '365d': { format: '%b %d', ticks: 'every 12 days' },
    default: { format: '%b %d', ticks: 'every day' },
  };

  return formatMap[range] || formatMap.default;
};
export const createMarkers = (selected) => {
  if (!selected || !selected.collectionStatistics) return [];

  const { highPoint, lowPoint, avgPrice, percentageChange } =
    selected.collectionStatistics;
  return [
    {
      axis: 'y',
      value: percentageChange,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: `${selected.name} High`,
      legendOrientation: 'vertical',
    },
    {
      axis: 'y',
      value: lowPoint,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: `${selected.name} Low`,
      legendOrientation: 'vertical',
    },
    {
      axis: 'y',
      value: avgPrice,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: `${selected.name} Avg`,
      legendOrientation: 'vertical',
    },
  ];
};
