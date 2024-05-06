import React from 'react';
import { render } from '@testing-library/react';
import App from '../App.js';

test('renders without crashing', () => {
  render(<App />);
});
