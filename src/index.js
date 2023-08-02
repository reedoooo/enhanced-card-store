import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { Provider } from 'react-redux';
import AuthProvider, { AuthContext } from './context/Auth/authContext';
import CartProvider from './context/CartContext/CartContext';
import store from './store/store';
import { CardStoreProvider } from './context/CardContext/CardStore';
import { Deck } from '@mui/icons-material';
import { DeckProvider } from './context/DeckContext/DeckContext';

const root = document.getElementById('root');

function Main() {
  return (
    <CardStoreProvider>
      <DeckProvider>
        <CartProvider>
          <Provider store={store}>
            <AuthProvider>
              <GlobalStyles />
              <App />
            </AuthProvider>
          </Provider>
        </CartProvider>
      </DeckProvider>
    </CardStoreProvider>
  );
}

ReactDOM.render(<Main />, root);
