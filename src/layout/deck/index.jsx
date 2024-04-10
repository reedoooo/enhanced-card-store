import React, { useCallback, useEffect, useState } from 'react';
import { Card, Collapse, Grid, Tab, Tabs } from '@mui/material';
import { useMode } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import DashboardLayout from '../REUSABLE_COMPONENTS/DashBoardLayout';
import SearchComponent from '../../components/forms/search/SearchComponent';
import DeckDialog from '../../components/dialogs/DeckDialog';
import useDialogState from '../../context/hooks/useDialogState';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
import DeckListItem from './DeckListItem';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import PageHeader from '../REUSABLE_COMPONENTS/PageHeader';
import useUserData from '../../context/MAIN_CONTEXT/UserContext/useUserData';
import { useFormManagement } from '../../components/forms/hooks/useFormManagement';
import useDeckManager from '../../context/MAIN_CONTEXT/DeckContext/useDeckManager';
import prepareDeckData from './deckData';
// const defaultDecks = {
//   allIds: [SELECTED_DECK_ID],
//   byId: {
//     [SELECTED_DECK_ID]: DEFAULT_DECK,
//   },
//   selectedId: SELECTED_DECK_ID,
//   prevSelectedId: SELECTED_DECK_ID,
//   showDecks: true,
// };
const DeckBuilder = () => {
  const { theme } = useMode();
  const { hasFetchedDecks, fetchDecks, deleteDeck } = useDeckManager();
  const {
    selectedDeckId,
    selectedDeck,
    allDecks,
    allIds,
    lastUpdated,
    deckUpdated,
    handleSelectDeck,
    refreshDecks,
  } = useSelectedDeck();
  // const { allDecks } = prepareDeckData(selectedDeckId);
  const { setActiveFormSchema } = useFormManagement();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const handleOpenAddDialog = useCallback(() => {
    setActiveFormSchema('addDeckForm');
    openDialog('isAddDeckDialogOpen');
  }, [openDialog, setActiveFormSchema]);
  const [activeTab, setActiveTab] = useState(0);
  const [safeDeckList, setSafeDeckList] = useState([]);

  useEffect(() => {
    fetchDecks().then(() => {
      setSafeDeckList(allDecks);
      refreshDecks();
    });
    // refreshDecks();
  }, [hasFetchedDecks, lastUpdated]);
  // useEffect(() => {
  //   if (!hasFetchedDecks) {
  //     fetchDecks();
  //   }
  // }, [hasFetchedDecks]);
  useEffect(() => {
    setActiveTab((prevActiveTab) =>
      Math.min(prevActiveTab, allDecks.length - 1)
    );
  }, [allDecks]);
  const handleChangeTab = useCallback(
    (event, newValue) => {
      setActiveTab(newValue);
      console.log('ALL DECKS AT VAL', allDecks[newValue]);
      const selectedDeckInAllIds = allIds?.find(
        (id) => id === allDecks[newValue]._id
      );
      console.log('SELECTED DECK IN ALL IDS', selectedDeckInAllIds);
      const selectedDeckInAllDecks = allDecks[newValue];
      handleSelectDeck(selectedDeckInAllDecks); // Update to use deck ID for selection
    },
    [allDecks, allIds, handleSelectDeck]
  );
  const handleDelete = useCallback(
    async (deck) => {
      if (!deck) return;
      try {
        await deleteDeck(deck._id);
        const updatedDecks = allDecks.filter((col) => col._id !== deck._id);
        console.log('UPDATED DECKS', updatedDecks);
        // refreshDecks(updatedCollections); // Assuming refreshCollections now directly accepts an updated array
      } catch (error) {
        console.error('Failed to delete collection:', error);
      }
    },
    [deleteDeck, allIds]
  );

  const { user } = useUserData();
  const deckList = safeDeckList?.map((deck, index) => (
    <Collapse in={activeTab === index} key={deck._id}>
      {/* // <Collapse in={activeTab === index} key={`${deck._id}-deck-${index}`}> */}
      <DeckListItem
        key={deck._id}
        deck={deck}
        handleDelete={() => handleDelete(deck)}
        // deckData={{
        //   name: deck.name || '',
        //   description: deck.description || '',
        //   tags: [...deck.tags] || [],
        //   color: deck.color || '',
        // }}
        isEditPanelOpen={selectedDeckId === deck._id}
        handleSelectAndShowDeck={handleSelectDeck} // Adjusted to ensure proper re-render
        // handleSelectAndShowDeck={(deck) => {
        //   handleSelectDeck(deck);
        //   setActiveTab(allDecks.findIndex((d) => d._id === deck._id)); // Find and set the active tab index based on deck selection.
        // }}
      />
    </Collapse>
  ));

  return (
    <MDBox theme={theme} sx={{ flexGrow: 1 }}>
      <DashboardLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardBox sx={{ p: theme.spacing(2) }}>
              <PageHeader
                title="Deck Builder"
                description={`Last updated: ${new Date().toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}`}
                buttonText="Add New Deck"
                headerName="Deck Builder"
                username={user.username}
                handleOpenDialog={handleOpenAddDialog}
              />
            </DashboardBox>
          </Grid>
          <Grid
            container
            item
            xs={12}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Tabs
                value={activeTab}
                onChange={handleChangeTab}
                aria-label="deck-tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                {safeDeckList?.map((deck, index) => (
                  <Tab
                    label={deck.name}
                    value={index}
                    key={deck._id || `deck-tab-${index}`}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={6}>
              <SearchComponent pageContext="Deck" />
            </Grid>
            <DashboardBox
              component={Grid}
              item
              xs={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                px: theme.spacing(2),
                py: theme.spacing(2),
              }}
            >
              {deckList}
            </DashboardBox>
          </Grid>
        </Grid>
      </DashboardLayout>
      {dialogState.isAddDeckDialogOpen && (
        <DeckDialog
          open={dialogState.isAddDeckDialogOpen}
          onClose={() => closeDialog('isAddDeckDialogOpen')}
          deckData={null}
          isNew={true}
        />
      )}
    </MDBox>
  );
};

export default DeckBuilder;
