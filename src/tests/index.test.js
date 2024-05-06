import React from 'react';
import { render } from '@testing-library/react';
import Index from '../indexjs';
test('renders without crashing', () => {
  render(<Index />);
});
