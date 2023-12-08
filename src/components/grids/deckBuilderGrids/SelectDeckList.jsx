import React, { useContext } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { DeckContext } from '../../../context/DeckContext/DeckContext';

const SelectDeckList = ({ userDecks, handleSelectDeck }) => {
  const { selectedDeck } = useContext(DeckContext);

  return (
    <Grid container spacing={2}>
      {userDecks?.map((deck) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={deck?._id}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => handleSelectDeck(deck?._id)}
            startIcon={<RadioButtonUncheckedIcon />}
            sx={{
              textTransform: 'none',
              justifyContent: 'flex-start',
              padding: 1,
            }}
          >
            <Typography variant="caption">{deck?.name || 'Unnamed'}</Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default SelectDeckList;
