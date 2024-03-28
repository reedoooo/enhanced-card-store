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
  ChartProvider,
  SidebarProvider,
  AppContextProvider,
  useAuthContext,
  ErrorBoundary,
  ConfiguratorProvider,
} from './context';
import { ThemeProvider } from 'styled-components';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useLoading } from './context/hooks/useLoading';

// ==============================|| APP ||============================== //

const App = () => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { resetLogoutTimer, logout, authUser, userId, isLoggedIn } =
    useAuthContext();
  const { isLoading, isPageLoading, error } = useLoading();

  if (isPageLoading || error) {
    return <div>Loading...</div>;
  }
  return (
    <ErrorBoundary>
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
                          <ChartProvider>
                            <SidebarProvider>
                              <AppContextProvider>
                                <Main />
                              </AppContextProvider>
                            </SidebarProvider>
                          </ChartProvider>
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
    </ErrorBoundary>
  );
};

export default App;
