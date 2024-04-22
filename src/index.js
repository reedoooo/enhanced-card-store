import React, { StrictMode, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// import LogRocket from 'logrocket';
// LogRocket.init('8iqglq/card-store');
import * as serviceWorker from './serviceWorker';

// ==============================|| REACT DOM RENDER  ||============================== //

import { AuthProvider, ColorModeProvider } from './context';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';

const domNode = document.getElementById('root');

const HelmetMetadata = () => (
  <Helmet>
    {/* Basic */}
    <title>Enhanced Cardstore</title>
    <meta name="description" content="Description of your site or page" />
    <meta name="keywords" content="YuGiOh, cards, collection, deckbuilder" />
    {/* Social Media */}
    <meta property="og:title" content="Title Here" />
    <meta property="og:description" content="Description Here" />
    <meta property="og:image" content="http://mysite.com/path/to/image.jpg" />
    <meta property="og:url" content="http://mysite.com" />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
);

const AppWrapper = () => {
  const stripePromise = useMemo(
    () => loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY),
    [process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY]
  );

  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => {
        console.error(error);
        resetErrorBoundary();
        return null;
      }}
      onError={(error) => {
        console.error(error);
      }}
      onReset={(details) => {
        console.log(details);
      }}
    >
      <Router>
        <HelmetMetadata />
        <ColorModeProvider>
          <SnackbarProvider>
            <AuthProvider>
              <Elements stripe={stripePromise}>
                <App />
              </Elements>
            </AuthProvider>
          </SnackbarProvider>
        </ColorModeProvider>
      </Router>
    </ErrorBoundary>
  );
};

ReactDOM.render(<AppWrapper />, domNode);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
