import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import cardReducer, {
  loadCardsFromAPI,
  adjustStockOnAddingToCart,
  addCardToDatabase,
  deleteCardFromDatabase,
} from './reducers/card';
import cartReducer, { asyncActions } from './reducers/cart';

const {
  addToCart,
  removeItemFromCart,
  getAllCartsAndFindUserCart,
  updateCart,
} = asyncActions;

const rootReducer = {
  cards: cardReducer,
  carts: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'cart/addItemToCartAsync/rejected',
          'cart/addCardToCartAsync/rejected',
        ],
      },
    }).concat(thunk),
});

export default store;

// Expose these actions for use in your components
export {
  loadCardsFromAPI,
  adjustStockOnAddingToCart,
  addCardToDatabase,
  deleteCardFromDatabase,
  addToCart,
  removeItemFromCart,
  getAllCartsAndFindUserCart,
  updateCart,
};
