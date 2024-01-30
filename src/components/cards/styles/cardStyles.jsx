import {
  Box,
  Button,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '300px',
  minHeight: '300px',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));
export const StyledImage = styled('img')(({ theme }) => ({
  maxHeight: '200px',
  width: '100%',
  objectFit: 'cover',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  minHeight: '40px',
  maxHeight: '60px',
  width: '100%',
}));
export const StyledToolTipBox = styled(Box)(({ theme }) => ({
  width: 'auto',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.backgroundA.lightest,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  alignContent: 'flex-start',
  alignItems: 'flex-start',
  height: '100%',
  maxWidth: 220,
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: '100%',
  },
  '& > img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
export const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  // width: 'auto',
  // border: `1px solid ${theme.palette.divider}`,
  // borderRadius: theme.shape.borderRadius,
  // padding: theme.spacing(2),
  // backgroundColor: theme.palette.backgroundA.lightest,
  // color: theme.palette.text.primary,
  // boxShadow: theme.shadows[3],
  // alignContent: 'flex-start',
  // alignItems: 'flex-start',
  // height: '100%',
  // maxWidth: 220,
  // position: 'relative',
  // '&::before': {
  //   content: '""',
  //   display: 'block',
  //   paddingTop: '100%',
  // },
  // '& > img': {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   objectFit: 'cover',
  // },
}));
export const StyledTooltipTitle = styled('h4')(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  alignContent: 'flex-start',
  alignItems: 'flex-start',
}));

export const StyledDescriptionSpan = styled('span')(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(1),
  flexGrow: 1,
}));

export const StyledAttributeSpan = styled('span')(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(0.5),
}));

export const CardDetailContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0 4px 8px 0 ${theme.palette.shadow}`,
  backgroundColor: theme.palette.backgroundA.lightest,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: `0 6px 12px 0 ${theme.palette.shadow}`,
  },
}));

export const CardDetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const CardIconWrapper = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: theme.spacing(4),
  width: theme.spacing(4),
  borderRadius: '50%',
  backgroundColor: theme.palette.backgroundA.lighter,
  color: theme.palette.backgroundA.contrastTextD,
  '& svg': {
    fontSize: theme.typography.pxToRem(20),
  },
}));

export const CardTitleStyle = styled('span')(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
}));

export const CardValueStyle = styled('span')(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));
// COLLLECTION LIST ITEM
export const StyledCollectionListCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),
  width: '100%',
  flexGrow: 1,
  transition: '0.3s',
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
  },
}));
export const StyledCollectionListCardContent = styled(CardContent)(
  ({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
  })
);
export const StyledStatisticTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
}));

// export const useStyles = makeStyles((theme) => ({
//   card: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100%',
//     maxHeight: '300px', // or any desired max height
//     minHeight: '300px', // make sure it matches max height
//     overflow: 'hidden', // ensures content doesn't spill out
//     borderRadius: theme.spacing(1), // Add border radius for cards
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for cards
//     transition: 'transform 0.2s',
//     '&:hover': {
//       transform: 'scale(1.03)', // Add a slight scale effect on hover
//     },
//   },
//   image: {
//     maxHeight: '200px',
//     width: '100%',
//     objectFit: 'cover', // Ensure the image covers the entire space
//   },
//   text: {
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//   },
//   button: {
//     // maxWidth: '200px',
//     minHeight: '40px',
//     maxHeight: '60px',
//     width: '100%',
//   },
//   content: {
//     transform: 'scale(0.9)', // scales down to 90% of the original size
//     padding: 0,
//   },
//   cardActions: {
//     marginTop: 'auto', // pushes the actions to the bottom
//     display: 'flex',
//     justifyContent: 'center', // centers the buttons
//     width: '100%',
//   },
//   tooltip: {
//     // maxWidth: '75vw', // 75% of the viewport width
//     width: 'auto', // Let the width be automatic
//     border: `1px solid ${theme.palette.divider}`, // Add border
//     borderRadius: theme.shape.borderRadius, // Use theme border radius
//     padding: theme.spacing(2), // Add some padding
//     backgroundColor: theme.palette.backgroundA.lightest, // Use theme background
//     color: theme.palette.text.primary, // Use theme text color
//     boxShadow: theme.shadows[3], // Use theme shadow
//     alignContent: 'flex-start',
//     alignItems: 'flex-start',
//     height: '100%',
//     // Add more styles here for intricate design
//     // You can add background images, gradients, etc.
//     maxWidth: 220,
//     position: 'relative',
//     '&::before': {
//       // Create a pseudo-element to control the aspect ratio
//       content: '""',
//       display: 'block',
//       paddingTop: '100%', // This controls the aspect ratio, 100% for 1:1, 56.25% for 16:9, etc.
//     },
//     '& > img': {
//       // Assuming you are including an image
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover', // This makes sure your image covers the entire content area
//     },
//   },
//   // tooltip: {
//   //   // Define the width or max-width for your tooltip
//   //   maxWidth: 220,
//   //   position: 'relative',
//   //   '&::before': {
//   //     // Create a pseudo-element to control the aspect ratio
//   //     content: '""',
//   //     display: 'block',
//   //     paddingTop: '100%' // This controls the aspect ratio, 100% for 1:1, 56.25% for 16:9, etc.
//   //   },
//   //   '& > img': { // Assuming you are including an image
//   //     position: 'absolute',
//   //     top: 0,
//   //     left: 0,
//   //     width: '100%',
//   //     height: '100%',
//   //     objectFit: 'cover', // This makes sure your image covers the entire content area
//   //   },
//   // Define styles for children components like headers, images, etc.
//   tooltipTitle: {
//     fontWeight: 'bold',
//     marginBottom: theme.spacing(1),
//     alignContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   descriptionSpan: {
//     display: 'block', // Make description appear on a new line
//     marginTop: theme.spacing(1),
//     flexGrow: 1,
//   },
//   attributeSpan: {
//     display: 'block',
//     marginBottom: theme.spacing(0.5),
//   },
// }));

// export const useCardDetailStyles = makeStyles((theme, theme2) => ({
//   cardDetailContainer: {
//     padding: theme.spacing(2),
//     borderRadius: theme.shape.borderRadius,
//     boxShadow: `0 4px 8px 0 ${theme2.palette.shadow}`,
//     backgroundColor: theme.palette.backgroundA.lightest,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: theme.spacing(1),
//     marginBottom: theme.spacing(2),
//     transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//     '&:hover': {
//       transform: 'scale(1.03)',
//       boxShadow: `0 6px 12px 0 ${theme.palette.shadow}`,
//     },
//   },
//   detailRow: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: theme.spacing(2),
//   },
//   iconWrapper: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: theme.spacing(4),
//     width: theme.spacing(4),
//     borderRadius: '50%',
//     backgroundColor: theme.palette.backgroundA.lighter,
//     color: theme.palette.backgroundA.contrastTextD,
//     '& svg': {
//       fontSize: theme.typography.pxToRem(20),
//     },
//   },
//   titleStyle: {
//     fontWeight: 700,
//     color: theme.palette.text.primary,
//     textTransform: 'uppercase',
//   },
//   valueStyle: {
//     fontWeight: 400,
//     color: theme.palette.text.secondary,
//   },
//   divider: {
//     margin: theme.spacing(2, 0),
//   },
// }));
