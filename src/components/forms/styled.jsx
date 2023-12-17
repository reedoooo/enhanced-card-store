import styled from 'styled-components';
import { Button, Paper, TextField } from '@mui/material';

export const FormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: auto;
`;

// export const StyledTextField = styled(TextField)`
//   && {
//     margin-bottom: 12px;
//     width: 100%; // Ensures that the text fields take the full width
//   }
// `;

// export const StyledButton = styled(Button)`
//   && {
//     margin-top: 16px;
//   }
// `;

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.success.lighter, // Adjusted for better contrast
  boxShadow: theme.shadows[5],
  maxWidth: 550, // Increased for better layout
  margin: 'auto',
  transition: 'box-shadow 0.3s ease-in-out',

  '&:hover': {
    boxShadow: theme.shadows[7], // Slightly deeper shadow on hover
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.lightish, // Changed to secondary for better visual appeal
  color: theme.palette.background.dark,
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  // textShadow: '1px 1px 1px rgba(0,0,0,0.25)',
  marginTop: theme.spacing(2), // Added margin-top for spacing

  '&:hover': {
    backgroundColor: theme.palette.secondary.dark, // Darker shade on hover
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper, // Adjusted for better contrast
  boxShadow: theme.shadows[1],
  '& .MuiOutlinedInput-root': {
    position: 'relative',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 0,
    },
    '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused::before, &.Mui-focused::after':
      {
        content: '""',
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: theme.palette.primary.main,
      },
    '&.Mui-focused::before': {
      left: 0,
      top: 0,
      bottom: 0,
      width: '2px',
      animation: 'left-border-animation 0.25s forwards',
    },
    '&.Mui-focused::after': {
      right: 0,
      top: 0,
      bottom: 0,
      width: '2px',
      animation: 'right-border-animation 0.25s 0.25s forwards',
    },
    // eslint-disable-next-line no-dupe-keys
    '&.Mui-focused::before': {
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      animation: 'top-border-animation 0.25s 0.5s forwards',
    },
    // eslint-disable-next-line no-dupe-keys
    '&.Mui-focused::after': {
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      animation: 'bottom-border-animation 0.25s 0.75s forwards',
    },
  },
  '@keyframes left-border-animation': {
    '0%': { height: '0%' },
    '100%': { height: '100%' },
  },
  '@keyframes right-border-animation': {
    '0%': { height: '0%' },
    '100%': { height: '100%' },
  },
  '@keyframes top-border-animation': {
    '0%': { width: '0%' },
    '100%': { width: '100%' },
  },
  '@keyframes bottom-border-animation': {
    '0%': { width: '0%' },
    '100%': { width: '100%' },
  },
}));
