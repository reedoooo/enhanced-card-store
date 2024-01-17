import React, { useCallback, useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
  useAuthContext,
  usePageContext,
  useMode,
  useSidebarContext,
} from './context';
import { AppContainer } from './pages/pageStyles/StyledComponents';

// Layout imports
import SideBar from './layout/headings/navigation/SideBar.jsx';
import TopBar from './layout/headings/navigation/TopBar.jsx';
import getMenuItemsData from './layout/headings/header/menuItemsData.jsx';

const ROUTE_CONFIG = [
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

const Main = () => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const { resetLogoutTimer, logout, authUser, userId, isLoggedIn } =
    useAuthContext();
  const { isOpen, toggleSidebar, setIsOpen } = useSidebarContext();
  const menuItemsData = getMenuItemsData(isLoggedIn);

  const handleDrawerToggle = () => {
    toggleSidebar();
  };
  const renderRoutes = () => {
    return (
      <Routes>
        {ROUTE_CONFIG.map(
          ({ path, component: Component, isPrivate }, index) => (
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
          )
        )}
      </Routes>
    );
  };
  return (
    <React.Fragment>
      {!authUser ? (
        <LoginDialog open={!isLoggedIn} />
      ) : (
        <AppContainer>
          <TopBar
            isMobileView={isMobileView}
            isLoggedIn={isLoggedIn}
            handleDrawer={handleDrawerToggle}
          />
          <SideBar
            isLoggedIn={isLoggedIn}
            handleLogout={logout}
            handleDrawer={handleDrawerToggle}
            isOpen={isOpen}
            isMobileView={isMobileView}
            menuItemsData={menuItemsData}
          />
          {renderRoutes()}
        </AppContainer>
      )}
    </React.Fragment>
  );
};

export default Main;
// useEffect(() => {
//   if (isMobileView) setIsOpen(false);
// }, [isMobileView, setIsOpen]);
// useEffect(() => {
//   if (!isLoggedIn) {
//     // Option 1: Redirect to login page
//     navigate('/login');

//     // Option 2: Open login dialog
//     toggleLoginDialog(); // Assuming toggleLoginDialog controls the dialog state
//   }
// }, [isLoggedIn, navigate, toggleLoginDialog]);
// useEffect(() => {
//   if (isLoggedIn && !prevIsLoggedInRef.current) {
//     resetLogoutTimer();
//     fetchDataIfLoggedIn();
//   }
//   prevIsLoggedInRef.current = isLoggedIn;
// }, [isLoggedIn, resetLogoutTimer, fetchDataIfLoggedIn]);
// const { isDialogOpen } = useDialog(handleSnackBar); // Assuming false represents the logged-in state
// const { getAllCollectionsForUser } = useCollectionStore();
// const { fetchAllDecksForUser } = useDeckStore();
// const fetchDataIfLoggedIn = async () => {
//   if (isLoggedIn && userId) {
//     setLoading('isPageLoading', true);
//     try {
//       await Promise.all([getAllCollectionsForUser(), fetchAllDecksForUser()]);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // You might also want to handle the error state here
//     } finally {
//       setLoading('isPageLoading', false); // Ensure this is being called
//     }
//   }
// };
// const renderRoutes = () => {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <StyledAppBar position="relative" theme={theme}>
//         <StyledToolbar theme={theme}>
//           {isMobileView ? (
//             <Box
//               sx={{
//                 width: 228,
//                 display: 'flex',
//                 [theme.breakpoints.down('md')]: {
//                   width: 'auto',
//                 },
//               }}
//             >
//               {/* logo section */}
//               <Box
//                 component="span"
//                 sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
//               >
//                 <LogoSection />
//               </Box>
//               {menuItemsData?.items?.map((item) => (
//                 <MenuItemComponent
//                   key={item?.id}
//                   item={item}
//                   onClick={modifiedToggleSidebar}
//                 />
//               ))}

//               {/* user icon */}
//               <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
//                 <Avatar
//                   variant="rounded"
//                   sx={{
//                     ...theme.typography.commonAvatar,
//                     ...theme.typography.mediumAvatar,
//                     transition: 'all .2s ease-in-out',
//                     background: theme.palette.secondary.light,
//                     color: theme.palette.secondary.dark,
//                     '&:hover': {
//                       background: theme.palette.secondary.dark,
//                       color: theme.palette.secondary.light,
//                     },
//                   }}
//                   onClick={modifiedToggleSidebar}
//                   color="inherit"
//                 ></Avatar>
//               </ButtonBase>
//               {/* menu icon */}
//               <IconButton
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 onClick={modifiedToggleSidebar}
//               >
//                 <MenuIcon />
//               </IconButton>
//             </Box>
//           ) : (
//             menuItemsData?.items?.map((item) => (
//               <MenuItemComponent
//                 key={item?.id}
//                 item={item}
//                 onClick={modifiedToggleSidebar}
//               />
//             ))
//           )}
//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label={isLoggedIn ? 'logout' : 'login'}
//             onClick={logout}
//           >
//             {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
//           </IconButton>
//           {/* <NotificationSection /> */}
//           <ProfileSection />
//         </StyledToolbar>
//       </StyledAppBar>{' '}
//       <SideBar
//         // login management
//         isLoggedIn={isLoggedIn}
//         handleLogout={logout}
//         // drawer management
//         handleDrawer={modifiedToggleSidebar}
//         // topBarUp={topBarUp} // Pass the topBarUp state
//         isOpen={isOpen}
//         isMobileView={isMobileView}
//         menuItemsData={menuItemsData}
//       />{' '}
//       {/* main content */}
//       {/* <Main theme={theme} open={leftDrawerOpened}>
//       {/* breadcrumb */}
//       {/* <Breadcrumbs
//         separator={IconChevronRight}
//         navigation={navigation}
//         icon
//         title
//         rightAlign
//       />
//       <Outlet />
//     </Main>
//     <Customization /> */}{' '}
//       {/* <Routes>
//         {routeConfig.map(
//           ({ path, component: Component, isPrivate }, index) => (
//             <Route
//               key={index}
//               path={path}
//               element={
//                 isPrivate ? (
//                   <PrivateRoute>
//                     <Component />
//                   </PrivateRoute>
//                 ) : (
//                   <Component />
//                 )
//               }
//             />
//           )
//         )}
//       </Routes> */}
//     </Box>
//   );
// };
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
