import { useContext } from 'react';
import { ColorModeContext } from '../ColorModeContext/ColorModeProvider';

export const useMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ColorModeProvider');
  }
  return context;
};
