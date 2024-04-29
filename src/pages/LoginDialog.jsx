import React, { useEffect, useState } from 'react';
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
import { useMode } from 'context';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from 'layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import {
  DialogPaper,
  StyledDialog,
  StyledDialogContent,
} from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import RCSwitch from 'components/forms/Factory/RCSwitch';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useDialogState from 'context/hooks/useDialogState';
import useManageCookies from 'context/hooks/useManageCookies';
import { useFormManagement } from 'components/forms/hooks/useFormManagement';
import { formFields } from 'components/forms/formsConfig';
import RCDynamicForm from 'components/forms/Factory/RCDynamicForm';
function LoginDialog() {
  const { theme } = useMode();
  const { getCookie } = useManageCookies();
  const { isLoggedIn } = getCookie(['isLoggedIn']);
  const dialogName = 'isAuthDialogOpen'; // Define a name for the dialog
  const { closeDialog } = useDialogState(); // Adjusted to useDialog
  const { toggleActiveForm, currentSchemaKey } = useFormManagement('loginForm');
  const formTitle = currentSchemaKey === 'loginForm' ? 'Login' : 'Sign Up';
  const signupMode = currentSchemaKey === 'signupForm';
  return (
    <StyledDialog
      className="dialog-login"
      open={isLoggedIn ? false : true}
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
                bgcolor: theme.palette.greenAccent.emerald,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <MDTypography component="h1" variant="h4" color="text">
              {formTitle}
            </MDTypography>
          </MDBox>
          <RCSwitch
            signupMode={signupMode}
            formTitle={formTitle}
            checked={currentSchemaKey === 'signupForm'}
            onChange={() => toggleActiveForm('loginForm', 'signupForm')}
            // onChange={handleToggle}
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
  );
}

export default LoginDialog;
