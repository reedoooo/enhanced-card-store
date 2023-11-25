import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './assets/GlobalStyles';
import ErrorBoundary from './context/ErrorBoundary';
import AuthProvider from './context/Auth/authContext';
import { CartProvider } from './context/CartContext/CartContext';
import { DeckProvider } from './context/DeckContext/DeckContext';
import { CardProvider } from './context/CardContext/CardStore';
import { CollectionProvider } from './context/CollectionContext/CollectionContext';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { UserProvider } from './context/UserContext/UserContext';
import { CombinedProvider } from './context/CombinedProvider';
import { ThemeProvider } from '@mui/styles';
import { ColorModeProvider } from './context/ColorModeProvider';
import { SocketProvider } from './context/SocketProvider';
import { SidebarProvider } from './context/SideBarProvider';
import { ChartProvider } from './context/ChartContext/ChartContext';
import { UtilityProvider } from './context/UtilityContext/UtilityContext';
import { AppContextProvider } from './context/AppContext/AppContextProvider';
import { useMode } from './context/hooks/colormode';
import { PopoverProvider } from './context/PopoverContext/PopoverContext';
import { CronJobProvider } from './context/CronJobContext/CronJobContext';
// import { CardImagesProvider } from './context/CardImagesContext/CardImagesContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StatisticsProvider } from './context/StatisticsContext/StatisticsContext';

const root = document.getElementById('root');

function Main() {
  const { theme } = useMode();
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  ); // Use your Stripe publishable key

  return (
    <ErrorBoundary>
      <UtilityProvider>
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
                                            <Elements stripe={stripePromise}>
                                              <App />
                                            </Elements>
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
      </UtilityProvider>
    </ErrorBoundary>
  );
}

ReactDOM.render(<Main />, root);
