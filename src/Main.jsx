// Note: Main App Component
import React, { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Component and Page Imports
import Header from './components/headings/header/Header';
import PrivateRoute from './components/reusable/PrivateRoute';
import LoginDialog from './components/dialogs/LoginDialog';
import {
  HomePage,
  StorePage,
  CartPage,
  ProfilePage,
  CollectionPage,
  DeckBuilderPage,
  NotFoundPage,
  LoginPage,
} from './pages';
import {
  useUserContext,
  useCollectionStore,
  useDeckStore,
  useAuthContext,
  usePageContext,
  useMode,
} from './context';
import { AppContainer } from './pages/pageStyles/StyledComponents';
import { useCookies } from 'react-cookie';

const Main = () => {
  const [cookies] = useCookies(['authUser']);
  const authUser = cookies?.authUser;
  const { isLoggedIn, resetLogoutTimer } = useAuthContext();
  const { loadingStatus, returnDisplay, setLoading } = usePageContext();
  const { fetchAllCollectionsForUser } = useCollectionStore();
  const { fetchAllDecksForUser } = useDeckStore();
  // const navigate = useNavigate(); // Use the useNavigate hook

  const [showLoginDialog, setShowLoginDialog] = useState(!isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!authUser) return;

    const fetchData = async () => {
      if (isLoggedIn && authUser) {
        setLoading('isPageLoading', true);
        try {
          await Promise.all([
            fetchAllCollectionsForUser(),
            fetchAllDecksForUser(),
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading('isPageLoading', false);
        }
      }
    };
    fetchData();
  }, [isLoggedIn, authUser, fetchAllCollectionsForUser, fetchAllDecksForUser]);

  // Manage logout timer reset
  useEffect(() => {
    if (isLoggedIn) resetLogoutTimer();
  }, [isLoggedIn, resetLogoutTimer]);

  // Manage login dialog visibility
  useEffect(() => {
    if (isLoggedIn) {
      setShowLoginDialog(false);
    }
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    }
    setShowLoginDialog(window.location.pathname === '/login' || !isLoggedIn);
  }, [isLoggedIn]);
  // useEffect(() => {
  //   // Redirects user to the homepage if they are already logged in
  //   if (isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [isLoggedIn, navigate]); // Add navigate to the dependency array

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
      {/* {loadingStatus?.isPageLoading && returnDisplay()} */}
      {!authUser ? (
        <LoginDialog
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          onLogin={() => setShowLoginDialog(false)} // This might need to be updated based on the login logic
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
        </AppContainer>
      )}
    </>
  );
};

export default Main;
// useEffect(() => {
//   if (userId) setupEventListeners();
//   return () => {
//     removeEventListeners();
//     if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//   };
// }, [userId, resetLogoutTimer]);
