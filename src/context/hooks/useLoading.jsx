import { useCallback, useState } from 'react';
const PAGE_LOADING_IDS = {
  CartPage: 'isCollectionLoading',
  CollectionPage: 'isDeckLoading',
  DeckBuilderPage: 'isCardLoading',
  HomePage: 'HomePageLoading',
  ProfilerPage: 'isProfilerLoading',
  StorePage: 'isStoreLoading',
};
const FORM_LOADING_IDS = {
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
};
const AUTH_LOADING_IDS = {
  login: 'signin',
  signup: 'signup',
  logout: 'signout',
};
const DECK_LOADING_IDS = {
  fetchingDecks: 'fetchDecks',
  addingDeck: 'createNewDeck',
  updatingDeck: 'updateDeckDetails',
  deletingDeck: 'deleteDeck',
  addingCardsToDeck: 'addCardsToDeck',
  removingCardsFromDeck: 'removeCardsFromDeck',
};
const COLLECTION_LOADING_IDS = {
  fetchingCollections: 'fetchCollections',
  addingCollection: 'createNewCollection',
  updatingCollection: 'updateCollection',
  deletingCollection: 'deleteCollection',
  addingCardsToCollection: 'addCardsToCollection',
  removingCardsFromCollection: 'removeCardsFromCollection',
};
const CART_LOADING_IDS = {
  fetchingCart: 'fetchUserCart',
  addingCart: 'createUserCart',
  addingCardsToCart: 'addCardsToCart',
  removingCardsFromCart: 'removeCardsFromCart',
};
const GENERAL_LOADING_IDS = {
  isLoading: 'isLoading',
  isDataLoading: 'isDataLoading',
  isFormDataLoading: 'isFormDataLoading',
  isPageLoading: 'isPageLoading',
  ifIsSearchLoading: 'isSearchLoading',
};
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
    fetchingDecks: 'fetchDecks',
    addingDeck: 'createNewDeck',
    updatingDeck: 'updateDeckDetails',
    deletingDeck: 'deleteDeck',
    addingCardsToDeck: 'addCardsToDeck',
    removingCardsFromDeck: 'removeCardsFromDeck',
  },
  collections: {
    fetchingCollections: 'fetchCollections',
    addingCollection: 'createNewCollection',
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

const LOADING_IDS_KEYS = Object.keys(LOADING_IDS);
const LOADING_STATES_VALUES = {
  general: {
    [LOADING_IDS.general.isLoading]: true,
    [LOADING_IDS.general.isDataLoading]: true,
    [LOADING_IDS.general.isFormDataLoading]: true,
    [LOADING_IDS.general.isPageLoading]: true,
    [LOADING_IDS.general.ifIsSearchLoading]: true,
  },
  pages: {
    [LOADING_IDS.pages.CartPage]: true,
    [LOADING_IDS.pages.CollectionPage]: true,
    [LOADING_IDS.pages.DeckBuilderPage]: true,
    [LOADING_IDS.pages.HomePage]: true,
    [LOADING_IDS.pages.ProfilerPage]: true,
    [LOADING_IDS.pages.StorePage]: true,
  },
  forms: {
    [LOADING_IDS.forms.loginForm]: true,
    [LOADING_IDS.forms.signupForm]: true,
    [LOADING_IDS.forms.addDeckForm]: true,
    [LOADING_IDS.forms.updateDeckForm]: true,
    [LOADING_IDS.forms.addCollectionForm]: true,
    [LOADING_IDS.forms.updateCollectionForm]: true,
    [LOADING_IDS.forms.updateUserDataForm]: true,
    [LOADING_IDS.forms.searchForm]: true,
    [LOADING_IDS.forms.collectionSearchForm]: true,
    [LOADING_IDS.forms.timeRangeForm]: true,
    [LOADING_IDS.forms.themRangeForm]: true,
    [LOADING_IDS.forms.statRangeForm]: true,
    [LOADING_IDS.forms.searchSettingsForm]: true,
    [LOADING_IDS.forms.rememberMeForm]: true,
    [LOADING_IDS.forms.authSwitchForm]: true,
  },
  auth: {
    [LOADING_IDS.auth.login]: true,
    [LOADING_IDS.auth.signup]: true,
    [LOADING_IDS.auth.logout]: true,
  },
  decks: {
    [LOADING_IDS.decks.fetchingDecks]: true,
    [LOADING_IDS.decks.addingDeck]: true,
    [LOADING_IDS.decks.updatingDeck]: true,
    [LOADING_IDS.decks.deletingDeck]: true,
    [LOADING_IDS.decks.addingCardsToDeck]: true,
    [LOADING_IDS.decks.removingCardsFromDeck]: true,
  },
  collections: {
    [LOADING_IDS.collections.fetchingCollections]: true,
    [LOADING_IDS.collections.addingCollection]: true,
    [LOADING_IDS.collections.updatingCollection]: true,
    [LOADING_IDS.collections.deletingCollection]: true,
    [LOADING_IDS.collections.addingCardsToCollection]: true,
    [LOADING_IDS.collections.removingCardsFromCollection]: true,
  },
  cart: {
    [LOADING_IDS.cart.fetchingCart]: true,
    [LOADING_IDS.cart.addingCart]: true,
    [LOADING_IDS.cart.addingCardsToCart]: true,
    [LOADING_IDS.cart.removingCardsFromCart]: true,
  },
};
export const useLoading = () => {
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
