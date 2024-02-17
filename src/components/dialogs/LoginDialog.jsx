// import React, { useEffect, useState } from 'react';
// import {
//   Avatar,
//   Box,
//   Button,
//   Checkbox,
//   CircularProgress,
//   CssBaseline,
//   DialogContent,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   Link,
//   Paper,
//   Typography,
// } from '@mui/material';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { useFormContext, useMode, usePageContext } from '../../context'; // Adjust import paths as necessary
// import useAuthDialog from '../../context/hooks/useAuthDialog'; // Adjust import paths as necessary
// import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar'; // Adjust import paths as necessary
// import {
//   StyledDialog,
//   StyledDialogActions,
//   StyledDialogContent,
//   StyledDialogTitle,
// } from '../../pages/pageStyles/StyledComponents';
// import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
// import SignupSwitch from '../buttons/other/SignupSwitch';
// import FormField from '../reusable/FormField';
// import MDButton from '../../layout/REUSABLE_COMPONENTS/MDBUTTON';
// import styled from 'styled-components';
// import LoginForm from '../forms/LoginForm';
// import SignupForm from '../forms/SignupForm';
// import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import { CopyrightOutlined } from '@mui/icons-material';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import ImageWithFallback from '../../pages/pageStyles/ImageWithFallback';

// const StyledFormArea = styled(Box)(({ theme }) => ({
//   maxWidth: '100%',
//   borderRadius: theme.shape.borderRadius,
//   padding: theme.spacing(2),
// }));
// function LoginDialog({ showSnackbar }) {
//   const { theme, toggleColorMode, mode } = useMode();
//   const { toggleLoginDialog, isLoggedIn, logout } = useAuthDialog();
//   const { setCurrentForm, currentForm } = useFormContext();
//   // const [currentForm, setCurrentForm] = useState('loginForm');

//   useEffect(() => {
//     if (!isLoggedIn) {
//       toggleLoginDialog();
//     }
//   }, [isLoggedIn, toggleLoginDialog]);

//   const handleLogout = () => {
//     logout();
//     toggleLoginDialog();
//   };
//   const toggleFormType = () =>
//     setCurrentForm((prevForm) =>
//       prevForm === 'loginForm' ? 'signupForm' : 'loginForm'
//     );

//   useEffect(() => {
//     setCurrentForm('loginForm');
//   }, []);

//   return (
//     <StyledDialog
//       open={!isLoggedIn}
//       onClose={toggleLoginDialog}
//       maxWidth="lg"
//       fullWidth
//       theme={theme}
//       sx={{
//         flexGrow: 1,
//       }}
//     >
//       <Grid
//         container
//         component="main"
//         sx={{
//           height: '100vh',
//           backgroundImage: `url(${ImageWithFallback})`,
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//           backgroundSize: 'cover',
//           backgroundColor:
//             theme.palette.type === 'light'
//               ? theme.palette.grey[50]
//               : theme.palette.grey[900],

//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexGrow: 1,
//         }}
//       >
//         <CssBaseline />

//         <Grid
//           item
//           xs={12}
//           sm={8}
//           md={5}
//           component={Paper}
//           elevation={1}
//           square
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexGrow: 1,
//           }}
//         >
//           <MDBox
//             py={2}
//             sx={{
//               flexGrow: 1,
//             }}
//           >
//             {/* <StyledDialogContent theme={theme}> */}
//             <StyledDialogTitle
//               theme={theme}
//               sx={{
//                 flexGrow: 1,
//               }}
//             >
//               <Avatar>
//                 <LockOutlinedIcon />
//               </Avatar>

//               <Box
//                 display="flex"
//                 flexDirection="row"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 width="100%"
//               >
//                 <MDTypography variant="h5" text="primary">
//                   {currentForm === 'loginForm' ? 'Login' : 'Sign Up'}
//                 </MDTypography>
//                 <IconButton onClick={toggleColorMode} color="inherit">
//                   {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//                 </IconButton>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'flex-end',
//                     flexGrow: 1,
//                     mx: 'auto',
//                     alignItems: 'center',
//                     gap: 2,
//                   }}
//                 >
//                   <SignupSwitch
//                     signupMode={currentForm === 'signupForm'}
//                     onToggle={toggleFormType}
//                   />
//                 </Box>
//               </Box>
//             </StyledDialogTitle>
//             {/* </StyledDialogContent> */}
//             <StyledDialogActions theme={theme}>
//               {isLoggedIn ? (
//                 <MDButton
//                   color="primary"
//                   variant="contained"
//                   onClick={handleLogout}
//                   fullWidth
//                 >
//                   Log Out
//                 </MDButton>
//               ) : (
//                 <MDBox
//                   sx={{
//                     maxWidth: '100%',
//                     borderRadius: theme.shape.borderRadius,
//                     width: { xs: '100%', md: '100%' },
//                     padding: theme.spacing(2),
//                   }}
//                 >
//                   <StyledFormArea>
//                     {currentForm === 'signupForm' ? (
//                       <SignupForm />
//                     ) : (
//                       <LoginForm />
//                     )}
//                   </StyledFormArea>
//                   <FormControlLabel
//                     control={<Checkbox value="remember" color="primary" />}
//                     label="Remember me"
//                   />
//                 </MDBox>
//               )}
//             </StyledDialogActions>
//           </MDBox>
//         </Grid>
//         <Grid container>
//           <Grid item>
//             <Link href="#" variant="body2">
//               {"Don't have an account? Sign Up"}
//             </Link>
//           </Grid>
//         </Grid>
//         <Box mt={5}>
//           <CopyrightOutlined />
//         </Box>
//       </Grid>
//     </StyledDialog>
//   );
// }

// export default withDynamicSnackbar(LoginDialog);
import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Paper,
  Switch,
  Typography,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar'; // Adjust import paths as necessary
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';
import { StyledDialog } from '../../pages/pageStyles/StyledComponents';
import { useFormContext, useMode } from '../../context';
import useAuthDialog from '../../context/hooks/useAuthDialog'; // Adjust import paths as necessary
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

function LoginDialog({ showSnackbar }) {
  const { theme, toggleColorMode, mode } = useMode();
  const { toggleLoginDialog, isLoggedIn, logout } = useAuthDialog();
  const { currentForm, setCurrentForm } = useFormContext();

  // EFFECT: If the user is not logged in, open the login dialog
  useEffect(() => {
    if (!isLoggedIn) {
      toggleLoginDialog();
    }
  }, [isLoggedIn, toggleLoginDialog]);
  // EFFECT: Set the current form to 'loginForm' when the component mounts
  useEffect(() => {
    setCurrentForm('loginForm');
  }, [setCurrentForm]);
  // HANDLE: Logout the user and close the login dialog
  const handleLogout = () => {
    logout();
    toggleLoginDialog();
  };

  const toggleAuthMode = () =>
    setCurrentForm((prevForm) =>
      prevForm === 'loginForm' ? 'signupForm' : 'loginForm'
    );

  const signupMode = currentForm === 'signupForm';

  const formLabel = () => {
    <MDTypography variant="h6" color="primary">
      {currentForm === 'loginForm' ? 'Sign Up' : 'Login'}
    </MDTypography>;
  };
  return (
    <StyledDialog
      open={!isLoggedIn}
      onClose={toggleLoginDialog}
      maxWidth="xl"
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
        background: theme.palette.backgroundE.light,
      }}
    >
      <Grid
        container
        component="main"
        sx={{ height: '100vh', flexGrow: 1, width: '100%' }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 8,
              flexGrow: 1,
              width: '100%',
              height: '100%',
              background: theme.palette.backgroundE.lighter,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              minWidth={'30vw'}
            >
              <Avatar sx={{ m: 1, bgcolor: theme.palette.backgroundE.darker }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {currentForm === 'loginForm' ? 'Login' : 'Sign Up'}
              </Typography>
              <IconButton
                onClick={toggleColorMode}
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <MDBox
                sx={{
                  display: 'flex',
                  // justifyContent: 'flex-end',
                  flexGrow: 1,
                  // mx: 'auto'
                  m: theme.spacing(2),
                  width: '100%',
                  minWidth: '100%',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {currentForm === 'loginForm' ? (
                  <LoginForm
                    toggleAuthMode={toggleAuthMode}
                    signupMode={signupMode}
                    formLabel={formLabel}
                  />
                ) : (
                  <SignupForm
                    toggleAuthMode={toggleAuthMode}
                    signupMode={signupMode}
                    formLabel={formLabel}
                  />
                )}
              </MDBox>
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
              <Grid container>
                <Grid item></Grid>
              </Grid>
              <Box mt={5}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {'Copyright © '}
                  ReedThaHuman LLC {new Date().getFullYear()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </StyledDialog>
  );
}

export default withDynamicSnackbar(LoginDialog);
