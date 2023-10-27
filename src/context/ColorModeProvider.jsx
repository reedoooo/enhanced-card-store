import { useState, useMemo, createContext, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { themeSettings } from '../themeSettings';

export const ColorModeContext = createContext({
  mode: 'dark',
  colorMode: {},
  theme: themeSettings('dark'), // default theme is light mode theme

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
});

export const ColorModeProvider = ({ children }) => {
  // Get the mode from the cookie or default to 'dark' if the cookie doesn't exist
  const [cookie, setCookie] = useCookies(['colorMode']);
  const initialMode = cookie['colorMode'] || 'dark';
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    // Set the cookie whenever the mode changes
    setCookie('colorMode', mode, { path: '/' });
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        setCookie('colorMode', newMode); // also set the cookie here for immediate effect
        // Cookies.set('colorMode', newMode, { expires: 365 }); // also set the cookie here for immediate effect
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const contextValue = {
    mode,
    colorMode,
    theme,
    setMode: (newMode) => {
      setMode(newMode);
      setCookie('colorMode', newMode); // also set the cookie here for immediate effect
    },
    toggleColorMode: colorMode.toggleColorMode,
  };

  return (
    <ColorModeContext.Provider value={contextValue}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
