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
} from './context';
import { ThemeProvider } from 'styled-components';
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
  const logProviderStatus = (providerName) => {
    useEffect(() => {
      console.log(`${providerName} initialized successfully.`);
    }, []);
  };
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
        <FormProvider>
          {logProviderStatus('FormProvider')}
          <SocketProvider>
            {logProviderStatus('SocketProvider')}
            <UserProvider>
              {logProviderStatus('UserProvider')}
              <ModalProvider>
                {logProviderStatus('ModalProvider')}
                <PopoverProvider>
                  {logProviderStatus('PopoverProvider')}
                  <CollectionProvider>
                    {logProviderStatus('CollectionProvider')}
                    <CombinedProvider>
                      {logProviderStatus('CombinedProvider')}
                      <CardProvider>
                        {logProviderStatus('CardProvider')}
                        <CronJobProvider>
                          {logProviderStatus('CronJobProvider')}
                          <DeckProvider>
                            {logProviderStatus('DeckProvider')}
                            <CartProvider>
                              {logProviderStatus('CartProvider')}
                              <CardImagesProvider>
                                {logProviderStatus('CardImagesProvider')}
                                <ChartProvider>
                                  {logProviderStatus('ChartProvider')}
                                  <StatisticsProvider>
                                    {logProviderStatus('StatisticsProvider')}
                                    <SidebarProvider>
                                      {logProviderStatus('SidebarProvider')}
                                      <AppContextProvider>
                                        {logProviderStatus(
                                          'AppContextProvider'
                                        )}
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
              </ModalProvider>
            </UserProvider>
          </SocketProvider>
        </FormProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
