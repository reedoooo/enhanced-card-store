import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CollectionPortfolio from '../layout/collection';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import { useCollectionStore, useMode } from '../context';
import useLoadingAndModal from './pageStyles/useLoadingAndModal';
import HeroBanner from './pageStyles/HeroBanner';
import PageLayout from '../layout/Containers/PageLayout';
import useSelectedCollection from '../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import { useIsFirstRender } from '../context/hooks/useIsFirstRender';
import useCollectionManager from '../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import { useLoading } from '../context/hooks/useLoading';

const CollectionPage = () => {
  const { selectedCollection, allCollections, resetCollection } =
    useSelectedCollection();
  const { fetchCollections, hasFetchedCollections } = useCollectionManager();

  const { returnDisplay, isModalOpen, modalContent, closeModal } =
    useLoadingAndModal();
  const { isPageLoading } = useLoading();
  const isFirstRender = useIsFirstRender();

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
        {isPageLoading && returnDisplay()}
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
