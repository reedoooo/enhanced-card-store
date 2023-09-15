// Import dependencies
import React from 'react';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardList from '../components/grids/collectionGrids/CardList';

const useStyles = makeStyles((theme) => ({
  listPaper: {
    background:
      'linear-gradient(45deg, rgba(255,255,255,1) 30%, rgba(204,204,204,1) 100%)',
    borderRadius: '12px',
    padding: '20px',
    height: '100%',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  },
}));

const PortfolioListContainer = ({ selectedCards, removeCard }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sx={{ height: '30%' }}>
      <Paper elevation={3} className={classes.listPaper}>
        <CardList selectedCards={selectedCards} removeCard={removeCard} />
      </Paper>
    </Grid>
  );
};

export default PortfolioListContainer;
