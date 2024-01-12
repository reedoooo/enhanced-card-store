import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/styles';

export const AspectRatioBox = styled('div')(({ theme }) => ({
  width: '100%', // Full width of the parent container
  position: 'relative',
  justifyContent: 'center',
}));

// Updated StyledCardContent with proper media queries for padding
export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'left',
  minHeight: '100px', // Adjust based on the size of the text
  border: `1px solid ${theme.palette.background.quaternary}`,
  borderRadius: theme.shape.borderRadius,
  // Media queries for padding
  padding: theme.spacing(1), // default padding
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.between('sm', 'md')]: {
    padding: theme.spacing(1.5),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '120px', // Adjusted for better responsiveness
  maxWidth: '100%',
  width: 'auto',
  maxHeight: '100%', // Adjusted for better height management
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
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
  color: theme.palette.text.secondary,
}));
