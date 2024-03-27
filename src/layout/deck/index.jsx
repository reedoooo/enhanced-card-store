import { Card, Collapse, Grid, Tab, Tabs } from '@mui/material';
import { useMode } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../REUSABLE_COMPONENTS/PageLayout';
import SearchComponent from '../../components/forms/search/SearchComponent';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import DeckPageHeader from './DeckPageHeader';
import useDialogState from '../../context/hooks/useDialogState';
import DeckDialog from '../../components/dialogs/DeckDialog';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
import useLocalStorage from '../../context/hooks/useLocalStorage';
import { DeckListItemSkeleton } from '../REUSABLE_COMPONENTS/SkeletonVariants';
import DeckListItem from './DeckListItem';
import useDeckManager from '../../context/MAIN_CONTEXT/DeckContext/useDeckManager';
import RCHeader from '../REUSABLE_COMPONENTS/RCHeader';
import DashboardLayout from '../REUSABLE_COMPONENTS/DashBoardLayout';
import RCCardList from '../REUSABLE_COMPONENTS/RCCARDLIST/RCCardList';
import FlexBetween from '../REUSABLE_COMPONENTS/FlexBetween';

const DeckBuilder = () => {
  const { theme } = useMode();
  const { selectedDeck, selectedDeckId, allDecks, updateDeck, allIds } =
    useSelectedDeck();
  const { fetchDecks } = useDeckManager();
  const [showAllDecks, setShowAllDecks] = useState(false);
  const { dialogState, openDialog, closeDialog } = useDialogState({
    isEditDeckDialogOpen: false,
    isAddDeckDialogOpen: false,
  });
  // const toggleDeckVisibility = () => setShowAllDecks(!showAllDecks);
  const [decks, setDecks] = useLocalStorage('decks', {});
  const [deckList, setDeckList] = useState([]);
  const [openEditorDeckId, setOpenEditorDeckId] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [<Tab label="Collections" value={0} key={'collections-tab'} />];
  if (selectedDeckId) {
    tabs.push(<Tab label="Portfolio View" value={1} key={'portfolio-tab'} />);
  }
  const handleChange = (event, newValue) => {
    if (newValue === 0 || (newValue === 1 && selectedDeckId)) {
      setActiveTab(newValue);
    }
  };
  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleSelectAndShowDeck = useCallback(
    (deckId) => {
      setOpenEditorDeckId(openEditorDeckId === deckId ? null : deckId);
      setActiveTab(1); // Switch to Portfolio View tab
    },
    [openEditorDeckId]
  );
  const numDecks = allIds?.length || 0;
  const nonSkeletonCount = useRef(0);

  useEffect(() => {
    if (!decks?.byId) return;

    const minItems = 5;
    const numRequired = minItems - numDecks > 0 ? minItems - numDecks : 0;
    nonSkeletonCount.current = numDecks;

    // Map decks to include an 'action' property
    const allSkeletonDecks = [...Array(numRequired).keys()].map((index) => ({
      component: (
        <DeckListItemSkeleton
          key={`skeleton-${index}`}
          count={1}
          index={index}
        />
      ),
      action: null, // Skeletons don't have an action
    }));

    const combinedDecks = allDecks
      ?.map((deck, index) => ({
        component: (
          <Collapse key={deck?._id || `deck-${index}`}>
            <Card>
              <DeckListItem
                deck={deck}
                cards={deck?.cards}
                isEditPanelOpen={openEditorDeckId === deck._id}
                handleSelectAndShowDeck={() => handleSelectAndShowDeck(deck)}
              />{' '}
            </Card>
          </Collapse>
        ),
        action: () => handleSelectAndShowDeck(deck._id), // Here we include the action
        key: deck?._id || `deck-${index}`,
        name: deck?.name,
        description: deck?.description,
        tags: deck?.tags,
        color: deck?.color,
        cards: deck?.cards,
        image: deck?.cards?.image,
      }))
      .concat(allSkeletonDecks);

    setDeckList(combinedDecks);
  }, [decks, showAllDecks, openEditorDeckId, handleSelectAndShowDeck]);

  const preparedDecksData = deckList?.map((deck, index) => ({
    ...deck,
    action: () => handleSelectAndShowDeck(deck._id),
  }));
  return (
    <MDBox theme={theme} sx={{ flexGrow: 1 }}>
      <DashboardLayout>
        <Grid container>
          <Grid item xs={12}>
            <DeckPageHeader
              openAddDeckDialog={() => openDialog('isAddDeckDialogOpen')}
            />
            <SearchComponent pageContext="Deck" />
          </Grid>
          <Grid item xs={12}>
            <Tabs
              value={activeTab}
              onChange={handleChangeTab}
              aria-label="deck-tabs"
            >
              <Tab label="Search View" value={0} />
              {selectedDeckId && <Tab label="Deck View" value={1} />}
            </Tabs>
          </Grid>
          {activeTab === 0 &&
            allDecks?.map((deck) => (
              <Grid item xs={12} key={deck._id}>
                {selectedDeck && (
                  <DeckListItem
                    deck={selectedDeck}
                    isEditPanelOpen={true}
                    handleSelectAndShowDeck={() => setActiveTab(0)}
                  />
                )}
              </Grid>
            ))}
          {activeTab === 1 && (
            <Grid item xs={12}>
              <DeckListItem
                deck={allDecks.find((deck) => deck._id === openEditorDeckId)}
                isEditPanelOpen={true}
                handleSelectAndShowDeck={() => setActiveTab(1)}
              />
            </Grid>
          )}
        </Grid>
      </DashboardLayout>

      {/* <DashboardLayout>
        <MDBox
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            minHeight: '100vh',
            overflow: 'auto', // Ensures content can scroll if it exceeds the container's height
          }}
        >
          <Grid
            container
            spacing={1}
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
                  openAddDeckDialog={() => openDialog('isAddDeckDialogOpen')}
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
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <DeckPageHeader
                      openAddDeckDialog={() =>
                        openDialog('isAddDeckDialogOpen')
                      }
                      decks={decks}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Tabs
                      value={activeTab}
                      onChange={handleChange}
                      aria-label="deck tabs"
                    >
                      {tabs}
                    </Tabs>
                    {activeTab === 1 &&
                      openEditorDeckId &&
                      deckList?.map((deck, index) => (
                        <Collapse key={deck?._id || `deck-${index}`} in={true}>
                          <Card>
                            <DeckListItem
                              deck={deck}
                              cards={deck?.cards}
                              isEditPanelOpen={openEditorDeckId === deck._id}
                              handleSelectAndShowDeck={() =>
                                handleSelectAndShowDeck(deck._id)
                              }
                            />
                          </Card>
                        </Collapse>
                      ))}
                  </Grid>
                </Grid>
              </DashboardBox>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout> */}

      <DeckDialog
        open={dialogState.isEditDeckDialogOpen}
        onClose={() => closeDialog('isEditDeckDialogOpen')}
        deckData={selectedDeck}
        isNew={false}
      />
      <DeckDialog
        open={dialogState.isAddDeckDialogOpen}
        onClose={() => closeDialog('isAddDeckDialogOpen')}
        deckData={null} // Assuming new deck dialog doesn't need deck data
        isNew={true}
      />
    </MDBox>
  );
};

export default DeckBuilder;
