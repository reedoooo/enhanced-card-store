import { createContext, useContext, useMemo } from 'react';
import { useCardStoreHook } from '../../hooks/useCardStore';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const {
    cardsArray,
    searchData,
    isDataValid,
    // setCardsArray,
    // setCurrentCartArray,
    // setSearchData,
    // getCardData,
    // getRandomCard,
    handleRequest,
    setIsDataValid,
    clearSearchData,
  } = useCardStoreHook();

  const contextValue = useMemo(
    () => ({
      cardsArray,
      searchData,
      isDataValid,
      // setCardsArray,
      // setCurrentCartArray,
      // setSearchData,
      // getCardData,
      // getRandomCard,
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
