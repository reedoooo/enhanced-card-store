// App.js
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoginDialog from 'layout/dialogs/LoginDialog';
import Navigation from 'layout/navigation';
import { HelmetMetaData, getRoutes } from 'data';
import {
  Configurator,
  LoadingOverlay,
  PageLayout,
} from 'layout/REUSABLE_COMPONENTS';
import {
  useConfigurator,
  useManageCookies,
  useMode,
  useAuthManager,
} from 'context';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, GlobalStyles } from '@mui/material';

// ==============================|| APP ||============================== //

const PrivateRoute = ({ children }) => {
  const { getCookie } = useManageCookies();
  const { authUser, isLoggedIn } = getCookie(['authUser', 'isLoggedIn']);
  const navigate = useNavigate();
  useEffect(() => {
    if (authUser === null) {
      navigate('/login', { replace: true });
    }
  }, [navigate, authUser]);

  return children;
};

const App = () => {
  const { getCookie } = useManageCookies();
  const { authUser, isLoggedIn } = getCookie(['authUser', 'isLoggedIn']);

  const { theme } = useMode();
  const { logout } = useAuthManager();
  const { isConfiguratorOpen } = useConfigurator();
  const ROUTES = getRoutes();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      <HelmetMetaData />
      <PageLayout>
        <Navigation
          isLoggedIn={isLoggedIn}
          logout={logout}
          authUser={authUser}
        />
        {isConfiguratorOpen && <Configurator />}
        <TransitionGroup component={null} exit={false}>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            {/* <Suspense fallback={<LoadingOverlay />}> */}
            <Routes>
              {ROUTES.map(
                ({ routerPath, component: Component, isPrivate }, index) => (
                  <Route
                    key={routerPath}
                    path={routerPath}
                    element={
                      isPrivate ? (
                        <Suspense fallback={<LoadingOverlay />}>
                          <PrivateRoute>{<Component />}</PrivateRoute>{' '}
                        </Suspense>
                      ) : (
                        <Suspense fallback={<LoadingOverlay />}>
                          <Component />
                        </Suspense>
                      )
                    }
                  />
                )
              )}
            </Routes>
            {/* </Suspense> */}
          </CSSTransition>
        </TransitionGroup>
        <LoginDialog />
      </PageLayout>
    </ThemeProvider>
  );
};

export default App;
