import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './layout/navigation/PrivateRoute.jsx';
import LoginDialog from './pages/LoginDialog.jsx';
import { useConfiguratorContext, useMode } from './context';
import PageLayout from './layout/REUSABLE_COMPONENTS/PageLayout.jsx';
import Navigation from './layout/navigation/Navigation.jsx';
import Configurator from './layout/REUSABLE_COMPONENTS/Configurator/index.jsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingOverlay from './layout/REUSABLE_COMPONENTS/LoadingOverlay.jsx';
import SelectionErrorDialog from './components/dialogs/SelectionErrorDialog.jsx';
import useDialogState from './context/hooks/useDialogState.jsx';
import useManageCookies from './context/hooks/useManageCookies.jsx';
import { ROUTE_CONFIG } from './data/route-config.jsx';

const LazyRoute = ({ componentName, ...rest }) => {
  const Component = lazy(() => import(`./pages/${componentName}`));
  return <Component {...rest} />;
};
const Main = () => {
  const { addCookie, getCookie, deleteCookie } = useManageCookies();
  const { isLoggedIn, userId } = getCookie(['isLoggedIn', 'userId']);
  const { isConfiguratorOpen, toggleConfigurator } = useConfiguratorContext();
  const { dialogState, openDialog, closeDialog } = useDialogState();
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
              {ROUTE_CONFIG.map(({ path, componentName, isPrivate }, index) => (
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
              ))}
            </Routes>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
      <LoginDialog />
      <SelectionErrorDialog
        open={dialogState.isSelectionErrorDialogOpen}
        onClose={() => closeDialog('isSelectionErrorDialogOpen')}
        // selectedValue={selectedCollection?.name}
      />
    </PageLayout>
  );
};

export default Main;
