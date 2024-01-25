import React, { useContext, useEffect, useState } from 'react';
import CollectionPortfolio from '../layout/collection/CollectionPortfolio';
import HeroCenter from './pageStyles/HeroCenter';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import {
  useCollectionStore,
  useModalContext,
  usePageContext,
} from '../context';

const CollectionPage = () => {
  const { selectedCollection, allCollections } = useCollectionStore();
  const { closeModal, isModalOpen, modalContent } = useModalContext();
  const { loadingStatus, returnDisplay } = usePageContext();
  // useEffect(() => {
  //   setLoading('isPageLoading', true);
  //   getAllCollectionsForUser()
  //     .then(() => {
  //       // Handle successful fetch
  //       logPageData('CollectionPage');

  //       // Set loading to false
  //       setLoading('isPageLoading', false);
  //     })
  //     .catch((err) => {
  //       console.error('Failed to get all collections:', err);
  //     })
  //     .finally(() => {
  //       setLoading('isPageLoading', false);
  //     });
  // }, [getAllCollectionsForUser, setLoading]);

  // const renderHeroCenter = () => {
  //   if (!isVisible('showCollectionContent')) {
  //     return (
  //       <HeroCenter
  //         title="Your Collection's Home"
  //         subtitle="Welcome to your collection! ..."
  //       />
  //     );
  //   }
  //   return null;
  // };

  // const renderCollectionPortfolio = () => {
  //   if (isVisible('showCollectionContent')) {
  //     return (
  //       <CollectionPortfolio
  //         // allCollections={allCollections}
  //         onCollectionSelect={show('showCollectionContent')}
  //         // onCollectionSelect={toggleVisible('showCollectionContent')}
  //       />
  //     );
  //   }
  //   return null;
  // };

  // const renderCardDialog = () => {
  //   if (isModalOpen) {
  //     return (
  //       <GenericCardDialog
  //         open={isModalOpen}
  //         context={'Collection'}
  //         closeModal={closeModal}
  //         card={modalContent}
  //       />
  //     );
  //   }
  //   return null;
  // };

  return (
    <React.Fragment>
      {loadingStatus?.isPageLoading && returnDisplay()}

      {!selectedCollection && (
        <HeroCenter
          title="Your Collection's Home"
          subtitle="Welcome to your collection! ..."
        />
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
    </React.Fragment>
  );
};

export default CollectionPage;
