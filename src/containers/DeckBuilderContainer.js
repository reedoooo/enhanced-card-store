import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import DeckDisplay from '../components/other/DeckDisplay';
import DeckSearch from '../components/search/DeckSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const DeckBuilderContainer = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={6} md={4}>
        <DeckSearch />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <DeckDisplay />
      </Grid>
    </Grid>
  );
};

export default DeckBuilderContainer;
