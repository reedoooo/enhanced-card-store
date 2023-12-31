import React, { useEffect, useState, useContext } from 'react';
import { useDeckStore } from '../context/DeckContext/DeckContext';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import DeckBuilderContainer from '../containers/deckBuilderPageContainers/DeckBuilderContainer';
import { Box, Grid, Typography } from '@mui/material';
import { ModalContext } from '../context/ModalContext/ModalContext';
import { useMode } from '../context/hooks/colormode';
import { DeckBuilderBanner } from './pageStyles/StyledComponents';
import UserContext, {
  useUserContext,
} from '../context/UserContext/UserContext';
import { usePageContext } from '../context/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';
import { Container } from 'react-bootstrap';
import PageLayout from '../layout/PageLayout';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';

const DeckBuilderPage = () => {
  const [userDecks, setUserDecks] = useState([]);
  const { theme } = useMode();
  const { fetchAllDecksForUser, allDecks, loading } = useDeckStore();
  const {
    isPageLoading,
    setIsPageLoading,
    pageError,
    setPageError,
    logPageData,
  } = usePageContext();
  const { user } = useUserContext();
  const { isModalOpen, modalContent } = useContext(ModalContext);
  const userId = user?.id;
  useEffect(() => {
    fetchAllDecksForUser().catch((err) =>
      console.error('Failed to get all decks:', err)
    );
  }, [fetchAllDecksForUser]);

  useEffect(() => {
    if (allDecks && userId && typeof userId === 'string') {
      const filteredDecks = allDecks?.filter((deck) => deck?.userId === userId);
      logPageData('DeckBuilderPage', filteredDecks);
      setUserDecks(filteredDecks);
    }
  }, [userId]);

  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;

  return (
    <React.Fragment>
      <PageLayout>
        <DeckBuilderBanner>
          <Container>
            <HeroCenter
              title="Welcome to Deck Builder"
              subtitle="Craft, refine, and explore your deck strategies in one place."
            />
          </Container>
          <Grid container>
            <Grid item xs={12}>
              <DeckBuilderContainer />
            </Grid>
          </Grid>
        </DeckBuilderBanner>
        {pageError && <ErrorIndicator error={pageError} />}

        {isModalOpen && (
          <GenericCardDialog
            open={isModalOpen}
            context={'Deck'}
            card={modalContent}
          />
        )}
      </PageLayout>
    </React.Fragment>
  );
};

export default DeckBuilderPage;
