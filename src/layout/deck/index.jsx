import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Card,
  Collapse,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';
import { useMode } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import DashboardLayout from '../REUSABLE_COMPONENTS/layout-utils/DashBoardLayout';
import SearchComponent from '../../components/forms/search/SearchComponent';
import DeckDialog from '../../components/dialogs/DeckDialog';
import useDialogState from '../../context/hooks/useDialogState';
import DeckListItem from './DeckListItem';
import DashboardBox from '../REUSABLE_COMPONENTS/layout-utils/DashboardBox';
import PageHeader from '../REUSABLE_COMPONENTS/layout-utils/PageHeader';
import useUserData from '../../context/MAIN_CONTEXT/UserContext/useUserData';
import { useFormManagement } from '../../components/forms/hooks/useFormManagement';
import useManager from '../../context/useManager';

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
  const [loadingState, setLoadingState] = useState({});
  const [decks, setDecks] = useState([]);
  // const selected = localStorage.getItem('selectedDeck');
  // const selectedDeck = JSON.parse(selected);
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
        // handleSelectDeck(initialDeck); // Ensure the deck is selected in context or state
      }
    };
    if (!hasFetchedDecks) {
      initFetch();
    }
  }, [hasFetchedDecks]);
  const handleDelete = useCallback(
    async (deckId) => {
      try {
        await deleteDeck(deckId);
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
    })); // Set loading state to false when deck is fully loaded
  }, []);
  const handleOpenAddDialog = useCallback(() => {
    setActiveFormSchema('addDeckForm');
    openDialog('isAddDeckDialogOpen');
  }, [openDialog, setActiveFormSchema]);

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
      // if (event.key === 'selectedDeck') {
      //   const updatedDeck = JSON.parse(event.newValue);
      //   handleSelectDeck(updatedDeck);
      // }
      if (event.key === 'decks') {
        const updatedDecks = JSON.parse(event.newValue);
        setDecks(updatedDecks);
        setHasUpdatedDecks(true);
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
          [deckValue._id]: true, // Set loading state to true immediately
        }));
        const selectedDeck = await fetchDeckById(deckValue?._id);
        // localStorage.setItem('selectedDeckId', selectedDeck._id);
        handleSelectDeck(selectedDeck);
        handleDeckLoaded(selectedDeck._id);
      } else {
        console.error('Selected deck is undefined.');
      }
    },
    [decks, handleSelectDeck, fetchDeckById, handleDeckLoaded]
  );
  const deckTabs = decks?.map((deck, index) => (
    <Tab
      label={
        loadingState[deck?._id] ? <CircularProgress size={20} /> : deck.name
      }
      value={index}
      key={`deck-tab-${deck?._id}-${index}`}
    />
  ));
  const deckListItems = useMemo(
    () =>
      decks?.map((deck, index) => (
        <Collapse in={activeTab === index} key={`${deck?._id}-${index}`}>
          <DeckListItem
            // key={deck._id}
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
                {deckTabs}
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
