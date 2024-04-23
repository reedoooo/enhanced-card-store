import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CollectionPortfolio from '../layout/collection';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import useSelectedCollection from '../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useCollectionManager from '../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import LoadingOverlay from '../layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay';

const CollectionPage = () => {
  const collectionData = useCollectionManager();
  if (!collectionData) {
    return <LoadingOverlay />;
  }
  const { fetchCollections, hasFetchedCollections } = collectionData;
  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);
  const selectionData = useSelectedCollection();
  if (!selectionData) {
    return <LoadingOverlay />;
  }
  const { allCollections } = selectionData;

  return (
    <PageLayout backCol={true}>
      <Grid item xs={12}>
        <CollectionPortfolio allCollections={allCollections} />
      </Grid>
    </PageLayout>
  );
};

export default CollectionPage;
