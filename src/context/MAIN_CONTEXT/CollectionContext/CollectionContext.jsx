// /* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { calculateCollectionValue } from './collectionUtility';
import { useAuthContext } from '../AuthContext/authContext';
import useCollectionManager from './useCollectionManager';
import { defaultContextValue } from '../../constants';

export const CollectionContext = createContext(
  defaultContextValue.COLLECTION_CONTEXT
);

export const CollectionProvider = ({ children }) => {
  const { isLoggedIn, authUser, userId } = useAuthContext();
  const {
    collectionData,
    allCollections,
    selectedCollection,
    selectedCards,
    collectionStatistics,
    chartData,
    totalPrice,
    totalQuantity,
    collectionPriceHistory,
    allXYValues,
    lastSavedPrice,
    latestPrice,

    setCollectionData,
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
    getTotalPrice,
    checkAndUpdateCardPrices,
  } = useCollectionManager(isLoggedIn, userId);

  const contextValue = useMemo(
    () => ({
      // ...defaultContextValue.COLLECTION_CONTEXT,
      // MAIN STATE
      collectionData,
      allCollections,
      selectedCollection,
      selectedCards,

      // SECONDARY STATE (derived from main state selectedCollection)
      collectionStatistics,
      chartData,
      totalPrice: getTotalPrice(selectedCollection),
      totalQuantity,
      collectionPriceHistory,
      allXYValues,
      lastSavedPrice,
      latestPrice,

      // STATE SETTERS
      setCollectionData,
      setAllCollections,
      setSelectedCollection,
      setSelectedCards,

      // COLLECTION ACTIONS
      createUserCollection: createNewCollection,
      getAllCollectionsForUser,
      updateAndSyncCollection,
      deleteCollection,
      updateSelectedCollection,

      // CARD ACTIONS
      addOneToCollection: (card, collection) =>
        addCardsToCollection([card], collection),
      removeOneFromCollection: (card, cardId, collection) =>
        removeCardsFromCollection([card], [cardId], collection),
      updateOneInCollection: (collectionId, card, incrementType) => {
        updateCardsInCollection(collectionId, [card], incrementType);
      },
      updateChartDataInCollection,

      // CRON JOB ACTIONS
      checkAndUpdateCardPrices,

      // OTHER ACTIONS
      getTotalPrice,
      // getTotalPrice: () => calculateCollectionValue(selectedCollection),
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

  // useEffect(() => {
  //   console.log('COLLECTION CONTEXT:', contextValue);
  // }, [contextValue]);

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
