import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import MDButton from '../REUSABLE_COMPONENTS/MDBUTTON';
import rgba from '../../assets/themes/functions/rgba';

// COLOR PALETTE: #777 - opaque
export const StyledContainerBoxPrimary = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  minWidth: '100%',
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.backgroundB.dark,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
// COLOR PALETTE: #8ec7b6 - opaque
export const StyledContainerBoxSecondary = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.backgroundE.light,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
// COLOR PALETTE: #4cceac - transparent
export const StyledContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.backgroundD.dark,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
// COLOR PALETTE: #4cceac - transparent
export const StyledPaperPrimary = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.backgroundA.lightest,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
}));
// COLOR PALETTE: #333 - transparent
export const StyledPaper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
  mx: 'auto',
  padding: '1rem',
  background: theme.palette.backgroundC.dark,
  // maxWidth: '1200px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
// BUTTON: #4cceac - transparent
// export const StyledButton = styled(MDButton)(({ theme }) => ({
//   // background: theme.palette.backgroundE.darker,
//   // borderColor: theme.palette.backgroundB.darkest,
//   borderWidth: 2,
//   flexGrow: 1,
//   justifySelf: 'bottom',
//   bottom: 0,
//   mx: 1,
//   width: '70%',
//   '&:hover': {
//     // color: theme.palette.backgroundA.contrastTextC,
//     fontWeight: 'bold',
//     background: theme.palette.backgroundF.dark,
//     borderColor: theme.palette.backgroundB.darkest,
//     border: `1px solid ${theme.palette.backgroundB.darkest}`,
//   },
// }));

// ! DIALOG STYLES
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  height: '100%',
  // display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // top: 64,
  // width: 240,
  width: '100%',
  padding: 0,
  background: theme.palette.backgroundC.dark,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
  // mx: 'auto',
  // my: 'auto',
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(8),
    display: 'flex',
    width: '100%',
    // height: '100%',
    minWidth: '380px',
    maxWidth: '600px',
    maxHeight: '90vh',
    mx: 'auto',
    my: 'auto',
    flexGrow: 1,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[5],
    '@media (min-width:380px)': {
      p: 0,
      // maxWidth: '380px',
    },
    '@media (max-width:600px)': {
      margin: theme.spacing(2),
    },
    // '& .MuiDialog-paperScrollPaper': {
    //   maxHeight: '90vh', // Slightly more space
    // },
  },
  '&.MuiDialogActions-root': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const DialogPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // margin: 'auto',
  padding: 0,
  maxWidth: '100%',
  maxHeight: '100%',
  width: '100%',
  // borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  margin: '20px auto',
  overflow: 'hidden', // Hide unwanted scrollbars
}));
export const DialogContentsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  height: '100%',
  width: '100%',
  // minWidth: '500px',
  // borderRadius: theme.shape.borderRadius,
  background: theme.palette.backgroundE.lighter,
  boxShadow: theme.shadows[10],
  transition: 'all 0.3s ease-in-out', // smooth all transitions
  '@media (max-width:600px)': {
    padding: theme.spacing(2),
  },
}));
export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  // backgroundColor: theme.palette.backgroundA.lightest,
}));
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  width: '100%',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.backgroundA.lightest,
}));
export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  mx: 'auto',
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.2)', // Adjust for desired translucency
  backdropFilter: 'blur(20px)',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out',
  borderRadius: '20px',
  flexGrow: 1, // Make FormBox grow to fill the space
  overflow: 'hidden', // Hide unwanted scrollbars
}));
export const FormPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: 8,
  flexGrow: 1,
  width: '100%',
  height: '100%',
  background: theme.palette.backgroundE.lighter,
  borderRadius: '16px',
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'center',
  // width: '100%',
  // mx: 'auto',
  // padding: '1rem',
  // background: theme.palette.backgroundC.dark,
  // // maxWidth: '1200px',
  // borderRadius: '8px',
  // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  // transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
export const FormFieldBox = styled(Box)(({ theme }) => ({
  m: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexGrow: 1, // Ensure fields take available space
  marginBottom: theme.spacing(2),
}));
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    position: 'relative',
    transition: 'border-color 0.5s ease', // Add transition for border color
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.transparent.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      color: theme.palette.backgroundA.darker,
      borderColor: theme.palette.backgroundA.darker,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.backgroundA.darker,
      borderWidth: '2px', // or other width as you like
    },
  },
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.backgroundA.darkest,
  width: '100%',
  backgroundColor: theme.palette.backgroundA.lightest,
  boxShadow: `0px 2px 4px -1px ${theme.palette.grey[400]}`,
  marginBottom: theme.spacing(2),
}));
export const MediaContainer = styled('div')({
  cursor: 'pointer',
  position: 'relative',
});
export const MediaPopover = styled(Popper)({
  pointerEvents: 'none',
  height: 'auto',
  width: 'auto',
  maxWidth: '300px',
  maxHeight: 'auto',
});
export const Media = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  flexGrow: 1,
  alignItems: 'flex-end',
  padding: theme.spacing(0.5),
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

export const AspectRatioBox = styled(Box)(({ theme }) => ({
  width: '100%', // Full width of the parent container
  position: 'relative',
  justifyContent: 'center',
}));
export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'left',
  minHeight: '50px', // Adjust based on the size of the text
  border: `1px solid ${theme.palette.backgroundB.lighter}`,
  borderRadius: theme.shape.borderRadius,
  // Media queries for padding
  padding: theme.spacing(1), // default padding
  // [theme.breakpoints.down('xs')]: {
  //   padding: theme.spacing(1),
  // },
  // [theme.breakpoints.between('sm', 'md')]: {
  //   padding: theme.spacing(1.5),
  // },
  // [theme.breakpoints.up('lg')]: {
  //   padding: theme.spacing(2),
  // },
}));
export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100px',
  // minWidth: '120px', // Adjusted for better responsiveness
  maxWidth: '100%',
  // mx: 3,
  // width: 'auto',
  maxHeight: '100%', // Adjusted for better height management
  // height: 'auto',
  flexGrow: 1,
  backgroundColor: theme.palette.backgroundA.lightest,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  justifyContent: 'center',
  // margin: 'auto',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));
export const QuantityLine = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.primary,
}));
