import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

import CollectionPortfolio from 'layout/collection';

import { useManager } from 'context';
import { PageLayout } from 'layout/REUSABLE_COMPONENTS';

const CollectionPage = () => {
  // const { fetchCollections, hasFetchedCollections } = useManager();

  // useEffect(() => {
  //   if (!hasFetchedCollections) {
  //     fetchCollections();
  //   }
  // }, []);

  return (
    <PageLayout backCol={true}>
      <Grid item xs={12}>
        <CollectionPortfolio />
      </Grid>
    </PageLayout>
  );
};

export default CollectionPage;
