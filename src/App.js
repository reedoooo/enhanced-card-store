// App.js
import React, { useEffect } from 'react';
import './assets/css/index.css';
import './assets/css/card.css';
import './assets/css/page.css';
import Main from './Main';
import {
  ModalProvider,
  UserProvider,
  useMode,
  CollectionProvider,
  CardProvider,
  DeckProvider,
  CartProvider,
  SidebarProvider,
  AppContextProvider,
  ConfiguratorProvider,
  DataProvider,
} from './context';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';

// ==============================|| APP ||============================== //

const App = () => {
  const { theme } = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline theme={theme} />
      <GlobalStyles />
      <ParallaxProvider>
        <ConfiguratorProvider>
          <UserProvider>
            <ModalProvider>
              <CollectionProvider>
                <CardProvider>
                  <DeckProvider>
                    <CartProvider>
                      <SidebarProvider>
                        <AppContextProvider>
                          <DataProvider>
                            <Main />
                          </DataProvider>
                        </AppContextProvider>
                      </SidebarProvider>
                    </CartProvider>
                  </DeckProvider>
                </CardProvider>
              </CollectionProvider>
            </ModalProvider>
          </UserProvider>
        </ConfiguratorProvider>
      </ParallaxProvider>
    </ThemeProvider>
  );
};

export default App;
