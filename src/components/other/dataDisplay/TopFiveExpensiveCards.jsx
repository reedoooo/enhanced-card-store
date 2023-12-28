import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const TopFiveExpensiveCards = ({ classes, topFiveCards }) => (
  <Grid item xs={12} sm={4}>
    <Paper className={classes.statisticPaper}>
      <Typography variant="h6" className={classes.statisticHeader}>
        Top Five Most Expensive Cards
      </Typography>
      <Box
        className={classes.statisticsContent}
        sx={{
          width: '100%',
          height: '150',
        }}
      >
        {topFiveCards.map((card, index) => (
          <Typography
            key={card.id}
            variant="body2"
            className={classes.cardDetail}
          >
            {index + 1}. {card.name} - ${card.price.toFixed(2)}
          </Typography>
        ))}
      </Box>
    </Paper>
  </Grid>
);

export default TopFiveExpensiveCards;
