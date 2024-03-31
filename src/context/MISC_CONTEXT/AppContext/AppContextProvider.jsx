import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { defaultContextValue } from '../../constants';
import { useCompileCardData } from './useCompileCardData';

const AppContext = createContext(defaultContextValue.APP_CONTEXT);

export const AppContextProvider = ({ children }) => {
  const {
    compileCardsWithQuantities,
    isCardInContext,
    collectionMetaData,
    cardsWithQuantities,
    compileCollectionMetaData,
  } = useCompileCardData();
  useEffect(() => {
    compileCollectionMetaData();
  }, []);
  useEffect(() => {
    compileCardsWithQuantities();
  }, []);
  const appContextValues = useMemo(
    () => ({
      isCardInContext,
      checkIfCardIsInContext: isCardInContext,
      collectionMetaData,
      cardsWithQuantities,
    }),
    [
      isCardInContext,
      collectionMetaData,
      cardsWithQuantities,
      compileCardsWithQuantities,
      isCardInContext,
      compileCollectionMetaData,
    ]
  );

  return (
    <AppContext.Provider value={appContextValues}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
