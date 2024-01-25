/* eslint-disable @typescript-eslint/no-empty-function */
// ! DEFAULT VALUES FOR CARD OBJECTS

import { createNewPriceEntry } from './Helpers';

// Default values for common API data fields
const defaultCommonAPIFields = {
  name: '',
  id: '',
  type: '',
  frameType: '',
  desc: '',
  atk: 0,
  def: 0,
  level: 0,
  race: '',
  attribute: '',
  archetype: [],
  card_sets: [],
  card_images: [],
  card_prices: [],
};
// Default values for common user input data fields
const defaultCommonUserInputFields = {
  tag: '',
  watchList: false,
};
// Default values for common custom dynamic data fields
const defaultCommonCustomDynamicFields = {
  price: 0,
  quantity: 0,
  image: '',
  totalPrice: 0,
};
// Default values for unique custom dynamic data fields
const defaultUniqueCustomDynamicFields = {
  latestPrice: createNewPriceEntry(0),
  lastSavedPrice: createNewPriceEntry(0),
  priceHistory: [],
  dailyPriceHistory: [],
  chart_datasets: [],
};
// Default values for unique variant fields
const defaultUniqueVariantFields = {
  cardVariants: [],
  variant: null,
  rarity: '',
  contextualQuantity: {
    SearchHistory: 0,
    Deck: 0,
    Collection: 0,
    Cart: 0,
  },
  contextualTotalPrice: {
    SearchHistory: 0,
    Deck: 0,
    Collection: 0,
    Cart: 0,
  },
};
// Combined default card object
const defaultCardObject = {
  ...defaultCommonAPIFields,
  ...defaultCommonUserInputFields,
  ...defaultCommonCustomDynamicFields,
  ...defaultUniqueCustomDynamicFields,
  ...defaultUniqueVariantFields,
  // Additional fields specific to the card model
  refId: null,
  cardModel: '',
  collectionId: null,
  collectionModel: '',
};
const defaultCollectionStatistics = {
  collectionStatistics: {
    highPoint: 0,
    lowPoint: Infinity,
    twentyFourHourAverage: {
      startDate: new Date(),
      endDate: new Date(),
      lowPoint: 0,
      highPoint: 0,
      priceChange: 0,
      percentageChange: 0,
      priceIncreased: false,
    },
    average: 0,
    volume: 0,
    volatility: 0,
    general: {
      totalPrice: 0,
      topCard: '',
      topCollection: '',
    },
  },
};
const defaultChartData = {
  name: '',
  userId: null,
  allXYValues: [],
};

// ! DEFAULT VALUES FOR COLLECTION OBJECTS
const defaultCollection = {
  ...defaultCollectionStatistics,
  userId: null,
  name: '',
  description: '',
  totalPrice: 0,
  quantity: 0,
  totalQuantity: 0,
  dailyPriceChange: 0,
  dailyPercentageChange: '0%',
  latestPrice: {},
  lastSavedPrice: {},
  dailyCollectionPriceHistory: [],
  collectionPriceHistory: [],
  chartData: {
    name: '',
    userId: null,
    allXYValues: [],
  },
  cards: [],
};

// ! DEFAULT VALUES FOR DECK OBJECTS
const defaultDeck = {
  userId: null,
  name: '',
  description: '',
  totalPrice: 0,
  quantity: 0,
  totalQuantity: 0,
  tags: [],
  color: '',
  cards: [],
};

// ! DEFAULT VALUES FOR CART OBJECTS
const defaultCart = {
  userId: null,
  totalPrice: 0,
  totalQuantity: 0,
  cart: [],
};

// ! DEFAULT VALUES FOR USER OBJECTS
const defaultUser = {
  userId: null,
  username: '',
  email: '',
  password: '',
  collections: [],
  decks: [],
  cart: [],
};

// ! DEFAULT VALUES FOR USER SETTINGS OBJECTS
// CONSTANTS
export const DEFAULT_CARD_OBJECT = defaultCardObject;
export const DEFAULT_CARDS_ARRAY = [defaultCardObject];
export const DEFAULT_COLLECTION_STATISTICS = defaultCollectionStatistics;
export const DEFAULT_COLLECTION_CHART_DATA = defaultChartData;
export const DEFAULT_COLLECTION = defaultCollection;
export const DEFAULT_ALLCOLLECTIONS_ARRAY = [defaultCollection];
export const DEFAULT_DECK = defaultDeck;
export const DEFAULT_ALLDECKS_ARRAY = [defaultDeck];
export const DEFAULT_CART = defaultCart;
export const DEFAULT_USER = defaultUser;
// FUNCTIONS
export const createNewCardObject = () => {
  return { ...DEFAULT_CARD_OBJECT };
};

// ! DEFAULT VALUES FOR CONTEXT OBJECTS ----------------------
// ! DEFAULT VALUES FOR PAGE CONTEXT
const defaultPageContextValues = {
  loadingStatus: {
    isLoading: false,
    isDataLoading: false,
    isFormDataLoading: false,
    isPageLoading: false,
    error: null,
    loadingTimeoutExpired: false,
    loadingType: '',
  },
  activelyLoading: false,
  setActivelyLoading: () => {},
  returnDisplay: () => null,
  setLoading: () => {},
  setError: () => {},
  setPageError: () => {},
  setIsLoading: () => {},
  setIsDataLoading: () => {},
  setIsFormDataLoading: () => {},
  setIsPageLoading: () => {},
  setLoadingTimeoutExpired: () => {},
  handleLoadingTimeout: () => {},
};

// ! DEFAULT VALUES FOR AUTH CONTEXT
const defaultAuthContextValues = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  responseMessage: '',
  authUser: null,
  user: null,
  basicData: null,
  securityData: null,
  userId: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  resetLogoutTimer: () => {},
};

// ! DEFAULT VALUES FOR CARD CONTEXT
const defaultCardContextValues = {
  cardsArray: [],
  searchData: [],
  savedDeckData: [],
  currentCartArray: [],
  isCardDataValid: false,
  rawSearchData: [],
  organizedSearchData: [],
  slicedSearchData: [],
  slicedAndMergedSearchData: [],
  handleRequest: () => {},
  setCardsArray: () => {},
  setCurrentCartArray: () => {},
  setSearchData: () => {},
  setSavedDeckData: () => {},
  setRawSearchData: () => {},
  setOrganizedSearchData: () => {},
  setSlicedSearchData: () => {},
  setSlicedAndMergedSearchData: () => {},
  setIsCardDataValid: () => {},
  setCookie: () => {},
  clearSearchData: () => {},
  getCardData: () => {},
  getRandomCard: () => {},
};

// ! DEFAULT VALUES FOR COLLECTION CONTEXT
const defaultCollectionContextValues = {
  // MAIN STATE
  allCollections: DEFAULT_ALLCOLLECTIONS_ARRAY,
  selectedCollection: DEFAULT_COLLECTION,
  selectedCards: DEFAULT_CARDS_ARRAY,

  // SECONDARY STATE (derived from main state selectedCollection)
  collectionStatistics: DEFAULT_COLLECTION_STATISTICS,
  chartData: DEFAULT_COLLECTION_CHART_DATA,
  totalPrice: 0,
  totalQuantity: 0,
  latestPrice: {},
  lastSavedPrice: {},
  collectionPriceHistory: [],
  allXYValues: [],

  // STATE SETTERS
  setAllCollections: () => {},
  setSelectedCollection: () => {},
  setSelectedCards: () => {},

  // COLLECTION ACTIONS
  createUserCollection: () => {},
  removeCollection: () => {},
  getAllCollectionsForUser: () => {},
  updateAndSyncCollection: () => {},
  deleteCollection: () => {},
  updateSelectedCollection: () => {},

  // CARD ACTIONS
  addOneToCollection: () => {},
  removeOneFromCollection: () => {},
  updateOneInCollection: () => {},
  updateChartDataInCollection: () => {},

  // OTHER ACTIONS
  getTotalPrice: () => {},
};

// ! DEFAULT VALUES FOR DECK CONTEXT
const defaultDeckContextValues = {
  deckData: {}, // Provide default values for context properties
  allDecks: [],
  selectedDeck: {},
  userDecks: [],
  totalQuantity: () => 0,
  setSelectedDeck: () => {},
  addOneToDeck: () => {},
  removeOneFromDeck: () => {},
  getTotalCost: () => 0,
  getCardQuantity: () => 0,
  updateAndSyncDeck: () => {},
  updateDeckDetails: () => {},
  createUserDeck: () => {},
  fetchAllDecksForUser: () => {},
  addCardsToDeck: () => {},
  removeCardsFromDeck: () => {},
  updateCardsInDeck: () => {},
  updateOneInDeck: () => {},
};

// ! DEFAULT VALUES FOR CART CONTEXT
const defaultCartContextValues = {
  cartData: {},
  cart: [],
  selectedCart: {},
  userCarts: [],
  totalQuantity: () => 0,
  setSelectedCart: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  getTotalCost: () => 0,
  getCardQuantity: () => 0,
  updateAndSyncCart: () => {},
  updateCartDetails: () => {},
  deleteFromCart: () => {},

  createUserCart: () => {},
  fetchUserCart: () => {},
  addCardsToCart: () => {},
  removeCardsFromCart: () => {},
  updateCardsInCart: () => {},
  updateOneInCart: () => {},
};

// ! DEFAULT VALUES FOR USER CONTEXT
const defaultUserContextValues = {
  user: {},
  userId: null,
  username: '',
  email: '',
  password: '',
  collections: [],
  decks: [],
  cart: [],
  setUser: () => {},
  setUserId: () => {},
  setUsername: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setCollections: () => {},
  setDecks: () => {},
  setCart: () => {},
  createUser: () => {},
  fetchUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
};

// ! DEFAULT VALUES FOR STATISTICS CONTEXT
const defaultStatisticsContextValues = {
  // PRIMARY DATA
  stats: {},
  allStats: [],
  statsByCollectionId: {},
  selectedStat: {},
  markers: [],
  // PRIMARY FUNCTIONS
  setSelectedStat: () => {},
  // SECONDARY DATA
  totalValue: 0,
  topFiveCards: [],
  chartData: [],
  // SECONDARY FUNCTIONS
  calculateTotalPriceOfAllCollections: () => {},
  calculatePriceChanges: () => {},
  getTopCard: () => {},
  getTopCollection: () => {},
  calculateStatsByCollectionId: () => {},
};
