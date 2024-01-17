import React from 'react';
import { Grid, Chip, Typography } from '@mui/material';
import DeckBuilderIcon from '../../reusable/icons/DeckBuilderIcon';
import { useDeckStore } from '../../../context/DeckContext/DeckContext';
import { useTheme } from 'styled-components';

const SelectDeckList = ({ handleSelectDeck }) => {
  const { allDecks } = useDeckStore();
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {allDecks?.map((deck) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={deck?._id}>
          <Chip
            label={
              <Typography variant="caption">
                {deck?.name || 'Unnamed'}
              </Typography>
            }
            onClick={() => handleSelectDeck(deck?._id)}
            icon={<DeckBuilderIcon style={{ fontSize: 20 }} />}
            variant="outlined"
            color="primary"
            clickable
            sx={{
              justifyContent: 'flex-start',
              padding: 1,
              borderRadius: theme.shape.borderRadius,
              width: '100%', // Make chip full width of the container
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SelectDeckList;
