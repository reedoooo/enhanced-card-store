import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CollectionPortfolio from '../layout/collection';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import useManager from '../context/MAIN_CONTEXT/CollectionContext/useManager';

const CollectionPage = () => {
  const { fetchCollections, hasFetchedCollections } = useManager();

  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);

  return (
    <PageLayout backCol={true}>
      <Grid item xs={12}>
        <CollectionPortfolio />
      </Grid>
    </PageLayout>
  );
};

export default CollectionPage;
