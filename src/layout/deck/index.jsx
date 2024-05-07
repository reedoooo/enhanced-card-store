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
import { debounce } from 'lodash';

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
    setHasFetchedDecks,
    decks: allDecks,
  } = useManager();
  const { setActiveFormSchema } = useFormManagement();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);
  const [decks, setDecks] = useState(allDecks || []);
  const [loadingState, setLoadingState] = useState({
    global: false,
    individual: {},
  });
  useEffect(() => {
    setLoadingState((prev) => ({
      ...prev,
      individual: decks.reduce((acc, deck) => {
        acc[deck._id] = false;
        return acc;
      }, {}),
    }));
  }, [decks]);
  const handleSetLoadingState = useCallback((deckId, isLoading) => {
    setLoadingState((prev) => ({
      ...prev,
      individual: {
        ...prev.individual,
        [deckId]: isLoading,
      },
      global: isLoading ? isLoading : prev.global,
    }));

    if (isLoading) {
      setTimeout(() => {
        setLoadingState((prev) => ({
          ...prev,
          individual: {
            ...prev.individual,
            [deckId]: false,
          },
          global: Object.values(prev.individual).some((v) => v)
            ? prev.global
            : false,
        }));
      }, 1000); // 5 minutes
    }
  }, []);
  const handleDebounceDecks = useCallback(
    debounce((data) => {
      console.log('NEW DECKS VALUE:', data);
      setLoadingState((prev) => ({ ...prev, global: true }));
      setDecks(data);
    }, 500),
    []
  );
  useEffect(() => {
    const initFetch = async () => {
      setLoadingState((prev) => ({
        global: true,
        ...prev.individual,
      }));
      try {
        const loadedDecks = await fetchDecks();
        handleDebounceDecks(loadedDecks);
        const storedDeckId = localStorage.getItem('selectedDeckId');
        const initialDeck = loadedDecks?.find(
          (deck) => deck._id === storedDeckId
        );
        if (initialDeck) {
          setActiveTab(loadedDecks?.indexOf(initialDeck));
          handleSelectDeck(initialDeck); // Ensure the deck is selected in context or state
        } else {
          setActiveTab(0);
          handleSelectDeck(loadedDecks[0]);
        }
      } catch (error) {
        console.error('Failed to fetch decks:', error);
        setLoadingState((prev) => ({
          ...prev,
          global: false,
        }));
      } finally {
        setLoadingState((prev) => ({
          ...prev,
          global: false,
        }));
      }
    };
    if (!hasFetchedDecks) {
      initFetch();
      setHasFetchedDecks(true);
    }
  }, [hasFetchedDecks, handleDebounceDecks, fetchDecks, handleSelectDeck]);
  const handleDelete = useCallback(
    async (deck) => {
      const id = deck?._id;
      handleSetLoadingState(id, true);

      try {
        await deleteDeck(deck?._id);
      } catch (error) {
        console.error('Failed to delete deck:', error);
      } finally {
        handleSetLoadingState(id, false);
        setHasUpdatedDecks(true);
      }
    },
    [deleteDeck, handleSetLoadingState, setHasUpdatedDecks]
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'selectedDeckId' || event.key === 'selectedDeck') {
        const updatedDeckId = localStorage.getItem('selectedDeckId');
        handleSetLoadingState(updatedDeckId, true);
        const updatedDeck = decks?.find((deck) => deck._id === updatedDeckId);
        if (updatedDeck) {
          setActiveTab(decks?.indexOf(updatedDeck));
          handleSelectDeck(updatedDeck);
        }
        handleSetLoadingState(updatedDeckId, false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [decks, handleSelectDeck, handleSetLoadingState]);

  const handleChangeTab = useCallback(
    async (event, newValue) => {
      setActiveTab(newValue);
      const deckValue = decks[newValue];
      const id = deckValue?._id;
      if (deckValue) {
        handleSetLoadingState(id, true);
        const selectedDeck = await fetchDeckById(deckValue?._id);
        // localStorage.setItem('selectedDeckId', selectedDeck._id);
        handleSelectDeck(selectedDeck);
        handleSetLoadingState(id, false);
      } else {
        console.error('Selected deck is undefined.');
      }
    },
    [decks, handleSelectDeck, fetchDeckById, handleSetLoadingState]
  );
  const deckListItems = useMemo(
    () =>
      decks?.map((deck, index) => (
        <Collapse in={activeTab === index} key={`${deck?._id}-${index}`}>
          <DeckListItem
            deck={deck}
            handleDelete={() => handleDelete(deck)}
            isEditPanelOpen={
              localStorage.getItem('selectedDeckId') === deck._id
            }
            isLoading={loadingState?.individual[deck?._id] ? true : false}
          />
        </Collapse>
      )),
    [decks, activeTab, handleDelete, loadingState]
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
                      loadingState?.individual[deck?._id] === true ? (
                        <CircularProgress size={20} color="success" />
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
