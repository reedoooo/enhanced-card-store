import React, { useEffect, useState, useContext } from 'react';
import { useDeckStore } from '../context/DeckContext/DeckContext';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
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
import { styled } from '@mui/styles';
import DeckSearch from '../components/other/search/DeckSearch';
import DeckDisplay from '../layout/deck/DeckDisplay';
const SearchGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '50%', // Half width on small and medium screens
  },
}));

const DisplayGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '50%', // Half width on small and medium screens
  },
}));

const RootGrid = styled(Grid)(({ theme }) => ({
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap', // Ensure wrapping on smaller screens
  backgroundColor: theme.palette.background.secondary,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  width: '100%',
}));
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

  return (
    <React.Fragment>
      <PageLayout>
        {loadingStatus?.isPageLoading && returnDisplay()}

        <DeckBuilderBanner>
          <Container>
            <HeroCenter
              title="Welcome to Deck Builder"
              subtitle="Craft, refine, and explore your deck strategies in one place."
            />
          </Container>
          <Grid container>
            <Grid item xs={12}>
              <RootGrid container>
                <SearchGrid item xs={12} md={6} lg={5}>
                  <DeckSearch />
                </SearchGrid>
                <DisplayGrid item xs={12} md={6} lg={7}>
                  <DeckDisplay />
                </DisplayGrid>
              </RootGrid>
            </Grid>
          </Grid>
        </DeckBuilderBanner>

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
