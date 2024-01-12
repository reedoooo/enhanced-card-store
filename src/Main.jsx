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
  useCollectionStore,
  useDeckStore,
  useAuthContext,
  usePageContext,
} from './context';
import { AppContainer } from './pages/pageStyles/StyledComponents';
import { useCookies } from 'react-cookie';
import useDialog from './context/hooks/useDialog';
import useSnackBar from './context/hooks/useSnackBar';

const Main = () => {
  const [cookies] = useCookies(['authUser']);
  const authUser = cookies?.authUser;
  const { isLoggedIn, resetLogoutTimer } = useAuthContext();
  const { loadingStatus, returnDisplay, setLoading } = usePageContext();
  const { fetchAllCollectionsForUser } = useCollectionStore();
  const { fetchAllDecksForUser } = useDeckStore();
  const handleSnackBar = useSnackBar()[1];

  const { isLoginDialogOpen, openLoginDialog, closeLoginDialog } =
    useDialog(handleSnackBar); // Assuming false represents the logged-in state

  const routeConfig = [
    { path: '/', component: HomePage, isPrivate: false },
    { path: '/home', component: HomePage, isPrivate: false },
    { path: '/store', component: StorePage, isPrivate: false },
    { path: '/cart', component: CartPage, isPrivate: true },
    { path: '/userprofile', component: ProfilePage, isPrivate: true },
    { path: '/collection', component: CollectionPage, isPrivate: true },
    { path: '/deckbuilder', component: DeckBuilderPage, isPrivate: true },
    { path: '/profile', component: ProfilePage, isPrivate: false },
    { path: '/login', component: LoginPage, isPrivate: false },
    { path: '*', component: NotFoundPage, isPrivate: false },
  ];
  // const [showLoginDialog, setShowLoginDialog] = useState(!isLoggedIn);
  const fetchData = async () => {
    setLoading('isPageLoading', true);
    try {
      await Promise.all([fetchAllCollectionsForUser(), fetchAllDecksForUser()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading('isPageLoading', false);
    }
  };
  const renderHelmet = () => {
    console.log('Rendering helmet...');
    return (
      <Helmet>
        {/* Basic */}
        <title>Your Website Title</title>
        <meta name="description" content="Description of your site or page" />
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="16x16" />

        {/* SEO */}
        <meta name="keywords" content="your, tags" />
        {/* Social Media */}
        <meta property="og:title" content="Title Here" />
        <meta property="og:description" content="Description Here" />
        <meta
          property="og:image"
          content="http://mysite.com/path/to/image.jpg"
        />
        <meta property="og:url" content="http://mysite.com" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Responsive and mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Additional links and styles */}
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

        {/* Specify language and character set */}
        <html lang="en" />
        <meta charSet="utf-8" />

        {/* Scripts */}
        {/* Example: Add a script needed for a service or functionality */}
        {/* <script src="https://cdn.service.com/library.js"></script> */}
      </Helmet>
    );
  };
  const renderRoutes = () => (
    <Routes>
      {routeConfig.map(({ path, component: Component, isPrivate }, index) => (
        <Route
          key={index}
          path={path}
          element={
            isPrivate ? (
              <PrivateRoute>
                <Component />
              </PrivateRoute>
            ) : (
              <Component />
            )
          }
        />
      ))}
    </Routes>
  );
  const renderLoginDialog = () => {
    console.log('Auth user not found, rendering login dialog...', authUser);
    return <LoginDialog />;
  };
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     resetLogoutTimer();
  //     fetchData(); // Fetch data when the user is logged in
  //   }
  // }, [isLoggedIn, resetLogoutTimer, fetchData]); // Remove authUser from dependencies

  // useEffect(() => {
  //   // Manage login dialog based on isLoggedIn status
  //   if (isLoggedIn && isLoginDialogOpen) {
  //     closeLoginDialog();
  //   } else if (!isLoggedIn && !isLoginDialogOpen) {
  //     openLoginDialog();
  //   }
  // }, [isLoggedIn, isLoginDialogOpen, openLoginDialog, closeLoginDialog]);

  return (
    <>
      {renderHelmet()}
      {!authUser ? (
        renderLoginDialog()
      ) : (
        <AppContainer>
          {/* {authUser} */}

          <Header />
          {/* {returnDisplay()} */}
          {renderRoutes()}
          {/* <Routes>
            {renderRoutes(routeConfig)} {/* Use the renderRoutes function */}
          {/* </Routes>  */}
          {/* {snackbar} */}
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
// // Manage loading display
// useEffect(() => {
//   if (!isLoggedIn) return;
//   if (!authUser) return;

//   const fetchData = async () => {
//     if (isLoggedIn && authUser) {
//       setLoading('isPageLoading', true);
//       try {
//         await Promise.all([
//           fetchAllCollectionsForUser(),
//           fetchAllDecksForUser(),
//         ]);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading('isPageLoading', false);
//       }
//     }
//   };
//   fetchData();
// }, [isLoggedIn, authUser, fetchAllCollectionsForUser, fetchAllDecksForUser]);
// // Manage logout timer reset
// useEffect(() => {
//   if (isLoggedIn) resetLogoutTimer();
// }, [isLoggedIn, resetLogoutTimer]);
// // Manage login dialog visibility
// useEffect(() => {
//   if (isLoggedIn && isLoginDialogOpen) {
//     console.log('Closing login dialog...');
//     closeLoginDialog();
//   }
//   if (!isLoggedIn && !isLoginDialogOpen) {
//     console.log('Opening login dialog...');
//     openLoginDialog();
//   }
//   // if (!isLoggedIn) {
//   // }
//   // setShowLoginDialog(
//   //   // window.location.pathname === '/login' ||
//   //   !isLoggedIn
//   // );
// }, [isLoggedIn]);
