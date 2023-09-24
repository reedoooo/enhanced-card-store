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
import { UtilityProvider } from './context/UtilityContext/UtilityContext';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { ChartDataProvider } from './context/ChartContext/ChartContext';

const root = document.getElementById('root');

function Main() {
  return (
    <AuthProvider>
      <UtilityProvider>
        <ChartDataProvider>
          <ModalProvider>
            <CardProvider>
              <DeckProvider>
                <ScrapeDataProvider>
                  <CollectionProvider>
                    <CartProvider>
                      {/* <AuthProvider> */}
                      <GlobalStyles />
                      <App />
                      {/* </AuthProvider> */}
                    </CartProvider>
                  </CollectionProvider>
                </ScrapeDataProvider>
              </DeckProvider>
            </CardProvider>
          </ModalProvider>
        </ChartDataProvider>
      </UtilityProvider>
    </AuthProvider>
  );
}

ReactDOM.render(<Main />, root);
