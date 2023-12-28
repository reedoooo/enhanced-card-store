import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import CardList from '../../components/grids/collectionGrids/CardList';
import { useTheme } from '@mui/material/styles';
import { useMode } from '../../context/hooks/colormode';
import usePortfolioStyles from '../../context/hooks/usePortfolioStyles';

const CollectionPortfolioListContainer = ({ selectedCards, removeCard }) => {
  const theme2 = useTheme();
  const { theme } = useMode();
  const classes = usePortfolioStyles(theme);

  return (
    <Box className={classes.cardListContainerBox}>
      <Grid className={classes.cardListContainerGrid}>
        <CardList selectedCards={selectedCards} removeCard={removeCard} />
      </Grid>
    </Box>
  );
};

export default CollectionPortfolioListContainer;
