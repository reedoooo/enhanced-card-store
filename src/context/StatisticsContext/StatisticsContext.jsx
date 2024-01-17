import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { calculateStatistics } from './helpers';
import { useChartContext } from '../ChartContext/ChartContext';
import { useCollectionStore } from '../index';

const StatisticsContext = createContext();

export const useStatisticsStore = () => useContext(StatisticsContext);

export const StatisticsProvider = ({ children }) => {
  const { timeRange } = useChartContext();
  const { allCollections, allXYValues, selectedCollection } =
    useCollectionStore();
  const [selectedStat, setSelectedStat] = useState('');

  const calculateStatsByCollectionId = useCallback(() => {
    if (!Array.isArray(allCollections) || allCollections.length === 0) {
      return {};
    }
    return allCollections.reduce((acc, collection) => {
      try {
        const data = collection?.chartData?.allXYValues || [];
        acc[collection._id] = calculateStatistics({ data }, timeRange) || {};
      } catch (error) {
        console.error(
          `Error calculating statistics for collection ${collection._id}:`,
          error
        );
        acc[collection._id] = {}; // Default value in case of error
      }
      return acc;
    }, {});
  }, [allCollections, timeRange]);

  const stats = useMemo(() => {
    try {
      return calculateStatistics(
        { data: allXYValues },
        timeRange,
        allCollections
      );
    } catch (error) {
      console.error('Error calculating statistics:', error);
      return {};
    }
  }, [allXYValues, timeRange, allCollections]);

  const statsByCollectionId = useMemo(calculateStatsByCollectionId, [
    calculateStatsByCollectionId,
  ]);

  const totalValue = useMemo(() => {
    if (!Array.isArray(allCollections) || allCollections.length === 0) {
      return 0;
    }
    return allCollections.reduce(
      (acc, collection) => acc + collection.totalPrice,
      0
    );
  }, [allCollections]);

  const topFiveCards = useMemo(() => {
    if (!Array.isArray(allCollections) || allCollections.length === 0) {
      return [];
    }
    return allCollections
      .flatMap((collection) => collection.cards)
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [allCollections]);

  const chartData = useMemo(() => {
    return allCollections?.map((collection) => ({
      id: collection.id,
      value: collection.totalPrice,
      label: collection.name,
    }));
  }, [allCollections]);

  // Prepare markers for high and low points
  const markers = [
    {
      axis: 'y',
      value: selectedCollection?.collectionStatistics?.highPoint,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: 'High Point',
      legendOrientation: 'vertical',
    },
    {
      axis: 'y',
      value: selectedCollection?.collectionStatistics?.lowPoint,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: 'Low Point',
      legendOrientation: 'vertical',
    },
    {
      axis: 'y',
      value: selectedCollection?.collectionStatistics?.average,
      lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
      legend: 'Average',
      legendOrientation: 'vertical',
    },
  ];

  // // Calculate the total value of all collections
  // if (!Array.isArray(allCollections)) {
  //   return null;
  // }
  // const totalValue = allCollections?.reduce(
  //   (acc, collection) => acc + collection.totalPrice,
  //   0
  // );
  // const topFiveCards = allCollections
  //   .flatMap((collection) => collection.cards) // Flatten all cards into one array
  //   .sort((a, b) => b.price - a.price) // Sort by price in descending order
  //   .slice(0, 5);
  // const chartData = allCollections?.map((collection) => ({
  //   id: collection.id,
  //   value: collection.totalPrice,
  //   label: collection.name,
  // }));

  const contextValue = useMemo(
    () => ({
      stats,
      statsByCollectionId: statsByCollectionId[selectedCollection?._id],
      setSelectedStat,
      selectedStat,
      markers,
      // totalValue,
      // topFiveCards,
      // chartData,
    }),
    [
      stats,
      statsByCollectionId,
      selectedCollection,
      markers,
      // totalValue,
      // topFiveCards,
      // chartData,
    ]
  );

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsProvider;
