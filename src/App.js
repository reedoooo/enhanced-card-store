// App.js
import React, { useEffect } from 'react';
import './assets/css/index.css';
import Main from './Main';
import {
  FormProvider,
  ModalProvider,
  PopoverProvider,
  UserProvider,
  useMode,
  CollectionProvider,
  CardProvider,
  DeckProvider,
  CartProvider,
  CardImagesProvider,
  ChartProvider,
  StatisticsProvider,
  SidebarProvider,
  AppContextProvider,
  useAuthContext,
  usePageContext,
  ErrorBoundary,
  ConfiguratorProvider,
  VisibilityProvider,
  SnackbarContextProvider,
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
  const { returnDisplay } = usePageContext();
  const { isLoading, isPageLoading, error } = useLoading();

  if (isPageLoading || error) {
    return returnDisplay();
  }
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <ParallaxProvider>
          <ConfiguratorProvider>
            <VisibilityProvider>
              <FormProvider>
                <UserProvider>
                  <ModalProvider>
                    <PopoverProvider>
                      <CollectionProvider>
                        <CardProvider>
                          <DeckProvider>
                            <CartProvider>
                              <CardImagesProvider>
                                <ChartProvider>
                                  <StatisticsProvider>
                                    <SidebarProvider>
                                      <AppContextProvider>
                                        <Main />
                                      </AppContextProvider>
                                    </SidebarProvider>
                                  </StatisticsProvider>
                                </ChartProvider>
                              </CardImagesProvider>
                            </CartProvider>
                          </DeckProvider>
                        </CardProvider>
                      </CollectionProvider>
                    </PopoverProvider>
                  </ModalProvider>
                </UserProvider>
              </FormProvider>
            </VisibilityProvider>
          </ConfiguratorProvider>
        </ParallaxProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
