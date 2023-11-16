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
import { useCollectionStore } from './context/CollectionContext/CollectionContext';
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
    // handleRetreiveListOfMonitoredCards,
    // retrievedListOfMonitoredCards,
    allCollectionsUpdated,
  } = useCombinedContext();
  const { allCollections } = useCollectionStore();
  const [priceHistory, setPriceHistory] = useState([]);

  const { handlePricesActivateCron, cardsWithChangedPrice } =
    useCombinedContext();
  const { user } = useUserContext();
  const [priceFlux, setPriceFlux] = useState(null);
  const userId = user?.userID;
  useEffect(() => {
    setLastCronJobTriggerTime(new Date().getTime());
  }, [setLastCronJobTriggerTime]);
  // ---------------------------------------------------------------
  // useEffect(() => {
  //   handlePricesActivateCron(
  //     userId,
  //     listOfMonitoredCards,
  //     allCollections,
  //     cardsWithChangedPrice
  //   );
  // }, [
  //   userId,
  //   listOfMonitoredCards,
  //   allCollections,
  //   cardsWithChangedPrice,
  //   priceFlux,
  // ]);

  useEffect(() => {
    const handleTriggerCronJob = () => {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastCronJobTriggerTime;
      const previousTotalPrice = allCollections?.totalPrice;
      if (!priceHistory.includes(previousTotalPrice)) {
        priceHistory.push(previousTotalPrice);
      }
      const minutes = Math.floor(timeDifference / 60000); // 1 minute = 60000 milliseconds
      const seconds = Math.floor((timeDifference % 60000) / 1000); // remainder in milliseconds converted to seconds

      // Output the remaining time in minutes and seconds
      console.log(
        `REMAINING TIME: ${minutes} minute(s) and ${seconds} second(s)`
      );

      for (const collection of allCollections) {
        if (
          collection?.cards &&
          collection?.cards?.length > 0 &&
          collection.totalPrice !== previousTotalPrice // Implement your logic here
        ) {
          setPriceFlux(new Date().getTime()); // Trigger a re-render
          console.log('PRICE FLUX:', priceFlux);
        }
      }
      // if (collection.totalPrice !== previousTotalPrice) {
      //   // Update dependencies of useEffect
      //   setPriceFlux(new Date().getTime()); // Trigger a re-render
      // }
      if (currentTime - lastCronJobTriggerTime >= 60000) {
        setLastCronJobTriggerTime(currentTime);
        if (userId && listOfMonitoredCards) {
          console.log('RETRIEVING LIST OF MONITORED CARDS (paused)');
          // handleSendAllCardsInCollections(
          //   userId,
          //   listOfMonitoredCards
          //   // handleRetrieveListOfMonitoredCards()
          // );
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
    // handleRetrieveListOfMonitoredCards,
    handleSendAllCardsInCollections,
    listOfMonitoredCards,
    userId,
  ]);
};

// Main Component
const App = () => {
  const { user } = useUserContext();
  const { isLoading, setIsContextLoading } = useUtilityContext();
  const { fetchAllCollectionsForUser } = useCollectionStore();
  const [lastCronJobTriggerTime, setLastCronJobTriggerTime] = useState(null);

  useCronJob(lastCronJobTriggerTime, setLastCronJobTriggerTime);

  useEffect(() => {
    if (user) {
      console.log('Private routes now available');
    }

    return () => {
      console.log('Private routes no longer available');
    };
  }, [user]);

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

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted
    const fetchCollections = async () => {
      if (user && isMounted) {
        try {
          // const response = fet
          if (isMounted) {
            console.log('Fetched collections because none were present.');
            // Update state only if the component is still mounted
            console.log('RESPONSE:', isMounted);
            // setOfficialCollectionDatasets(response.data);
          }
        } catch (err) {
          console.error('Failed to fetch collections:', err);
        }
      }
    };

    fetchCollections();

    // Cleanup function to cancel any ongoing tasks when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [user, fetchAllCollectionsForUser]);

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
