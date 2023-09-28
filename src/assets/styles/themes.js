import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Bebas Neue', sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950, // Set md breakpoint to 950px
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    background: {
      default: '#fafafa', // You can set your default background color here
    },
    primary: {
      main: '#1976d2', // Add the main property with the desired color value
      contrastText: '#ffffff', // You can set your contrast text color here
      spacing: 4, // You can set your spacing scale here
    },
  },
  spacing: 4, // You can set your spacing scale here
});

export default theme;
