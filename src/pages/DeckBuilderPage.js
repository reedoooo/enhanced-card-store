import React, { useEffect } from 'react';
import GenericCardDialog from '../components/dialogs/GenericCardDialog';
import DeckBuilder from '../layout/deck';
import useLoadingAndModal from './pageStyles/useLoadingAndModal';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import useDeckManager from '../context/MAIN_CONTEXT/DeckContext/useDeckManager';

const DeckBuilderPage = () => {
  const { closeModal, returnDisplay, isModalOpen, modalContent } =
    useLoadingAndModal();
  const { hasFetchedDecks, fetchDecks } = useDeckManager();
  // useEffect(() => {
  //   if (!hasFetchedDecks) {
  //     fetchDecks();
  //   }
  // }, []);

  return (
    <PageLayout>
      <DeckBuilder />
      {isModalOpen && (
        <GenericCardDialog
          open={isModalOpen}
          context={'Deck'}
          card={modalContent}
        />
      )}
    </PageLayout>
  );
};

export default DeckBuilderPage;
