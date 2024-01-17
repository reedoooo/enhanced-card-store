import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { useMode } from '../../../context';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.backgroundA.lightest,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const StatisticHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.backgroundA.dark,
  marginBottom: theme.spacing(1),
}));

const StatisticValue = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2rem',
  color: theme.palette.backgroundA.lighter,
}));

const TotalValueOfCollectionsDisplay = ({ totalValue }) => {
  const { theme } = useMode();

  const renderValue = () => {
    if (totalValue == null) {
      // Checks if totalValue is null or undefined
      return <Skeleton variant="text" width={200} height={60} />;
    }
    return `$${totalValue.toFixed(2)}`;
  };

  return (
    <Grid item xs={12} sm={4}>
      <StyledPaper theme={theme} sx={{ height: '100%', alignItems: 'center' }}>
        <StatisticHeader variant="h6" theme={theme}>
          Total Value of Collections
        </StatisticHeader>
        <Box sx={{ height: '100%' }}>
          <StatisticValue variant="h2" theme={theme}>
            {renderValue()}
          </StatisticValue>
        </Box>
      </StyledPaper>
    </Grid>
  );
};

export default TotalValueOfCollectionsDisplay;
