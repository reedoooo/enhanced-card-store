import React from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  CssBaseline,
  DialogTitle,
  Divider,
  FormControlLabel,
  Typography,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import {
  DialogPaper,
  StyledDialog,
  StyledDialogContent,
} from 'layout/REUSABLE_STYLED_COMPONENTS';
import styled from 'styled-components';
import { formFields } from 'data';
import {
  useDialogState,
  useFormManagement,
  useManageCookies,
  useMode,
} from 'context';
import {
  MDBox,
  RCDynamicForm,
  RCSwitch,
  RCTypography,
} from 'layout/REUSABLE_COMPONENTS';

const StyledInfoPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.borders.borderRadius.md,
  boxShadow: theme.shadows[4],
  position: 'absolute',
  right: 15, // Align to the right edge of the parent dialog
  top: 15, // Align to the top of the dialog
  width: 280,
  zIndex: 1500, // Ensure it is above the dialog
}));
const GuestInfoPanel = () => {
  const { theme } = useMode();

  return (
    <StyledInfoPanel theme={theme}>
      <Typography variant="h6" color="textPrimary" gutterBottom theme={theme}>
        First Time Here?
      </Typography>
      <Typography
        variant="body1"
        color={theme.newPalette.text.secondary}
        theme={theme}
      >
        Use the guest account to explore:
      </Typography>
      <Typography
        variant="body2"
        color={theme.newPalette.text.secondary}
        sx={{ mt: 1 }}
        theme={theme}
      >
        Username: <strong>guestUsername</strong>
      </Typography>
      <Typography
        variant="body2"
        color={theme.newPalette.text.secondary}
        theme={theme}
      >
        Password: <strong>password123</strong>
      </Typography>
    </StyledInfoPanel>
  );
};

function LoginDialog() {
  const { theme } = useMode();
  const { getCookie } = useManageCookies();
  const { closeDialog } = useDialogState(); // Adjusted to useDialog
  const { toggleActiveForm, currentSchemaKey } = useFormManagement('loginForm');
  const { isLoggedIn } = getCookie(['isLoggedIn']);
  const formTitle = currentSchemaKey === 'loginForm' ? 'Login' : 'Sign Up';
  const signupMode = currentSchemaKey === 'signupForm';
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CssBaseline theme={theme} />
      <StyledDialog
        className="dialog-login"
        open={isLoggedIn ? false : true}
        onClose={() => closeDialog('isAuthDialogOpen')}
        tbeme={theme}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xl"
      >
        <CssBaseline />
        <DialogPaper theme={theme}>
          <DialogTitle
            id="responsive-dialog-title"
            sx={{
              margin: '0 2rem', // Match the DialogContent's padding but use margin for the title
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 'auto', // Let it naturally fill the space, considering the margins
              boxSizing: 'border-box', // Include padding and borders in the element's total width and height
              color: theme.palette.text.primary,
            }}
          >
            <MDBox sx={{ visibility: 'hidden' }}>
              <Avatar sx={{ m: 1 }}>
                <LockOutlinedIcon />
              </Avatar>
            </MDBox>
            <MDBox
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', // Centers the login icon and title
                border: 'none',
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: theme.palette.success.main_emerald,
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <RCTypography component="h1" variant="h4" color="text">
                {formTitle}
              </RCTypography>
            </MDBox>
            <RCSwitch
              signupMode={signupMode}
              formTitle={formTitle}
              checked={currentSchemaKey === 'signupForm'}
              onChange={() => toggleActiveForm('loginForm', 'signupForm')}
              labelLeft="Login"
              labelRight="Sign Up"
              iconLeft={<LoginIcon />}
              iconRight={<PersonAddIcon />}
            />
          </DialogTitle>
        </DialogPaper>
        <Divider />
        <StyledDialogContent theme={theme} elevation={20}>
          <RCDynamicForm
            formKey={currentSchemaKey}
            inputs={formFields[currentSchemaKey]}
            userInterfaceOptions={{
              submitButton: true,
              submitButtonLabel: signupMode ? 'Sign Up' : 'Login',
              deleteButton: false,
              startIcon: signupMode ? <PersonAddIcon /> : <LoginIcon />,
            }}
            intialData={{}}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
              ReedThaHuman LLC {new Date().getFullYear()}
            </Typography>
          </Box>
        </StyledDialogContent>
      </StyledDialog>
      {!isLoggedIn && <GuestInfoPanel />}
    </Box>
  );
}

export default LoginDialog;
