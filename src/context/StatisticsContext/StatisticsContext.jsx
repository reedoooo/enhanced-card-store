import React, { createContext, useContext, useState, useMemo } from 'react';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { calculateStatistics } from './helpers';
import { useChartContext } from '../ChartContext/ChartContext';

const StatisticsContext = createContext();

export const useStatisticsStore = () => useContext(StatisticsContext);

export const StatisticsProvider = ({ children }) => {
  const { timeRange } = useChartContext();
  const { allCollections, currentChartDataSets2 } = useCollectionStore();

  // console.log('currentChartDataSets2', currentChartDataSets2);

  const stats = useMemo(
    () => calculateStatistics({ data: currentChartDataSets2 }, timeRange),
    [currentChartDataSets2, timeRange]
  );

  // console.log('stats', stats);

  const statsByCollectionId = useMemo(() => {
    return allCollections.reduce((acc, collection) => {
      // Assuming each collection has its own 'currentChartDataSets2'
      const data = collection.currentChartDataSets2;
      acc[collection._id] = calculateStatistics({ data }, timeRange);
      return acc;
    }, {});
  }, [allCollections, timeRange]);

  return (
    <StatisticsContext.Provider value={{ stats, statsByCollectionId }}>
      {children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsProvider;
