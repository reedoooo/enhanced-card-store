// useMode is a custom hook that returns the current mode and theme.

import { useContext } from 'react';
import { ColorModeContext } from '../ColorModeProvider';

const useMode = () => {
  const { mode, colorMode, theme, toggleColorMode } =
    useContext(ColorModeContext);

  return { mode, colorMode, theme, toggleColorMode };
};

export default useMode;
