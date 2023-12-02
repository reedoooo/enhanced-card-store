import React, { createContext, useContext, useState, useMemo } from 'react';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { calculateStatistics } from './helpers';
import { useChartContext } from '../ChartContext/ChartContext';

const StatisticsContext = createContext();

export const useStatisticsStore = () => useContext(StatisticsContext);

export const StatisticsProvider = ({ children }) => {
  const { timeRange } = useChartContext();
  const { allCollections } = useCollectionStore();

  const dataForStats = allCollections
    .map((collection) => collection.currentChartDataSets2)
    .flat();

  const stats = useMemo(
    () => calculateStatistics({ data: dataForStats }, timeRange),
    [dataForStats, timeRange]
  );

  const statsByCollectionId = useMemo(() => {
    return allCollections.reduce((acc, collection) => {
      const data = collection.currentChartDataSets2;
      const stats = calculateStatistics({ data }, timeRange);
      acc[collection._id] = stats;
      return acc;
    }, {});
  }, [allCollections, timeRange]);

  // console.log('stats', stats);
  return (
    <StatisticsContext.Provider value={{ stats, statsByCollectionId }}>
      {children}
    </StatisticsContext.Provider>
  );
};

// export const useStatisticsStore = () => {
//   const context = useContext(StatisticsContext);
//   if (!context) {
//     throw new Error(
//       'useStatisticsStore must be used within a CollectionProvider'
//     );
//   }
//   return context;
// };

// Include calculateStatistics and calculatePriceChanges functions here
