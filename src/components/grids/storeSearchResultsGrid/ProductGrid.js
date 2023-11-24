import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GenericCard from '../../cards/GenericCard';
import { useCardStore } from '../../../context/CardContext/CardStore';

const useStyles = makeStyles((theme) => ({
  productGrid: {
    maxWidth: '90%',
    justifyContent: 'center',
    margin: '0 auto',
  },
  productGridItem: {
    padding: theme.spacing(2),
    height: 'auto', // Set a specific value if required
    width: '100%',
  },
}));

const ProductGrid = () => {
  const { searchData } = useCardStore();

  const classes = useStyles();

  const isCardDataValid = searchData && Array.isArray(searchData);

  const limitedCardsToRender = useMemo(
    () => (searchData ? Array.from(searchData).slice(0, 30) : []),
    [searchData]
  );

  return (
    <Grid container spacing={3} className={classes.productGrid}>
      {isCardDataValid &&
        limitedCardsToRender.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`${card.id}-${index}`}
            className={classes.productGridItem}
          >
            <GenericCard card={card} context="Cart" page="storepage" />
          </Grid>
        ))}
    </Grid>
  );
};

export default React.memo(ProductGrid);
