// App.js
import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './assets/css/index.css';
import './assets/css/card.css';
import './assets/css/page.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoginDialog from 'layout/dialogs/LoginDialog';
import Navigation from 'layout/navigation';
import { ROUTE_CONFIG } from 'data';
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
import { CssBaseline } from '@mui/material';

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
      <CssBaseline theme={theme} />
      {/* <GlobalStyles /> */}
      <PageLayout
        sx={{
          backgroundColor: '#3D3D3D',
        }}
      >
        <Navigation isLoggedIn={isLoggedIn} />
        {isConfiguratorOpen && <Configurator />}
        <TransitionGroup component={null} exit={false}>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Suspense fallback={<LoadingOverlay />}>
              <Routes>
                {ROUTE_CONFIG.routes.map(
                  ({ path, componentName, isPrivate }, index) => (
                    <Route
                      key={index}
                      path={path}
                      element={
                        isPrivate ? (
                          <PrivateRoute>
                            <LazyRoute componentName={componentName} />
                          </PrivateRoute>
                        ) : (
                          <LazyRoute componentName={componentName} />
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
