export const calculatePriceChanges = (data) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const sortedData = data.sort((a, b) => new Date(a.x) - new Date(b.x));
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

export const getTopCollection = (collections) => {
  return collections?.reduce(
    (max, collection) =>
      max.totalPrice > collection.totalPrice ? max : collection,
    collections[0]
  );
};

export const getTopCard = (cards) => {
  return cards?.reduce(
    (max, card) => (max.price > card.price ? max : card),
    cards[0]
  );
};

export const calculateTotalPriceOfAllCollections = (collections) => {
  return collections
    ?.reduce((total, collection) => total + collection.totalPrice, 0)
    .toFixed(2);
};

export const calculateStatistics = (data, timeRange, allCollections, cards) => {
  if (!data || !Array.isArray(data.data) || data.data.length === 0) return {};

  const filteredData = data?.data?.filter(
    (item) => new Date(item?.x).getTime() >= Date.now() - timeRange
  );
  if (filteredData.length === 0) return {};

  let highPoint = Math.max(...filteredData.map((item) => item.y));
  let lowPoint = Math.min(...filteredData.map((item) => item.y));
  let sum = filteredData.reduce((acc, curr) => acc + curr.y, 0);
  let averageData = calculatePriceChanges(filteredData);
  let average = sum / filteredData.length || 0;
  let volume = filteredData.length;
  let mean = sum / volume;
  let squaredDiffs = filteredData.map((item) => {
    const diff = item.y - mean;
    return diff * diff;
  });
  let volatility = Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / volume);

  const topCollection = getTopCollection(allCollections);
  const topCard = getTopCard(cards);
  const totalPriceAllCollections =
    calculateTotalPriceOfAllCollections(allCollections);

  return {
    highPoint: highPoint.toFixed(2),
    lowPoint: lowPoint.toFixed(2),
    twentyFourHourAverage: {
      startDate: averageData[0]?.startDate,
      endDate: averageData[0]?.endDate,
      lowPoint: averageData[0]?.lowPoint,
      highPoint: averageData[0]?.highPoint,
      priceChange: averageData[0]?.priceChange,
      percentageChange: averageData[0]?.percentageChange,
      priceIncreased: averageData[0]?.priceIncreased,
    },
    average: average.toFixed(2),
    volume,
    volatility: volatility.toFixed(2),
    general: {
      totalPrice: totalPriceAllCollections,
      topCard: topCard?.name, // or any other identifier for the card
      topCollection: topCollection?.name, // or any other identifier for the collection
    },
  };
};

export const calculateStatsForCollection = (collection, timeRange) => {
  try {
    const data = collection?.chartData?.allXYValues || [];
    return calculateStatistics({ data }, timeRange) || {};
  } catch (error) {
    console.error(
      `Error calculating statistics for collection ${collection._id}:`,
      error
    );
    return {}; // Default value in case of error
  }
};
