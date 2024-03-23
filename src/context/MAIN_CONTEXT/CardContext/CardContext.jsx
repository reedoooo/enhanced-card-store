import { createContext, useContext, useMemo } from 'react';
import { useCardStoreHook } from '../../hooks/useCardStore';
import { defaultContextValue } from '../../constants';
const { CARD_CONTEXT } = defaultContextValue;

const CardContext = createContext(CARD_CONTEXT);

export const CardProvider = ({ children }) => {
  const {
    searchData,
    searchSettings,
    setSearchSettings,
    isDataValid,
    setSearchData,
    cardsVersion,
    openConfigurator,
    setOpenConfigurator,
    setIsDataValid,
    clearSearchData,
    handleRequest,
    loadingSearchResults,
    setLoadingSearchResults,
  } = useCardStoreHook();

  const contextValue = useMemo(
    () => ({
      searchData,
      searchSettings,
      setSearchSettings,
      isDataValid,
      setSearchData,
      cardsVersion,
      openConfigurator,
      setOpenConfigurator,
      setIsDataValid,
      clearSearchData,
      handleRequest,
      loadingSearchResults,
      setLoadingSearchResults,
    }),
    [
      searchData,
      searchSettings,
      setSearchSettings,
      // previousSearchData,
      isDataValid,
      setSearchData,
      cardsVersion,
      openConfigurator,
      setOpenConfigurator,
      // setPreviousSearchData,
      setIsDataValid,
      clearSearchData,
      handleRequest,
      loadingSearchResults,
      setLoadingSearchResults,
    ]
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
