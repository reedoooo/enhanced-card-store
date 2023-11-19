import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './assets/GlobalStyles';
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
// import { ApiServiceProvider } from './context/cleanUp/ApiServiceProvider';
import ErrorBoundary from './context/ErrorBoundary';
import { SocketProvider } from './context/SocketProvider';
import { SidebarProvider } from './context/SideBarProvider';
import { ChartProvider } from './context/ChartContext/ChartContext';
import { UtilityProvider } from './context/UtilityContext/UtilityContext';
import { AppContextProvider } from './context/AppContextProvider';
import { createTheme } from '@mui/material';

const root = document.getElementById('root');

function Main() {
  const { theme } = useMode();
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //   },
  // });
  // const theme = darkTheme;
  return (
    <ErrorBoundary>
      <UtilityProvider>
        <AuthProvider>
          <ColorModeProvider>
            <SocketProvider>
              {/* <UtilityProvider> */}
              {/* <ApiServiceProvider> */}
              <UserProvider>
                <ModalProvider>
                  <CollectionProvider>
                    <CombinedProvider>
                      <CardProvider>
                        <DeckProvider>
                          <CartProvider>
                            <GlobalStyles />
                            <ThemeProvider theme={theme}>
                              <ChartProvider>
                                <SidebarProvider>
                                  <AppContextProvider>
                                    <App />
                                  </AppContextProvider>
                                </SidebarProvider>
                              </ChartProvider>
                            </ThemeProvider>
                          </CartProvider>
                        </DeckProvider>
                      </CardProvider>
                    </CombinedProvider>
                  </CollectionProvider>
                </ModalProvider>
              </UserProvider>
              {/* </ApiServiceProvider> */}
              {/* </UtilityProvider> */}
            </SocketProvider>
          </ColorModeProvider>
        </AuthProvider>
      </UtilityProvider>
    </ErrorBoundary>
  );
}

ReactDOM.render(<Main />, root);
