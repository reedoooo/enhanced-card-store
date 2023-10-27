// components/PortfolioHeader.js

import React from 'react';
import { AlertTitle, Box, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useCollectionStore } from '../../context/hooks/collection';
import HeaderTitle from '../reusable/HeaderTitle';

export const PortfolioHeader = ({ error }) => {
  const { allCollections, selectedCollection } = useCollectionStore();
  return (
    <Box flexGrow={0}>
      {/* <HeaderTitle title="Collection Portfolio" /> */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong> {error}</strong>
        </Alert>
      )}
    </Box>
  );
};

export default PortfolioHeader;
