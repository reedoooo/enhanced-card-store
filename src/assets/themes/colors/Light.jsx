import { createTheme } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
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
      paper: '#ffffff',
    },
  },
});

export default lightTheme;
