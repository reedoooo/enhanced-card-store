import React, { memo } from 'react';
import { Box } from '@mui/material';
import GenericCard from '../cards/GenericCard';

// eslint-disable-next-line react/display-name
const DeckItem = memo(({ card, userDecks, context, page, index }) => {
  return (
    <Box
      sx={{
        marginBottom: '1rem',
        flexGrow: '1',
        width: '100%',
        height: '100%',
      }}
    >
      <GenericCard
        card={card}
        page={page}
        userDecks={userDecks}
        index={index}
        context={context}
      />
    </Box>
  );
});

export default DeckItem;
