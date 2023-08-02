import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const server = process.env.REACT_APP_SERVER;
const initialState = {
  cards: [],
  status: 'idle',
  error: null,
};

const axiosGet = (path, { id }) => {
  const userId = cookies.get('userCookie');
  return axios
    .get(`${server}${path.replace('${userId}', userId).replace('${id}', id)}`)
    .then((response) => {
      const { data } = response;
      return data.cards.map(({ card, quantity }) => ({
        id: card._id,
        ...card,
        quantity,
      }));
    });
};

const axiosSend = (method, path, { ...data }) => {
  const userId = cookies.get('userCookie');
  const url = `${server}${path
    .replace('${userId}', userId)
    .replace('${id}', data.id)
    .replace('${cardId}', data.cardId)}`;
  return axios[method](url, { card: data.id, quantity: data.quantity }).then(
    (response) => {
      const { data } = response;
      return data.cards.map(({ card, quantity }) => ({
        id: card._id,
        ...card,
        quantity,
      }));
    }
  );
};

const asyncActionDefinitions = [
  { name: 'loadCardsFromAPI', url: '/api/cards', method: 'get' },
  { name: 'adjustStockOnAddingToCart', url: '/api/cards/${id}', method: 'put' },
  { name: 'addCardToDatabase', url: '/api/cards', method: 'post' },
  { name: 'deleteCardFromDatabase', url: '/api/cards/${id}', method: 'delete' },
  { name: 'updateCardStock', url: '/api/cards/${id}/stock', method: 'put' },
];

const asyncThunks = asyncActionDefinitions.reduce((acc, action) => {
  const thunk = createAsyncThunk(
    `cards/${action.name}Async`,
    action.method === 'get'
      ? (args) => axiosGet(action.url, args)
      : (args) => axiosSend(action.method, action.url, args)
  );
  return { ...acc, [action.name]: thunk };
}, {});

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith('cards/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('cards/') &&
          action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.status = 'succeeded';
          state.cards = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('cards/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type === 'cards/updateCardStockAsync/fulfilled',
        (state, action) => {
          // Find the card in the state that matches the updated one
          const existingCard = state.cards.find(
            (card) => card.id === action.payload.id
          );
          if (existingCard) {
            // Update the stock property of the card
            existingCard.stock = action.payload.stock;
          }
        }
      );
  },
});

export const {
  loadCardsFromAPI,
  adjustStockOnAddingToCart,
  addCardToDatabase,
  deleteCardFromDatabase,
} = asyncThunks;

export const asyncActions = {
  loadCardsFromAPI: asyncThunks.loadCardsFromAPI,
  adjustStockOnAddingToCart: asyncThunks.adjustStockOnAddingToCart,
  addCardToDatabase: asyncThunks.addCardToDatabase,
  deleteCardFromDatabase: asyncThunks.deleteCardFromDatabase,
};

export default cardsSlice.reducer;
