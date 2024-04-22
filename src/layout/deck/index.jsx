import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { useLoading } from '../../context/hooks/useLoading';

const DeckBuilder = () => {
  const { theme } = useMode();
  const { hasFetchedDecks, fetchDecks, deleteDeck } = useDeckManager();
  const { user } = useUserData();
  const {
    selectedDeckId,
    selectedDeck,
    lastUpdated,
    allDecks,
    deckUpdated,
    decks,
    loading,
    handleSelectDeck,
    refreshDecks,
  } = useSelectedDeck();
  const { isLoading } = useLoading();
  // const { allDecks } = prepareDeckData(selectedDeckId);
  const { setActiveFormSchema } = useFormManagement();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const handleOpenAddDialog = useCallback(() => {
    setActiveFormSchema('addDeckForm');
    openDialog('isAddDeckDialogOpen');
  }, [openDialog, setActiveFormSchema]);
  const [activeTab, setActiveTab] = useState(0);
  const [allDecksLoading, setAllDecksLoading] = useState(false);
  const [loadingState, setLoadingState] = useState({});
  const [safeDeckList, setSafeDeckList] = useState([]);
  const prevSelectedDeckId = useRef(null); // Store the previous deck ID
  const handleDeckLoaded = useCallback((deckId) => {
    setLoadingState((prev) => ({ ...prev, [deckId]: false }));
  }, []);
  useEffect(() => {
    if (!hasFetchedDecks) {
      fetchDecks();
      setActiveTab(0);
    }
  }, []);
  useEffect(() => {
    const handleStorageChange = () => {
      const newData = JSON.parse(localStorage.getItem('decks') || '{}');
      if (newData !== decks && newData.lastUpdated !== decks.lastUpdated) {
        const newAllDecks = Object.values(newData.byId);
        setSafeDeckList(newAllDecks);
        refreshDecks();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  useEffect(() => {
    setActiveTab((prevActiveTab) => {
      const newIndex = Math.min(prevActiveTab, safeDeckList.length - 1);
      return newIndex >= 0 ? newIndex : 0; // Ensure that the index is always non-negative
    });
  }, [safeDeckList.length]); // Update activeTab when the length of safeDeckList changes
  useEffect(() => {
    if (prevSelectedDeckId.current !== selectedDeckId) {
      prevSelectedDeckId.current = selectedDeckId;
    }
  }, [selectedDeckId]);
  // useEffect(() => {
  //   if (isLoading('fetchDecks')) {
  //     setAllDecksLoading(true);
  //   }
  //   if (!isLoading('fetchDecks')) {
  //     setAllDecksLoading(false);
  //   }
  // }, [isLoading('fetchDecks')]);
  const handleChangeTab = useCallback(
    (event, newValue) => {
      setActiveTab(newValue);
      const newDeck = safeDeckList[newValue];
      handleSelectDeck(newDeck);

      if (!loadingState[newDeck._id]) {
        setLoadingState((prev) => ({ ...prev, [newDeck._id]: true })); // Set loading for the new tab
      }
    },
    [safeDeckList, handleSelectDeck, loadingState]
  );

  // const handleChangeTab = useCallback(
  //   (event, newValue) => {
  //     setActiveTab(newValue);
  //     handleSelectDeck(safeDeckList[newValue]);
  //     // setLoadingState((prev) => ({
  //     //   ...prev,
  //     //   [safeDeckList[newValue]._id]: true,
  //     // }));
  //     // setLoadingState((prev) => ({ ...prev, [newValue]: true })); // Set loading to true for the new tab
  //   },
  //   [safeDeckList, handleSelectDeck]
  // );

  const handleDelete = useCallback(
    async (deck) => {
      if (!deck) return;
      try {
        await deleteDeck(deck._id);
        const updatedDecks = safeDeckList.filter((col) => col._id !== deck._id);
        console.log('UPDATED DECKS', updatedDecks);
        // refreshDecks(updatedCollections); // Assuming refreshCollections now directly accepts an updated array
      } catch (error) {
        console.error('Failed to delete collection:', error);
      }
    },
    [deleteDeck]
  );
  const deckTabs = safeDeckList?.map((deck, index) => (
    <Tab
      label={
        loadingState[deck._id] ? <CircularProgress size={20} /> : deck.name
      }
      value={index}
      key={deck._id || `deck-tab-${index}`}
    />
  ));
  const deckList = safeDeckList?.map((deck, index) => (
    <Collapse in={activeTab === index} key={deck._id}>
      <DeckListItem
        // key={deck._id}
        deck={deck}
        selectedDeckId={selectedDeckId}
        handleDelete={() => handleDelete(deck)}
        isEditPanelOpen={selectedDeckId === deck._id}
        activeItem={activeTab === index}
        handleSelectAndShowDeck={() => handleSelectDeck(deck)}
        handleDeckLoaded={() => handleDeckLoaded(deck?._id)}
        loadingState={loadingState[deck?._id]}
      />
    </Collapse>
  ));
  // useEffect(() => {
  //   // Simulate deck loading process
  //   if (selectedDeckId && loadingState[selectedDeckId]) {
  //     setLoadingState((prev) => ({
  //       ...prev,
  //       [selectedDeckId]: true,
  //     }));
  //     setTimeout(() => handleDeckLoaded(selectedDeckId), 2000); // Simulate fetching time
  //   }
  // }, [selectedDeckId, loadingState, handleDeckLoaded]);

  // useEffect(() => {
  //   if (selectedDeckId) {
  //     setLoadingState((prev) => ({ ...prev, [selectedDeckId]: true }));
  //     // setLoadingState((prev) => ({ ...prev, [newValue]: true })); // Set loading to true for the new tab
  //     console.log(`LOADING DECK ${selectedDeckId}`);
  //     // setLoadingState((prev) => ({ ...prev, [selectedDeckId]: true }));
  //   }

  //   // if (prevSelectedDeckId.current !== selectedDeckId) {
  //   //   setLoadingState((prev) => ({ ...prev, [selectedDeckId]: true }));
  //   //   // setLoadingState((prev) => ({ ...prev, [newValue]: true })); // Set loading to true for the new tab
  //   //   console.log(`LOADING DECK ${selectedDeckId}`);
  //   //   // setLoadingState((prev) => ({ ...prev, [selectedDeckId]: true }));
  //   // }
  // }, [selectedDeckId]);

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
              {/* <Tabs
                value={activeTab}
                onChange={handleChangeTab}
                aria-label="deck-tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                {safeDeckList?.map((deck, index) => (
                  <Tab
                    // label={deck.name}
                    label={
                      loadingState[deck._id] ? (
                        <CircularProgress size={20} />
                      ) : (
                        deck.name
                      )
                    }
                    value={index}
                    key={deck._id || `deck-tab-${index}`}
                  />
                ))}
              </Tabs> */}
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
