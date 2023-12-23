import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, useTheme } from '@mui/material';
import HeaderTitle from '../reusable/HeaderTitle';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context/hooks/colormode';
// eslint-disable-next-line max-len
import CollectionPortfolioChartContainer from '../../containers/collectionPageContainers/CollectionPortfolioChartContainer';
// eslint-disable-next-line max-len
import CollectionPortfolioListContainer from '../../containers/collectionPageContainers/CollectionPortfolioListContainer';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  portfolioBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100vw',
    width: '100%',
    height: '100%',
    margin: { xs: 0, sm: 'auto', md: 'auto', lg: 'auto' },
    padding: {
      xs: theme.spacing(1),
      sm: theme.spacing(2),
      md: theme.spacing(3),
      lg: theme.spacing(3),
    },
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  portfolioPaper: {
    background: theme.palette.background.main,
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%',
    padding: {
      xs: theme.spacing(1),
      sm: theme.spacing(1),
      md: theme.spacing(2),
      lg: theme.spacing(2),
    },
    borderRadius: theme.shape.borderRadius,
  },
  gridContainer: {
    width: '100%',
    maxWidth: '100vw',
    justifyContent: 'center',
  },
  gridItem: {
    justifyContent: 'center',
  },
}));

const PortfolioContent = ({ selectedCards, removeCard }) => {
  const { selectedCollection } = useCollectionStore();
  const [collectionName, setCollectionName] = useState(
    selectedCollection?.name
  );
  const classes = useStyles(useMode().theme);

  useEffect(() => {
    if (selectedCollection?.name) {
      setCollectionName(selectedCollection.name);
    }
  }, [selectedCollection]);
  return (
    <Box className={classes.portfolioBox}>
      <Paper elevation={4} className={classes.portfolioPaper}>
        <HeaderTitle
          title={collectionName}
          size="large"
          location="center"
          theme={useMode().theme}
        />
      </Paper>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} md={12} lg={6} xl={6} className={classes.gridItem}>
          <CollectionPortfolioChartContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
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
