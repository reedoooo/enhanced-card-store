import React from 'react';
import { Box, Typography } from '@mui/material';
import useSelector from '../../context/MAIN_CONTEXT/CollectionContext/useSelector';

const UserStats = () => {
  const { entities: collections } = useSelector('collections');
  const { entities: decks } = useSelector('decks');
  const { entities: cart } = useSelector('cart');
  return (
    <Box mt={3}>
      <Typography variant="h6">User Statistics</Typography>
      <Typography variant="body1">
        Number of Decks: {decks.allIds?.length}
      </Typography>
      <Typography variant="body1">
        Number of Collections: {collections.allIds?.length}
      </Typography>
      <Typography variant="body1">
        Number of Cards in Cart: {cart?.items?.length}
      </Typography>
      {/* Add other statistics as needed */}
    </Box>
  );
};

export default UserStats;
