import React, { StrictMode, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// import LogRocket from 'logrocket';
// LogRocket.init('8iqglq/card-store');
import { register, unregister } from './serviceWorker';

// ==============================|| REACT DOM RENDER  ||============================== //

import { AuthProvider, ColorModeProvider } from './context';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'ErrorFallback';

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
      FallbackComponent={ErrorFallback}
      // FallbackComponent={({ error, resetErrorBoundary }) => {
      //   console.error(error);
      //   resetErrorBoundary();
      //   return null;
      // }}
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

if (process.env.NODE_ENV === 'production') {
  register(); // Only register the service worker in production
} else {
  unregister(); // Disable the service worker in development
}
