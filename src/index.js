import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { Provider } from 'react-redux';
import AuthProvider, { AuthContext } from './context/Auth/authContext';
import CartProvider from './context/CartContext/CartContext';
import { CardStoreProvider } from './context/CardContext/CardStore';
import { Deck } from '@mui/icons-material';
import { DeckProvider } from './context/DeckContext/DeckContext';

const root = document.getElementById('root');

function Main() {
  return (
    <CardStoreProvider>
      <DeckProvider>
        <CartProvider>
          <AuthProvider>
            <GlobalStyles />
            <App />
          </AuthProvider>
        </CartProvider>
      </DeckProvider>
    </CardStoreProvider>
  );
}

ReactDOM.render(<Main />, root);
