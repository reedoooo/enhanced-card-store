import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  TextField,
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
export const StyledButton = styled(MDButton)(({ theme }) => ({
  // background: theme.palette.backgroundE.darker,
  // borderColor: theme.palette.backgroundB.darkest,
  borderWidth: 2,
  flexGrow: 1,
  justifySelf: 'bottom',
  bottom: 0,
  mx: 1,
  width: '70%',
  '&:hover': {
    // color: theme.palette.backgroundA.contrastTextC,
    fontWeight: 'bold',
    background: theme.palette.backgroundF.dark,
    borderColor: theme.palette.backgroundB.darkest,
    border: `1px solid ${theme.palette.backgroundB.darkest}`,
  },
}));

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
