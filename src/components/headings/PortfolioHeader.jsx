// components/PortfolioHeader.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

export const PortfolioHeader = ({ error }) => {
  return (
    <Box flexGrow={0}>
      <Typography variant="h5">This is the Portfolio tab.</Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default PortfolioHeader;
