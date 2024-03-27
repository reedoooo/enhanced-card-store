import { createTheme } from '@mui/material';

const indigoTheme = createTheme({
  palette: {
    primary: {
      light: '#9fa8da',
      main: '#3f51b5',
      dark: '#283593',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
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

export default indigoTheme;
