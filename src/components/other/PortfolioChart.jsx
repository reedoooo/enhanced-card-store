// PortfolioChart.js
import React from 'react';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LinearChart from './LinearChart';

const useStyles = makeStyles((theme) => ({
  chartPaper: {
    borderRadius: '12px',
    width: '100%',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    backgroundColor: '#ffffff',
    color: '#333',
    position: 'relative', // Added position relative
  },
  noDataText: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
}));

const PortfolioChart = ({ data, xAxisLabel, yAxisLabel, selectedCards }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sx={{ height: '70%' }}>
      <Paper elevation={3} className={classes.chartPaper}>
        {data ? (
          <>
            <LinearChart
              keyValue={JSON.stringify(data)} // Add a unique key based on data
              data={data}
              xAxisLabel={xAxisLabel}
              yAxisLabel={yAxisLabel}
              selectedCards={selectedCards}
            />
          </>
        ) : (
          <p className={classes.noDataText}>No data available</p>
        )}
      </Paper>
    </Grid>
  );
};

export default PortfolioChart;
