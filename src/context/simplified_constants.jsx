import card_info from '../data/initialCardData.jsx';
import user from '../data/user';

const defaultCardData = card_info.data;
const defaultCard = defaultCardData[0];
const defaultCards = Array(5).fill(defaultCard); // More efficient way to create an array with default values

// const defaultUserData = user.data;
// const defaultUser = defaultUserData[0];
// const defaultUsers = Array(5).fill(defaultUser); // More efficient way to create an array with default values

export const defaultValues = {
  defaultCard,
  defaultCards,
  // defaultUser,
  // defaultUsers,
};
