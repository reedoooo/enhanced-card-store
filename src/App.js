// External Imports
import React, { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';

// Component Imports
import Header from './components/headings/header/Header';
import Footer from './components/headings/footer/Footer';
import PrivateRoute from './components/Auth/PrivateRoute';

// Page Imports
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import CollectionPage from './pages/CollectionPage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import ThreeJsCube from './pages/ThreeJsCube';
import CardDeckAnimation from './pages/CardDeckAnimation';

// Context Hooks Imports
import { useCombinedContext } from './context/CombinedProvider';
import { useUserContext } from './context/UserContext/UserContext';
import { useCollectionStore } from './context/hooks/collection';
import { useUtilityContext } from './context/UtilityContext/UtilityContext';

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  /* Your global styles here */
`;

// Custom Hook for Cron Job
const useCronJob = (lastCronJobTriggerTime, setLastCronJobTriggerTime) => {
  const {
    cronData,
    handleSendAllCardsInCollections,
    listOfMonitoredCards,
    handleRetreiveListOfMonitoredCards,
    retrievedListOfMonitoredCards,
    allCollectionsUpdated,
  } = useCombinedContext();
  // const { fetchAllCollectionsForUser } = useCollectionStore();
  const { user } = useUserContext();
  const userId = user?.userID;

  useEffect(() => {
    setLastCronJobTriggerTime(new Date().getTime());
  }, [setLastCronJobTriggerTime]);

  useEffect(() => {
    const handleTriggerCronJob = () => {
      const currentTime = new Date().getTime();
      if (currentTime - lastCronJobTriggerTime >= 60000) {
        setLastCronJobTriggerTime(currentTime);
        if (userId && listOfMonitoredCards && retrievedListOfMonitoredCards) {
          handleSendAllCardsInCollections(
            userId,
            listOfMonitoredCards,
            retrievedListOfMonitoredCards
          );
          console.log('SENDING ALL CARDS IN COLLECTIONS');
        } else if (userId && listOfMonitoredCards) {
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

    const interval = setInterval(handleTriggerCronJob, 60000);
    return () => clearInterval(interval);
  }, [
    cronData,
    lastCronJobTriggerTime,
    allCollectionsUpdated,
    handleRetreiveListOfMonitoredCards,
    handleSendAllCardsInCollections,
    listOfMonitoredCards,
    retrievedListOfMonitoredCards,
    userId,
  ]);
};

// Main Component
const App = () => {
  const { fetchAllCollectionsForUser, allCollections } = useCollectionStore();
  const [lastCronJobTriggerTime, setLastCronJobTriggerTime] = useState(null);
  const { isLoading, setIsContextLoading } = useUtilityContext();
  const { user } = useUserContext();

  const hasFetchedCollectionsRef = useRef(false); // This ref is used to indicate whether collections have been fetched.

  useEffect(() => {
    if (user) {
      console.log('Private routes now available');
    }

    return () => {
      console.log('Private routes no longer available');
    };
  }, [user]); // useEffect will re-run whenever 'user' changes

  useEffect(() => {
    if (!isLoading) {
      setIsContextLoading(false);
    }
  }, [isLoading, setIsContextLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContextLoading(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, [setIsContextLoading]);

  useCronJob(lastCronJobTriggerTime, setLastCronJobTriggerTime);

  // Assuming currentPage is a piece of state that changes when the user changes pages
  useEffect(() => {
    if (user && !hasFetchedCollectionsRef.current) {
      try {
        fetchAllCollectionsForUser();
        hasFetchedCollectionsRef.current = true; // Set the ref to true after fetching
        console.log('Fetched collections because none were present.');
      } catch (err) {
        console.error('Failed to fetch collections:', err);
      }
    }
  }, [user, fetchAllCollectionsForUser]); // Removed allCollections from dependency list to prevent re-fetching when they update

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {isLoading ? (
        <SplashPage />
      ) : (
        <Router>
          <AppContainer>
            <Header />
            <Routes>
              {/* {setCurrentPage(useLocation())} */}

              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />
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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/threejs" element={<ThreeJsCube />} />
              <Route path="/cardDeck" element={<CardDeckAnimation />} />
              {/* Add a Route for 404 Not Found page if needed */}
            </Routes>
            <Footer />
          </AppContainer>
        </Router>
      )}
    </>
  );
};

export default App;
