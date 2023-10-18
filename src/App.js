import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/headings/header/Header';
import Footer from './components/headings/footer/Footer';
import CartPage from './pages/CartPage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import CollectionPage from './pages/CollectionPage';
import ThreeJsCube from './pages/ThreeJsCube'; // Import your Three.js component
import CardDeckAnimation from './pages/CardDeckAnimation';
import ProfilePage from './pages/ProfilePage';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useCombinedContext } from './context/CombinedProvider';
import { useUserContext } from './context/UserContext/UserContext';
import PrivateRoute from './components/Auth/PrivateRoute';
// import Splash from './pages/Splash';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  ${'' /* max-width: 100vw; */}
`;

const AppWrapper = styled.div`
  flex: 1;
  max-width: 100vw;
`;

const App = () => {
  const { user } = useUserContext();
  const [lastCronJobTriggerTime, setLastCronJobTriggerTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  const {
    cronData,
    handleSendAllCardsInCollections,
    listOfMonitoredCards,
    handleRetreiveListOfMonitoredCards,
    retrievedListOfMonitoredCards,
    allCollectionsUpdated,
  } = useCombinedContext();
  const userId = user?.userID;

  const handleTriggerCronJob = () => {
    // Check if the last cron job trigger was more than 1 minute ago
    const currentTime = new Date().getTime();
    if (currentTime - lastCronJobTriggerTime >= 60000) {
      // Update the last trigger time
      setLastCronJobTriggerTime(currentTime);

      if (userId && listOfMonitoredCards && retrievedListOfMonitoredCards) {
        handleSendAllCardsInCollections(
          userId,
          listOfMonitoredCards,
          retrievedListOfMonitoredCards
        );
        console.log('SENDING ALL CARDS IN COLLECTIONS');
      } else if (
        userId &&
        listOfMonitoredCards &&
        !retrievedListOfMonitoredCards
      ) {
        console.log('RETRIEVING LIST OF MONITORED CARDS');
        handleSendAllCardsInCollections(
          userId,
          listOfMonitoredCards,
          handleRetreiveListOfMonitoredCards()
        );
        console.log('Triggered the cron job.');
      }
    }
  };

  useEffect(() => {
    setLastCronJobTriggerTime(new Date().getTime());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleTriggerCronJob();
    }, 60000);

    return () => clearInterval(interval);
  }, [cronData, lastCronJobTriggerTime, allCollectionsUpdated]);
  return (
    <>
      {isLoading ? (
        <div>
          {/* <Splash /> */}
          <CardDeckAnimation />
        </div>
      ) : (
        <>
          <Router>
            <Helmet>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
                rel="stylesheet"
              />
            </Helmet>
            <AppContainer>
              <Header />
              <AppWrapper>
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route exact path="/home" element={<HomePage />} />
                  <Route exact path="/store" element={<StorePage />} />
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <CartPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/userprofile"
                    element={
                      <PrivateRoute>
                        <ProfilePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/collection"
                    element={
                      <PrivateRoute>
                        <CollectionPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/deckbuilder"
                    element={
                      <PrivateRoute>
                        <DeckBuilderPage />
                      </PrivateRoute>
                    }
                  />
                  <Route exact path="/profile" element={<ProfilePage />} />
                  <Route exact path="/threejs" element={<ThreeJsCube />} />
                  <Route
                    exact
                    path="/cardDeck"
                    element={<CardDeckAnimation />}
                  />
                </Routes>
              </AppWrapper>
              <Footer />
            </AppContainer>
          </Router>
        </>
      )}
    </>
  );
};

export default App;
