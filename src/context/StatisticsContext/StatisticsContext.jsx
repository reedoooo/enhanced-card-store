import React, { createContext, useContext, useState, useMemo } from 'react';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { calculateStatistics } from './helpers';
import { useChartContext } from '../ChartContext/ChartContext';

const StatisticsContext = createContext();

export const useStatisticsStore = () => useContext(StatisticsContext);

export const StatisticsProvider = ({ children }) => {
  const { timeRange } = useChartContext();
  const { allCollections, allXYValues } = useCollectionStore();

  const stats = useMemo(
    () => calculateStatistics({ data: allXYValues }, timeRange, allCollections),
    [allXYValues, timeRange]
  );

  const statsByCollectionId = useMemo(() => {
    return allCollections.reduce((acc, collection) => {
      // Assuming each collection has its own 'currentChartDataSets2'
      const data = collection?.chartData?.allXYValues;
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
