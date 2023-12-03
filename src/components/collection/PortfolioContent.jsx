import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, useTheme } from '@mui/material';
import HeaderTitle from '../reusable/HeaderTitle';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context/hooks/colormode';
// eslint-disable-next-line max-len
import CollectionPortfolioChartContainer from '../../containers/collectionPageContainers/CollectionPortfolioChartContainer';
// eslint-disable-next-line max-len
import CollectionPortfolioListContainer from '../../containers/collectionPageContainers/CollectionPortfolioListContainer';

const PortfolioContent = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();
  const { selectedCollection } = useCollectionStore();
  const [collectionName, setCollectionName] = useState(
    selectedCollection?.name
  );

  // Update collectionName when selectedCollection changes
  useEffect(() => {
    if (selectedCollection?.name) {
      setCollectionName(selectedCollection.name);
    }
  }, [selectedCollection]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100vw',
        width: '100%',
        height: '100%',
        // height: '200vh',
        // margin: 'auto',
        margin: {
          xs: 0,
          sm: 'auto',
          md: 'auto',
          lg: 'auto',
        },
        padding: {
          xs: theme.spacing(1), // Reduced padding for xs breakpoint
          sm: theme.spacing(2),
          md: theme.spacing(3),
          lg: theme.spacing(3),
        },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          background: theme.palette.background.main,
          color: theme.palette.text.primary,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: 'auto',
          width: '100%',
          // height: '100%',
          // height: '200vh',
          padding: {
            xs: theme.spacing(1),
            sm: theme.spacing(1),
            md: theme.spacing(2),
            lg: theme.spacing(2),
          },
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <HeaderTitle
          title={collectionName}
          size="large"
          location="center"
          theme={theme}
        />
      </Paper>
      <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          // height: '100%',
          maxWidth: '100vw',
          // minHeight: '100%',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          xl={6}
          sx={{ justifyContent: 'center' }}
        >
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
