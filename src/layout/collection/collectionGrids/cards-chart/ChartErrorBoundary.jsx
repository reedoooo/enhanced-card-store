import React, { useState, useEffect } from 'react';
import { Box, Container, Icon, Typography, useMediaQuery } from '@mui/material';
import useSkeletonLoader from '../cards-datatable/useSkeletonLoader';
import BoxHeader from '../../../REUSABLE_COMPONENTS/BoxHeader';
import { useMode } from '../../../../context';

function ChartErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const { SkeletonLoader } = useSkeletonLoader();
  const { theme } = useMode();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const errorListener = (event) => {
      event.preventDefault();
      setError(event.error);
      setHasError(true);
    };

    window.addEventListener('error', errorListener);

    return () => {
      window.removeEventListener('error', errorListener);
    };
  }, []);

  if (hasError) {
    return (
      <Container sx={{ flexGrow: 1 }}>
        <Typography variant="body1">Unable to display chart</Typography>

        <BoxHeader
          title="Collection Card Chart"
          subtitle="List of all cards in the collection"
          icon={<Icon>table_chart</Icon>}
          sideText={new Date().toLocaleString()}
        />
        <SkeletonLoader type="chart" height={isSmall ? 150 : 500} />
        <SkeletonLoader type="text" count={2} />
        <SkeletonLoader type="listItem" count={5} />
      </Container>
    );
  }

  return children;
}

export default ChartErrorBoundary;
