// App.js
import React, { Suspense, lazy } from 'react';
import './assets/css/index.css';
import './assets/css/card.css';
import './assets/css/page.css';
import useManageCookies from 'context/hooks/useManageCookies';
import useConfigurator from 'context/hooks/useConfigurator';
import PageLayout from 'layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import Navigation from 'layout/navigation';
import Configurator from 'layout/REUSABLE_COMPONENTS/Configurator';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingOverlay from 'layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'layout/navigation/PrivateRoute';
import { ROUTE_CONFIG } from 'data/route-config';
import LoginDialog from 'pages/LoginDialog';

// ==============================|| APP ||============================== //
const LazyRoute = ({ componentName, ...rest }) => {
  const Component = lazy(() => import(`./pages/${componentName}`));
  return <Component {...rest} />;
};
const App = () => {
  const { getCookie } = useManageCookies();
  const { isLoggedIn } = getCookie(['isLoggedIn']);
  const { isConfiguratorOpen } = useConfigurator();
  return (
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
  );
};

export default App;
