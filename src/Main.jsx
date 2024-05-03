import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './layout/navigation/PrivateRoute.jsx';
import LoginDialog from './pages/LoginDialog.jsx';
import PageLayout from './layout/REUSABLE_COMPONENTS/layout-utils/PageLayout.jsx';
import Navigation from './layout/navigation/Navigation.jsx';
import Configurator from './layout/REUSABLE_COMPONENTS/Configurator/index.jsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingOverlay from './layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay.jsx';
import useManageCookies from './context/hooks/useManageCookies.jsx';
import { ROUTE_CONFIG } from './data/route-config.jsx';
import { useConfigurator } from 'context/hooks/useConfigurator.jsx';

// ==============================|| MAIN ROUTING ||============================== //

const LazyRoute = ({ componentName, ...rest }) => {
  const Component = lazy(() => import(`./pages/${componentName}`));
  return <Component {...rest} />;
};
const Main = () => {
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

export default Main;
