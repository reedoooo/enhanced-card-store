import React, { useContext } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { makeStyles } from '@mui/styles';
import { DeckContext } from '../../../context/DeckContext/DeckContext';

const useDeckButtonListStyles = makeStyles((theme) => ({
  grid: {
    marginBottom: theme?.spacing(2),
  },
  deckButton: {
    width: '100%',
    padding: '6px 0',
    borderRadius: '5px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    margin: theme?.spacing(1),
    [theme?.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
      padding: '5px 8px',
    },
    [theme?.breakpoints.up('sm')]: {
      fontSize: '0.8rem',
    },
    [theme?.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
  icon: {
    fontSize: '16px',
  },
  text: {
    fontSize: '12px',
    fontWeight: '600',
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    [theme?.breakpoints.up('md')]: {
      backgroundColor: 'blue',
    },
    [theme?.breakpoints.down('sm')]: {
      backgroundColor: 'red',
    },
    [theme?.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'green',
    },
  },
}));

const DeckButtonList = ({ userDecks, handleSelectDeck }) => {
  const classes = useDeckButtonListStyles();
  const { selectedDeck } = useContext(DeckContext);
  // console.log('SELECTED DECK:', selectedDeck.name);
  // console.log('userDecks', userDecks);
  return (
    <Grid container spacing={1} className={classes.grid}>
      {userDecks?.map((deck) => (
        <Grid item xs={3} sm={2} key={deck?._id}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.deckButton}
            onClick={() => handleSelectDeck(deck?._id)}
            startIcon={<RadioButtonUncheckedIcon className={classes.icon} />}
          >
            <Typography variant="caption" className={classes.text}>
              {deck?.name || 'Unnamed'}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default DeckButtonList;
