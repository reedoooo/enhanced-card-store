import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardPortfolio from '../components/collection/CardPortfolio';
import Subheader from '../components/reusable/Subheader';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import { ModalContext } from '../context/ModalContext/ModalContext';
import GenericCardModal from '../components/modals/cardModal/GenericCardModal';
import {
  CollectionBanner,
  CollectionContents,
} from './pageStyles/StyledComponents';
import { useMode } from '../context/hooks/colormode';
import { usePageContext } from '../context/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';

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
  } = usePageContext();

  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);

  useEffect(() => {
    setIsPageLoading(true);
    try {
      // Logic to handle collection data
      logPageData('CollectionPage', selectedCollection); // Log collection data
    } catch (e) {
      setPageError(e); // Handle any errors
    } finally {
      setIsPageLoading(false); // End the loading state
    }
  }, [selectedCollection, setIsPageLoading, setPageError, logPageData]);

  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;

  const handleCollectionSelected = (selected) => {
    console.log('selected', selected);
    setIsCollectionSelected(!!selected);
  };

  return (
    <React.Fragment>
      {!isCollectionSelected && (
        <CollectionBanner>
          <Box>
            <HeroCenter
              decorative="All-in-One"
              title="Your Collection's Home"
              // eslint-disable-next-line max-len
              subtitle="Welcome to your collection! Here you can view all of your cards, add new cards, and remove cards from your collection."
              theme={theme} // Pass theme if required
            />
            <Subheader text={selectedCollection?.name || 'Your Collection'} />
          </Box>
        </CollectionBanner>
      )}

      <CollectionContents theme={theme}>
        <CardPortfolio
          allCollections={allCollections}
          onCollectionSelect={handleCollectionSelected}
        />
      </CollectionContents>
      {isModalOpen && (
        <GenericCardModal
          open={isModalOpen}
          closeModal={closeModal}
          card={modalContent}
        />
      )}
    </React.Fragment>
  );
};

export default CollectionPage;
