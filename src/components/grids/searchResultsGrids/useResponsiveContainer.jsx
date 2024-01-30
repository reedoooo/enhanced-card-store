import { useState, useEffect, useRef } from 'react';

const useResponsiveContainer = (theme, updateHeightCallback) => {
  const containerRef = useRef(null);
  const [containerStyles, setContainerStyles] = useState({});

  const updateContainerStyles = () => {
    const newStyles = {
      top: -70,
      bottom: 70,
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      minHeight: '100%',
      background: theme.palette.backgroundB.darker,
      position: 'relative',
      px: 'auto',
      py: 'auto',
      mx: 'auto',
      my: 'auto',
    };

    setContainerStyles(newStyles);
  };

  useEffect(() => {
    updateContainerStyles();
    const handleResize = () => {
      updateContainerStyles();
      if (containerRef.current) {
        updateHeightCallback(containerRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateHeightCallback]);

  return [containerRef, containerStyles];
};

export default useResponsiveContainer;
