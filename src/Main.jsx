import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import PrivateRoute from './layout/PrivateRoute.jsx';
import LoginDialog from './components/dialogs/LoginDialog';
import { useAuthContext, useConfiguratorContext, useMode } from './context';
import PageLayout from './layout/REUSABLE_COMPONENTS/PageLayout.jsx';
import Navigation from './layout/navigation/Navigation.jsx';
import LoadingIndicator from './layout/LoadingIndicator.js';
import Configurator from './layout/REUSABLE_COMPONENTS/Configurator/index.jsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingOverlay from './layout/LoadingOverlay.jsx';
import SelectionErrorDialog from './components/dialogs/SelectionErrorDialog.jsx';
import useDialogState from './context/hooks/useDialogState.jsx';
import useSelectedCollection from './context/MAIN_CONTEXT/CollectionContext/useSelectedCollection.jsx';

const ROUTE_CONFIG = [
  { path: '/', componentName: 'HomePage', isPrivate: false },
  { path: '/home', componentName: 'HomePage', isPrivate: false },
  { path: '/deckbuilder', componentName: 'DeckBuilderPage', isPrivate: false },
  { path: '/store', componentName: 'StorePage', isPrivate: false },
  { path: '/cart', componentName: 'CartPage', isPrivate: true },
  { path: '/collection', componentName: 'CollectionPage', isPrivate: true },
  { path: '/profile', componentName: 'ProfilePage', isPrivate: true },
  { path: '/login', componentName: 'LoginPage', isPrivate: false },
  { path: '/signup', componentName: 'SignupPage', isPrivate: false },
  { path: '/about', componentName: 'AboutPage', isPrivate: false },
  { path: '/contact', componentName: 'ContactPage', isPrivate: false },
  { path: '/terms', componentName: 'TermsPage', isPrivate: false },
  { path: '/privacy', componentName: 'PrivacyPage', isPrivate: false },
  { path: '*', componentName: 'NotFoundPage', isPrivate: false },
];

const LazyRoute = ({ componentName, ...rest }) => {
  const Component = lazy(() => import(`./pages/${componentName}`));
  return <Component {...rest} />;
};
const Main = () => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const { isLoggedIn } = useAuthContext();
  const { isConfiguratorOpen, toggleConfigurator } = useConfiguratorContext();
  const { dialogState, openDialog, closeDialog } = useDialogState({});
  const { selectedCollection } = useSelectedCollection();
  return (
    <>
      {!isLoggedIn ? (
        <LoginDialog open={!isLoggedIn} />
      ) : (
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
                  {ROUTE_CONFIG.map(
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
          {dialogState.isSelectionErrorDialogOpen && (
            <SelectionErrorDialog
              open={dialogState.isSelectionErrorDialogOpen}
              onClose={() => closeDialog('isSelectionErrorDialogOpen')}
              selectedValue={selectedCollection?.name}
            />
          )}
        </PageLayout>
      )}
    </>
  );
};

export default Main;
