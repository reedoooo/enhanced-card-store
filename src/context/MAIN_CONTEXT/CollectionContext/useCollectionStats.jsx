import { useEffect, useState } from 'react';
import useSelectedCollection from './useSelectedCollection';

const useCollectionStats = () => {
  const { allCollections } = useSelectedCollection();
  const [collectionStats, setCollectionStats] = useState({});
  const [metaStats, setMetaStats] = useState({});
  const totals = [];
  const quantities = [];
  useEffect(() => {
    const stats = {};
    for (const collection of allCollections) {
      const {
        totalPrice,
        totalQuantity, // Fixed typo from 'toalQuantity' to 'totalQuantity'
        nivoChartData,
        newNivoChartData,
        nivoTestData,
        averagedChartData,
        chartData,
        muiChartData,
        name,
        descriptions,
        lastUpdated,
        collectionPriceHistory,
        dailyCollectionPriceHistory,
        createdAt,
        collectionStatistics,
        id, // Assuming 'id' is available in 'collection' for mapping
      } = collection;

      const { avgPrice, highPoint, lowPoint, percentageChange, priceChange } =
        collectionStatistics;

      totals.push(totalPrice);
      quantities.push(totalQuantity);

      stats[collection.id] = {
        totalPrice,
        totalQuantity,
        nivoChartData,
        newNivoChartData,
        nivoTestData,
        averagedChartData,
        chartData,
        muiChartData,
        name,
        descriptions,
        lastUpdated,
        collectionPriceHistory,
        dailyCollectionPriceHistory,
        createdAt,
        avgPrice,
        highPoint,
        lowPoint,
        percentageChange,
        priceChange,
        collectionStatistics,
      };
    }

    setCollectionStats(stats);
    console.log('COLLECTION STATS RECORDED: ', stats);
  }, []); // Dependency array ensures this effect runs only when allCollections changes

  const calculateAndSetMetaStats = () => {
    const metaStats = {};
    metaStats.totalValue = totals.reduce((acc, total) => acc + total, 0);
    metaStats.totalQuantity = quantities.reduce(
      (acc, quantity) => acc + quantity,
      0
    );
    setMetaStats(metaStats);
    console.log('META STATS RECORDED: ', metaStats);
    return metaStats;
  };

  useEffect(() => {
    calculateAndSetMetaStats();
  }, []);
  return { collectionStats, metaStats };
};

export default useCollectionStats;
