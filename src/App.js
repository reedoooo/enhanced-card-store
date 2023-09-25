import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@mui/material/styles';
import Header from './components/headings/header/Header';
import Footer from './components/headings/footer/Footer';
import theme from './assets/styles/themes';
import CartPage from './pages/CartPage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import CollectionPage from './pages/CollectionPage';
import ThreeJsCube from './ThreeJsCube'; // Import your Three.js component
import CardDeckAnimation from './CardDeckAnimation';
import ProfilePage from './pages/ProfilePage';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppWrapper = styled.div`
  flex: 1;
`;

const App = () => {
  const [activeUserCartId, setActiveUserCartId] = useState(null);
  // const [activeUserDeckId, setActiveUserDeckId] = useState(null);
  // const [activeUserCollectionId, setActiveUserCollectionId] = useState(null);

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
        <AppContainer>
          <Header />
          <AppWrapper>
            {/* <MainContent> */}
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
                path="/collection"
                element={
                  <CollectionPage
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
              <Route
                exact
                path="/profile"
                element={
                  <ProfilePage
                    activeUserCartId={activeUserCartId}
                    setActiveUserCart={setActiveUserCartId}
                  />
                }
              />
              <Route
                exact
                path="/userprofile"
                element={
                  <ProfilePage
                    activeUserCartId={activeUserCartId}
                    setActiveUserCart={setActiveUserCartId}
                  />
                }
              />
              {/* Add your Three.js cube component */}
              <Route exact path="/threejs" element={<ThreeJsCube />} />
              <Route exact path="/cardDeck" element={<CardDeckAnimation />} />
            </Routes>
            {/* </MainContent> */}
          </AppWrapper>
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
};

export default App;
