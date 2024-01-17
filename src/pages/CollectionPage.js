import React, { useContext, useEffect, useState } from 'react';
import CollectionPortfolio from '../layout/collection/CollectionPortfolio';
import HeroCenter from './pageStyles/HeroCenter';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import {
  useCollectionStore,
  useModalContext,
  usePageContext,
} from '../context';
import { useVisible } from '../context/hooks/useVisible';

const CollectionPage = () => {
  const { selectedCollection, allCollections, getAllCollectionsForUser } =
    useCollectionStore();
  const { closeModal, isModalOpen, modalContent } = useModalContext();
  const { isVisible, show, hide, toggleVisible } = useVisible();
  const { loadingStatus, returnDisplay, setLoading, logPageData } =
    usePageContext();

  useEffect(() => {
    setLoading('isPageLoading', true);
    getAllCollectionsForUser().catch((err) =>
      console.error('Failed to get all collections:', err)
    );
    setLoading('isPageLoading', false);
  }, [getAllCollectionsForUser]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading('isPageLoading', true);
      try {
        await getAllCollectionsForUser(); // Assuming fetchUserCart updates cartData
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading('isPageLoading', false);
      }
    };

    // Fetch cart data if not already loaded
    if (!allCollections.length) {
      fetchData();
    }
  }, [allCollections, getAllCollectionsForUser]);
  // useEffect(() => {
  //   setLoading('isPageLoading', true);
  //   try {
  //     if (!selectedCollection || !selectedCollection?._id) return; // If no collection is selected, do nothing
  //     logPageData('CollectionPage', selectedCollection); // Log collection data
  //   } catch (e) {
  //     // setLoading(e, true);
  //     console.error('Error loading collection page:', e);
  //   } finally {
  //     // setIsPageLoading(false); // End the loading state
  //     setLoading('isPageLoading', false);
  //     // setLoading();
  //   }
  // }, []);
  // useEffect(() => {
  //   setLoading('isPageLoading', true);

  //   getAllCollectionsForUser().catch((err) =>
  //     console.error('Failed to get all collections:', err)
  //   );
  //   setLoading('isPageLoading', false);
  // }, [getAllCollectionsForUser]);

  // Function to render the hero center
  // Function to render the hero center

  const renderHeroCenter = () => {
    if (!isVisible('showCollectionContent')) {
      return (
        <HeroCenter
          title="Your Collection's Home"
          subtitle="Welcome to your collection! ..."
        />
      );
    }
    return null;
  };

  // Function to render the collection portfolio
  const renderCollectionPortfolio = () => {
    if (isVisible('showCollectionContent')) {
      return (
        <CollectionPortfolio
          allCollections={allCollections}
          onCollectionSelect={() => toggleVisible('showCollectionContent')}
        />
      );
    }
    return null;
  };

  const renderCardDialog = () => {
    if (isModalOpen) {
      return (
        <GenericCardDialog
          open={isModalOpen}
          context={'Collection'}
          closeModal={closeModal}
          card={modalContent}
        />
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      {loadingStatus?.isPageLoading && returnDisplay()}
      {renderHeroCenter()}
      {renderCollectionPortfolio()}
      {renderCardDialog()}
    </React.Fragment>
  );
};

export default CollectionPage;
