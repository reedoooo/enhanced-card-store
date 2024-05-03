// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import CssBaseline from '@mui/material/CssBaseline';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useMode } from '../context';
// import useManageCookies from '../context/hooks/useManageCookies';
// import SplashPage2 from '../layout/REUSABLE_COMPONENTS/system-utils/SplashPage2';
// import Copyright from 'layout/REUSABLE_COMPONENTS/system-utils/Copyright';

// const defaultTheme = createTheme();

// export default function LoginPage() {
//   const { theme } = useMode();
//   const { getCookie } = useManageCookies();
//   const { authUser, isLoggedIn } = getCookie(['authUser', 'isLoggedIn']);
//   const splashRef = React.useRef(null);
//   React.useEffect(() => {
//     if (splashRef.current) {
//       Object.assign(splashRef.current.style, {
//         position: 'fixed',
//         top: '0',
//         left: '0',
//         width: '100%',
//         height: '100%',
//         zIndex: '-1',
//       });
//     }
//   }, []);
//   const renderSplashPage = () => (
//     <div ref={splashRef}>
//       <SplashPage2 />
//     </div>
//   );
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage:
//               'url(https://source.unsplash.com/random?wallpapers)',
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light'
//                 ? t.palette.grey[50]
//                 : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, background: theme.palette.greenAccent.light }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//             <Copyright sx={{ mt: 5 }} />
//           </Box>
//           {renderSplashPage()}
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }
import React from 'react';
import { CssBaseline, Box, Typography } from '@mui/material';
import SplashPage2 from 'layout/REUSABLE_COMPONENTS/system-utils/SplashPage2';
import LoginDialog from './LoginDialog'; // Import the LoginDialog component
import useManageCookies from 'context/hooks/useManageCookies';
import { ThemeProvider } from '@mui/material/styles';
import { useMode } from 'context';
import styled from 'styled-components';

const StyledInfoPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  marginLeft: theme.spacing(2),
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const GuestInfoPanel = () => {
  const { theme } = useMode();

  return (
    <StyledInfoPanel>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        First Time Here?
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Use the guest account to explore:
      </Typography>
      <Typography variant="body2" color="textPrimary" sx={{ mt: 1 }}>
        Username: <strong>guest</strong>
      </Typography>
      <Typography variant="body2" color="textPrimary">
        Password: <strong>password123</strong>
      </Typography>
    </StyledInfoPanel>
  );
};

const LoginPage = () => {
  const { theme } = useMode(); // Using the theme from MUI's theme provider
  const { getCookie } = useManageCookies();
  const { isLoggedIn } = getCookie(['isLoggedIn']);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <SplashPage2 />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {!isLoggedIn && (
          <>
            <LoginDialog />
            <GuestInfoPanel />
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
