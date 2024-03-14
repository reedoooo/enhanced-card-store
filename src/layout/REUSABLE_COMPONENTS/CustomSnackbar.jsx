// // CustomSnackbar.js
// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';
// import { useSnackbar } from 'notistack';

// const CustomSnackbar = () => {
//   const { enqueueSnackbar } = useSnackbar();

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

//   return { showSnackbar };
// };

// export default CustomSnackbar;
