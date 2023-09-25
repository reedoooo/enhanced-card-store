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
// import { UtilityProvider } from './context/UtilityContext/UtilityContext';
import { ModalProvider } from './context/ModalContext/ModalContext';
// import { ChartDataProvider } from './context/ChartContext/ChartContext';
import { UserProvider } from './context/UserContext/UserContext';
import { CombinedProvider } from './context/CombinedProvider';

const root = document.getElementById('root');

function Main() {
  return (
    <AuthProvider>
      <CombinedProvider>
        {/* <UtilityProvider> */}
        {/* <ChartDataProvider> */}
        <ModalProvider>
          <CardProvider>
            <DeckProvider>
              <ScrapeDataProvider>
                <CollectionProvider>
                  <CartProvider>
                    <UserProvider>
                      {/* <AuthProvider> */}
                      <GlobalStyles />
                      <App />
                      {/* </AuthProvider> */}
                    </UserProvider>
                  </CartProvider>
                </CollectionProvider>
              </ScrapeDataProvider>
            </DeckProvider>
          </CardProvider>
        </ModalProvider>
        {/* </ChartDataProvider> */}
        {/* </UtilityProvider> */}
      </CombinedProvider>
    </AuthProvider>
  );
}

ReactDOM.render(<Main />, root);
