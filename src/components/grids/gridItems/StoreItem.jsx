import React, { memo } from 'react';
import { Box, Container } from '@mui/material';
import GenericCard from '../../cards/GenericCard';

// eslint-disable-next-line react/display-name
const StoreItem = memo(({ card, context, page, index }) => {
  return (
    <Box
      // zeroMinWidth
      sx={{
        marginBottom: '1rem',
        flexGrow: '1',
        maxHeight: '85%',
        minHeight: '85%',
      }}
    >
      <Container
        sx={{
          '&.MuiContainer-root': {
            padding: '0 !important',
            margin: '0',
            width: '100%',
            height: '100%',
            flexGrow: '1',
            display: 'flex',
          },
        }}
      >
        <GenericCard card={card} page={page} index={index} context={context} />
      </Container>
    </Box>
  );
});

export default StoreItem;
