/* eslint-disable @typescript-eslint/no-empty-function */
import { createNewPriceEntry } from './Helpers';
import jsonData from '../data/nivoTestData.json';
const { nivoTestData } = jsonData;
import user from './user';

// import { lightTheme, indigoTheme } from '../assets/themes/colors';
// ! DEFAULT VALUES FOR CARD OBJECTS
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
  nivoChartData: [
    {
      id: '',
      color: '',
      // TODO: set x as defauly value for dates
      data: [{ x: new Date(), y: 0 }],
    },
  ],
  newNivoChartData: [
    {
      id: '',
      color: '',
      data: [{ x: new Date(), y: 0 }],
    },
  ],
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
    priceChange: 0,
    percentageChange: 0,
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

// const defaultPriceEntry = {
//   num: 0,
//   timestamp: new Date(),
// };
const defaultChartData = {
  id: '24hr',
  color: 'hsl(252, 70%, 50%)',
  data: [{ x: new Date(), y: 0 }],
};
// const defaultPriceHistory = [defaultPriceEntry];
// ! DEFAULT VALUES FOR COLLECTION OBJECTS
// const defaultCollection = {
//   userId: null,
//   name: '',
//   description: '',
//   totalPrice: 0,
//   quantity: 0,
//   totalQuantity: 0,
//   dailyPriceChange: 0,
//   dailyPercentageChange: '0%',
//   latestPrice: defaultPriceEntry,
//   lastSavedPrice: defaultPriceEntry,
//   dailyCollectionPriceHistory: defaultPriceHistory,
//   collectionPriceHistory: defaultPriceHistory,
//   chartData: {
//     name: '',
//     allXYValues: [{ x: new Date(), y: 0 }],
//   },
//   nivoChartData: defaultChartData,
//   newNivoChartData: defaultChartData,
//   collectionStatistics: defaultCollectionStatistics,
//   cards: [defaultCardObject],
// };
// Simulating Mongoose-like schemas on the client-side
const defaultCardImage = {
  image_url: 'https://example.com/default-image.png',
  image_url_small: 'https://example.com/default-image-small.png',
};

const defaultPriceEntry = (price = 0) => ({
  num: price,
  timestamp: new Date(),
});

const defaultCardPrice = {
  cardmarket_price: 0,
  tcgplayer_price: 0,
  ebay_price: 0,
  amazon_price: 0,
};

// Function to create a default card object
const createDefaultCard = () => ({
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
  card_images: [defaultCardImage],
  card_prices: [defaultCardPrice],
  tag: '',
  watchList: false,
  price: 0,
  quantity: 1,
  image: defaultCardImage.image_url,
  totalPrice: 0,
  latestPrice: defaultPriceEntry(),
  lastSavedPrice: defaultPriceEntry(),
  priceHistory: [defaultPriceEntry()],
  dailyPriceHistory: [defaultPriceEntry()],
  chart_datasets: [defaultChartData],
  nivoChartData: defaultChartData,
  cardVariants: [],
  variant: null, // Assuming this would be set to the ID of a selected variant
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
  refs: {
    decks: [],
    collections: [],
    carts: [],
    // Add more contexts as needed
  },
});

// Example usage
const defaultCard = createDefaultCard();
console.log(defaultCard);

const defaultCollection = {
  name: '',
  description: '',
  dailyPriceChange: 0,
  dailyPercentageChange: '',
  newTotalPrice: 0,
  collectionStatistics: {
    highPoint: 0,
    lowPoint: 0,
    avgPrice: 0,
    percentageChange: 0,
    priceChange: 0,
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
  latestPrice: {
    price: 0,
    date: new Date(),
  },
  lastSavedPrice: {
    price: 0,
    date: new Date(),
  },
  dailyCollectionPriceHistory: [],
  collectionPriceHistory: [
    {
      timestamp: new Date(),
      priceChanges: [
        {
          collectionName: '',
          cardName: '',
          oldPrice: 0,
          newPrice: 0,
          priceDifference: 0,
          message: '',
        },
      ],
      priceDifference: 0,
    },
  ],
  priceChangeHistory: [],
  chartData: {
    name: '',
    userId: '',
    allXYValues: [],
  },
  nivoChartData: new Map(),
  newNivoChartData: [
    {
      id: '',
      color: '',
      data: [{ x: new Date(), y: 0 }],
    },
  ],
  nivoTestData: [nivoTestData],
  averagedChartData: new Map(),
  muiChartData: [],
  cards: [],
  addDefaultCard: function () {
    const newCard = createDefaultCard();
    this.cards.push(newCard);
    this.updateTotalPrice();
  },
  updateTotalPrice: function () {
    this.newTotalPrice = this.cards.reduce(
      (acc, card) => acc + card.totalPrice,
      0
    );
  },
  addMultipleDefaultCards: function (numberOfCards) {
    Array.from({ length: numberOfCards }).forEach(() => this.addDefaultCard());
  },
};

// ! DEFAULT VALUES FOR DECK OBJECTS
const defaultDeck = {
  userId: null,
  name: '',
  description: '',
  totalPrice: 0,
  quantity: 0,
  totalQuantity: 0,
  tags: [''],
  color: '',
  cards: [defaultCard],
  addDefaultCard: function () {
    const newCard = createDefaultCard();
    this.cards.push(newCard);
    this.updateTotalPrice();
  },
  updateTotalPrice: function () {
    this.newTotalPrice = this.cards.reduce(
      (acc, card) => acc + card.totalPrice,
      0
    );
  },
  addMultipleDefaultCards: function (numberOfCards) {
    Array.from({ length: numberOfCards }).forEach(() => this.addDefaultCard());
  },
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
export const SELECTED_COLLECTION_ID = 'selectedCollectionId';
export const SELECTED_DECK_ID = 'selectedDeckId';
export const DEFAULT_CARDS_COUNT = 5;
// FUNCTIONS
export const createNewCardObject = () => {
  return { ...DEFAULT_CARD_OBJECT };
};

// ! DEFAULT VALUES FOR CUSTOM DYNAMIC FIELD OBJECTS
export const defaultCustomField = {
  name: '',
  value: '',
};
export const defaultCustomFields = [defaultCustomField];

const themeRanges = [
  {
    id: 'light',
    name: 'Light',
    value: 'light',
    data: {},
  },
  {
    id: 'dark',
    name: 'Dark',
    value: 'dark',
    data: {},
  },
  {
    id: 'indigo',
    name: 'Indigo',
    value: 'indigo',
    data: {},
  },
];
// ! DEFAULT SYSTEM VALUES
export const defaultSystemConstants = {
  THEME_RANGES: themeRanges,
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
  error: null,
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
  collectionData: {
    data: [DEFAULT_COLLECTION.addDefaultCard()],
  },
  allCollections: [DEFAULT_COLLECTION.addDefaultCard()],
  selectedCollection: DEFAULT_COLLECTION.addDefaultCard(),
  selectedCards: DEFAULT_COLLECTION.cards,

  // SECONDARY STATE (derived from main state selectedCollection)
  collectionStatistics: DEFAULT_COLLECTION_STATISTICS,
  chartData: DEFAULT_COLLECTION_CHART_DATA,
  allXYValues: DEFAULT_COLLECTION.chartData.allXYValues || [],
  totalPrice: DEFAULT_COLLECTION.totalPrice,
  totalQuantity: DEFAULT_COLLECTION.totalQuantity,
  latestPrice: DEFAULT_COLLECTION.latestPrice || {},
  lastSavedPrice: DEFAULT_COLLECTION.lastSavedPrice || {},
  collectionPriceHistory: DEFAULT_COLLECTION.collectionPriceHistory || [],
  cards: DEFAULT_COLLECTION.cards || [],

  // STATE SETTERS
  setCollectionData: () => {},
  setAllCollections: () => {},
  handleSelectCollection: () => {},
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
  getCardQuantity: () => 0,
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
const defaultUserProps =
  process.env.AUTH_ENVIRONMENT === 'disabled'
    ? user
    : {
        userId: null,
        firstName: '',
        lastName: '',

        username: '',
        password: '',
        email: '',

        collections: [],
        totalNumberOfCollections: 0,
        decks: [],
        totalNumberOfDecks: 0,
        cart: [],
        totalNumberOfCardsInCart: 0,
      };

const defaultUserContextValues = {
  ...defaultUserProps,
  user: {},
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
  markers: [
    {
      axis: 'y',
      value: 0,
      lineStyle: { stroke: 'red', strokeWidth: 2 },
      legend: '',
      legendOrientation: 'vertical',
      legendPosition: 'top',
      legendOffsetY: -10,
      legendOffsetX: 0,
      legendColor: 'red',
    },
  ],

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
const defaultXYValues = [{ x: new Date(), y: 0 }];
const defaultDataPoint = {
  label: '',
  x: new Date(),
  y: 0,
};
// default values for LINEAR CHART from nivo
const defaultTimeRanges = [
  {
    id: '',
    color: '',
    data: defaultDataPoint,
  },
];
const defaultNivoChartData = [
  {
    id: '',
    color: '',
    data: defaultDataPoint,
  },
];
// default values for PIE CHART from MUI
const defaultMuiChartData = [
  {
    id: '',
    label: '',
    value: 0,
    color: '',
  },
];
// ! DEFAULT VALUES FOR CHART CONTEXT
const singleChartData = (id, color, data, _id) => {
  return {
    id: id,
    color: color,
    data: data,
    _id: _id,
  };
};
const timeRangeProps = {
  ids: ['24hr', '7d', '30d', '90d', '180d', '270d', '365d'],
  names: ['24hr', '7d', '30d', '90d', '180d', '270d', '365d'],
  color: '#2e7c67',
  data: [],
  _id: [
    '65cecbc3bc231bd7d9659871',
    '65cecbc3bc231bd7d965988a',
    '65cecbc3bc231bd7d9659892',
    '65cecbc3bc231bd7d96598b1',
    '65cecbc3bc231bd7d96598d0',
    '65cecbc3bc231bd7d96598ef',
  ],
};
// const timeRanges = [
//   {
//     id: '24hr',
//     name: 'Last 24 Hours',
//     value: '24hr',
//     data: defaultNivoChartData,
//   },
//   { id: '7d', name: 'Last 7 Days', value: '7d', data: [defaultNivoChartData] },
//   {
//     id: '30d',
//     name: 'Last 30 Days',
//     value: '30d',
//     data: defaultNivoChartData,
//   },
//   {
//     id: '90d',
//     name: 'Last 90 Days',
//     value: '90d',
//     data: defaultNivoChartData,
//   },
//   {
//     id: '180d',
//     name: 'Last 180 Days',
//     value: '180d',
//     data: defaultNivoChartData,
//   },
//   {
//     id: '270d',
//     name: 'Last 270 Days',
//     value: '270d',
//     data: defaultNivoChartData,
//   },
//   {
//     id: '365d',
//     name: 'Last 365 Days',
//     value: '365d',
//     data: defaultNivoChartData,
//   },
// ];
const allChartData = (timeRangeProps) => {
  for (const id of timeRangeProps.ids) {
    timeRangeProps.data.push({ x: new Date(), y: 0 });

    return singleChartData(
      id,
      timeRangeProps.color,
      timeRangeProps.data,
      timeRangeProps._id[timeRangeProps.ids.indexOf(id)]
    );
  }
};
const createNewNivoChartData = () => {
  return allChartData(timeRangeProps);
};
export const defaultChartConstants = {
  HEIGHT_TO_WIDTH_RATIO: 7 / 10,
  DEFAULT_THRESHOLD: 600000,
  TIME_RANGES: [
    { id: '24hr', name: 'Last 24 Hours', value: '24hr', data: [] },
    { id: '7d', name: 'Last 7 Days', value: '7d', data: [] },
    { id: '30d', name: 'Last 30 Days', value: '30d', data: [] },
    { id: '90d', name: 'Last 90 Days', value: '90d', data: [] },
    { id: '180d', name: 'Last 180 Days', value: '180d', data: [] },
    { id: '270d', name: 'Last 270 Days', value: '270d', data: [] },
    { id: '365d', name: 'Last 365 Days', value: '365d', data: [] },
  ],
  NIVO_CHART_DATA: createNewNivoChartData(),
  // SELECTED_TIME_RANGE: timeRanges[0],
  // TIME_RANGE: timeRanges[0],
  TIME_RANGES_KEYS: ['24hr', '7d', '30d', '90d', '180d', '270d', '365d'],
  TIME_RANGE_PROPS: timeRangeProps,
  // TICK_VALUES: ({ ticks } = getFormatAndTicks(timeRangeProps[0])),
  // X_FORMAT: ({ format } = getFormatAndTicks(timeRangeProps[0])),
  // X_FORMAT: '%H:%M',
  // X_FORMAT: 'time:%Y-%m-%d %H:%M:%S',
  X_FORMAT: '%Y-%m-%d', // Adjust if necessary to match your input data format
  TICK_VALUES: 'every hour',
  CHART_CONSTANTS: {
    margin: { top: 20, right: 40, bottom: 40, left: 30 },
    padding: 0.3,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    // background: '#2c2121',
    xFormat: 'time:%Y-%m-%d %H:%M:%S',
    xScale: {
      type: 'time',
      format: '%Y-%m-%dT%H:%M:%S.%LZ', // Adjust if necessary to match your input data format
      useUTC: false,
      precision: 'second',
    },
    yFormat: '$.2f',
    yScale: {
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    },
    pointSize: 12,
    pointBorderWidth: 2,
    colors: { scheme: 'green_blue' },
    curve: 'monotoneX',
    useMesh: true,
    motionConfig: 'wobbly',
    enableSlices: 'x',
    layers: [
      'grid',
      'markers',
      'areas',
      'lines',
      'slices',
      'points',
      'axes',
      'legends',
    ],
  },
};
const defaultChartContextValues = {
  // ...defaultChartConstants,
  // Data
  latestData: null,
  selectedRange: defaultChartConstants.SELECTED_TIME_RANGE,
  timeRanges: defaultChartConstants.TIME_RANGES,
  finalizedNivoData: null,
  currentValue: null,
  tickValues: null,
  xFormat: null,
  nivoChartData: defaultNivoChartData,
  muiChartData: defaultMuiChartData,

  // Functions
  setTimeRange: () => {},
  setLatestData: () => {},
  handleChange: () => {},

  // Chart specific helper functions
  finalizeNivoData: () => {},
  groupAndAverageData: () => {},
  convertDataForNivo2: () => {},
  getTickValues: () => {},
  getFilteredData: () => {},
  formatDateToString: () => {},
  getFormatAndTicks: () => {},
};
// ! DEFAULT VALUES FOR FORM CONTEXT
const defaultFormContextValues = {
  forms: {},
  formErrors: {},
  initialFormStates: {},
  currentForm: {},
  schemas: {},
  currentFormType: '',
  errors: {},
  isSubmitting: false,
  isFormDataLoading: false,
  isFormValid: false,
  formMethods: {},

  handleSearchTermChange: () => {},
  setIsFormValid: () => {},
  setForms: () => {},
  setFormErrors: () => {},
  setCurrentForm: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
  onSubmit: () => {},
  onChange: () => {},
  resetForm: () => {},
  handleRequest: () => {},
  register: () => {},
  registerForm: () => {},
  setFormType: () => {},
  setCurrentFormType: () => {},
  setValueAtPath: () => {},
  setError: () => {},
  toggleAuthForm: () => {},
  toggleCollectionForm: () => {},
  toggleFormType: () => {},
  getFormMethods: () => {},
  toggleForm: () => {},
  onBlur: () => {},
  onFocus: () => {},
  handleFocus: () => {},
  handleBlur: () => {},
  handleFieldChange: () => {},
  handleFormChange: () => {},
  handleFormSubmit: () => {},
};

// ! DEFAULT VALUES FOR APP CONTEXT
const defaultAppContextValues = {
  deck: defaultDeckContextValues,
  collection: defaultCollectionContextValues,
  cart: defaultCartContextValues,
  isCardInContext: () => {},
  isCollectionInContext: () => {},
  getCardQuantities: () => {},
  checkIfCardIsInContext: () => {},
};

export const defaultContextValue = {
  // PAGE CONTEXT
  PAGE_CONTEXT: defaultPageContextValues,
  // AUTH CONTEXT
  AUTH_CONTEXT: defaultAuthContextValues,
  // CARD CONTEXT
  CARD_CONTEXT: defaultCardContextValues,
  // COLLECTION CONTEXT
  COLLECTION_CONTEXT: defaultCollectionContextValues,
  // DECK CONTEXT
  DECK_CONTEXT: defaultDeckContextValues,
  // CART CONTEXT
  CART_CONTEXT: defaultCartContextValues,
  // USER CONTEXT
  USER_CONTEXT: defaultUserContextValues,
  // STATISTICS CONTEXT
  STATISTICS_CONTEXT: defaultStatisticsContextValues,
  // CHART CONTEXT
  CHART_CONTEXT: defaultChartContextValues,
  // FORM CONTEXT
  FORM_CONTEXT: defaultFormContextValues,
  // MISC CONTEXT
  APP_CONTEXT: defaultAppContextValues,
};
// ! DEFAULT VALUES FOR SPECIfIC COMPONENTS ----------------------
// ! --- DEFAULT VALUES FOR CHART COMPONENTS
// ! COMPONENT - CollectionPortfolioChartContainer

// ! ICONS ----------------------
// ! ICONS - COLLECTION ICONS
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// ! ICONS - CARD ICONS
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// ! ICONS - DECK ICONS
import DeckIcon from '@mui/icons-material/Deck';

// ! ICONS - USER ICONS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ! ICONS - NAVIGATION ICONS
import HomeIcon from '@mui/icons-material/Home';
