import React, { useEffect, useState, useContext } from 'react';
import { useDeckStore } from '../context/DeckContext/DeckContext';
import { Box, Grid, Typography } from '@mui/material';
import { ModalContext } from '../context/ModalContext/ModalContext';
import {
  DeckBuilderBanner,
  DisplayGrid,
  GridContainer,
  RootGrid,
  SearchGrid,
} from './pageStyles/StyledComponents';
import UserContext, {
  useUserContext,
} from '../context/UserContext/UserContext';
import { usePageContext } from '../context/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DeckSearch from '../components/other/search/DeckSearch';
import DeckDisplay from '../layout/deck/DeckDisplay';
import { useMode } from '../context';

const DeckBuilderPage = () => {
  const [userDecks, setUserDecks] = useState([]);
  const { theme } = useMode();
  const { fetchAllDecksForUser, allDecks } = useDeckStore();
  const { logPageData, loadingStatus, returnDisplay, setLoading } =
    usePageContext();
  const { user } = useUserContext();
  const { isModalOpen, modalContent } = useContext(ModalContext);
  const userId = user?.id;
  useEffect(() => {
    setLoading('isPageLoading', true);

    fetchAllDecksForUser().catch((err) =>
      console.error('Failed to get all decks:', err)
    );

    setLoading('isPageLoading', false);
  }, [fetchAllDecksForUser]);

  useEffect(() => {
    if (allDecks && userId && typeof userId === 'string') {
      const filteredDecks = allDecks?.filter((deck) => deck?.userId === userId);
      logPageData('DeckBuilderPage', filteredDecks);
      setUserDecks(filteredDecks);
    }
  }, [userId]);

  // Function to render the Hero banner
  const renderHeroBanner = () => (
    <>
      {/* <DeckBuilderBanner theme={theme}> */}
      {/* <Container> */}
      <HeroCenter
        title="Welcome to Deck Builder"
        subtitle="Craft, refine, and explore your deck strategies in one place."
      />
      {/* </Container> */}
      {/* </DeckBuilderBanner> */}
    </>
  );

  // Function to render the deck search section
  const renderDeckSearch = () => (
    <SearchGrid item xs={12} md={6} lg={5}>
      <DeckSearch />
    </SearchGrid>
  );

  // Function to render the deck display section
  const renderDeckDisplay = () => (
    <DisplayGrid item xs={12} md={6} lg={7}>
      <DeckDisplay />
    </DisplayGrid>
  );

  // Function to render the deck builder's main content
  const renderDeckBuilderContent = () => (
    <GridContainer container>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(3),
          height: '100%',
          minHeight: '100%',
          backgroundColor: theme.palette.backgroundB.default,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.text.primary,
        }}
      >
        <RootGrid container>
          {renderDeckSearch()}
          {renderDeckDisplay()}
        </RootGrid>
      </Grid>
    </GridContainer>
  );

  // Function to render the card dialog
  const renderCardDialog = () => {
    return (
      isModalOpen && (
        <GenericCardDialog
          open={isModalOpen}
          context={'Deck'}
          card={modalContent}
        />
      )
    );
  };

  return (
    <React.Fragment>
      {/* <Grid container spacing={3}> */}
      {loadingStatus?.isPageLoading && returnDisplay()}
      {renderHeroBanner()}
      {renderDeckBuilderContent()}
      {renderCardDialog()}
      {/* </Grid> */}
    </React.Fragment>
  );
};

export default DeckBuilderPage;
