import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
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
          </Routes>{' '}
        </AppContainer>
      )}
    </React.Fragment>
  );
};

export default Main;
