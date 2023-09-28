import React, { useEffect, useState, useContext } from 'react';
import DeckBuilderBanner from './pageStyles/DeckBuilderBanner';
import DeckBuilderTitle from './pageStyles/DeckBuilderTitle';
import { useCookies } from 'react-cookie';
import { DeckContext } from '../context/DeckContext/DeckContext';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import DeckBuilderContainer from '../containers/deckBuilderPageContainers/DeckBuilderContainer';
import { Grid } from '@mui/material';

const DeckBuilderPage = () => {
  const [userDecks, setUserDecks] = useState([]);
  const { userCookie } = useCookies(['userCookie'])[0];
  const { fetchAllDecksForUser, allDecks, loading, error } =
    useContext(DeckContext);
  const userId = userCookie?.id;

  useEffect(() => {
    fetchAllDecksForUser().catch((err) =>
      console.error('Failed to get all decks:', err)
    );
  }, [fetchAllDecksForUser]);

  useEffect(() => {
    if (allDecks && userId) {
      const filteredDecks = allDecks.filter((deck) => deck.userId === userId);
      setUserDecks(filteredDecks);
      // console.log('(DECK PAGE) -- (USERDECKS):', userDecks);
    }
  }, [allDecks, userId]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <DeckBuilderBanner>
      <DeckBuilderTitle>Deck Builder</DeckBuilderTitle>
      <Grid container>
        <Grid item xs={12}>
          <DeckBuilderContainer userDecks={userDecks} />
        </Grid>
      </Grid>
    </DeckBuilderBanner>
  );
};

export default DeckBuilderPage;
