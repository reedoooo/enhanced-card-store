import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Container from '@mui/material/Container';
import { Alert, AlertTitle } from '@mui/material';
import { useMode } from '../context';

// Styled components with theme utilization
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
}));

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.error.main,
}));

const ErrorIndicator = ({ error }) => {
  const { theme } = useMode();
  return (
    <StyledContainer>
      <StyledPaper elevation={3} theme={theme}>
        <StyledTypography variant="h6">
          <StyledErrorOutlineIcon />
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>Error: {error}</strong>
          </Alert>
        </StyledTypography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default ErrorIndicator;
