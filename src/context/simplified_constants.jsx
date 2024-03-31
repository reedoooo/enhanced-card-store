import card_info from '../data/initialCardData.jsx';
import user from './user.jsx';

const defaultCardData = card_info.data;
const defaultCard = defaultCardData[0];
const defaultCards = Array(5).fill(defaultCard); // More efficient way to create an array with default values
const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

// const defaultUserData = user.data;
// const defaultUser = defaultUserData[0];
// const defaultUsers = Array(5).fill(defaultUser); // More efficient way to create an array with default values

export const defaultValues = {
  defaultCard,
  defaultCards,
  REACT_APP_SERVER,
  // defaultUser,
  // defaultUsers,
};
