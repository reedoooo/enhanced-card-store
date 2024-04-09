import React from 'react';
import { Box, Typography } from '@mui/material';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
import { useCartManager } from '../../context/MAIN_CONTEXT/CartContext/useCartManager';

const UserStats = () => {
  const { allDecks } = useSelectedDeck();
  const { allCollections } = useSelectedCollection();
  const { cart } = useCartManager();
  // console.log('allDecks', allDecks);
  return (
    <Box mt={3}>
      <Typography variant="h6">User Statistics</Typography>
      <Typography variant="body1">
        Number of Decks: {allDecks?.length}
      </Typography>
      <Typography variant="body1">
        Number of Collections: {allCollections?.length}
      </Typography>
      <Typography variant="body1">
        Number of Cards in Cart: {cart?.items?.length}
      </Typography>
      {/* Add other statistics as needed */}
    </Box>
  );
};

export default UserStats;
