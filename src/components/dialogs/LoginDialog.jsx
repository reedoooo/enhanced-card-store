import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthContext, useFormContext, useMode } from '../../context';
import useAuthDialog from '../../context/hooks/useAuthDialog'; // Adjust import paths as necessary
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import {
  DialogPaper,
  StyledDialog,
  StyledDialogContent,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import MDAvatar from '../../assets/currentlyUnused/MDAVATAR';
import RCSwitch from '../forms/reusable/RCSwitch';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AuthForm from '../forms/AuthForm';
import useDialog from '../../context/hooks/useDialog';
function LoginDialog() {
  const { theme, toggleColorMode, mode } = useMode();
  const { isLoggedIn, logout } = useAuthContext();
  const dialogName = 'loginDialog'; // Define a name for the dialog
  const { openDialog, closeDialog, isDialogOpen } = useDialog(); // Adjusted to useDialog
  const [checked, setChecked] = useState(false);
  // const { currentForm, setFormSchema } = useFormContext();
  const { formMethods, onSubmit, setFormSchema, currentSchemaKey } =
    useFormContext();

  // EFFECT: If the user is not logged in, open the login dialog
  useEffect(() => {
    if (!isLoggedIn) {
      openDialog(dialogName);
    }
  }, [isLoggedIn, openDialog]);
  // EFFECT: Set the current form to 'loginForm' when the component mounts
  useEffect(() => {
    setFormSchema('loginForm');
  }, [setFormSchema]);
  // HANDLE: Logout the user and close the login dialog
  const handleLogout = () => {
    logout();
    closeDialog(dialogName);
  };
  // HANDLE: Open the register dialog and close the login dialog
  const handleToggle = () => {
    setFormSchema(
      currentSchemaKey === 'loginForm' ? 'signupForm' : 'loginForm'
    );
    setChecked(!checked);
  };
  const formTitle = currentSchemaKey === 'loginForm' ? 'Login' : 'Sign Up';

  const signupMode = currentSchemaKey === 'signupForm';
  const formLabel = () => {
    <MDTypography variant="h6" color="primary">
      {currentSchemaKey === 'loginForm' ? 'Sign Up' : 'Login'}
    </MDTypography>;
  };
  return (
    <StyledDialog
      className="dialog-login"
      open={!isLoggedIn}
      onClose={() => closeDialog(dialogName)}
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
                bgcolor: theme.palette.backgroundG.light,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <MDTypography component="h1" variant="h4" color="text">
              {formTitle}
            </MDTypography>
          </MDBox>
          {/* <AuthSwitch signupMode={currentSchemaKey !== 'loginForm'} /> */}
          <RCSwitch
            signupMode={signupMode}
            formTitle={formTitle}
            checked={currentSchemaKey === 'signupForm'}
            onChange={handleToggle}
            labelLeft="Login"
            labelRight="Sign Up"
            iconLeft={<LoginIcon />}
            iconRight={<PersonAddIcon />}
          />
        </DialogTitle>
      </DialogPaper>

      <Divider />
      <StyledDialogContent theme={theme} elevation={20}>
        <AuthForm formType={currentSchemaKey} />
        {/* {currentSchemaKey === 'loginForm' ? (
          <AuthForm formType={currentSchemaKey} />
        ) : (
          <SignupForm signupMode={signupMode} formLabel={formLabel} />
        )} */}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {isLoggedIn && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        )}
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            ReedThaHuman LLC {new Date().getFullYear()}
          </Typography>
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  );
}

export default LoginDialog;
