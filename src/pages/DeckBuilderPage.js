import React, { useEffect, useState, useContext } from 'react';
import { useDeckStore } from '../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { Box, Grid, Typography } from '@mui/material';
import { ModalContext } from '../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import {
  DisplayGrid,
  GridContainer,
  RootGrid,
  SearchGrid,
} from './pageStyles/StyledComponents';
import { useUserContext } from '../context/UserContext/UserContext';
import { usePageContext } from '../context/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DeckSearch from '../components/other/search/DeckSearch';
import DeckDisplay from '../layout/deck/DeckDisplay';
import { useMode } from '../context';

const DeckBuilderPage = () => {
  const [userDecks, setUserDecks] = useState([]);
  const { theme } = useMode();
  const { fetchAllDecksForUser, allDecks, setSelectedDeck, selectedDeck } =
    useDeckStore();
  const { logPageData, loadingStatus, returnDisplay, setLoading } =
    usePageContext();
  const { userId } = useUserContext();
  const { isModalOpen, modalContent } = useContext(ModalContext);
  const heroBannerHeight = {
    xs: '10vh', // 10% for extra-small screens
    sm: '15vh', // 20% for small screens and up
    md: '20vh', // 25% for medium screens and up
    lg: '25vh', // 30% for large screens and up
  };

  const deckBuilderHeight = {
    xs: '90vh', // 90% for mobile screens
    sm: '85vh', // 80% for small screens and up
    md: '80vh', // 75% for medium screens and up
    lg: '75vh', // 70% for large screens and up
  };
  useEffect(() => {
    setLoading('isPageLoading', true);

    fetchAllDecksForUser().catch((err) =>
      console.error('Failed to get all decks:', err)
    );

    if (!selectedDeck) {
      setSelectedDeck(userDecks[0]);
    }

    setLoading('isPageLoading', false);
  }, [fetchAllDecksForUser]);

  useEffect(() => {
    if (allDecks && userId && typeof userId === 'string') {
      const filteredDecks = allDecks?.filter((deck) => deck?.userId === userId);
      // logPageData('DeckBuilderPage', filteredDecks);
      setUserDecks(filteredDecks);
    }
  }, [userId]);
  // Function to render the Hero banner
  const renderHeroBanner = () => (
    <Grid item xs={12} sx={{ height: heroBannerHeight, width: '100vw' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          margin: 'auto',
          flexGrow: 1,
        }}
      >
        <HeroCenter
          title="Welcome to Deck Builder"
          subtitle="Craft, refine, and explore your deck strategies in one place."
        />
      </Box>
    </Grid>
  );
  // Function to render the deck builder's main content
  const renderDeckBuilderContent = () => (
    <Grid item xs={12} sx={{ height: deckBuilderHeight }}>
      <Box
        sx={{
          height: '100%',
          overflow: 'auto', // Add scroll for overflow content
          padding: theme.spacing(3),
          backgroundColor: theme.palette.backgroundB.default,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.text.primary,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DeckSearch />
          </Grid>
          <Grid item xs={12} md={6}>
            <DeckDisplay />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
  // Function to render the Hero banner
  // const renderHeroBanner = () => (
  //   <>
  //     {/* <DeckBuilderBanner theme={theme}> */}
  //     {/* <Container> */}
  //     <HeroCenter
  //       title="Welcome to Deck Builder"
  //       subtitle="Craft, refine, and explore your deck strategies in one place."
  //     />
  //     {/* </Container> */}
  //     {/* </DeckBuilderBanner> */}
  //   </>
  // );

  // Function to render the deck search section
  // const renderDeckSearch = () => (
  //   <SearchGrid item xs={12} md={6} lg={5}>
  //     <DeckSearch />
  //   </SearchGrid>
  // );

  // // Function to render the deck display section
  // const renderDeckDisplay = () => (
  //   <DisplayGrid item xs={12} md={6} lg={7}>
  //     <DeckDisplay />
  //   </DisplayGrid>
  // );

  // Function to render the deck builder's main content
  // const renderDeckBuilderContent = () => (
  //   <GridContainer container theme={theme}>
  //     <Grid
  //       item
  //       xs={12}
  //       sx={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'center',
  //         padding: theme.spacing(3),
  //         height: '100%',
  //         minHeight: '100%',
  //         backgroundColor: theme.palette.backgroundB.default,
  //         borderRadius: theme.shape.borderRadius,
  //         color: theme.palette.text.primary,
  //       }}
  //     >
  //       <RootGrid container theme={theme}>
  //         {renderDeckSearch()}
  //         {renderDeckDisplay()}
  //       </RootGrid>
  //     </Grid>
  //   </GridContainer>
  // );

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
    <Grid container sx={{ height: '100vh', width: '100vw', p: 0 }}>
      {loadingStatus?.isPageLoading && returnDisplay()}
      {renderCardDialog()}

      {renderHeroBanner()}
      {renderDeckBuilderContent()}
    </Grid>
  );
};

export default DeckBuilderPage;
{
  /* <React.Fragment>
<Grid container spacing={3}>
  {loadingStatus?.isPageLoading && returnDisplay()}
  {renderCardDialog()}

  <Grid item>{renderHeroBanner()}</Grid>
  <Grid item>{renderDeckBuilderContent()}</Grid>
</Grid>
</React.Fragment> */
}
