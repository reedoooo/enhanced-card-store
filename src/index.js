// Main.js or wherever your entry point is
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Providers from './context/Providers'; // Make sure to adjust the path as necessary
import ErrorBoundary from './context/ErrorBoundary';

const root = document.getElementById('root');

const AppWrapper = () => {
  return (
    <ErrorBoundary>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  );
};

ReactDOM.render(<AppWrapper />, root);
