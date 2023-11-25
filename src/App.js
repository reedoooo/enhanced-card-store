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
const App = () => {
  // const [cookies] = useCookies(['user']);

  // const user = cookies?.user;
  // const userId = user?.id;
  const [currentPage, setCurrentPage] = useState('');
  // const { setContext } = useAppContext(); // Assuming useAppContext provides setContext
  const { fetchAllCollectionsForUser, selectedCollection } =
    useCollectionStore();
  const { user, fetchUser } = useUserContext();
  const userId = user?.id;
  console.log('user', user);
  console.log('userId', userId);
  const { allDecks, fetchAllDecksForUser, selectedDeck } = useDeckStore();
  const { fetchUserCart, cartData } = useCartStore();
  const { isLoading, setIsLoading } = useUtilityContext();

  // const { getRandomCardImages } = useCardImages(); // Add this line

  // useEffect(() => {
  //   getRandomCardImages(10); // Fetch 10 random images on app start
  // }, []); // Add this useEffect

  useEffect(() => {
    if (userId) {
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
  //   if (user) {
  //     fetchAllDecksForUser(user?.id).catch((err) =>
  //       console.error('Failed to get all decks:', err)
  //     );
  //   }
  // }, [fetchAllDecksForUser]);
  // useEffect(() => {
  //   if (user) {
  //     fetchUserCart(user?.id).catch((err) =>
  //       console.error('Failed to get cart:', err)
  //     );
  //   }
  // }, [fetchUserCart]);

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
        </React.Fragment>
      )}
    </>
  );
};

export default App;
