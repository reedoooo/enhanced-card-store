import React, { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { DeckContext, useDeckStore } from '../context/DeckContext/DeckContext';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import DeckBuilderContainer from '../containers/deckBuilderPageContainers/DeckBuilderContainer';
import { Box, Grid, Typography } from '@mui/material';
import { ModalContext } from '../context/ModalContext/ModalContext';
import GenericCardModal from '../components/modals/cardModal/GenericCardModal';
import HeaderTitle from '../components/reusable/HeaderTitle';
import { useMode } from '../context/hooks/colormode';
import { DeckBuilderBanner } from './pageStyles/StyledComponents';
import useUpdateAppContext from '../context/hooks/useUpdateContext';
import UserContext, {
  useUserContext,
} from '../context/UserContext/UserContext';

const HeroCenter2 = ({ title, subtitle }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 2,
      my: 6,
      textAlign: 'center',
    }}
  >
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '4xl', sm: '5xl', md: '6xl' },
        fontWeight: 800,
        color: 'black',
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontSize: 'lg',
        color: 'text.secondary',
        maxWidth: '54ch',
      }}
    >
      {subtitle}
    </Typography>
  </Box>
);

HeroCenter2.defaultProps = {
  title: 'Welcome to Deck Builder',
  subtitle: 'Craft, refine, and explore your deck strategies in one place.',
};

const DeckBuilderPage = () => {
  const [userDecks, setUserDecks] = useState([]);
  const { theme } = useMode();
  const { fetchAllDecksForUser, allDecks, loading, error } = useDeckStore();
  const { user } = useUserContext();
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);
  const userId = user?.id;
  useEffect(() => {
    fetchAllDecksForUser().catch((err) =>
      console.error('Failed to get all decks:', err)
    );
  }, [fetchAllDecksForUser]);

  useEffect(() => {
    if (allDecks && userId && typeof userId === 'string') {
      const filteredDecks = allDecks?.filter((deck) => deck?.userId === userId);
      console.log('filteredDecks', filteredDecks);
      setUserDecks(filteredDecks);
    }
  }, [allDecks, userId]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <React.Fragment>
      <DeckBuilderBanner>
        <HeroCenter2 />
        <Grid container>
          <Grid item xs={12}>
            <DeckBuilderContainer userDecks={userDecks} />
          </Grid>
        </Grid>
      </DeckBuilderBanner>
      {isModalOpen && (
        <GenericCardModal
          open={isModalOpen}
          closeModal={closeModal}
          card={modalContent}
        />
      )}
    </React.Fragment>
  );
};

export default DeckBuilderPage;
