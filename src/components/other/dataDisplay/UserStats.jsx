import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDeckStore } from '../../../context/DeckContext/DeckContext';
import { useCartStore } from '../../../context/CartContext/CartContext';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';

const UserStats = () => {
  const { allDecks } = useDeckStore();
  const { allCollections } = useCollectionStore();
  const { cartData } = useCartStore();
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
        Number of Cards in Cart: {cartData?.cart?.length}
      </Typography>
      {/* Add other statistics as needed */}
    </Box>
  );
};

export default UserStats;
