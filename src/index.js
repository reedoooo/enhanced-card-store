import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'assets/css/index.css';
import 'assets/css/card.css';
import 'assets/css/page.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
// import reportWebVitals from './reportWebVitals';

import App from './App';
import { register, unregister } from './serviceWorker';

import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'layout/REUSABLE_COMPONENTS';
import { ColorModeProvider } from 'context';

// ==============================|| REACT DOM RENDER  ||============================== //

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ColorModeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SnackbarProvider>
          <ParallaxProvider>
            <Router>
              <App />
            </Router>
          </ParallaxProvider>
        </SnackbarProvider>
      </ErrorBoundary>
    </ColorModeProvider>
  </StrictMode>
);

// reportWebVitals();

if (process.env.NODE_ENV === 'production') {
  register(); // Only register the service worker in production
} else {
  unregister(); // Disable the service worker in development
}
