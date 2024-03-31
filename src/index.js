import React, { StrictMode, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ==============================|| REACT DOM RENDER  ||============================== //

import { AuthProvider, ColorModeProvider, ErrorBoundary } from './context';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet';
import { SnackbarProvider } from 'notistack';

const domNode = document.getElementById('root');

const HelmetMetadata = () => (
  <Helmet>
    {/* Basic */}
    <title>Enhanced Cardstore</title>
    <meta name="description" content="Description of your site or page" />
    <link
      rel="canonical"
      href="http://reedvogt.com/projects/enhanced-card-store"
    />
    <link rel="icon" type="image/png" href="/favicon.png" sizes="16x16" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />

    {/* SEO */}
    <meta name="keywords" content="YuGiOh, cards, collection, deckbuilder" />

    {/* Social Media */}
    <meta property="og:title" content="Title Here" />
    <meta property="og:description" content="Description Here" />
    <meta property="og:image" content="http://mysite.com/path/to/image.jpg" />
    <meta property="og:url" content="http://mysite.com" />
    <meta name="twitter:card" content="summary_large_image" />

    {/* Responsive and mobile */}
    <meta name="viewport" content="initial-scale=1, width=device-width" />

    {/* Additional links and styles */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />
  </Helmet>
);

const AppWrapper = () => {
  const stripePromise = useMemo(
    () => loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY),
    [process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY]
  );

  return (
    <ErrorBoundary>
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
