import card_info from '../data/initialCardData.jsx';
import {
  DEFAULT_COLLECTION,
  DEFAULT_DECK,
  SELECTED_COLLECTION_ID,
  SELECTED_DECK_ID,
} from './constants.jsx';

const defaultCardData = card_info.data;
const defaultCard = defaultCardData[0];
const defaultCards = Array(5).fill(defaultCard); // More efficient way to create an array with default values
const REACT_APP_SERVER = process.env.REACT_APP_SERVER;
const defaultDecks = {
  allIds: [SELECTED_DECK_ID],
  byId: { [SELECTED_DECK_ID]: DEFAULT_DECK },
  selectedId: SELECTED_DECK_ID,
  lastUpdated: new Date(),
  showDecks: true,
};
const defaultCollections = {
  allIds: [SELECTED_COLLECTION_ID],
  byId: {
    [SELECTED_COLLECTION_ID]: DEFAULT_COLLECTION,
  },
  selectedId: SELECTED_COLLECTION_ID,
  prevSelectedId: SELECTED_COLLECTION_ID,
  showCollections: false,
};
// const defaultUserData = user.data;
// const defaultUser = defaultUserData[0];
// const defaultUsers = Array(5).fill(defaultUser); // More efficient way to create an array with default values

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
