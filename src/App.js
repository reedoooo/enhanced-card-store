// Note: Main App Component
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { debounce } from 'lodash';

// Component Imports
import Header from './components/headings/header/Header';
import PrivateRoute from './components/reusable/PrivateRoute';
import LoginDialog from './components/dialogs/LoginDialog';
// import Footer from './components/headings/footer/Footer';

// Page Imports
import {
  SplashPage,
  HomePage,
  StorePage,
  CartPage,
  ProfilePage,
  CollectionPage,
  DeckBuilderPage,
  // ThreeJsCube,
  // CardDeckAnimation,
  NotFoundPage,
  LoginPage,
} from './pages';

import {
  useUserContext,
  useCollectionStore,
  useUtilityContext,
  useDeckStore,
  useCartStore,
  useCardImages,
  useAuthContext,
  usePageContext,
} from './context';
import { AppContainer } from './pages/pageStyles/StyledComponents';
import { MainContent } from './components/headings/navigation/styled';

const App = () => {
  const { fetchAllCollectionsForUser, selectedCollection } =
    useCollectionStore();
  const { fetchAllDecksForUser, selectedDeck } = useDeckStore();

  const { fetchUserCart } = useCartStore();
  const { user } = useUserContext();
  const { logout, logoutTimerRef, resetLogoutTimer } = useAuthContext();
  const {
    isPageLoading,
    setIsPageLoading,
    displaySplashPage,
    handleLoadingTimeout,
  } = usePageContext();
  const navigate = useNavigate();
  const loadingTimeoutRef = useRef(null);
  const userId = user?.id;
  const [showLoginDialog, setShowLoginDialog] = useState(!userId);
  // const [toolbarHeight, setToolbarHeight] = useState('64px'); // Default height

  const handleLoginSuccess = (isLoggedIn, userId) => {
    setShowLoginDialog(false);
    setIsPageLoading(false);
    // setIsLoading(false);
    if (isLoggedIn && userId) {
      resetLogoutTimer();
    }
  };

  useEffect(() => {
    // Set up event listeners for user activity
    if (userId) {
      window.addEventListener('mousemove', resetLogoutTimer);
      window.addEventListener('keypress', resetLogoutTimer);
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('keypress', resetLogoutTimer);
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [userId, resetLogoutTimer]);

  useEffect(() => {
    // Fetch all collections and decks for the user
    if (userId) {
      Promise.all([
        fetchAllCollectionsForUser(),
        fetchAllDecksForUser(),
        // fetchUserCart(),
      ])
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setIsPageLoading(false));
    }
  }, [userId, fetchAllCollectionsForUser, fetchAllDecksForUser, fetchUserCart]);

  useEffect(() => {
    // Check if loading takes more than 45 seconds
    if (isPageLoading) {
      loadingTimeoutRef.current = setTimeout(() => {
        handleLoadingTimeout();
        navigate('/login');
      }, 45000); // 45 seconds
    }

    // Clear the timeout if loading finishes or when unmounting
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [isPageLoading, navigate, handleLoadingTimeout]);

  useEffect(() => {
    // if the user is redirected to the login page, show the login dialog and set the loading state to false
    if (window.location.pathname === '/login') {
      setShowLoginDialog(true);
      setIsPageLoading(false);
      // setIsLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   if (toolbarRef.current) {
  //     setToolbarHeight(`${toolbarRef.current.clientHeight}px`);
  //   }
  // }, []);

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
      </Helmet>{' '}
      {displaySplashPage()}
      {!userId ? (
        <LoginDialog
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          onLogin={handleLoginSuccess}
        />
      ) : (
        <AppContainer>
          <Header />
          <Routes>
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
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/threejs" element={<ThreeJsCube />} /> */}
            {/* <Route path="/cardDeck" element={<CardDeckAnimation />} /> */}
            <Route path="*" element={<NotFoundPage />} />{' '}
          </Routes>
          {/* <Footer /> */}
        </AppContainer>
      )}
    </>
  );
};

export default App;
