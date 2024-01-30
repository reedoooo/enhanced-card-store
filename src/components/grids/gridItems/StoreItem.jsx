import React, { memo } from 'react';
import { Box } from '@mui/material';
import GenericCard from '../../cards/GenericCard';

// eslint-disable-next-line react/display-name
const StoreItem = memo(({ card, context, page, index }) => {
  return (
    <Box
      sx={{
        marginBottom: '1rem',
        flexGrow: '1',
        width: '100%',
        height: '100%',
      }}
    >
      <GenericCard card={card} page={page} index={index} context={context} />
    </Box>
  );
});

export default StoreItem;
