// App.js
import React, { useEffect } from 'react';
import Main from './Main';
import {
  FormProvider,
  ModalProvider,
  PopoverProvider,
  SocketProvider,
  UserProvider,
  useMode,
  CollectionProvider,
  CombinedProvider,
  CardProvider,
  CronJobProvider,
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
} from './context';
import { ThemeProvider } from 'styled-components';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';

// ==============================|| APP ||============================== //

const App = () => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { resetLogoutTimer, logout, authUser, userId, isLoggedIn } =
    useAuthContext();
  const { loadingStatus, returnDisplay, setLoading, setError } =
    usePageContext();
  useEffect(() => {
    if (!isLoggedIn && !loadingStatus.isPageLoading) navigate('/login');
  }, [isLoggedIn, navigate, loadingStatus.isPageLoading]);
  if (loadingStatus?.isPageLoading || loadingStatus?.error) {
    return returnDisplay();
  }
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <ConfiguratorProvider>
          <FormProvider>
            <SocketProvider>
              <UserProvider>
                <ModalProvider>
                  <SnackbarProvider>
                    <PopoverProvider>
                      <CollectionProvider>
                        <CombinedProvider>
                          <CardProvider>
                            <CronJobProvider>
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
                            </CronJobProvider>
                          </CardProvider>
                        </CombinedProvider>
                      </CollectionProvider>
                    </PopoverProvider>
                  </SnackbarProvider>
                </ModalProvider>
              </UserProvider>
            </SocketProvider>
          </FormProvider>
        </ConfiguratorProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
