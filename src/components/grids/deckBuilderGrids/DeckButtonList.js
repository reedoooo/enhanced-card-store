import React, { useContext } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { DeckContext } from '../../../context/DeckContext/DeckContext';
import { useDeckButtonListStyles } from '../gridStyles';

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
