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
  const {
    allCollections,
    allXYValues,
    selectedCollection,
    hasFetchedCollections,
  } = useCollectionStore();
  const { timeRange } = useChartContext();

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
        ? allCollections.reduce((acc, collection) => {
            acc[collection._id] = calculateStatsForCollection(
              collection,
              timeRange
            );
            return acc;
          }, {})
        : {},
    [allCollections, timeRange]
  );

  const totalValue = useMemo(() => {
    if (!validCollections) {
      return 0; // Ensure a default numeric value
    }
    return allCollections?.reduce((acc, collection) => {
      const collectionPrice = parseFloat(collection.totalPrice);
      return acc + (isNaN(collectionPrice) ? 0 : collectionPrice);
    }, 0);
  }, [allCollections]);

  const topFiveCards = useMemo(
    () =>
      validCollections
        ? allCollections
            .flatMap((collection) => collection.cards || [])
            .sort((a, b) => b.price - a.price)
            .slice(0, 5)
        : [],
    [allCollections]
  );

  // if (hasFetchedCollections) {
  //   console.log('SELECTED', selectedCollection);
  //   console.log('ALL', allCollections);
  //   console.log('VALID', validCollections);
  // }
  // Function to create markers for a given collection
  const createMarkers = (selectedCollection) => {
    if (!selectedCollection || !selectedCollection.collectionStatistics)
      return [];

    const { highPoint, lowPoint, avgPrice } =
      selectedCollection.collectionStatistics;
    return [
      {
        axis: 'y',
        value: highPoint,
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

  // Example use of createMarkers within useMemo for selectedCollection
  const markers = useMemo(() => {
    // Assuming selectedCollection is obtained from somewhere, e.g., state or context
    if (!selectedCollection) return [];
    // console.log('SELECTED COLLECTION:', selectedCollection);
    // const selectedCollection = allCollections.find(
    //   (collection) => collection._id === someSelectedCollectionId
    // );
    return createMarkers(selectedCollection);
  }, [allCollections]); // Add dependencies as necessary, e.g., someSelectedCollectionId

  const chartData = useMemo(
    () =>
      validCollections
        ? allCollections.map((collection) => ({
            id: collection.id,
            value: collection.totalPrice,
            label: collection.name,
          }))
        : [],
    [allCollections]
  );

  const contextValue = useMemo(
    () => ({
      // PRIMARY DATA
      stats:
        calculateStatistics({ data: null }, timeRange, allCollections) || {},

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
      timeRange,
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
