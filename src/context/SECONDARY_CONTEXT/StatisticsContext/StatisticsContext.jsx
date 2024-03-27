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
import { useCollectionStore } from '../../index';
import { defaultContextValue } from '../../constants';
import useSelectedCollection from '../../MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useTimeRange from '../../../components/forms/selectors/useTimeRange';

const StatisticsContext = createContext(defaultContextValue.STATISTICS_CONTEXT);

export const StatisticsProvider = ({ children }) => {
  const { allXYValues, hasFetchedCollections } = useCollectionStore();
  const { selectedCollection, allCollections } = useSelectedCollection();
  const { selectedTimeRange } = useTimeRange();
  if (!Array.isArray(allCollections)) {
    return null;
  }
  const [selectedStat, setSelectedStat] = useState('');
  const validCollections =
    Array.isArray(allCollections) && allCollections.length > 0;

  // Calculate statistics for all collections
  const statsByCollectionId = useMemo(
    () =>
      validCollections
        ? allCollections?.reduce((acc, collection) => {
            acc[collection?._id] = calculateStatsForCollection(
              collection,
              selectedTimeRange
            );
            return acc;
          }, {})
        : {},
    [allCollections, selectedTimeRange]
  );

  const totalValue = useMemo(() => {
    if (!validCollections) {
      return 0; // Ensure a default numeric value
    }
    return allCollections?.reduce((acc, collection) => {
      const collectionPrice = parseFloat(collection?.totalPrice);
      return acc + (isNaN(collectionPrice) ? 0 : collectionPrice);
    }, 0);
  }, [allCollections]);

  const topFiveCards = useMemo(
    () =>
      validCollections
        ? allCollections
            .flatMap((collection) => collection?.cards || [])
            .sort((a, b) => b.price - a.price)
            .slice(0, 30)
        : [],
    [allCollections]
  );

  const createMarkers = (selectedCollection) => {
    if (!selectedCollection || !selectedCollection.collectionStatistics)
      return [];

    const { highPoint, lowPoint, avgPrice, percentageChange } =
      selectedCollection.collectionStatistics;
    return [
      {
        axis: 'y',
        value: percentageChange,
        lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
        legend: `${selectedCollection.name} High`,
        legendOrientation: 'vertical',
      },
      {
        axis: 'y',
        value: lowPoint,
        lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
        legend: `${selectedCollection.name} Low`,
        legendOrientation: 'vertical',
      },
      {
        axis: 'y',
        value: avgPrice,
        lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
        legend: `${selectedCollection.name} Avg`,
        legendOrientation: 'vertical',
      },
    ];
  };

  const markers = useMemo(() => {
    if (!selectedCollection) return [];
    return createMarkers(selectedCollection);
  }, [allCollections]); // Add dependencies as necessary, e.g., someSelectedCollectionId

  const contextValue = useMemo(
    () => ({
      stats:
        calculateStatistics(
          { data: null },
          selectedTimeRange,
          allCollections
        ) || {},

      allStats: [statsByCollectionId],
      statsByCollectionId: statsByCollectionId[selectedCollection?._id],
      selectedStat,
      markers,
      setSelectedStat,
      totalValue,
      topFiveCards,
      calculateTotalPriceOfAllCollections,
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
      setSelectedStat,
      selectedTimeRange,
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
