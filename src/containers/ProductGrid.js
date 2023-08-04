import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../components/cards/ProductCard';
import { useCardStore } from '../context/CardContext/CardStore';

const useStyles = makeStyles((theme) => ({
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
    <Grid container spacing={3}>
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
            <ProductCard card={card} />
          </Grid>
        ))}
    </Grid>
  );
};

export default React.memo(ProductGrid);
