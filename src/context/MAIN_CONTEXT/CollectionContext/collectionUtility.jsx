/* eslint-disable @typescript-eslint/no-empty-function */
import { DEFAULT_COLLECTION } from '../../constants';
export const defaultContextValue = {
  selectedCollection: DEFAULT_COLLECTION,
  allCollections: [DEFAULT_COLLECTION],
  collectionStatistics: DEFAULT_COLLECTION.collectionStatistics,
  chartData: DEFAULT_COLLECTION.chartData,
  currentChartDataSets2:
    DEFAULT_COLLECTION.chartData.currentChartDataSets2 || [],
  totalPrice: DEFAULT_COLLECTION.totalPrice,
  totalQuantity: DEFAULT_COLLECTION.totalQuantity,
  latestPrice: DEFAULT_COLLECTION.latestPrice || {},
  lastSavedPrice: DEFAULT_COLLECTION.lastSavedPrice || {},
  collectionPriceHistory: DEFAULT_COLLECTION.collectionPriceHistory || [],
  allXYValues: DEFAULT_COLLECTION.chartData.allXYValues || [],
  setCurrentChartData2: () => {},
  calculateCollectionValue: () => {},
  setUpdatedPricesFromCombinedContext: () => {},
  updateCollection: () => {},
  calculateTotalPrice: () => {},
  getNewTotalPrice: () => {},
  createUserCollection: () => {},
  removeCollection: () => {},
  getAllCollectionsForUser: () => {},
  setSelectedCollection: () => {},
  setAllCollections: () => {},
  addOneToCollection: () => {},
  removeOneFromCollection: () => {},
  // Additional methods can be added as needed
};
export const calculateCollectionValue = (collection) => {
  if (!collection || collection.tag === 'new') {
    console.warn('Invalid or missing collection', collection);
    return 0;
  }

  const getCardsFromCollection = (coll) => {
    if (coll.restructuredCollection) {
      return coll.restructuredCollection.cards;
    } else if (coll.cards && Array.isArray(coll.cards)) {
      return coll.cards;
    }
    return coll;
  };

  const cards = getCardsFromCollection(collection);

  if (!Array.isArray(cards)) {
    console.warn('Invalid collection format', collection);
    return 0;
  }

  return cards.reduce((totalValue, card) => {
    const cardPrice = card?.price || 0;
    const cardQuantity = card?.quantity || 0;
    return totalValue + cardPrice * cardQuantity;
  }, 0);
};

// ADD CARDS
