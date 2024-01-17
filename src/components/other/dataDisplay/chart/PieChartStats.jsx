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
import { useMode } from '../../../../context';
import { PieChart } from '@mui/x-charts';

// Define styled components
const StatisticPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
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

const PieChartStats = ({ chartData }) => {
  const { theme } = useMode();

  const isChartDataValid =
    chartData && chartData.some((entry) => entry.value != null);

  const renderChart = () => {
    if (!isChartDataValid) {
      // Render a skeleton or placeholder if chartData is not available
      return <Skeleton variant="rectangular" width={'100%'} height={150} />;
    }
    // Render PieChart if chartData is available
    return (
      <PieChart
        series={[{ data: chartData }]}
        width={200}
        height={150}
        theme={theme}
      />
    );
  };

  return (
    <Grid item xs={12} sm={4}>
      <StatisticPaper theme={theme}>
        <StatisticHeader variant="h6" theme={theme}>
          Collection Statistics
        </StatisticHeader>
        <Box>{renderChart()}</Box>
      </StatisticPaper>
    </Grid>
  );
};

export default PieChartStats;
