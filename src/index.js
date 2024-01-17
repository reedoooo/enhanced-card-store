// ===========================|| REACT APP ENTRY POINT ||=========================== //

// import * as serviceWorker from './serviceWorker';

// ===========================|| REACT APP ENTRY POINT ||=========================== //

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// ==============================|| REACT DOM RENDER  ||============================== //

import { AuthProvider, ColorModeProvider, PageProvider } from './context';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const domNode = document.getElementById('root');

const AppWrapper = () => {
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );
  return (
    <Router>
      <ColorModeProvider>
        <PageProvider>
          <AuthProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </AuthProvider>
        </PageProvider>
      </ColorModeProvider>
    </Router>
  );
};

ReactDOM.render(<AppWrapper />, domNode);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
