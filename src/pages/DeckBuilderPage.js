import React, { useEffect } from 'react';
import GenericCardDialog from '../components/dialogs/GenericCardDialog';
import DeckBuilder from '../layout/deck';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import useDeckManager from '../context/MAIN_CONTEXT/DeckContext/useDeckManager';
import useDialogState from '../context/hooks/useDialogState';

const DeckBuilderPage = () => {
  return (
    <PageLayout>
      <DeckBuilder />
    </PageLayout>
  );
};

export default DeckBuilderPage;
