import React, { useEffect } from 'react';
import GenericCardDialog from '../components/dialogs/GenericCardDialog';
import DeckBuilder from '../layout/deck';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import useDeckManager from '../context/MAIN_CONTEXT/DeckContext/useDeckManager';
import useDialogState from '../context/hooks/useDialogState';

const DeckBuilderPage = () => {
  const { closeDialog, dialogState, data } = useDialogState();
  const { hasFetchedDecks, fetchDecks } = useDeckManager();
  return (
    <PageLayout>
      <DeckBuilder />
      {/* {dialogState.isCardDialogOpen && (
        <GenericCardDialog
          open={dialogState.isCardDialogOpen}
          context={'Deck'}
          onClose={() => closeDialog('isCardDialogOpen')}
          card={data}
        />
      )} */}
    </PageLayout>
  );
};

export default DeckBuilderPage;
