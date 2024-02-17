import React from 'react';
import { Box, Grid } from '@mui/material';
import CollectionPortfolio from '../layout/collection';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import { useCollectionStore, useMode } from '../context';
import useLoadingAndModal from './pageStyles/useLoadingAndModal';
import HeroBanner from './pageStyles/HeroBanner';
import PageLayout from '../layout/Containers/PageLayout';

const CollectionPage = () => {
  const { theme } = useMode();
  const { selectedCollection, allCollections } = useCollectionStore();
  const {
    loadingStatus,
    returnDisplay,
    isModalOpen,
    modalContent,
    closeModal,
  } = useLoadingAndModal();

  return (
    <PageLayout backCol={true}>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: '#3D3D3D',
        }}
      >
        {loadingStatus?.isPageLoading && returnDisplay()}
        {!selectedCollection && (
          <HeroBanner
            title="Your Collection's Home"
            subtitle="Welcome to your collection! ..."
          />
        )}
        <CollectionPortfolio allCollections={allCollections} />
        {isModalOpen && (
          <GenericCardDialog
            open={isModalOpen}
            context={'Collection'}
            closeModal={closeModal}
            card={modalContent}
          />
        )}
      </Grid>
    </PageLayout>
  );
};

export default CollectionPage;
