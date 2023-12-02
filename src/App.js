// Note: Main App Component
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {
  const { fetchAllCollectionsForUser, selectedCollection } =
    useCollectionStore();
  const { fetchAllDecksForUser, selectedDeck } = useDeckStore();
  const { fetchUserCart } = useCartStore();
  const { user } = useUserContext();
  const { logout } = useAuthContext();
  const { isLoading, setIsLoading } = useUtilityContext();
  const { isPageLoading, setIsPageLoading } = usePageContext();
  const userId = user?.id;
  const [showLoginDialog, setShowLoginDialog] = useState(!userId);
  const logoutTimerRef = useRef(null);

  const handleUserActivity = debounce(() => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(logout, 1800000); // 30 minutes
  }, 500);

  const debouncedLogout = useCallback(
    debounce(() => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      logoutTimerRef.current = setTimeout(logout, 1800000); // 30 minutes
    }, 500),
    [logout] // Dependency for useCallback
  );

  // Call this function to reset the logout timer
  const resetLogoutTimer = useCallback(() => {
    debouncedLogout();
  }, [debouncedLogout]);

  const handleLoginSuccess = (isLoggedIn, userId) => {
    setShowLoginDialog(false);
    setIsPageLoading(false);
    setIsLoading(false);
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
    if (userId) {
      Promise.all([
        fetchAllCollectionsForUser(),
        fetchAllDecksForUser(),
        // fetchUserCart(),
      ])
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setIsLoading(false) && setIsPageLoading(false));
    }
  }, [userId, fetchAllCollectionsForUser, fetchAllDecksForUser, fetchUserCart]);

  useEffect(() => {
    // if the user is redirected to the login page, show the login dialog and set the loading state to false
    if (window.location.pathname === '/login') {
      setShowLoginDialog(true);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Helmet>{/* Helmet Configuration */}</Helmet>
      {isLoading || isPageLoading ? (
        <SplashPage />
      ) : (
        <>
          <LoginDialog
            open={showLoginDialog}
            onClose={() => setShowLoginDialog(false)}
            onLogin={handleLoginSuccess}
          />
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
              {/* 404 Not Found Route */}
            </Routes>
            {/* <Footer /> */}
          </AppContainer>
        </>
      )}
    </>
  );
};

export default App;
