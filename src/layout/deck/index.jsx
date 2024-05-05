import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Card,
  Collapse,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';

import SearchComponent from 'layout/search/SearchComponent';
import DeckDialog from 'layout/dialogs/DeckDialog';
import DeckListItem from './DeckListItem';

import {
  useDialogState,
  useFormManagement,
  useUserData,
  useManager,
  useMode,
} from 'context';

import {
  DashBoardLayout,
  DashboardBox,
  MDBox,
  PageHeader,
} from 'layout/REUSABLE_COMPONENTS';

const DeckBuilder = () => {
  const { theme } = useMode();
  const { user } = useUserData();
  const {
    fetchDecks,
    deleteDeck,
    handleSelectDeck,
    fetchDeckById,
    hasFetchedDecks,
    setHasUpdatedDecks,
    updateDeck,
    decks: allDecks,
  } = useManager();
  const { setActiveFormSchema } = useFormManagement();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);
  const [loadingState, setLoadingState] = useState({});
  const [decks, setDecks] = useState(allDecks);
  useEffect(() => {
    const initFetch = async () => {
      const loadedDecks = await fetchDecks();
      setDecks(loadedDecks);
      const storedDeckId = localStorage.getItem('selectedDeckId');
      const initialDeck = loadedDecks?.find(
        (deck) => deck._id === storedDeckId
      );
      if (initialDeck) {
        setActiveTab(initialDeck ? loadedDecks?.indexOf(initialDeck) : 0);
        handleSelectDeck(initialDeck); // Ensure the deck is selected in context or state
      } else {
        setActiveTab(0);
        handleSelectDeck(allDecks[0]);
        // handleSelectDeck(null);
      }
    };
    if (!hasFetchedDecks) {
      initFetch();
    }
  }, [hasFetchedDecks]);
  const handleDelete = useCallback(
    async (deck) => {
      try {
        await deleteDeck(deck?._id);
      } catch (error) {
        console.error('Failed to delete deck:', error);
      }
    },
    [deleteDeck]
  );
  const handleEdit = useCallback(
    async (formData) => {
      console.log('FORM DATA:', formData);
      const selectedDeckId = localStorage.getItem('selectedDeckId');
      const deck = decks?.find((deck) => deck._id === selectedDeckId);
      setLoadingState((prev) => ({
        ...prev,
        [deck._id]: true,
      }));
      try {
        const updatedDeck = await updateDeck(formData);
        setLoadingState((prev) => ({
          ...prev,
          [deck._id]: false,
        }));
        handleSelectDeck(updatedDeck);
      } catch (error) {
        setLoadingState((prev) => ({
          ...prev,
          [deck._id]: false,
        }));
        console.error('Failed to update deck:', error);
      }
    },
    [fetchDeckById, handleSelectDeck]
  );
  const handleDeckLoaded = useCallback((deckId) => {
    setLoadingState((prev) => ({
      ...prev,
      [deckId]: false,
    }));
  }, []);
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'selectedDeckId' || event.key === 'selectedDeck') {
        const updatedDeckId = event.newValue;
        const updatedDeck = decks?.find((deck) => deck._id === updatedDeckId);
        if (updatedDeck) {
          setActiveTab(decks?.indexOf(updatedDeck));
          handleSelectDeck(updatedDeck);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [decks, handleSelectDeck]);
  const handleChangeTab = useCallback(
    async (event, newValue) => {
      setActiveTab(newValue);
      const deckValue = decks[newValue];
      if (deckValue) {
        setLoadingState((prev) => ({
          ...prev,
          [deckValue._id]: true,
        }));
        const selectedDeck = await fetchDeckById(deckValue?._id);
        localStorage.setItem('selectedDeckId', selectedDeck._id);
        handleSelectDeck(selectedDeck);
        handleDeckLoaded(selectedDeck._id);
      } else {
        console.error('Selected deck is undefined.');
      }
    },
    [decks, handleSelectDeck, fetchDeckById, handleDeckLoaded]
  );
  const deckListItems = useMemo(
    () =>
      decks?.map((deck, index) => (
        <Collapse in={activeTab === index} key={`${deck?._id}-${index}`}>
          <DeckListItem
            deck={deck}
            selectedDeckId={localStorage.getItem('selectedDeckId')}
            handleDelete={() => handleDelete(deck)}
            isEditPanelOpen={
              localStorage.getItem('selectedDeckId') === deck._id
            }
            updateDeckDetails={handleEdit}
            activeItem={activeTab === index}
            handleSelectAndShowDeck={() => handleSelectDeck(deck)}
            handleDeckLoaded={() => handleDeckLoaded(deck?._id)}
            isLoading={loadingState[deck?._id]}
            setLoadingState={setLoadingState}
          />
        </Collapse>
      )),
    [
      decks,
      activeTab,
      handleDelete,
      handleSelectDeck,
      handleDeckLoaded,
      loadingState,
      setLoadingState,
    ]
  );
  return (
    <MDBox theme={theme} sx={{ flexGrow: 1 }}>
      <DashBoardLayout>
        <Grid container>
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
                type={'Deck Collection'}
                action={{ route: '', tooltip: 'Add Deck' }}
                username={user.username}
                handleOpenDialog={() => {
                  setActiveFormSchema('addDeckForm');
                  openDialog('isAddDeckDialogOpen');
                }}
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
                theme={theme}
                textColor="primary"
              >
                {decks?.map((deck, index) => (
                  <Tab
                    label={
                      loadingState[deck?._id] ? (
                        <CircularProgress size={20} />
                      ) : (
                        <span>{deck?.name}</span>
                      )
                    }
                    value={index}
                    key={`deck-tab-${deck?._id}-${index}`}
                    theme={theme}
                    textColor="primary"
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
              {deckListItems[activeTab]}
            </DashboardBox>
          </Grid>
        </Grid>
      </DashBoardLayout>
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
