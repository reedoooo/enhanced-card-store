import React from 'react';
import { Box } from '@mui/material';
import GenericCard from '../cards/GenericCard';

const DeckItem = ({ card, page, index, context }) => (
  <Box sx={{ marginBottom: '1rem', flexGrow: '1' }}>
    <GenericCard card={card} page={page} index={index} context={context} />
  </Box>
);

export default DeckItem;
