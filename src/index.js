import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { register, unregister } from './serviceWorker';

// ==============================|| REACT DOM RENDER  ||============================== //

import { ColorModeProvider, useMode } from './context';
import { Helmet } from 'react-helmet';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'layout/REUSABLE_COMPONENTS/system-utils/ErrorFallback';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';

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
      // onError={(error, info) => console.error('Error:', error, 'Info:', info)}
      // onError={(error) => {
      //   console.error(error);
      // }}
      // onReset={() => window.location.reload()}
      onError={errorHandler}
      theme={theme}
    >
      <Router>
        <HelmetMetadata />
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
