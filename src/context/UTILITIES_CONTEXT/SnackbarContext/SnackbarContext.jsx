// // CustomSnackbarContext.js
// import React, { createContext, useContext } from 'react';
// import { useSnackbar } from 'notistack';
// import { Box, CircularProgress, Typography } from '@mui/material';

// // Create the context
// const CustomSnackbarContext = createContext();

// // Define a provider component
// export const SnackbarContextProvider = ({ children }) => {
//   const { enqueueSnackbar } = useSnackbar();

//   // Define the showSnackbar function
//   const showSnackbar = (title, subTitle, options = {}) => {
//     const content = (
//       <Box>
//         <Typography variant="body1">{title}</Typography>
//         <Typography variant="caption" sx={{ display: 'block' }}>
//           {subTitle}
//         </Typography>
//       </Box>
//     );

//     enqueueSnackbar(content, {
//       ...options,
//       action: options.persist
//         ? (key) => <CircularProgress size={24} />
//         : undefined,
//     });
//   };

//   // Provide the showSnackbar function to children
//   return (
//     <CustomSnackbarContext.Provider value={{ showSnackbar }}>
//       {children}
//     </CustomSnackbarContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useSnackbarContext = () => {
//   const context = useContext(CustomSnackbarContext);
//   if (context === undefined) {
//     throw new Error(
//       'useCustomSnackbar must be used within a CustomSnackbarProvider'
//     );
//   }
//   return context;
// };
