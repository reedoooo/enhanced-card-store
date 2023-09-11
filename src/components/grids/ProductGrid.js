import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../cleanUp/ProductCard';
import { useCardStore } from '../../context/CardContext/CardStore';
import GenericCard from '../cards/GenericCard';

const useStyles = makeStyles((theme) => ({
  grid: {
    maxWidth: '90%',
    justifyContent: 'center',
    margin: '0 auto',
  },
  gridItem: {
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
    <Grid container spacing={3} className={classes.grid}>
      {isCardDataValid &&
        limitedCardsToRender.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`${card.id}-${index}`}
            className={classes.gridItem}
          >
            <GenericCard card={card} context="Product" page="somePage" />
          </Grid>
        ))}
    </Grid>
  );
};

export default React.memo(ProductGrid);
