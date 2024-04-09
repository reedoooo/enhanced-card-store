import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CollectionPortfolio from '../layout/collection';
import GenericCardDialog from '../components/dialogs/GenericCardDialog';
import useLoadingAndModal from './pageStyles/useLoadingAndModal';
import HeroBanner from './pageStyles/HeroBanner';
import PageLayout from '../layout/REUSABLE_COMPONENTS/PageLayout';
import useSelectedCollection from '../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useCollectionManager from '../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import { useLoading } from '../context/hooks/useLoading';
import LoadingOverlay from '../layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay';

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

  const { returnDisplay, isModalOpen, modalContent, closeModal } =
    useLoadingAndModal();
  const { isPageLoading } = useLoading();

  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);

  return (
    <PageLayout backCol={true}>
      <Grid
        item
        xs={12}
        sx={
          {
            // backgroundColor: '#3D3D3D',
          }
        }
      >
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
