import { createTheme } from '@mui/material';

const cyanTheme = createTheme({
  palette: {
    primary: {
      light: '#80deea',
      main: '#00bcd4',
      dark: '#00838f',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffab40',
      main: '#ff9100',
      dark: '#ff6d00',
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

export default cyanTheme;
