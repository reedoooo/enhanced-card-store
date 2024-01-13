// Providers.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ThemeProvider } from '@mui/styles';
import GlobalStyles from '../assets/GlobalStyles';
import {
  AuthProvider,
  CartProvider,
  DeckProvider,
  CardProvider,
  CollectionProvider,
  ModalProvider,
  UserProvider,
  CombinedProvider,
  ColorModeProvider,
  SocketProvider,
  SidebarProvider,
  ChartProvider,
  AppContextProvider,
  PopoverProvider,
  CronJobProvider,
  StatisticsProvider,
  FormProvider,
  useMode,
  PageProvider,
  ErrorBoundary,
  CardImagesProvider,
  // CardImagesProvider, // Uncomment if CardImagesProvider is used
} from '.'; // Ensure this path is correctly pointing to where your context providers are defined

const Providers = ({ children }) => {
  const { theme } = useMode();
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <ErrorBoundary>
      <Router>
        <PageProvider>
          <AuthProvider>
            <FormProvider>
              <ColorModeProvider>
                <SocketProvider>
                  <UserProvider>
                    <ModalProvider>
                      <PopoverProvider>
                        <CollectionProvider>
                          <CombinedProvider>
                            <CardProvider>
                              <CronJobProvider>
                                <DeckProvider>
                                  <CartProvider>
                                    <CardImagesProvider>
                                      <ThemeProvider theme={theme}>
                                        <ChartProvider>
                                          <StatisticsProvider>
                                            <SidebarProvider>
                                              <AppContextProvider>
                                                {/* <PageProvider> */}
                                                <GlobalStyles />
                                                <Elements
                                                  stripe={stripePromise}
                                                >
                                                  {children}{' '}
                                                </Elements>
                                                {/* </PageProvider> */}
                                              </AppContextProvider>
                                            </SidebarProvider>
                                          </StatisticsProvider>
                                        </ChartProvider>
                                      </ThemeProvider>
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
              </ColorModeProvider>
            </FormProvider>
          </AuthProvider>
        </PageProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default Providers;
