import React from 'react';
import { CssBaseline, Box, Typography, Card } from '@mui/material';
import SplashPage2 from 'layout/REUSABLE_COMPONENTS/utils/system-utils/SplashPage2';
import LoginDialog from './LoginDialog'; // Import the LoginDialog component
import useManageCookies from 'context/hooks/useManageCookies';
import { useMode } from 'context';

const LoginPage = () => {
  const { theme } = useMode(); // Using the theme from MUI's theme provider
  const { getCookie } = useManageCookies();
  const { isLoggedIn } = getCookie(['isLoggedIn']);

  return (
    <Card>
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
        {!isLoggedIn && <LoginDialog />}
      </Box>
    </Card>
  );
};

export default LoginPage;
