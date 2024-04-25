import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CollectionPortfolio from '../layout/collection';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import useManager from '../context/useManager';
import { useCollectionMetaData } from '../context/MISC_CONTEXT/AppContext/useCollectionMetaData';

const CollectionPage = () => {
  const { fetchCollections, hasFetchedCollections } = useManager();
  const { compileCollectionMetaData } = useCollectionMetaData();

  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);

  useEffect(() => {
    compileCollectionMetaData();
  }, [compileCollectionMetaData]);

  return (
    <PageLayout backCol={true}>
      <Grid item xs={12}>
        <CollectionPortfolio />
      </Grid>
    </PageLayout>
  );
};

export default CollectionPage;
