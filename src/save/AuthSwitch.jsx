// import React from 'react';
// import { renderToStaticMarkup } from 'react-dom/server';

// import { Switch, FormControlLabel, FormControl, alpha } from '@mui/material';
// import { useFormContext, useMode } from '../../../context'; // Adjust with actual path
// import { AuthModeSwitch } from '../../../layout/REUSABLE_STYLED_COMPONENTS/SpecificStyledComponents';
// import LoginIcon from '@mui/icons-material/Login';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import styled from 'styled-components';
// import { useCookies } from 'react-cookie';
// const convertSvg = (svg) => {
//   const markup = renderToStaticMarkup(svg);
//   const encoded = encodeURIComponent(markup);
//   const dataUri = `url('data:image/svg+xml;utf8,${encoded}')`;
//   return dataUri;
// };
// const AuthSwitch = () => {
//   // const AuthSwitch = ({ signupMode, formLabel }) => {
//   const { theme } = useMode(); // Ensures theme is applied correctly
//   // const colors = theme;
//   const colors = theme.palette.chartTheme;
//   const cookies = useCookies('colorMode');
//   const mode = cookies.colorMode;

//   const primary = colors.primary.default;
//   const blue = colors.blueAccent.default;
//   const green = colors.greenAccent.light;
//   const lihhtgreen = colors.greenAccent.default;
//   const greenliht = colors.greenAccent.light;
//   const lightgrey = colors.grey.light;
//   const darkgrey = colors.grey.dark;
//   const darkestgrey = colors.grey.darkest;

//   const { currentSchemaKey, toggleForm } = useFormContext(); // Use toggleForm for toggling modes
//   const signupMode = currentSchemaKey === 'signupForm';
//   const handleToggle = () => {
//     toggleForm(currentSchemaKey === 'loginForm' ? 'signupForm' : 'loginForm');
//   };
//   const switchBaseStyles = {
//     '& .MuiSwitch-switchBase': {
//       padding: 1, // Center the switch base padding for proper alignment
//       '&.Mui-checked': {
//         transform: 'translateX(16px)', // Ensure this aligns with your switch size
//         color: theme.palette.common.white, // Thumb color when checked
//         '& + .MuiSwitch-track': {
//           backgroundColor: theme.palette.primary.main, // Track color when checked
//         },
//       },
//     },
//   };
//   const thumbStyles = {
//     '& .MuiSwitch-thumb': {
//       width: 22, // Adjust thumb size for better visual alignment
//       height: 22, // Adjust thumb size for better visual alignment
//       backgroundColor: mode === 'dark' ? green : lihhtgreen,
//       // backgroundColor: theme.palette.common.white, // Default thumb color

//       '&:before': {
//         content: '" "',
//         display: 'block',
//         backgroundImage: signupMode
//           ? convertSvg(<PersonAddIcon />)
//           : convertSvg(<LoginIcon />),
//         width: '100%',
//         height: '100%',
//         backgroundSize: '50%',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       },
//       // '&:after': {
//       //   right: 12, // Adjust the right icon position
//       //   backgroundImage: convertSvg(<PersonAddIcon />),
//       // },
//     },
//   };
//   const trackStyles = {
//     '& .MuiSwitch-track': {
//       backgroundColor: theme.palette.chartTheme.grey.light, // Default track color
//       opacity: 1,
//       width: 50, // Adjust thumb size for better visual alignment
//       height: 14, // Adjust thumb size for better visual alignment
//       // '&:before, &:after': {
//       //   content: '""',
//       //   position: 'absolute',
//       //   top: '50%',
//       //   transform: 'translateY(-50%)',
//       // },
//       // '&:before': {
//       //   left: 12, // Adjust the left icon position
//       //   backgroundImage: convertSvg(<LoginIcon />),
//       // },
//       // '&:after': {
//       //   right: 12, // Adjust the right icon position
//       //   backgroundImage: convertSvg(<PersonAddIcon />),
//       // },
//     },
//   };
//   const switchStyles = {
//     ...switchBaseStyles,
//     ...thumbStyles,
//     ...trackStyles,
//     // backgroundImage: convertSvg(<LoginIcon />),
//     // right: 2,
//   };

//   return (
//     <FormControl
//       component="fieldset"
//       sx={{
//         alignItems: 'center',
//       }}
//     >
//       <FormControlLabel
//         control={
//           <Switch
//             checked={signupMode}
//             onChange={handleToggle}
//             sx={switchStyles}
//           />
//         }
//         label={signupMode ? 'Sign Up' : 'Log In'}
//         style={{ margin: 'auto', justifyContent: 'center' }} // Center label and switch
//       />
//     </FormControl>
//   );
// };

// export default AuthSwitch;
