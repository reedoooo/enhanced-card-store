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
import DashboardLayout from '../REUSABLE_COMPONENTS/layout-utils/DashBoardLayout';
import SearchComponent from '../../components/forms/search/SearchComponent';
import DeckDialog from '../../components/dialogs/DeckDialog';
import useDialogState from '../../context/hooks/useDialogState';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
import DeckListItem from './DeckListItem';
import DashboardBox from '../REUSABLE_COMPONENTS/layout-utils/DashboardBox';
import PageHeader from '../REUSABLE_COMPONENTS/layout-utils/PageHeader';
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
  const { setActiveFormSchema } = useFormManagement();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);
  const [loadingState, setLoadingState] = useState({});
  const [safeDeckList, setSafeDeckList] = useState([]);
  const [error, setError] = useState(null);
  const decksRef = useRef([]);
  useEffect(() => {
    if (!hasFetchedDecks) {
      // decksRef.current = allDecks;
      fetchDecks();
      setSafeDeckList(allDecks);
      console.log('DECKS REF', decksRef.current);
      // fetchDecks();
    }
  }, [hasFetchedDecks]);
  const handleDelete = useCallback(
    async (deck) => {
      if (!deck) return;
      try {
        deleteDeck(deck?._id);
        const updatedDecks = safeDeckList.filter((col) => col._id !== deck._id);
        setSafeDeckList((prev) => updatedDecks);
        console.log('UPDATED DECKS', updatedDecks);
        // refreshDecks(updatedCollections); // Assuming refreshCollections now directly accepts an updated array
      } catch (error) {
        console.error('Failed to delete collection:', error);
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
  const deckTabs = safeDeckList?.map((deck, index) => (
    <Tab
      label={
        loadingState[deck?._id] ? <CircularProgress size={20} /> : deck.name
      }
      value={index}
      key={`deck-tab-${deck?._id}-${index}`}
    />
  ));
  const deckList = safeDeckList?.map((deck, index) => (
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
  ));
  const handleOpenAddDialog = useCallback(() => {
    setActiveFormSchema('addDeckForm');
    openDialog('isAddDeckDialogOpen');
  }, [openDialog, setActiveFormSchema]);
  const handleChangeTab = useCallback(
    (event, newValue) => {
      const newDeck = safeDeckList[newValue];
      if (newDeck) {
        setActiveTab(newValue);
        console.log('Tab changed to:', newValue);
        setLoadingState((prev) => ({
          ...prev,
          [newDeck._id]: true, // Assuming _id is always available; handle cases where it might not be
        }));
        decksRef.current[newValue] = newDeck;
        handleSelectDeck(newDeck);
        console.log('NEW SELECTED DECK', newDeck);
        // console.log('DECKS REF', decksRef.current);
        if (!loadingState[newDeck._id]) {
          setTimeout(() => handleDeckLoaded(newDeck._id), 2000); // Simulate loading
        }
      } else {
        console.error('Selected deck is undefined.');
      }
      // if (!loadingState[newDeck._id]) {
      //   setLoadingState((prev) => ({ ...prev, [newDeck._id]: true })); // Set loading true for the new tab
      //   setTimeout(() => handleDeckLoaded(newDeck._id), 2000); // Simulate fetching time
      // }
    },
    [safeDeckList, handleSelectDeck]
  );
  const handleStorageChange = () => {
    const rawData = localStorage.getItem('decks');
    let newData = { byId: {} };

    try {
      newData = rawData ? JSON.parse(rawData) : newData;
    } catch (e) {
      console.error('Failed to parse decks data:', e);
      setError('Failed to load decks from storage.');
      return;
    }

    if (newData && typeof newData.byId === 'object') {
      const newAllDecks = Object.values(newData.byId).filter(
        (deck) => deck && deck._id !== undefined
      );

      if (!newAllDecks.length) {
        setError('No decks found in storage.');
        return;
      }

      decksRef.current = newAllDecks;
      setSafeDeckList(newAllDecks);
      refreshDecks();
    } else {
      setError('Invalid or corrupted deck data.');
    }
  };
  useEffect(() => {
    // const handleStorageChange = () => {
    //   const newData = JSON.parse(localStorage.getItem('decks') || '{}');
    //   // if (decksRef.current[0]?.userId !== null) {
    //   //   setSafeDeckList(Object.values(newData?.byId));
    //   // } else {
    //   //   setSafeDeckList(
    //   //     Object.values(newData?.byId).filter(
    //   //       (deck) => deck?.userId === user?._id
    //   //     )
    //   //   );
    //   // }
    //   if (newData !== decks && newData?.lastUpdated !== decks.lastUpdated) {
    //     const newAllDecks = Object.values(newData?.byId).filter(
    //       (deck) => deck._id !== undefined
    //     );
    //     if (!newAllDecks.length) {
    //       setError('No decks found in storage.');
    //       return;
    //     }
    //     decksRef.current = newAllDecks;
    //     setSafeDeckList(newAllDecks);
    //     refreshDecks();
    //   }
    // };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  useEffect(() => {
    setActiveTab((prevActiveTab) => {
      const newIndex = Math.min(prevActiveTab, safeDeckList.length - 1);
      const newDeck = safeDeckList[newIndex];
      setLoadingState((prev) => ({
        ...prev,
        [newDeck?._id]: true,
      })); // Set loading state to true when selecting a new deck
      decksRef.current[newIndex] = newDeck;
      console.log('NEW DECK', newDeck);
      console.log('DECKS REF', decksRef.current);
      // handleSelectDeck(newDeck);
      if (!loadingState[newDeck?._id]) {
        setLoadingState((prev) => ({ ...prev, [newDeck?._id]: true })); // Set loading true for the new tab
        setTimeout(() => handleDeckLoaded(newDeck?._id), 2000); // Simulate fetching time
      }
      return newIndex >= 0 ? newIndex : 0; // Ensure that the index is always non-negative
    });
  }, [safeDeckList.length]);
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
