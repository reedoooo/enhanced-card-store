import {
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  Paper,
  TextField,
} from '@mui/material';
import styled from 'styled-components';

// ! BOX STYLES
const StyledContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.borders.borderRadius.md,
  background:
    'linear-gradient(90deg, rgba(13, 93, 150, 0.3) 0%, rgba(160, 214, 186, 0.3) 100%)',
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
const StyledPaper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
  mx: 'auto',
  padding: '1rem',
  background: theme.palette.grey.clearGrey,
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  mx: 'auto',
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.2)', // Adjust for desired translucency
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out',
  borderRadius: '20px',
  flexGrow: 1, // Make FormBox grow to fill the space
  overflow: 'hidden', // Hide unwanted scrollbars
}));
const FormFieldBox = styled(Box)(({ theme }) => ({
  m: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexGrow: 1, // Ensure fields take available space
  marginBottom: theme.spacing(2),
}));

// ! DIALOG STYLES
const StyledDialog = styled(Dialog)(({ theme }) => ({
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: 0,
  background: theme.palette.grey.clearGrey,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
  '& .MuiDialog-paper': {
    borderRadius: theme.borders.borderRadius.md,
    padding: theme.spacing(8),
    display: 'flex',
    width: '100%',
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
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
}));

// ! CONTAIINER STYLES
const ChartArea = styled(Container)(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'relative',
  flexGrow: 1,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.borders.borderRadius.md,
  background: '#e0e0e0',
}));

// ! FORMS / INPUT STYLES
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  backgroundColor: theme.palette.success.contrastText, // Adjusted for a slight contrast
  borderRadius: theme.borders.borderRadius.md,
  boxShadow: theme.shadows[1], // Subtle shadow for depth
  '& .MuiFilledInput-root': {
    borderRadius: theme.borders.borderRadius.md,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.success.contrastText,
      borderColor: theme.palette.success.main_light,
    },
  },
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    position: 'relative',
    transition: 'border-color 0.5s ease', // Add transition for border color
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.transparent.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      color: theme.palette.success.dark,
      borderColor: theme.palette.success.dark,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.success.dark,
      borderWidth: '2px', // or other width as you like
    },
  },
  borderRadius: theme.borders.borderRadius.md,
  color: theme.palette.success.darkest,
  width: '100%',
  backgroundColor: theme.palette.success.contrastText,
  boxShadow: `0px 2px 4px -1px ${theme.palette.grey[400]}`,
  marginBottom: theme.spacing(2),
}));

// ! CARD STYLES
const StyledSkeletonCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  maxWidth: '100%',
  width: '100%',
  height: '100%',
  minHeight: 100,
  alignItems: 'center',
  flexGrow: 1,
  maxHeight: '14vh',
  backgroundColor: theme.palette.success.contrastText,
  borderRadius: theme.borders.borderRadius.md,
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));
const FeatureCard = styled(Card)(({ theme }) => ({
  background: theme.palette.success.main_lightest,
  boxShadow: theme.shadows[5],
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'box-shadow 0.3s ease-in-out', // smooth transition for shadow
  '&:hover': {
    boxShadow: theme.shadows[15], // more prominent shadow on hover
    transform: 'translateY(-3px)', // slight upward lift
  },
}));
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'left',
  minHeight: '50px', // Adjust based on the size of the text
  border: `1px solid ${theme.palette.grey.lighterSimpleGrey}`,
  borderRadius: theme.borders.borderRadius.md,
  padding: theme.spacing(1), // default padding
}));
const DialogPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 0,
  maxWidth: '100%',
  maxHeight: '100%',
  width: '100%',
  flexGrow: 1,
  margin: '20px auto',
  overflow: 'hidden', // Hide unwanted scrollbars
}));

export {
  StyledContainerBox,
  StyledSkeletonCard,
  StyledPaper,
  FormBox,
  FormFieldBox,
  StyledDialog,
  StyledDialogContent,
  ChartArea,
  StyledFormControl,
  StyledTextField,
  FeatureCard,
  StyledCardContent,
  DialogPaper,
};
