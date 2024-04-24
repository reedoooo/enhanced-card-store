/* eslint-disable @typescript-eslint/no-empty-function */
import card_info from '../data/initialCardData.jsx';
const DEFAULT_COLLECTION = {
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
  // nivoTestData: [nivoTestData],
  averagedChartData: new Map(),
  muiChartData: [],
  cards: [],
  _id: '',
  // addDefaultCard: function () {
  //   const newCard = createDefaultCard();
  //   this.cards.push(newCard);
  //   this.updateTotalPrice();
  // },
  // updateTotalPrice: function () {
  //   this.newTotalPrice = this.cards.reduce(
  //     (acc, card) => acc + card.totalPrice,
  //     0
  //   );
  // },
  // addMultipleDefaultCards: function (numberOfCards) {
  //   Array.from({ length: numberOfCards }).forEach(() => this.addDefaultCard());
  // },
};
const SELECTED_COLLECTION_ID = 'selectedCollectionId';
const SELECTED_DECK_ID = 'selectedDeckId';
const DEFAULT_CARDS_COUNT = 5;
const defaultCardData = card_info.data;
const defaultCard = defaultCardData[0];
const defaultCards = Array(5).fill(defaultCard); // More efficient way to create an array with default values
const REACT_APP_SERVER = process.env.REACT_APP_SERVER;
const defaultDecks = {
  allIds: [],
  byId: {},
  selectedId: null,
  lastUpdated: new Date(),
  showDecks: true,
};
const defaultCollections = {
  allIds: [],
  byId: {},
  selectedId: null,
  // lastUpdated: new Date(),
  prevSelectedId: null,
  showCollections: false,
};

export const defaultValues = {
  defaultCard,
  defaultCards,
  REACT_APP_SERVER,
  defaultDecks,
  defaultCollections,
  // defaultUserData,
  // defaultUser,
  // defaultUsers,
};
export const constants = {
  DEFAULT_CARDS_COUNT,
  SELECTED_COLLECTION_ID,
  SELECTED_DECK_ID,
};
