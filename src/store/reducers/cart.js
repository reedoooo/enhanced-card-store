// Cart slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const server = process.env.REACT_APP_SERVER;
const initialState = {
  carts: [],
  allCarts: [],
  totalAmount: 0,
  cartVisible: false,
  error: null,
};

export const updateCardState = (cards) => ({
  type: 'UPDATE_CARD_STATE',
  payload: cards,
});

export const updateCardData = (cards) => ({
  type: 'UPDATE_CARD_DATA',
  payload: cards,
});

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CARD_STATE':
      return {
        ...state,
        cardState: action.payload,
      };
    case 'UPDATE_CARD_DATA':
      return {
        ...state,
        cardData: action.payload,
      };
    // your other actions...
    default:
      return state;
  }
};

const axiosGet = (path, { id }) => {
  const userId = cookies.get('userCookie');
  return axios
    .get(`${server}${path.replace('${userId}', userId).replace('${id}', id)}`)
    .then((response) => {
      const { data } = response;
      return data.carts.map(({ card, quantity }) => ({
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
    .replace('${cartId}', data.cartId)}`;
  return axios[method](url, { card: data.id, quantity: data.quantity }).then(
    (response) => {
      const { data } = response;
      return data.carts.map(({ card, quantity }) => ({
        id: card._id,
        ...card,
        quantity,
      }));
    }
  );
};

const asyncActionDefinitions = [
  { name: 'fetchAllCarts', url: '/api/carts', method: 'get' },
  { name: 'fetchCart', url: '/api/carts/${id}/getCart', method: 'get' },
  {
    name: 'addToCart',
    url: '/api/carts/${cartId}/savedCards',
    method: 'post',
  },
  {
    name: 'removeItemFromCart',
    url: '/api/carts/${userId}/items/${id}',
    method: 'delete',
  },
  { name: 'updateCart', url: '/api/carts/${userId}', method: 'put' },
  { name: 'createCart', url: '/api/carts/${userId}', method: 'post' },
  { name: 'pushToServerCart', url: '/api/carts/${userId}', method: 'put' },
  { name: 'getAllCartsAndFindUserCart', url: '/api/carts', method: 'get' },
];

const asyncThunks = asyncActionDefinitions.reduce((acc, action) => {
  const thunk = createAsyncThunk(
    `cart/${action.name}Async`,
    action.method === 'get'
      ? (args) => axiosGet(action.url, args)
      : (args) => axiosSend(action.method, action.url, args)
  );
  return { ...acc, [action.name]: thunk };
}, {});

export const selectCartStatus = (state) => state.carts.status;
export const selectCartError = (state) => state.carts.error;

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    toggleCartVisibility(state) {
      state.cartVisible = !state.cartVisible;
    },
    changeCardQuantity(state, action) {
      const { id, quantityChange } = action.payload;
      const targetItem = state.carts.find((item) => item.id === id);
      if (targetItem) {
        targetItem.quantity += quantityChange;
      }
    },
    removeCardFromCart(state, action) {
      const { id } = action.payload;
      state.carts = state.carts.filter((item) => item.id !== id);
    },
    addCardDirectly(state, action) {
      const { card, quantity } = action.payload;
      state.carts = [...state.carts, { ...card, quantity }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => isPending(action) && action.type.startsWith('cart/'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => isFulfilled(action) && action.type.startsWith('cart/'),
        (state, action) => {
          state.status = 'succeeded';
          state.carts = action.payload;
        }
      )
      .addMatcher(
        (action) => isRejected(action) && action.type.startsWith('cart/'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const {
  toggleCartVisibility,
  changeCardQuantity,
  removeCardFromCart,
  addCardDirectly,
} = cartSlice.actions;

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const asyncActions = {
  fetchAllCarts: asyncThunks.fetchAllCarts,
  fetchCart: asyncThunks.fetchCart,
  addToCart: asyncThunks.addToCart,
  removeItemFromCart: asyncThunks.removeItemFromCart,
  updateCart: asyncThunks.updateCart,
  createCart: asyncThunks.createCart,
  pushToServerCart: asyncThunks.pushToServerCart,
  getAllCartsAndFindUserCart: asyncThunks.getAllCartsAndFindUserCart,
};

export default cartSlice.reducer;
