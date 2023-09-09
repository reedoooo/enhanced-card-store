import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, useMediaQuery } from '@mui/material';
import DeckDisplay from '../components/other/DeckDisplay';
import DeckSearch from '../components/search/DeckSearch';
import { useTheme } from '@emotion/react';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    overflow: 'auto',
  },
  searchGrid: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: '30%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      flexBasis: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      flexBasis: '35%',
    },
  },
  displayGrid: {
    flex: 1,
  },
}));

const DeckBuilderContainer = ({ userDecks }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log('DECK BUILDER CONTAINER (USERDECKS):', userDecks);
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={isSmallScreen ? 4 : isMediumScreen ? 4 : 3}>
        <DeckSearch userDecks={userDecks} />
      </Grid>
      <Grid item xs={isSmallScreen ? 8 : isMediumScreen ? 8 : 9}>
        <DeckDisplay userDecks={userDecks} />
      </Grid>
    </Grid>
  );
};

export default DeckBuilderContainer;
