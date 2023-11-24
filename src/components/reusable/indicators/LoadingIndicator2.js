import * as React from 'react';
import Box from '@mui/material/Box';
import LoadingCardAnimation from '../../../assets/animations/LoadingCardAnimation';

const LoadingIndicator2 = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <LoadingCardAnimation />
    </Box>
  );
};

export default LoadingIndicator2;
