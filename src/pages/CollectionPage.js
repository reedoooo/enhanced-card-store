import React, { useContext, useEffect, useState } from 'react';
import CollectionPortfolio from '../layout/collection/CollectionPortfolio';
import Subheader from '../components/reusable/Subheader';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import { ModalContext } from '../context/ModalContext/ModalContext';
import { useMode } from '../context/hooks/colormode';
import { usePageContext } from '../context/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';
import PageLayout from '../layout/PageLayout';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import useCollectionPageView from '../context/hooks/useCollectionPageView';

const CollectionPage = () => {
  const { selectedCollection, allCollections } = useCollectionStore();
  const { closeModal, isModalOpen, modalContent } = useContext(ModalContext);
  const { isCollectionView, showCollectionView, showCollectionContent } =
    useCollectionPageView();
  const { theme } = useMode();
  const { loadingStatus, returnDisplay, setLoading, logPageData } =
    usePageContext();

  useEffect(() => {
    setLoading('isPageLoading', true);
    try {
      if (!selectedCollection || !selectedCollection?._id) return; // If no collection is selected, do nothing
      logPageData('CollectionPage', selectedCollection); // Log collection data
    } catch (e) {
      // setLoading(e, true);
      console.error('Error loading collection page:', e);
    } finally {
      // setIsPageLoading(false); // End the loading state
      setLoading('isPageLoading', false);
      // setLoading();
    }
  }, []);

  // Function to render the hero center
  const renderHeroCenter = () =>
    !isCollectionView && (
      <HeroCenter
        title="Your Collection's Home"
        subtitle="Welcome to your collection! ..."
      />
    );

  // Function to render the collection portfolio
  const renderCollectionPortfolio = () => (
    <CollectionPortfolio
      allCollections={allCollections}
      onCollectionSelect={
        selectedCollection ? showCollectionContent : showCollectionView
      }
    />
  );

  // Function to render the card dialog
  const renderCardDialog = () =>
    isModalOpen && (
      <GenericCardDialog
        open={isModalOpen}
        context={'Collection'}
        closeModal={closeModal}
        card={modalContent}
      />
    );

  return (
    <PageLayout>
      {loadingStatus?.isPageLoading && returnDisplay()}
      {renderHeroCenter()}
      {renderCollectionPortfolio()}
      {renderCardDialog()}
    </PageLayout>
  );
};

export default CollectionPage;
