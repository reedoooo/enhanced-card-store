import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import DeckDisplay from '../components/other/DeckDisplay';
import DeckSearch from '../components/search/DeckSearch';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    backgroundColor: '#f4f6f8',
    padding: theme.spacing(3),
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  searchGrid: {
    [theme.breakpoints.up('lg')]: { flexBasis: '28%' },
    [theme.breakpoints.between('md', 'lg')]: { flexBasis: '42%' },
    [theme.breakpoints.down('sm')]: { flexBasis: '35%' },
  },
  displayGrid: {
    flex: 1,
    padding: theme.spacing(2),
  },
}));

const DeckBuilderContainer = ({ userDecks }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getXsValue = () => {
    if (isSmallScreen || isMediumScreen) return 4;
    return 3;
  };

  const getDisplayXsValue = () => {
    if (isSmallScreen || isMediumScreen) return 8;
    return 9;
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item className={classes.searchGrid} xs={getXsValue()}>
        <DeckSearch userDecks={userDecks} />
      </Grid>
      <Grid item className={classes.displayGrid} xs={getDisplayXsValue()}>
        <DeckDisplay userDecks={userDecks} />
      </Grid>
    </Grid>
  );
};

export default DeckBuilderContainer;
