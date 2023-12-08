import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './assets/GlobalStyles';
import ErrorBoundary from './context/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ThemeProvider } from '@mui/styles';
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
  useMode,
  PageProvider,
  // CardImagesProvider,
} from './context';

const root = document.getElementById('root');

function Main() {
  const { theme } = useMode();
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  ); // Use your Stripe publishable key

  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
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
                                {/* <CardImagesProvider> */}
                                <GlobalStyles />
                                <ThemeProvider theme={theme}>
                                  <ChartProvider>
                                    <StatisticsProvider>
                                      <SidebarProvider>
                                        <AppContextProvider>
                                          <PageProvider>
                                            <Elements stripe={stripePromise}>
                                              <App />
                                            </Elements>
                                          </PageProvider>
                                        </AppContextProvider>
                                      </SidebarProvider>
                                    </StatisticsProvider>
                                  </ChartProvider>
                                </ThemeProvider>
                                {/* </CardImagesProvider> */}
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
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

ReactDOM.render(<Main />, root);
