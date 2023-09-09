import React from 'react';
import { Box, Typography } from '@mui/material';

const CardDetail = ({ icon, title, value }) => (
  <Box display="flex" alignItems="center" gap="10px" marginBottom="16px">
    {icon && <Box mr={1}>{icon}</Box>}
    <Typography variant="h6">
      {title}: {value || 'N/A'}
    </Typography>
  </Box>
);

export default CardDetail;
