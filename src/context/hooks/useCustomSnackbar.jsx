// useCustomSnackbar.js
import React from 'react';
import { useSnackbar } from 'notistack';
import { Box, CircularProgress, Typography } from '@mui/material';

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Define the showSnackbar function
  const showSnackbar = (title, subTitle, options = {}) => {
    const content = (
      <Box>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="caption" sx={{ display: 'block' }}>
          {subTitle}
        </Typography>
      </Box>
    );

    enqueueSnackbar(content, {
      ...options,
      action: options.persist
        ? (key) => <CircularProgress size={24} />
        : undefined,
    });
  };

  return showSnackbar;
};

export default useCustomSnackbar;
