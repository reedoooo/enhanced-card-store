// import React from 'react';
// import { Button } from '@mui/material';
// import { useMode } from '../../../context'; // Adjust the import path based on your project structure
// import MDButton from '../../../layout/REUSABLE_COMPONENTS/MDBUTTON';

// const CustomButton = ({
//   text,
//   onClick,
//   variant = 'contained',
//   size = 'large',
//   sx = {},
// }) => {
//   const { theme } = useMode();

//   const defaultStyles = {
//     background: theme.palette.backgroundE.darker,
//     borderColor: theme.palette.backgroundB.darkest,
//     borderWidth: 2,
//     mx: 1,
//     width: '70%',
//     '&:hover': {
//       fontWeight: 'bold',
//       background: theme.palette.backgroundF.dark,
//       borderColor: theme.palette.backgroundB.darkest,
//       border: `1px solid ${theme.palette.backgroundB.darkest}`,
//     },
//     ...sx, // Allow custom styles to override defaults
//   };

//   return (
//     <MDButton
//       variant={variant}
//       size={size}
//       color="primary"
//       sx={defaultStyles}
//       onClick={onClick}
//     >
//       {text}
//     </MDButton>
//   );
// };

// export default CustomButton;
