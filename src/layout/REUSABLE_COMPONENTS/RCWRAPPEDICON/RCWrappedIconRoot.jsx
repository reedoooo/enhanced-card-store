import { Box } from '@mui/material';
import styled from 'styled-components';
import { useMode } from 'context';

export default styled(Box)(({ ownerstate }) => {
  const { theme } = useMode();
  const { palette, functions, borders, boxShadows } = theme;
  const { size, bgColor } = ownerstate;
  const { white, text, transparent, gradients, dark, grey, success, error } =
    palette;
  const { boxShadow, linearGradient, pxToRem, rgba } = functions;
  const backgroundValue = palette[bgColor] ? palette[bgColor].main : white.main;
  let sizeValue = pxToRem(38);
  if (size === 'small') {
    sizeValue = pxToRem(25.4);
  } else if (size === 'large') {
    sizeValue = pxToRem(52);
  }
  let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
  if (size === 'small') {
    paddingValue = pxToRem(4.5);
  } else if (size === 'large') {
    paddingValue = pxToRem(16);
  }
  let colorValue = white.main;
  if (
    bgColor === 'default' ||
    bgColor === 'primary' ||
    bgColor === 'white' ||
    bgColor === 'light' ||
    !palette[bgColor]
  ) {
    colorValue = text.colorPrimary;
  } else if (
    bgColor === 'error' ||
    bgColor === 'dark' ||
    bgColor === 'success' ||
    bgColor === 'secondary' ||
    bgColor === 'info' ||
    bgColor === 'warning'
  ) {
    colorValue = white.main;
  }
  return {
    // !PREVIOUS STYLES
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // NEW STYLES
    width: sizeValue,
    minWidth: sizeValue,
    height: sizeValue,
    minHeight: sizeValue,
    padding: paddingValue,
    background: `${backgroundValue} !important`, // Use !important to override any later conflicting styles
    color: `${colorValue} !important`, // Use !important to override any later conflicting styles

    '& .material-icons': {
      marginTop: 0,
    },

    '&:hover, &:focus, &:active': {
      transform: 'none',
    },
  };
});
// let sizeValue = pxToRem(38);
// if (size === 'small') {
//   sizeValue = pxToRem(25.4);
// } else if (size === 'large') {
//   sizeValue = pxToRem(52);
// }
// let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
// if (size === 'small') {
//   paddingValue = pxToRem(4.5);
// } else if (size === 'large') {
//   paddingValue = pxToRem(16);
// }
// let colorValue = white.main;
// if (
//   bgColor === 'default' ||
//   bgColor === 'primary' ||
//   bgColor === 'white' ||
//   bgColor === 'light' ||
//   !palette[bgColor]
// ) {
//   colorValue = text.colorPrimary;
// } else if (
//   bgColor === 'error' ||
//   bgColor === 'dark' ||
//   bgColor === 'success' ||
//   bgColor === 'secondary' ||
//   bgColor === 'info' ||
//   bgColor === 'warning'
// ) {
//   colorValue = white.main;
// }
// const iconContainerStyles = () => {
//   let sizeValue = pxToRem(38);
//   if (size === 'small') {
//     sizeValue = pxToRem(25.4);
//   } else if (size === 'large') {
//     sizeValue = pxToRem(52);
//   }
//   let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
//   if (size === 'small') {
//     paddingValue = pxToRem(4.5);
//   } else if (size === 'large') {
//     paddingValue = pxToRem(16);
//   }
//   return {
//     width: sizeValue,
//     minWidth: sizeValue,
//     height: sizeValue,
//     minHeight: sizeValue,
//     padding: paddingValue,

//     '& .material-icons': {
//       marginTop: 0,
//     },

//     '&:hover, &:focus, &:active': {
//       transform: 'none',
//     },
//   };
// };
// const iconStyles = () => {
//   // let sizeValue = pxToRem(38);
//   // if (size === 'small') {
//   //   sizeValue = pxToRem(25.4);
//   // } else if (size === 'large') {
//   //   sizeValue = pxToRem(52);
//   // }
//   // let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
//   // if (size === 'small') {
//   //   paddingValue = pxToRem(4.5);
//   // } else if (size === 'large') {
//   //   paddingValue = pxToRem(16);
//   // }
//   // let colorValue = white.main;
//   // if (
//   //   bgColor === 'default' ||
//   //   bgColor === 'primary' ||
//   //   bgColor === 'white' ||
//   //   bgColor === 'light' ||
//   //   !palette[bgColor]
//   // ) {
//   //   colorValue = text.colorPrimary;
//   // } else if (
//   //   bgColor === 'error' ||
//   //   bgColor === 'dark' ||
//   //   bgColor === 'success' ||
//   //   bgColor === 'secondary' ||
//   //   bgColor === 'info' ||
//   //   bgColor === 'warning'
//   // ) {
//   //   colorValue = white.main;
//   // }
//   // return {
//   //   // !PREVIOUS STYLES
//   //   borderRadius: '50%',
//   //   display: 'flex',
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   // NEW STYLES
//   //   width: sizeValue,
//   //   minWidth: sizeValue,
//   //   height: sizeValue,
//   //   minHeight: sizeValue,
//   //   padding: paddingValue,
//   //   background: `${backgroundValue} !important`, // Use !important to override any later conflicting styles
//   //   color: `${colorValue} !important`, // Use !important to override any later conflicting styles

//   //   '& .material-icons': {
//   //     marginTop: 0,
//   //   },

//   //   '&:hover, &:focus, &:active': {
//   //     transform: 'none',
//   //   },
//   // };
// };

// const iconStyles = () => {
//   let sizeValue = pxToRem(38);
//   if (size === 'small') {
//     sizeValue = pxToRem(25.4);
//   } else if (size === 'large') {
//     sizeValue = pxToRem(52);
//   }
//   let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;

//   if (size === 'small') {
//     paddingValue = pxToRem(4.5);
//   } else if (size === 'large') {
//     paddingValue = pxToRem(16);
//   }

//   return {
//     width: sizeValue,
//     minWidth: sizeValue,
//     height: sizeValue,
//     minHeight: sizeValue,
//     padding: paddingValue,

//     '& .material-icons': {
//       marginTop: 0,
//     },

//     '&:hover, &:focus, &:active': {
//       transform: 'none',
//     },
//   };
// };
// return {
// width: sizeValue,
// minWidth: sizeValue,
// height: sizeValue,
// minHeight: sizeValue,
// padding: paddingValue,
// background: `${backgroundValue} !important`, // Use !important to override any later conflicting styles
// color: `${colorValue} !important`, // Use !important to override any later conflicting styles
// !PREV
// borderRadius: '50%',
// display: 'flex',
// alignItems: 'center',
// justifyContent: 'center',
// width: 40,
// height: 40,
// minHeight: '4rem',
// color: color,
// background:
//   color === 'success' ? theme.palette.success.main_light : 'black',
// [theme.breakpoints.down('md')]: {
//   width: 30,
//   height: 30,
// },
// [theme.breakpoints.down('sm')]: {
//   fontSize: '1.2rem',
// },
// [theme.breakpoints.down('xs')]: {
//   fontSize: '1rem',
// },
// };
// });
