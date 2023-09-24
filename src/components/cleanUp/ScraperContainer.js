import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import ScrapeDisplay from './ScrapeDisplay';
import ScrapeSearch from './ScrapeSearch';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const ScraperContainer = () => {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(['userCookie']);
  console.log('cookies:', cookies);
  const handleCardNameChange = (newCardName) => {
    // Set the new card name as a cookie
    setCookie('cardName', newCardName, { path: '/' });
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={6} md={4}>
        <ScrapeSearch onCardNameChange={handleCardNameChange} />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <ScrapeDisplay />
      </Grid>
    </Grid>
  );
};

export default ScraperContainer;
