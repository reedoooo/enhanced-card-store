import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { useMode } from '../../../context';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const StatisticHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const StatisticValue = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2rem',
  color: theme.palette.secondary.main,
}));

const TotalValueOfCollectionsDisplay = ({ totalValue }) => {
  // const theme = useTheme();
  const { theme } = useMode();

  return (
    <Grid item xs={12} sm={4}>
      <StyledPaper theme={theme} sx={{ height: '100%', alignItems: 'center' }}>
        <StatisticHeader variant="h6" theme={theme}>
          Total Value of Collections
        </StatisticHeader>
        <Box sx={{ height: '100%' }}>
          <StatisticValue variant="h2" theme={theme}>
            ${totalValue.toFixed(2)}
          </StatisticValue>
        </Box>
      </StyledPaper>
    </Grid>
  );
};

export default TotalValueOfCollectionsDisplay;
