import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './GlobalStyles';
import AuthProvider from './context/Auth/authContext';
import { CartProvider } from './context/CartContext/CartContext';
import { DeckProvider } from './context/DeckContext/DeckContext';
import { CardProvider } from './context/CardContext/CardStore';
import { CollectionProvider } from './context/CollectionContext/CollectionContext';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { UserProvider } from './context/UserContext/UserContext';
import { CombinedProvider } from './context/CombinedProvider';
import { ThemeProvider } from '@mui/styles';
import { useMode } from './context/hooks/colormode';
import { ColorModeProvider } from './context/ColorModeProvider';
import withCombinedProviderHOC from './withCombinedProviderHOC';
import withCollectionProvider from './withCollectionProviderHOC';

const root = document.getElementById('root');

function Main() {
  const { theme } = useMode();

  return (
    <ColorModeProvider>
      <AuthProvider>
        <UserProvider>
          <ModalProvider>
            {' '}
            <CollectionProvider>
              {/* Wrap CombinedProvider with CollectionProvider */}
              <CombinedProvider>
                <CardProvider>
                  <DeckProvider>
                    <CartProvider>
                      <GlobalStyles />
                      <ThemeProvider theme={theme}>
                        <App />
                      </ThemeProvider>
                    </CartProvider>
                  </DeckProvider>
                </CardProvider>
              </CombinedProvider>
            </CollectionProvider>
          </ModalProvider>
        </UserProvider>
      </AuthProvider>
    </ColorModeProvider>
  );
}

ReactDOM.render(<Main />, root);
