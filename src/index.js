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

const root = document.getElementById('root');

function Main() {
  const { theme } = useMode();
  console.log('theme', theme);
  return (
    <ColorModeProvider>
      <AuthProvider>
        <UserProvider>
          <ModalProvider>
            <CombinedProvider>
              <CardProvider>
                <DeckProvider>
                  <CollectionProvider>
                    <CartProvider>
                      <GlobalStyles />
                      <ThemeProvider theme={theme}>
                        <App />
                      </ThemeProvider>
                    </CartProvider>
                  </CollectionProvider>
                </DeckProvider>
              </CardProvider>
            </CombinedProvider>
          </ModalProvider>
        </UserProvider>
      </AuthProvider>
    </ColorModeProvider>
  );
}

ReactDOM.render(<Main />, root);
