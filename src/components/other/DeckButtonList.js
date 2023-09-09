import React from 'react';
import { Grid, IconButton } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const DeckButtonList = ({ userDecks, handleSelectDeck }) => (
  <Grid container spacing={1}>
    {userDecks.map((deck) => (
      <Grid item xs={4} key={deck?._id}>
        <IconButton color="primary" onClick={() => handleSelectDeck(deck?._id)}>
          {deck?.name || 'Unnamed Deck'}
          <RadioButtonUncheckedIcon />
        </IconButton>
      </Grid>
    ))}
  </Grid>
);

export default DeckButtonList;
