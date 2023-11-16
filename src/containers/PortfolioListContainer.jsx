import React from 'react';
import { Grid, Paper } from '@mui/material';
import CardList from '../components/grids/collectionGrids/CardList';

const PortfolioListContainer = ({ selectedCards, removeCard }) => {
  return (
    <Grid item xs={12} sx={{ height: '150vh', width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          background:
            'linear-gradient(45deg, rgba(255,255,255,1) 30%, rgba(204,204,204,1) 100%)',
          borderRadius: '12px',
          p: 2,
          height: '100%',
          width: '100%',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        }}
      >
        <CardList selectedCards={selectedCards} removeCard={removeCard} />
      </Paper>
    </Grid>
  );
};

export default PortfolioListContainer;
