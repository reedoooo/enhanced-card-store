import React from 'react';
import { Button, Grid } from '@mui/material';
import { useCardStore } from '../../../context/CardContext/CardStore';

const SearchButton = ({ searchParams }) => {
  const { handleRequest } = useCardStore();

  return (
    <Grid item xs={12}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => handleRequest(searchParams)}
      >
        Search
      </Button>
    </Grid>
  );
};

export default SearchButton;
