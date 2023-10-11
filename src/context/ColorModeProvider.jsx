import { useState, useMemo, createContext } from 'react';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from '../theme';

export const ColorModeContext = createContext({
  mode: 'light',
  colorMode: {},
  theme: themeSettings('light'), // default theme is light mode theme
  toggleColorMode: () => {
    // toggle color mode logic here
  },
});

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');
  console.log('mode', mode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );
  console.log('colorMode', colorMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  console.log('theme', theme);

  const contextValue = {
    mode,
    colorMode,
    theme,
    setMode: (mode) => setMode(mode),
    toggleColorMode: colorMode.toggleColorMode,
  };
  return (
    <ColorModeContext.Provider value={{ contextValue }}>
      {children}
    </ColorModeContext.Provider>
  );
};
