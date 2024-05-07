// App.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'App';

// Mocking modules and context
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
jest.mock('context', () => ({
  useManageCookies: () => ({
    getCookie: jest.fn().mockReturnValue({ authUser: null, isLoggedIn: false }),
  }),
}));
jest.mock('context', () => ({
  useMode: () => ({ theme: {} }),
}));
jest.mock('context', () => ({
  useAuthManager: () => ({
    logout: jest.fn(),
  }),
}));
jest.mock('context', () => ({
  useConfigurator: () => ({
    isConfiguratorOpen: false,
  }),
}));
jest.mock('layout/dialogs/LoginDialog', () => () => <div>LoginDialog</div>);
jest.mock('layout/navigation', () => () => <div>Navigation</div>);
jest.mock('layout/REUSABLE_COMPONENTS/Configurator', () => () => (
  <div>Configurator</div>
));
jest.mock('layout/REUSABLE_COMPONENTS', () => () => (
  <div>LoadingOverlay</div>
));
jest.mock('layout/REUSABLE_COMPONENTS', () => () => (
  <div>PageLayout</div>
));

// Helper to wrap component with router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('App Component', () => {
  it('should redirect to login if not authenticated', async () => {
    renderWithRouter(<App />);
    await waitFor(() =>
      expect(screen.getByText('LoginDialog')).toBeInTheDocument()
    );
  });

  it('should display the navigation and page layout', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('PageLayout')).toBeInTheDocument();
  });

  // Add more tests as needed for different scenarios
});
