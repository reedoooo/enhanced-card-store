import React, { useContext, useEffect, useState } from 'react';
import CardPortfolio from '../components/collection/CardPortfolio';
import Subheader from '../components/reusable/Subheader';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import { ModalContext } from '../context/ModalContext/ModalContext';
import { useMode } from '../context/hooks/colormode';
import { usePageContext } from '../context/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';
import PageLayout from '../layout/PageLayout';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';

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
      if (!selectedCollection || !selectedCollection?._id) return; // If no collection is selected, do nothing
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
    setIsCollectionSelected(!!selected);
  };
  return (
    <PageLayout>
      <HeroCenter
        title="Your Collection's Home"
        subtitle="Welcome to your collection! ..."
      />
      {!isCollectionSelected && (
        <Subheader text={selectedCollection?.name || 'Your Collection'} />
      )}
      <CardPortfolio
        allCollections={allCollections}
        onCollectionSelect={handleCollectionSelected}
      />
      {isModalOpen && (
        <GenericCardDialog
          open={isModalOpen}
          context={'Collection'}
          closeModal={closeModal}
          card={modalContent}
        />
      )}
    </PageLayout>
  );
};

export default CollectionPage;
