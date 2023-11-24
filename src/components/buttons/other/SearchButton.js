import React from 'react';
import { Button, Grid } from '@mui/material';
import { useCardStore } from '../../../context/CardContext/CardStore';
import { useMode } from '../../../context/hooks/colormode';

const SearchButton = ({ searchParams, handleSubmit }) => {
  // const { handleRequest } = useCardStore();
  const { theme } = useMode();

  return (
    <Grid item xs={12}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 1, mb: 1, background: theme.palette.primary.main }}
        onClick={() => handleSubmit()} // Corrected onClick
      >
        Search
      </Button>
    </Grid>
  );
};

export default SearchButton;
