import React, { StrictMode } from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { register, unregister } from './serviceWorker';

// ==============================|| REACT DOM RENDER  ||============================== //

import { ColorModeProvider } from './context';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import { ParallaxProvider } from 'react-scroll-parallax';
import { HelmetMetaData } from 'data';
import { ErrorFallback } from 'layout/REUSABLE_COMPONENTS';

const root = createRoot(document.getElementById('root'));

// ==============================|| APP WRAPPER ||============================== //

const AppWrapper = () => {
  const errorHandler = (error, errorInfo) => {
    console.error('Error:', error, 'Info:', errorInfo);
    enqueueSnackbar('An unexpected error occurred, please try again later.', {
      variant: 'error',
    });
  };
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ColorModeProvider>
          <Router>
            <HelmetMetaData />
            <SnackbarProvider>
              <ParallaxProvider>
                <App />
              </ParallaxProvider>
            </SnackbarProvider>
          </Router>
        </ColorModeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
};

root.render(<AppWrapper />); // Use the root to render the AppWrapper.

if (process.env.NODE_ENV === 'production') {
  register(); // Only register the service worker in production
} else {
  unregister(); // Disable the service worker in development
}
