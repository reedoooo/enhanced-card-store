import { render, fireEvent } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from './settings';
import React from 'react';

// Mock component to test SettingsProvider
const MockComponent = () => {
  const settings = React.useContext(SettingsContext);
  return (
    <div>
      <span>{settings.itemsPerPage}</span>
      <button onClick={() => settings.setItemsPerPage(5)}>
        Set Items Per Page
      </button>
    </div>
  );
};

describe('SettingsProvider', () => {
  it('provides settings context with default values', () => {
    const { getByText } = render(
      <SettingsProvider>
        <MockComponent />
      </SettingsProvider>
    );

    expect(getByText('3')).toBeInTheDocument(); // Default itemsPerPage is 3
  });

  it('changes itemsPerPage when setItemsPerPage is called', () => {
    const { getByText } = render(
      <SettingsProvider>
        <MockComponent />
      </SettingsProvider>
    );

    fireEvent.click(getByText('Set Items Per Page'));
    expect(getByText('5')).toBeInTheDocument(); // itemsPerPage should be updated to 5
  });

  // Add similar tests for hideCompleted and sortBy
});
