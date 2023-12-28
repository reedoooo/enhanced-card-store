import styled, { keyframes, css } from 'styled-components';
import { Box, Button, Paper, TextField } from '@mui/material';

export const FormWrapper = styled('form')`
  display: 'flex';
  flex-direction: column;
  gap: '20px';
  align-items: center;
  padding: '20px';
  ${'' /* max-width: '400px'; */}
  margin: auto;
`;

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.backgroundA.lighter,
  boxShadow: theme.shadows[5],
  maxWidth: '550px',
  margin: 'auto',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[7],
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.backgroundA.default,
  color: theme.palette.backgroundA.contrastTextB,
  padding: theme.spacing(1.5),
  // fontWeight: 'bold',
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

    // Remove border by default
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },

    // Change border color on hover
    '&:hover .MuiOutlinedInput-notchedOutline': {
      color: theme.palette.backgroundA.darker,
      borderColor: theme.palette.backgroundA.darker,
    },

    // Change border color on focus
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.backgroundA.darker,
      borderWidth: '2px', // or other width as you like
    },
  },
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.backgroundA.darkest,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  // boxShadow: theme.shadows[1],
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
