// App.js
import React, { useEffect } from 'react';
import './assets/css/index.css';
import Main from './Main';
import {
  FormProvider,
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
} from './context';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';

// ==============================|| APP ||============================== //

const App = () => {
  const { theme } = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <ParallaxProvider>
        <ConfiguratorProvider>
          <FormProvider>
            <UserProvider>
              <ModalProvider>
                <CollectionProvider>
                  <CardProvider>
                    <DeckProvider>
                      <CartProvider>
                        <SidebarProvider>
                          <AppContextProvider>
                            <Main />
                          </AppContextProvider>
                        </SidebarProvider>
                      </CartProvider>
                    </DeckProvider>
                  </CardProvider>
                </CollectionProvider>
              </ModalProvider>
            </UserProvider>
          </FormProvider>
        </ConfiguratorProvider>
      </ParallaxProvider>
    </ThemeProvider>
  );
};

export default App;
