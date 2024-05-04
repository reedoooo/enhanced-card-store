import React from 'react';
import { CssBaseline, Box, Typography, Card } from '@mui/material';
import SplashPage2 from 'layout/REUSABLE_COMPONENTS/system-utils/SplashPage2';
import LoginDialog from './LoginDialog'; // Import the LoginDialog component
import useManageCookies from 'context/hooks/useManageCookies';
import { ThemeProvider } from '@mui/material/styles';
import { useMode } from 'context';
import styled from 'styled-components';

const StyledInfoPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.borders.borderRadius.md,
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
        {!isLoggedIn && (
          <>
            <LoginDialog />
          </>
        )}
      </Box>
    </Card>
  );
};

export default LoginPage;
