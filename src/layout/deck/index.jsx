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
    decks: allDecks,
    hasFetchedDecks,
    handleSelectDeck,
    selectedDeckId,
    fetchDeckById,
  } = useManager();
  const { setActiveFormSchema } = useFormManagement();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);
  const [loadingState, setLoadingState] = useState({});
  useEffect(() => {
    if (!hasFetchedDecks) {
      fetchDecks();
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
  const handleChangeTab = useCallback(
    async (event, newValue) => {
      const newDeck = allDecks[newValue];
      if (newDeck) {
        setActiveTab(newValue);
        setLoadingState((prev) => ({
          ...prev,
          [newDeck._id]: true, // Set loading state to true immediately
        }));

        // Fetch deck details from the API
        const deckDetails = await fetchDeckById(newDeck?._id);
        if (deckDetails) {
          handleSelectDeck(deckDetails); // Update the selected deck in state
          console.log('NEW SELECTED DECK', deckDetails);
        } else {
          console.error('Failed to fetch deck details.');
        }

        handleDeckLoaded(newDeck._id);
      } else {
        console.error('Selected deck is undefined.');
      }
    },
    [allDecks, handleSelectDeck, fetchDeckById, handleDeckLoaded]
  );
  const deckTabs = allDecks?.map((deck, index) => (
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
      allDecks.map((deck, index) => (
        <Collapse in={activeTab === index} key={`${deck?._id}-${index}`}>
          <DeckListItem
            // key={deck._id}
            deck={deck}
            selectedDeckId={selectedDeckId}
            handleDelete={() => handleDelete(deck)}
            isEditPanelOpen={selectedDeckId === deck?._id}
            activeItem={activeTab === index}
            handleSelectAndShowDeck={() => handleSelectDeck(deck)}
            handleDeckLoaded={() => handleDeckLoaded(deck?._id)}
            loadingState={loadingState[deck?._id]}
            setLoadingState={setLoadingState}
          />
        </Collapse>
      )),
    [
      allDecks,
      activeTab,
      selectedDeckId,
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
