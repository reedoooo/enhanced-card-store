import { Box, Container, Paper } from '@mui/material';
import styled from 'styled-components';
import MDButton from '../../layout/REUSABLE_COMPONENTS/MDBUTTON';

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
