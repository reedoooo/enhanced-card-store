import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CardPortfolio from '../components/collection/CardPortfolio';
import Subheader from '../components/reusable/Subheader';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import { ModalContext } from '../context/ModalContext/ModalContext';
import GenericCardModal from '../components/modals/cardModal/GenericCardModal';
import { useMode } from '../context/hooks/colormode';
import { usePageContext } from '../context/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';
import { Paper } from '@mui/material';

const CollectionPage = () => {
  const { theme } = useMode();
  const [isCollectionSelected, setIsCollectionSelected] = useState(false);
  const { allCollections, selectedCollection } = useCollectionStore();
  const {
    isPageLoading,
    setIsPageLoading,
    pageError,
    setPageError,
    logPageData,
    displayLoadingIndicator,
    displayErrorIndicator,
  } = usePageContext();

  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);

  useEffect(() => {
    try {
      logPageData('CollectionPage', selectedCollection); // Log collection data
    } catch (e) {
      setPageError(e); // Handle any errors
    } finally {
      setIsPageLoading(false); // End the loading state
    }
  }, []);

  if (isPageLoading) displayLoadingIndicator();
  if (pageError) displayErrorIndicator();

  const handleCollectionSelected = (selected) => {
    console.log('selected', selected);
    setIsCollectionSelected(!!selected);
  };
  return (
    <React.Fragment>
      <Paper
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.paper,
          zIndex: -1, // Ensure it stays behind the content
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
          textAlign: 'center',
        }}
      >
        {!isCollectionSelected && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: {
                xs: '17%',
                sm: '25%',
                md: '25%',
                lg: '28%',
              },
              marginTop: '5vh',
              width: '100%',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <HeroCenter
              decorative="All-in-One"
              title="Your Collection's Home"
              // eslint-disable-next-line max-len
              subtitle="Welcome to your collection! Here you can view all of your cards, add new cards, and remove cards from your collection."
              theme={theme}
            />
            <Subheader text={selectedCollection?.name || 'Your Collection'} />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: theme.spacing(1.2),
            minWidth: 390,
            width: '100%',
            backgroundColor: theme.palette.background.main,
          }}
        >
          <CardPortfolio
            allCollections={allCollections}
            onCollectionSelect={handleCollectionSelected}
          />
        </Box>
        {isModalOpen && (
          <GenericCardModal
            open={isModalOpen}
            closeModal={closeModal}
            card={modalContent}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

export default CollectionPage;
