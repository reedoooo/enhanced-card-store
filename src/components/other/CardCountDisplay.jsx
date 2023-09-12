import React from 'react';
import { Grid } from '@mui/material';

const CardCountDisplay = ({ quantity, label, className }) => {
  // Destructure only if `quantity` is not null or undefined
  const { totalItems, quantityOfSameId } = quantity || {};

  console.log('Quantity:', quantity, 'Type:', typeof quantity);
  console.log('Label:', label, 'Type:', typeof label);
  console.log('ClassName:', className, 'Type:', typeof className);
  console.log('Total Items:', totalItems, 'Type:', typeof totalItems);

  return (
    <Grid container className={className}>
      <Grid item xs={6}>
        {/* Use optional chaining to safely access `totalItems` */}
        {label}: {quantity?.totalItems || 0}
      </Grid>
    </Grid>
  );
};

export default CardCountDisplay;
