import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import PrivateRoute from './components/reusable/PrivateRoute';
import LoginDialog from './components/dialogs/LoginDialog';
import { useAuthContext, useConfiguratorContext, useMode } from './context';
import PageLayout from './layout/Containers/PageLayout.jsx';
import Navigation from './layout/navigation/Navigation.jsx';
import LoadingIndicator from './components/reusable/indicators/LoadingIndicator.js';
import Configurator from './layout/REUSABLE_COMPONENTS/Configurator/index.jsx';

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
          <Navigation isLoggedIn={isLoggedIn} isMobileView={isMobileView} />
          {isConfiguratorOpen && <Configurator />}
          <Suspense fallback={<LoadingIndicator />}>
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
        </PageLayout>
      )}
    </>
  );
};

export default Main;
