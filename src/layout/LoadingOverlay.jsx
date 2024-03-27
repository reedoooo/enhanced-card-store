import React, { useEffect, useState } from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CircularProgress, Box } from '@material-ui/core';
import { useMode } from '../context';

const LoadingOverlay = () => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bgcolor="rgba(25, 118, 210, 0.1)" // Using Material UI blue color with transparency
      zIndex={1300}
    >
      <CircularProgress
        thickness={5}
        size={isMobile ? 75 : 100}
        disableShrink
        style={{
          color: '#1976d2', // Material UI blue color
        }}
      />
    </Box>
  );
};

export default LoadingOverlay;
