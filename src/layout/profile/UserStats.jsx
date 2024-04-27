import React from 'react';
import { Box, Typography } from '@mui/material';
import useManager from '../../context/useManager';

const UserStats = () => {
  const { decks, collections, cart } = useManager();
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
