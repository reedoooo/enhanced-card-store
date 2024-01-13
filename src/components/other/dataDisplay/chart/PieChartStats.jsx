import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { useMode } from '../../../../context';
import { PieChart } from '@mui/x-charts';

// Define styled components
const StatisticPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
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

const PieChartStats = ({ chartData }) => {
  const { theme } = useMode();

  return (
    <Grid item xs={12} sm={4}>
      <StatisticPaper theme={theme}>
        <StatisticHeader variant="h6" theme={theme}>
          Collection Statistics
        </StatisticHeader>
        <Box>
          <PieChart
            series={[{ data: chartData }]}
            width={200}
            height={150}
            theme={theme}
          />
        </Box>
      </StatisticPaper>
    </Grid>
  );
};

export default PieChartStats;
