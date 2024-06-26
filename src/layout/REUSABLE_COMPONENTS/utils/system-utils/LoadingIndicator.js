import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingIndicator = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color="success" />
    </Box>
  );
};

export default LoadingIndicator;
