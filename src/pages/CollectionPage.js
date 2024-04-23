import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CollectionPortfolio from '../layout/collection';
import GenericCardDialog from '../components/dialogs/GenericCardDialog';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import useSelectedCollection from '../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useCollectionManager from '../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import LoadingOverlay from '../layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import useDialogState from '../context/hooks/useDialogState';

const CollectionPage = () => {
  const selectionData = useSelectedCollection();
  if (!selectionData) {
    return <LoadingOverlay />;
  }
  const { selectedCollection, allCollections, resetCollection } = selectionData;
  const collectionData = useCollectionManager();
  if (!collectionData) {
    return <LoadingOverlay />;
  }
  const { fetchCollections, hasFetchedCollections } = collectionData;
  const { dialogState, closeDialog, data } = useDialogState();
  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);

  return (
    <PageLayout backCol={true}>
      <Grid item xs={12}>
        <CollectionPortfolio allCollections={allCollections} />
        {/* {dialogState.isCardDialogOpen && (
          <GenericCardDialog
            open={dialogState.isCardDialogOpen}
            context={'Collection'}
            closeModal={closeDialog('isCardDialogOpen')}
            card={data}
          />
        )} */}
      </Grid>
    </PageLayout>
  );
};

export default CollectionPage;
