import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import CollectionPortfolio from 'layout/collection';
import PageLayout from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/PageLayout';
import useManager from 'context/useManager';

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
