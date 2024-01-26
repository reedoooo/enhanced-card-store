// App.js
import React, { useEffect } from 'react';
import Main from './Main';
import { Helmet } from 'react-helmet';
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
  // const renderHelmet = () => {
  //   return (
  //     <Helmet>
  //       {/* Basic */}
  //       <title>Your Website Title</title>
  //       <meta name="description" content="Description of your site or page" />
  //       <link
  //         rel="canonical"
  //         href="http:/reedvogt.com/projects/enhanced-card-store"
  //       />
  //       <link rel="icon" type="image/png" href="/favicon.png" sizes="16x16" />
  //       <link
  //         rel="stylesheet"
  //         href="https://fonts.googleapis.com/icon?family=Material+Icons"
  //       />

  //       {/* SEO */}
  //       <meta name="keywords" content="your, tags" />
  //       {/* Social Media */}
  //       <meta property="og:title" content="Title Here" />
  //       <meta property="og:description" content="Description Here" />
  //       <meta
  //         property="og:image"
  //         content="http://mysite.com/path/to/image.jpg"
  //       />
  //       <meta property="og:url" content="http://mysite.com" />
  //       <meta name="twitter:card" content="summary_large_image" />
  //       {/* Responsive and mobile */}
  //       <meta name="viewport" content="width=device-width, initial-scale=1" />
  //       {/* Additional links and styles */}
  //       <link rel="preconnect" href="https://fonts.googleapis.com" />
  //       <link
  //         rel="preconnect"
  //         href="https://fonts.gstatic.com"
  //         crossOrigin="true"
  //       />
  //       {/* Specify language and character set */}
  //       <html lang="en" />
  //       <meta charSet="utf-8" />
  //       {/* Scripts */}
  //       {/* Example: Add a script needed for a service or functionality */}
  //       {/* <script src="https://cdn.service.com/library.js"></script> */}
  //     </Helmet>
  //   );
  // };
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
                                        {/* <Elements stripe={stripePromise}> */}
                                        {/* {renderHelmet()} */}
                                        <Main />
                                        {/* </Elements> */}
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
        {/* </AuthProvider> */}
        {/* </PageProvider> */}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
