import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
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
      primary: '#333',
    },
    background: {
      paper: '#f5f5f5',
    },
  },
});

export default defaultTheme;
