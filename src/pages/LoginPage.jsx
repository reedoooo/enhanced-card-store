import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginForm from '../assets/currentlyUnused/LoginForm';
import { useMode } from '../context';
import { Navigate, useNavigate } from 'react-router-dom';
import useManageCookies from '../context/hooks/useManageCookies';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="www.reedvogt.com">
        Enhanced Card Store
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();

  const { theme } = useMode();
  const { addCookies, getCookie, deleteCookies } = useManageCookies();
  const { authUser, isLoggedIn } = getCookie(['authUser', 'isLoggedIn']);
  const previousIsLoggedIn = React.useRef(isLoggedIn);

  // React.useEffect(() => {
  //   // Check if isLoggedIn status has changed
  //   if (isLoggedIn && !previousIsLoggedIn.current) {
  //     // User just logged in
  //     navigate('/');
  //   } else if (!isLoggedIn && previousIsLoggedIn.current) {
  //     // User just logged out
  //     navigate('/login');
  //   }
  //   // Update the ref to the current isLoggedIn status
  //   previousIsLoggedIn.current = isLoggedIn;
  // }, [isLoggedIn, navigate]);

  // if (isLoggedIn) return null; // Don't render anything if already logged in

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, background: theme.palette.greenAccent.light }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <LoginForm />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
