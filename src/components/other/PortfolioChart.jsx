import React from 'react';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LinearChart from '../collection/LinearChart';

const useStyles = makeStyles((theme) => ({
  chartPaper: {
    background:
      'linear-gradient(45deg, rgba(255,255,255,1) 30%, rgba(204,204,204,1) 100%)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  },
}));

const PortfolioChart = ({ chartData }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sx={{ height: '70%' }}>
      <Paper elevation={3} className={classes.chartPaper}>
        {chartData ? (
          <LinearChart data={chartData} />
        ) : (
          <p>No data available</p>
        )}
      </Paper>
    </Grid>
  );
};

export default PortfolioChart;
