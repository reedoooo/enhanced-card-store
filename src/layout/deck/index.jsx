import React, { useCallback, useEffect, useState } from 'react';
import { Card, Collapse, Grid, Tab, Tabs } from '@mui/material';
import { useMode } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import DashboardLayout from '../REUSABLE_COMPONENTS/DashBoardLayout';
import DeckPageHeader from './DeckPageHeader';
import SearchComponent from '../../components/forms/search/SearchComponent';
import DeckDialog from '../../components/dialogs/DeckDialog';
import useDialogState from '../../context/hooks/useDialogState';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
import DeckListItem from './DeckListItem';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';

const DeckBuilder = () => {
  const { theme } = useMode();
  const { selectedDeck, allDecks, handleSelectDeck } = useSelectedDeck();
  const { dialogState, openDialog, closeDialog } = useDialogState();

  const [activeTab, setActiveTab] = useState(0); // Now this will be dynamic based on allDecks

  // Function to handle changing tabs
  const handleChangeTab = (event, newValue) => {
    const selectedDeck = allDecks[newValue]; // Get the deck corresponding to the new tab index
    handleSelectDeck(selectedDeck); // Pass the selected deck to handleSelectDeck
    setActiveTab(newValue); // Update the active tab state
  };

  return (
    <MDBox theme={theme} sx={{ flexGrow: 1 }}>
      <DashboardLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardBox sx={{ p: theme.spacing(2) }}>
              <DeckPageHeader
                openAddDeckDialog={() => openDialog('isAddDeckDialogOpen')}
              />
            </DashboardBox>
          </Grid>
          {/* Tabs and Search Component in the same row */}
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
                {allDecks.map((deck, index) => (
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
            <Grid item xs={6}>
              {allDecks.map((deck, index) => (
                <Collapse
                  in={activeTab === index}
                  key={deck._id || `deck-collapse-${index}`}
                >
                  <DeckListItem
                    deck={deck}
                    isEditPanelOpen={selectedDeck?._id === deck._id}
                    handleSelectAndShowDeck={(deck) => {
                      handleSelectDeck(deck);
                      setActiveTab(index);
                    }}
                    cards={deck.cards}
                  />
                </Collapse>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DashboardLayout>

      <DeckDialog
        open={dialogState.isEditDeckDialogOpen}
        onClose={() => closeDialog('isEditDeckDialogOpen')}
        deckData={selectedDeck}
        isNew={false}
      />
      <DeckDialog
        open={dialogState.isAddDeckDialogOpen}
        onClose={() => closeDialog('isAddDeckDialogOpen')}
        deckData={null}
        isNew={true}
      />
    </MDBox>
  );
};

export default DeckBuilder;
