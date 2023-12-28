// App.js
import React from 'react';
import Main from './Main';
import WithPageProvider from './context/WithPageProvider';

// Call the higher-order component function outside the component function
// to avoid remounting on every render
const WrappedMain = WithPageProvider(Main);

const App = () => {
  return <WrappedMain />;
};

export default App;
