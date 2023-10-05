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
import { ApiServiceProvider } from './context/ApiServiceProvider';
import { SocketProvider } from './context/SocketProvider';
import { SocketActionsProvider } from './context/SocketActions';

const root = document.getElementById('root');

function Main() {
  const { theme } = useMode();

  return (
    <AuthProvider>
      <ColorModeProvider>
        <SocketProvider>
          <SocketActionsProvider>
            <ApiServiceProvider>
              <UserProvider>
                <ModalProvider>
                  <CollectionProvider>
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
            </ApiServiceProvider>
          </SocketActionsProvider>
        </SocketProvider>
      </ColorModeProvider>
    </AuthProvider>
  );
}

ReactDOM.render(<Main />, root);
