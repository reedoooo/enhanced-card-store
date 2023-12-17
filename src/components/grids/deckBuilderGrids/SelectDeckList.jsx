import React, { useContext } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDeckStore } from '../../../context/DeckContext/DeckContext';
import DeckBuilderIcon from '../../reusable/icons/DeckBuilderIcon';
import { useTheme } from '@mui/styles';

const SelectDeckList = ({ handleSelectDeck }) => {
  const { selectedDeck, allDecks } = useDeckStore();

  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      {allDecks?.map((deck) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={deck?._id}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => handleSelectDeck(deck?._id)}
            startIcon={
              <DeckBuilderIcon
                style={{ fontSize: 20 }} // Adjust the size as needed
                color="primary" // This sets the color of the icon
              />
            }
            sx={{
              textTransform: 'none',
              justifyContent: 'flex-start',
              padding: 1,
              borderRadius: theme.shape.borderRadius,
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
