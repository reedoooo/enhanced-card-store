// App.js
import React, { useEffect } from 'react';
import './assets/css/index.css';
import './assets/css/card.css';
import './assets/css/page.css';
import Main from './Main';
import {
  UserProvider,
  useMode,
  // CollectionProvider,
  CardProvider,
  // DeckProvider,
  // CartProvider,
  // AppContextProvider,
  ConfiguratorProvider,
} from './context';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';

// ==============================|| APP ||============================== //

const App = () => {
  const { theme } = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline theme={theme} />
      <GlobalStyles />
      <ParallaxProvider>
        <ConfiguratorProvider>
          <UserProvider>
            {/* <CollectionProvider> */}
            <CardProvider>
              {/* <DeckProvider> */}
              {/* <CartProvider> */}
              {/* <AppContextProvider> */}
              <Main />
              {/* </AppContextProvider> */}
              {/* </CartProvider> */}
              {/* </DeckProvider> */}
            </CardProvider>
            {/* </CollectionProvider> */}
          </UserProvider>
        </ConfiguratorProvider>
      </ParallaxProvider>
    </ThemeProvider>
  );
};

export default App;
