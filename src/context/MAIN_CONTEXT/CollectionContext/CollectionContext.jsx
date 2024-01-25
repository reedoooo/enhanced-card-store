// /* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  calculateCollectionValue,
  defaultContextValue,
} from './collectionUtility';
import { useAuthContext } from '../../AuthContext/authContext';
import useCollectionManager from './useCollectionManager';

export const CollectionContext = createContext(defaultContextValue);
export const CollectionProvider = ({ children }) => {
  const { isLoggedIn, authUser, userId } = useAuthContext();
  const createApiUrl = useCallback(
    (path) =>
      `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections${path}`,
    [userId]
  );
  const {
    allCollections,
    selectedCollection,
    selectedCards,
    createNewCollection,
    getAllCollectionsForUser,
    updateAndSyncCollection,
    deleteCollection,
    addCardsToCollection,
    removeCardsFromCollection,
    updateCardsInCollection,
    updateChartDataInCollection,
    updateSelectedCollection,
    setAllCollections,
    setSelectedCollection,
    setSelectedCards,
  } = useCollectionManager(createApiUrl, userId, isLoggedIn);

  const contextValue = useMemo(
    () => ({
      // MAIN STATE
      allCollections,
      selectedCollection,
      selectedCards,

      // SECONDARY STATE (derived from main state selectedCollection)
      collectionStatistics: selectedCollection?.collectionStatistics,
      chartData: selectedCollection?.chartData,
      totalPrice: calculateCollectionValue(selectedCollection),
      totalQuantity: selectedCollection?.cards?.length || 0,
      collectionPriceHistory:
        selectedCollection?.chartData?.collectionPriceHistory,
      allXYValues: selectedCollection?.chartData?.allXYValues,
      lastSavedPrice: selectedCollection?.chartData?.lastSavedPrice,
      latestPrice: selectedCollection?.chartData?.latestPrice,

      // STATE SETTERS
      setAllCollections,
      setSelectedCollection,
      setSelectedCards,

      // COLLECTION ACTIONS
      createUserCollection: createNewCollection,
      getAllCollectionsForUser, // Debounced function to fetch collections
      updateAndSyncCollection,
      deleteCollection,
      updateSelectedCollection,

      // CARD ACTIONS
      addOneToCollection: (card, collection) =>
        addCardsToCollection([card], collection),
      removeOneFromCollection: (collectionId, cardId) =>
        removeCardsFromCollection(collectionId, [cardId]),
      updateOneInCollection: (collectionId, card, incrementType) => {
        updateCardsInCollection(collectionId, [card], incrementType);
      },
      updateChartDataInCollection,

      // OTHER ACTIONS
      getTotalPrice: () => calculateCollectionValue(selectedCollection),
      // toggleCollectionVisibility: () => {},
    }),
    [
      allCollections,
      selectedCollection,
      selectedCards,
      setAllCollections,
      setSelectedCollection,
      setSelectedCards,
      createNewCollection,
      getAllCollectionsForUser,
      updateAndSyncCollection,
      deleteCollection,
      addCardsToCollection,
      removeCardsFromCollection,
      updateCardsInCollection,
      updateChartDataInCollection,
      calculateCollectionValue,
    ]
  );

  useEffect(() => {
    console.log('COLLECTION CONTEXT:', contextValue);
  }, [contextValue]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionStore = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      'useCollectionStore must be used within a CollectionProvider'
    );
  }
  return context;
};
// const logContextValue = (context) => {
//   console.log('COLLECTION CONTEXT:', {
//     selectedCollection: context?.selectedCollection,
//     selectedCards: context?.selectedCollection?.cards,
//     allCollections: context?.allCollections,
//     cards: context.cards,
//     totalPrice: context.totalPrice,
//     totalQuantity: context.totalQuantity,
//     currentChartDataSets2: context.currentChartDataSets2,
//     collectionPriceHistory: context.collectionPriceHistory,
//     lastSavedPrice: context.lastSavedPrice,
//     latestPrice: context.latestPrice,
//     allXYValues: context.allXYValues,
//   });
// };
