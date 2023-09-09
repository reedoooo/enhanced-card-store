import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@mui/material/styles';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';

import Header from './components/headings/header/Header';
import Footer from './components/headings/footer/Footer';
import Home from './pages/HomePage';
import Store from './pages/StorePage';
import theme from './assets/styles/themes';
import CartPage from './pages/CartPage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import PracticeScraperPage from './pages/PracticeScraperPage';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';

const App = () => {
  const [activeUserCartId, setActiveUserCartId] = useState(null);

  return (
    <Router>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route
            exact
            path="/store"
            element={
              <StorePage
                activeUserCartId={activeUserCartId}
                setActiveUserCart={setActiveUserCartId}
              />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <CartPage
                activeUserCartId={activeUserCartId}
                setActiveUserCart={setActiveUserCartId}
              />
            }
          />
          <Route
            exact
            path="/scrapertester"
            element={
              <PracticeScraperPage
                activeUserCartId={activeUserCartId}
                setActiveUserCart={setActiveUserCartId}
              />
            }
          />
          <Route
            exact
            path="/deckbuilder"
            element={
              <DeckBuilderPage
                activeUserCartId={activeUserCartId}
                setActiveUserCart={setActiveUserCartId}
              />
            }
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
