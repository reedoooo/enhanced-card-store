import { createTheme } from '@mui/material';

const lightBlueTheme = createTheme({
  palette: {
    primary: {
      light: '#81d4fa',
      main: '#29b6f6',
      dark: '#01579b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#80deea',
      main: '#00bcd4',
      dark: '#00838f',
      contrastText: '#000',
    },
    grey: {
      300: '#e0e0e0',
    },
    common: {
      white: '#ffffff',
      black: '#000000',
    },
    text: {
      primary: '#212121',
    },
    background: {
      paper: '#f5f5f5',
    },
  },
});

export default lightBlueTheme;
