import { Box, Grid } from '@mui/material';
import { useMode } from '../../context';
import DeckDisplay from './DeckDisplay';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';
import SearchComponent from '../../components/forms/search/SearchComponent';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import DeckPageHeader from './DeckPageHeader';
import useDialogState from '../../context/hooks/useDialogState';
import DeckDialog from '../../components/dialogs/DeckDialog';
import { useCallback } from 'react';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';

const DeckBuilder = () => {
  const { theme } = useMode();
  const { selectedDeck, allDecks } = useSelectedDeck();
  const { dialogState, openDialog, closeDialog } = useDialogState({
    isEditDeckDialogOpen: false,
    isAddDeckDialogOpen: false,
  });

  const handleCloseDialog = useCallback(() => {
    closeDialog('isEditDeckDialogOpen');
  }, [closeDialog]);

  const handleOpenAddDeckDialog = useCallback(() => {
    console.log('open add deck dialog');
    openDialog('isAddDeckDialogOpen');
  }, [openDialog]);

  const handleCloseAddDeckDialog = useCallback(() => {
    closeDialog('isAddDeckDialogOpen');
  }, [closeDialog]);

  return (
    <PageLayout>
      <MDBox
        // py={3}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
          minHeight: '100vh',
          // minHeight: 'calc(100vh - 64px)', // Adjust this value based on your header/footer height
          overflow: 'auto', // Ensures content can scroll if it exceeds the container's height
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              flexGrow: 1,
            }}
          >
            <DashboardBox
              sx={{
                p: theme.spacing(2),
              }}
            >
              <DeckPageHeader
                openAddDeckDialog={handleOpenAddDeckDialog}
                decks={allDecks}
              />
            </DashboardBox>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              flexGrow: 1,
            }}
          >
            <DashboardBox
              sx={{
                p: theme.spacing(2),
              }}
            >
              <SearchComponent pageContext="Deck" />
            </DashboardBox>
          </Grid>
          <Grid item xs={12} md={5}>
            <DashboardBox
              sx={{
                p: theme.spacing(2),
              }}
            >
              <DeckDisplay />
            </DashboardBox>
          </Grid>
        </Grid>
      </MDBox>
      {dialogState.isEditDeckDialogOpen && (
        <DeckDialog
          open={dialogState.isEditDeckDialogOpen}
          onClose={handleCloseDialog}
          deckData={selectedDeck}
          isNew={false}
        />
      )}
      {dialogState.isAddDeckDialogOpen && (
        <DeckDialog
          open={dialogState.isAddDeckDialogOpen}
          onClose={handleCloseAddDeckDialog}
          deckData={selectedDeck}
          isNew={true}
        />
      )}
    </PageLayout>
  );
};

export default DeckBuilder;
