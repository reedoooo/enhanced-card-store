import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './GlobalStyles';
import AuthProvider from './context/Auth/authContext';
import { CartProvider } from './context/CartContext/CartContext';
import { DeckProvider } from './context/DeckContext/DeckContext';
import { CardProvider } from './context/CardContext/CardStore';
import { ScrapeDataProvider } from './context/ScraperContext/ScraperContext';
import { CollectionProvider } from './context/CollectionContext/CollectionContext';

const root = document.getElementById('root');

function Main() {
  return (
    <CardProvider>
      <DeckProvider>
        <ScrapeDataProvider>
          <CollectionProvider>
            <CartProvider>
              <AuthProvider>
                <GlobalStyles />
                <App />
              </AuthProvider>
            </CartProvider>
          </CollectionProvider>
        </ScrapeDataProvider>
      </DeckProvider>
    </CardProvider>
  );
}

ReactDOM.render(<Main />, root);
