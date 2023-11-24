import React from 'react';
import { Grid } from '@mui/material';
import CardMediaSection from './CardMediaSection'; // Ensure correct import
import CardDetailsContainer from '../../containers/CardDetailsContainer';

const CardMediaAndDetails = ({ card }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <CardMediaSection
          isRequired={false}
          card={card}
          imgUrl={card?.card_images[0]?.image_url}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardDetailsContainer card={card} />
      </Grid>
    </Grid>
  );
};

// Using React.memo to avoid unnecessary re-renders
export default React.memo(CardMediaAndDetails);
