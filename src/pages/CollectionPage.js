import React, { useContext, useEffect, useState } from 'react';
import CollectionPortfolio from '../layout/collection/CollectionPortfolio';
import HeroCenter from './pageStyles/HeroCenter';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import {
  useCollectionStore,
  useModalContext,
  usePageContext,
} from '../context';
import { Box, Grid } from '@mui/material';

const CollectionPage = () => {
  const { selectedCollection, allCollections } = useCollectionStore();
  const { closeModal, isModalOpen, modalContent } = useModalContext();
  const { loadingStatus, returnDisplay } = usePageContext();
  const heroBannerHeight = {
    xs: '10vh', // 10% for extra-small screens
    sm: '15vh', // 20% for small screens and up
    md: '20vh', // 25% for medium screens and up
    lg: '25vh', // 30% for large screens and up
  };
  return (
    <Box
      sx={{
        top: 0,
        left: -20,
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Grid container sx={{ height: '100vh', width: '100vw', p: 0 }}>
        {' '}
        {loadingStatus?.isPageLoading && returnDisplay()}
        {!selectedCollection && (
          <Grid
            item
            xs={12}
            sx={{
              height: heroBannerHeight,
              width: '100vw',
              // position: 'relative',
              top: '70px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                margin: 'auto',
                flexGrow: 1,
              }}
            >
              <HeroCenter
                title="Your Collection's Home"
                subtitle="Welcome to your collection! ..."
              />
            </Box>
          </Grid>
        )}
        <CollectionPortfolio
          allCollections={allCollections}
          // onCollectionSelect={(collection) => {
          //   show(collection);
          // }}
        />
        {isModalOpen && (
          <GenericCardDialog
            open={isModalOpen}
            context={'Collection'}
            closeModal={closeModal}
            card={modalContent}
          />
        )}
      </Grid>
    </Box>
  );
};

export default CollectionPage;
