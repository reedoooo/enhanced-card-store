// External Imports
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Component Imports
import Header from './components/headings/header/Header';
import Footer from './components/headings/footer/Footer';
import PrivateRoute from './components/reusable/PrivateRoute';

// Page Imports
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import CollectionPage from './pages/CollectionPage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import ThreeJsCube from './assets/animations/ThreeJsCube';
import CardDeckAnimation from './assets/animations/CardDeckAnimation';

// Context Hooks Imports
import { useUserContext } from './context/UserContext/UserContext';
import { useCollectionStore } from './context/CollectionContext/CollectionContext';
import { useUtilityContext } from './context/UtilityContext/UtilityContext';
import { AppContainer } from './pages/pageStyles/StyledComponents';
import { useCardImages } from './context/CardImagesContext/CardImagesContext';
import { useCookies } from 'react-cookie';
import { useDeckStore } from './context/DeckContext/DeckContext';
import { useCartStore } from './context/CartContext/CartContext';
import LoginDialog from './components/dialogs/LoginDialog';
const App = () => {
  // const { getRandomCardImages } = useCardImages(); // Add this line
  // const [cookies] = useCookies(['user']);

  // const user = cookies?.user;
  // const userId = user?.id;
  const [currentPage, setCurrentPage] = useState('');
  const { fetchAllCollectionsForUser, selectedCollection } =
    useCollectionStore();
  const { user, fetchUser } = useUserContext();
  const userId = user?.id;
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const { allDecks, fetchAllDecksForUser, selectedDeck } = useDeckStore();
  const { fetchUserCart, cartData } = useCartStore();
  const { isLoading, setIsLoading } = useUtilityContext();

  // useEffect(() => {
  //   getRandomCardImages(10); // Fetch 10 random images on app start
  // }, []); // Add this useEffect
  const handleLoginSuccess = (isLoggedIn, userId) => {
    setShowLoginDialog(false);
    setIsLoading(false);
    // Perform other actions after login
  };

  useEffect(() => {
    // Open the login dialog and pause splash page if there's no userId
    if (!userId) {
      setShowLoginDialog(true);
      setIsLoading(true); // Continue showing splash page
    } else {
      setShowLoginDialog(false);
      setIsLoading(false); // Hide splash page
    }
  }, [userId]);

  useEffect(() => {
    if (userId && typeof userId === 'string') {
      fetchAllCollectionsForUser()
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching collections:', error);
          setIsLoading(false);
        });
    }
  }, [userId, fetchAllCollectionsForUser, setIsLoading, selectedCollection]);
  // useEffect(() => {
  //   console.log('Checking userId in useEffect:', userId);
  //   setShowLoginDialog(!userId);
  // }, [userId]);
  useEffect(() => {
    if (userId && typeof userId === 'string') {
      fetchAllDecksForUser()
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error('Error fetching decks:', error));
    }
  }, [userId, fetchAllDecksForUser, selectedDeck, setIsLoading]);
  // useEffect(() => {
  //   if (userId && typeof userId === 'string') {
  //     fetchUserCart()
  //       .then(() => {
  //         setIsLoading(false);
  //       })
  //       .catch((error) => console.error('Error fetching cart:', error));
  //   }
  // }, [userId, fetchUserCart, cartData, setIsLoading]);

  // Handle initial loading state
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading]);

  return (
    <>
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
        <React.Fragment>
          <LoginDialog
            open={showLoginDialog}
            onClose={() => setShowLoginDialog(false)}
            onLogin={handleLoginSuccess}
          />

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
            {/* <Footer /> */}
          </AppContainer>
        </React.Fragment>
      )}
    </>
  );
};

export default App;
