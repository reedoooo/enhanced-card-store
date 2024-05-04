import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { register, unregister } from './serviceWorker';

// ==============================|| REACT DOM RENDER  ||============================== //

import { ColorModeProvider, useMode } from './context';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'layout/REUSABLE_COMPONENTS/utils/system-utils/ErrorFallback';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { HelmetMetaData } from 'data';

const domNode = document.getElementById('root');

const AppWrapper = () => {
  const { theme } = useMode();
  const errorHandler = (error, errorInfo) => {
    console.error('Error:', error, 'Info:', errorInfo);
    enqueueSnackbar('An unexpected error occurred, please try again later.', {
      variant: 'error',
    });
  };
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
      onError={errorHandler}
      theme={theme}
    >
      <Router>
        <HelmetMetaData />
        <ColorModeProvider>
          <SnackbarProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline theme={theme} />
              <GlobalStyles />
              <ParallaxProvider>
                <App />
              </ParallaxProvider>
            </ThemeProvider>
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
