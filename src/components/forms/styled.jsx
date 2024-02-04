import styled from 'styled-components';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Paper,
  TextField,
} from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    display: 'flex',
    backgroundColor: theme.palette.backgroundB.lightest, // Choose a subtle color
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[5],
    '@media (max-width:600px)': {
      margin: theme.spacing(2),
    },
  },
  '& .MuiDialog-paperScrollPaper': {
    maxHeight: '90vh', // Slightly more space
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.backgroundA.lightest,
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
// FORM STYLES
export const FormWrapper = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  margin: 'auto',
  alignItems: 'center',
  backgroundColor: theme.palette.backgroundA.light,
  borderRadius: theme.shape.borderRadius,
}));

export const StyledFormPaper = styled(Paper)(({ theme }) => ({
  width: '100%',

  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: 4,
  margin: 'auto',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[9],
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.backgroundA.default,
  color: theme.palette.backgroundA.contrastTextB,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.backgroundA.darkest,
    color: theme.palette.backgroundA.contrastTextA,
  },
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

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(3),
  minHeight: '100%',
  // backgroundColor: theme.palette.backgroundA.lightest,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.backgroundA.dark, // Or any other appropriate color
  color: theme.palette.backgroundA.contrastTextA,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`, // Only round the top corners
  '& .MuiTypography-root': {
    fontWeight: 'bold',
  },
  '& .MuiIconButton-root': {
    color: theme.palette.backgroundA.contrastTextA, // Ensure it stands out or matches
  },
}));
