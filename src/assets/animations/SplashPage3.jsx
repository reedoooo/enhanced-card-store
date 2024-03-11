// SplashPage.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import CardStormAnimation from './CardStormAnimation';

const SplashPage3 = () => {
  return (
    <Box style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Typography
        variant="h2"
        style={{
          position: 'absolute',
          top: '20%',
          width: '100%',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        Welcome to the Card Storm
      </Typography>
      <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
        <CardStormAnimation /> {/* Include the Card Animation */}
      </Box>
    </Box>
  );
};

export default SplashPage3;
