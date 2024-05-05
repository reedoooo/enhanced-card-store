import { useCallback, useState } from 'react';
const LOADING_IDS = {
  general: {
    isLoading: 'isLoading',
    isDataLoading: 'isDataLoading',
    isFormDataLoading: 'isFormDataLoading',
    isPageLoading: 'isPageLoading',
    ifIsSearchLoading: 'isSearchLoading',
  },
  pages: {
    CartPage: 'isCollectionLoading',
    CollectionPage: 'isDeckLoading',
    DeckBuilderPage: 'isCardLoading',
    HomePage: 'HomePageLoading',
    ProfilerPage: 'isProfilerLoading',
    StorePage: 'isStoreLoading',
  },
  forms: {
    loginForm: 'loginForm',
    signupForm: 'signupForm',
    addDeckForm: 'addDeckForm',
    updateDeckForm: 'updateDeckForm',
    addCollectionForm: 'addCollectionForm',
    updateCollectionForm: 'updateCollectionForm',
    updateUserDataForm: 'updateUserDataForm',
    searchForm: 'searchForm',
    collectionSearchForm: 'collectionSearchForm',
    timeRangeForm: 'timeRangeForm',
    themRangeForm: 'themeRangeForm',
    statRangeForm: 'statRangeForm',
    searchSettingsForm: 'searchSettingsSelector',
    rememberMeForm: 'rememberMeForm',
    authSwitchForm: 'authSwitch',
  },
  auth: {
    login: 'signin',
    signup: 'signup',
    logout: 'signout',
  },
  decks: {
    fetchingDecks: 'FETCH_ALL_DECKS',
    addingDeck: 'ADD_DECKS',
    updatingDeck: 'UPDATE_DECKS',
    deletingDeck: 'DELETE_DECKS',
    addingCardsToDeck: 'ADD_CARDS_TO_DECK',
    removingCardsFromDeck: 'REMOVE_CARDS_FROM_DECK',
  },
  collections: {
    fetchingCollections: 'FETCH_ALL_COLLECTIONS',
    addingCollection: 'ADD_COLLECTIONS',
    updatingCollection: 'updateCollection',
    deletingCollection: 'deleteCollection',
    addingCardsToCollection: 'addCardsToCollection',
    removingCardsFromCollection: 'removeCardsFromCollection',
  },
  cart: {
    fetchingCart: 'fetchUserCart',
    addingCart: 'createUserCart',
    addingCardsToCart: 'addCardsToCart',
    removingCardsFromCart: 'removeCardsFromCart',
  },
};
const allLoadingIds = Object.values(LOADING_IDS).reduce(
  (acc, category) => ({ ...acc, ...category }),
  {}
);
const useLoading = () => {
  const [loadingStates, setLoadingStates] = useState({});
  const [loadingQueue, setLoadingQueue] = useState([]);
  const [apiLoadingStates, setApiLoadingStates] = useState({
    login: false,
  });
  const [error, setError] = useState(null);
  const startLoading = useCallback(
    (id) => {
      if (allLoadingIds[id]) {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        setLoadingQueue((prev) => [...prev, id]);
      }
    },
    [allLoadingIds, setLoadingStates, setLoadingQueue]
  );
  const stopLoading = useCallback(
    (id) => {
      if (loadingStates[id]) {
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        setLoadingQueue((prev) => prev.filter((item) => item !== id));
      } else if (apiLoadingStates[id] !== undefined) {
        setApiLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
      }
      setLoadingQueue((prevQueue) => prevQueue.filter((item) => item !== id));
    },
    [apiLoadingStates]
  );
  const isAnyLoading = useCallback(
    () => Object.values(loadingStates).some((state) => state),
    [loadingStates]
  );

  const isLoading = useCallback((id) => !!loadingStates[id], [loadingStates]);
  const clearLoading = useCallback(() => {
    setLoadingStates({});
    setLoadingQueue([]);
  }, []);

  return {
    // isPageLoading:
    // isSearchLoading: loadingStates.isSearchLoading,
    loadingQueue,
    isLoading,
    isAnyLoading,
    stopLoading,
    clearLoading,
    error,
    setError,
    apiLoadingStates,
    startLoading,
  };
};

export default useLoading;
