import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const PieChartStats = ({ classes, chartData }) => (
  <Grid item xs={12} sm={4}>
    <Paper className={classes.statisticPaper}>
      <Typography variant="h6" className={classes.statisticHeader}>
        Collection Statistics
      </Typography>
      <Box className={classes.statisticsContent}>
        <PieChart series={[{ data: chartData }]} width={200} height={150} />
      </Box>{' '}
    </Paper>
  </Grid>
);

export default PieChartStats;
