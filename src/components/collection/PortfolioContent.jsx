// PortfolioContent.jsx
import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import HeaderTitle from '../reusable/HeaderTitle';
// eslint-disable-next-line max-len
import CollectionPortfolioChartContainer from '../../containers/collectionPageContainers/CollectionPortfolioChartContainer';
// eslint-disable-next-line max-len
import CollectionPortfolioListContainer from '../../containers/collectionPageContainers/CollectionPortfolioListContainer';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import usePortfolioStyles from '../../context/hooks/usePortfolioStyles';
import { useMode } from '../../context';

const PortfolioContent = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();

  const { selectedCollection } = useCollectionStore();
  const [collectionName, setCollectionName] = useState('');
  const classes = usePortfolioStyles(theme);

  useEffect(() => {
    if (selectedCollection?.name) {
      setCollectionName(selectedCollection.name);
    }
  }, [selectedCollection]);

  return (
    <Box className={classes.portfolioBoxB}>
      <Paper elevation={4} className={classes.paper}>
        <HeaderTitle title={collectionName} size="large" location="center" />
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CollectionPortfolioChartContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CollectionPortfolioListContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioContent;
