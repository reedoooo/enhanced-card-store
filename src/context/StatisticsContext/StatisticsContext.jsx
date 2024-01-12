import React, { createContext, useContext, useState, useMemo } from 'react';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { calculateStatistics } from './helpers';
import { useChartContext } from '../ChartContext/ChartContext';

const StatisticsContext = createContext();

export const useStatisticsStore = () => useContext(StatisticsContext);

export const StatisticsProvider = ({ children }) => {
  const { timeRange } = useChartContext();
  const { allCollections, allXYValues } = useCollectionStore();
  const [selectedStat, setSelectedStat] = useState('');

  // memoized status regarding the price history of a user's collection
  const stats = useMemo(
    () => calculateStatistics({ data: allXYValues }, timeRange, allCollections),
    [allXYValues, timeRange]
  );

  // memoized stats regarding the price history of all of a user's collections
  const statsByCollectionId = useMemo(() => {
    return allCollections?.reduce((acc, collection) => {
      // Assuming each collection has its own 'currentChartDataSets2'
      const data = collection?.chartData?.allXYValues;
      acc[collection._id] = calculateStatistics({ data }, timeRange);
      return acc;
    }, {});
  }, [allCollections, timeRange]);
  // Prepare markers for high and low points
  const markers = [
    {
      axis: 'y',
      value: statsByCollectionId?.highPoint,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: 'High Point',
      legendOrientation: 'vertical',
    },
    {
      axis: 'y',
      value: statsByCollectionId?.lowPoint,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: 'Low Point',
      legendOrientation: 'vertical',
    },
    {
      axis: 'y',
      value: statsByCollectionId?.average,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: 'Average',
      legendOrientation: 'vertical',
    },
  ];

  // Calculate the total value of all collections
  const totalValue = allCollections?.reduce(
    (acc, collection) => acc + collection.totalPrice,
    0
  );
  const topFiveCards = allCollections
    .flatMap((collection) => collection.cards) // Flatten all cards into one array
    .sort((a, b) => b.price - a.price) // Sort by price in descending order
    .slice(0, 5);
  const chartData = allCollections?.map((collection) => ({
    id: collection.id,
    value: collection.totalPrice,
    label: collection.name,
  }));

  return (
    <StatisticsContext.Provider
      value={{
        stats,
        statsByCollectionId,
        setSelectedStat,
        selectedStat,
        markers,
        totalValue,
        topFiveCards,
        chartData,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsProvider;
