import React from 'react';
import { Box, Container, Grid, Paper, useTheme } from '@mui/material';
import PortfolioListContainer from './PortfolioListContainer';
import PortfolioChartContainer from './PortfolioChartContainer';
import HeaderTitle from '../../components/reusable/HeaderTitle';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context/hooks/colormode';

const PortfolioContent = ({ error, selectedCards, removeCard }) => {
  const { theme } = useMode();
  const { selectedCollection } = useCollectionStore();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100vw',
        width: '100%',
        margin: 'auto',
        padding: theme.spacing(3),
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
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <HeaderTitle
          title={selectedCollection?.name}
          size="large"
          location="center"
        />
      </Paper>
      <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          maxWidth: '100vw',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ justifyContent: 'center', margin: 'auto' }}
        >
          <PortfolioChartContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PortfolioListContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioContent;
