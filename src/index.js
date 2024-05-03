import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { register, unregister } from './serviceWorker';

// ==============================|| REACT DOM RENDER  ||============================== //

import { ColorModeProvider } from './context';
import { Helmet } from 'react-helmet';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'layout/REUSABLE_COMPONENTS/system-utils/ErrorFallback';

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
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={(details) => {
        console.log(details);
      }}
      onError={(error) => {
        console.error(error);
      }}
    >
      <Router>
        <HelmetMetadata />
        <ColorModeProvider>
          <SnackbarProvider>
            <App />
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
