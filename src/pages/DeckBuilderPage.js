import React from 'react';
import { Grid } from '@mui/material';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DeckBuilder from '../layout/deck';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';
import useLoadingAndModal from './pageStyles/useLoadingAndModal';
import HeroBanner from './pageStyles/HeroBanner';
import PageLayout from '../layout/Containers/PageLayout';
import { useLoading } from '../context/hooks/useLoading';

const DeckBuilderPage = () => {
  const { isPageLoading } = useLoading();
  const { closeModal, returnDisplay, isModalOpen, modalContent } =
    useLoadingAndModal();

  return (
    <PageLayout>
      {isPageLoading && returnDisplay()}
      <HeroBanner
        title="Welcome to Deck Builder"
        subtitle="Craft, refine, and explore your deck strategies in one place."
      />
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
