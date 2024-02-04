import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  calculateStatistics,
  calculateTotalPriceOfAllCollections,
  calculatePriceChanges,
  getTopCard,
  getTopCollection,
  calculateStatsForCollection,
} from './helpers';
import { useChartContext } from '../../MAIN_CONTEXT/ChartContext/ChartContext';
import { useCollectionStore } from '../../index';
import { defaultContextValue } from '../../constants';

const StatisticsContext = createContext(defaultContextValue.STATISTICS_CONTEXT);

export const StatisticsProvider = ({ children }) => {
  const { allCollections, allXYValues, selectedCollection } =
    useCollectionStore();
  const { timeRange } = useChartContext();

  if (!Array.isArray(allCollections)) {
    return null;
  }
  const [selectedStat, setSelectedStat] = useState('');

  // Calculate statistics for all collections
  const statsByCollectionId = useMemo(() => {
    if (!Array.isArray(allCollections) || allCollections?.length === 1) {
      return {};
    }
    return allCollections?.reduce((acc, collection) => {
      acc[collection._id] = calculateStatsForCollection(collection, timeRange);
      return acc;
    }, {});
  }, [allCollections, timeRange]);
  // Calculate the total value of all collections
  const totalValue = useMemo(() => {
    if (!Array.isArray(allCollections) || allCollections?.length === 1) {
      return 0;
    }
    return allCollections?.reduce(
      (acc, collection) => acc + collection.totalPrice,
      0
    );
  }, [allCollections]);
  // console.log('totalValue:', totalValue);
  // Get the top five cards among all collections
  const topFiveCards = useMemo(() => {
    if (!Array.isArray(allCollections) || allCollections?.length === 1) {
      return [];
    }
    const allCards = allCollections?.flatMap(
      (collection) => collection.cards || []
    );
    return allCards.sort((a, b) => b.price - a.price).slice(0, 5);
  }, [allCollections]);
  // console.log('topFiveCards:', topFiveCards);
  // Prepare markers for high and low points
  const markers = useMemo(() => {
    return [
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
  }, [selectedCollection]);
  // Prepare chart data for the pie chart
  const chartData = useMemo(() => {
    return allCollections?.map((collection) => ({
      id: collection.id,
      value: collection.totalPrice,
      label: collection.name,
    }));
  }, [allCollections]);
  const contextValue = useMemo(
    () => ({
      // PRIMARY DATA
      stats:
        calculateStatistics({ data: allXYValues }, timeRange, allCollections) ||
        {},
      allStats: [statsByCollectionId],
      statsByCollectionId: statsByCollectionId[selectedCollection?._id],
      selectedStat,
      markers,
      // PRIMARY FUNCTIONS
      setSelectedStat,
      // SECONDARY DATA
      totalValue,
      topFiveCards,
      chartData,
      // SECONDARY FUNCTIONS
      calculateTotalPriceOfAllCollections,
      // calculateStatsByCollectionId,
      calculatePriceChanges,
      getTopCard,
      getTopCollection,
    }),
    [
      statsByCollectionId,
      selectedCollection,
      markers,
      totalValue,
      topFiveCards,
      chartData,
      setSelectedStat,
    ]
  );

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsProvider;

export const useStatisticsStore = () => useContext(StatisticsContext);

// const stats = useMemo(() => {
//   try {
//     return calculateStatistics(
//       { data: allXYValues },
//       timeRange,
//       allCollections
//     );
//   } catch (error) {
//     console.error('Error calculating statistics:', error);
//     return {};
//   }
// }, [allXYValues, timeRange, allCollections]);

// const statsByCollectionId = useMemo(calculateStatsByCollectionId, [
//   calculateStatsByCollectionId,
// ]);

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
// const calculateStatsByCollectionId = useCallback(() => {
//   if (!Array.isArray(allCollections) || allCollections.length === 0) {
//     return {};
//   }
//   return allCollections.reduce((acc, collection) => {
//     try {
//       const data = collection?.chartData?.allXYValues || [];
//       acc[collection._id] = calculateStatistics({ data }, timeRange) || {};
//     } catch (error) {
//       console.error(
//         `Error calculating statistics for collection ${collection._id}:`,
//         error
//       );
//       acc[collection._id] = {}; // Default value in case of error
//     }
//     return acc;
//   }, {});
// }, [allCollections, timeRange]);
