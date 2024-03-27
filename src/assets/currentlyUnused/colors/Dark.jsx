import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
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
      300: '#9e9e9e',
    },
    common: {
      white: '#ffffff',
      black: '#000000',
    },
    text: {
      primary: '#fafafa',
    },
    background: {
      paper: '#424242',
    },
  },
});

export default darkTheme;
