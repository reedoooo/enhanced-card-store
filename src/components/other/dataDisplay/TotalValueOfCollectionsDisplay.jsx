import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const TotalValueOfCollectionsDisplay = ({ classes, totalValue }) => (
  <Grid item xs={12} sm={4}>
    <Paper className={classes.statisticPaper}>
      <Typography variant="h6" className={classes.statisticHeader}>
        Total Value of Collections
      </Typography>
      <Box className={classes.statisticsContent}>
        <Typography variant="body1" className={classes.statisticValue}>
          ${totalValue.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  </Grid>
);

export default TotalValueOfCollectionsDisplay;
