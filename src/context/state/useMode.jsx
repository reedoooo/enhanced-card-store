import { ColorModeContext } from 'context/ColorModeProvider';
import { useContext } from 'react';

const useMode = () => {
  const { mode, colorMode, theme, toggleColorMode } =
    useContext(ColorModeContext);

  return { mode, colorMode, theme, toggleColorMode };
};

export default useMode;
