import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Card,
  Collapse,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';
import { useMode } from 'context';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import DashBoardLayout from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/DashBoardLayout';
import SearchComponent from 'layout/search/SearchComponent';
import DeckDialog from 'layout/dialogs/DeckDialog';
import DeckListItem from './DeckListItem';
import DashboardBox from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/DashboardBox';
import PageHeader from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/PageHeader';
import useUserData from 'context/state/useUserData';
import useManager from 'context/state/useManager';
import { useDialogState, useFormManagement } from 'context/hooks';

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
  } = useManager();
  const { setActiveFormSchema } = useFormManagement();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [loadingState, setLoadingState] = useState({});
  const [decks, setDecks] = useState([]);
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
      // if (event.key === 'decks') {
      //   const updatedDecks = JSON.parse(event.newValue);
      //   setDecks(updatedDecks);
      //   setHasUpdatedDecks(true);
      // }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [decks, handleSelectDeck]);
  // }, [tabsOrientation]);
  const handleChangeTab = useCallback(
    async (event, newValue) => {
      setActiveTab(newValue);
      const deckValue = decks[newValue];
      if (deckValue) {
        setLoadingState((prev) => ({
          ...prev,
          [deckValue._id]: true, // Set loading state to true immediately
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
