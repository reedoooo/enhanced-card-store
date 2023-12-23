import styled, { keyframes, css } from 'styled-components';
import { Button, Paper, TextField } from '@mui/material';

export const FormWrapper = styled('form')`
  display: 'flex';
  flex-direction: column;
  gap: '20px';
  max-width: '400px';
  margin: auto;
`;

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.success.lighter,
  boxShadow: theme.shadows[5],
  maxWidth: '550px',
  margin: 'auto',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[7],
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.lightish,
  color: theme.palette.background.dark,
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
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
      borderColor: theme.palette.primary.light,
    },

    // Change border color on focus
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px', // or other width as you like
    },
  },
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.success.main,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

// Define simple expand animations
const expandWidth = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const expandHeight = keyframes`
  from { height: 0%; }
  to { height: 100%; }
`;

export const StyledBorderContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    backgroundColor: theme.palette.primary.light,
    zIndex: 1,
    transition: 'all 0.5s ease',
  },
  '&:before': {
    top: 0,
    left: 0,
    height: '2px',
    animation: css`
      ${expandWidth} 0.5s ease forwards
    `,
  },
  '&:after': {
    bottom: 0,
    right: 0,
    height: '2px',
    animation: css`
      ${expandWidth} 0.5s 1.5s ease forwards
    `,
  },
  '&::before': {
    width: '2px',
    top: 0,
    animation: css`
      ${expandHeight} 0.5s 0.5s ease forwards
    `,
  },
  '&::after': {
    width: '2px',
    bottom: 0,
    animation: css`
      ${expandHeight} 0.5s 2s ease forwards
    `,
  },
}));
