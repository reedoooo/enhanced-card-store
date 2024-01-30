import { createContext, useContext, useMemo } from 'react';
import { useCardStoreHook } from '../../hooks/useCardStore';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const {
    cardsArray,
    searchData,
    isDataValid,
    handleRequest,
    setIsDataValid,
    clearSearchData,
  } = useCardStoreHook();

  const contextValue = useMemo(
    () => ({
      cardsArray,
      searchData,
      isDataValid,
      setIsDataValid,
      clearSearchData,
      handleRequest,
    }),
    [cardsArray, searchData, isDataValid]
  );

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};

export const useCardStore = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardStore must be used within a CardProvider');
  }
  return context;
};
