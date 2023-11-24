// Import necessary modules from MUI or other libraries
import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useStyles } from '../components/cards/cardStyles';

const CardDetailsContainer = ({ card }) => {
  const classes = useStyles();

  // Here you can add more details about the card using the 'card' object
  // For now, just displaying the card name and description if available
  return (
    <Grid container spacing={2} className={classes.detailsContainer}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          {card?.name}
        </Typography>
        <Typography variant="body1">
          {card?.desc || 'No description available.'}
        </Typography>
        {/* You can continue adding more details here */}
      </Grid>
    </Grid>
  );
};

export default CardDetailsContainer;
