// App.js
import React, { Suspense, lazy, useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoginDialog from 'layout/dialogs/LoginDialog';
import Navigation from 'layout/navigation';
import { HelmetMetaData, ROUTES } from 'data';
import {
  Configurator,
  LoadingOverlay,
  PageLayout,
} from 'layout/REUSABLE_COMPONENTS';
import {
  useUserData,
  useConfigurator,
  useManageCookies,
  useMode,
} from 'context';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, GlobalStyles } from '@mui/material';

// ==============================|| APP ||============================== //

const PrivateRoute = ({ children }) => {
  const { user } = useUserData();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return children;
};

const LazyRoute = ({ componentName, ...rest }) => {
  const Component = lazy(() => import(`./pages/${componentName}`));
  return <Component {...rest} />;
};
const App = () => {
  const { getCookie } = useManageCookies();
  const { theme } = useMode();
  const { isLoggedIn } = getCookie(['isLoggedIn']);
  const { isConfiguratorOpen } = useConfigurator();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      <HelmetMetaData />
      <PageLayout>
        <Navigation isLoggedIn={isLoggedIn} />
        {isConfiguratorOpen && <Configurator />}
        <TransitionGroup component={null} exit={false}>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Suspense fallback={<LoadingOverlay />}>
              <Routes>
                {ROUTES.map(
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
            </Suspense>
          </CSSTransition>
        </TransitionGroup>
        <LoginDialog />
      </PageLayout>
    </ThemeProvider>
  );
};

export default App;
