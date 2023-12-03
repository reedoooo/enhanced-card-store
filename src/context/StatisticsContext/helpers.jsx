export const calculatePriceChanges = (data) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const sortedData = data.sort((a, b) => new Date(a.x) - new Date(b.x));
  const latestDataPoint = sortedData[sortedData.length - 1];
  const latestTime = new Date(latestDataPoint.x).getTime();
  const twentyFourHoursAgo = latestTime - 24 * 60 * 60 * 1000;

  // Find the data point closest to 24 hours before the latest data point
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
    // console.log('pastPrice', pastPrice);
    const priceChange = latestDataPoint.y - pastPrice;
    // console.log('priceChange', priceChange);
    const percentageChange = ((priceChange / pastPrice) * 100).toFixed(2);
    // console.log('percentageChange', percentageChange);

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

export const calculateStatistics = (data, timeRange) => {
  if (!data || !Array.isArray(data.data) || data.data.length === 0)
    return {} && console.log('data', data);

  const filteredData = data?.data?.filter(
    (item) => new Date(item?.x).getTime() >= Date.now() - timeRange
  );
  if (filteredData.length === 0) return {};
  let highPoint = 0;
  let lowPoint = 0;
  let sum = 0;
  let averageData = 0;
  let average = 0;
  let volume = 0;
  let mean = 0;
  let squaredDiffs = 0;
  let volatility = 0;
  // const filteredData2 = getFilteredData2(data, timeRange);
  // console.log('filteredData2', filteredData2);
  // console.log('filteredData', filteredData);
  for (const data of filteredData) {
    // console.log('data', data);
    highPoint = Math.max(...filteredData.map((item) => item.y));
    lowPoint = Math.min(...filteredData.map((item) => item.y));
    sum = filteredData.reduce((acc, curr) => acc + curr.y, 0);
    averageData = calculatePriceChanges(filteredData);
    average = sum / filteredData.length || 0;
    volume = filteredData.length;
    mean = sum / volume;
    squaredDiffs = filteredData.map((item) => {
      const diff = item.y - mean;
      return diff * diff;
    });
    volatility = Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / volume);
  }

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
    average: average?.toFixed(2),
    volume,
    volatility: volatility?.toFixed(2),
  };
};
