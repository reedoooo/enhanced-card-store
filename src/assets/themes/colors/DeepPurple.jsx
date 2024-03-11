import { createTheme } from '@mui/material';

const deepPurpleTheme = createTheme({
  palette: {
    primary: {
      light: '#b39ddb',
      main: '#673ab7',
      dark: '#4527a0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
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

export default deepPurpleTheme;
