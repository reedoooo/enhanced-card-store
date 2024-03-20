import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import GenericCardDialog from '../components/dialogs/GenericCardDialog';
import DeckBuilder from '../layout/deck';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';
import useLoadingAndModal from './pageStyles/useLoadingAndModal';
import HeroBanner from './pageStyles/HeroBanner';
import PageLayout from '../layout/Containers/PageLayout';
import { useLoading } from '../context/hooks/useLoading';
import useDeckManager from '../context/MAIN_CONTEXT/DeckContext/useDeckManager';

const DeckBuilderPage = () => {
  const { isPageLoading } = useLoading();
  const { closeModal, returnDisplay, isModalOpen, modalContent } =
    useLoadingAndModal();
  const { hasFetchedDecks, fetchDecks } = useDeckManager();

  useEffect(() => {
    if (!hasFetchedDecks) {
      fetchDecks();
    }
  }, []);

  return (
    <PageLayout>
      {isPageLoading && returnDisplay()}
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
