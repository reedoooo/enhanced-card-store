import React, { useContext, useEffect, useState } from 'react';
import DeckBuilderContainer from '../containers/deckBuilderPageContainers/DeckBuilderContainer';
import { useCookies } from 'react-cookie';
import { DeckContext } from '../context/DeckContext/DeckContext';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import { Grid } from '@mui/material';
import styled from 'styled-components';

const DeckBuilderBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${'' /* padding: 20px; */}
  background-color: #f9f9f9;
  width: 100%; // Full width
  max-width: 1600px; // Or whatever max-width you want
  margin: auto; // Centers the block horizontally if its max-width is less than the parent's width
`;

const DeckBuilderTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const DeckBuilderPage = () => {
  const [cookies] = useCookies(['userCookie']);
  const { fetchAllDecksForUser, allDecks, deckData, loading, error } =
    useContext(DeckContext);

  const [userDecks, setUserDecks] = useState([]);
  const [hasLoggedFilteredDecks, setHasLoggedFilteredDecks] = useState(false); // New state to track logging

  const userId = cookies.userCookie?.id;

  useEffect(() => {
    console.log('DECK BUILDER PAGE (ALLDECKS):', allDecks);
    fetchAllDecksForUser().catch((err) =>
      console.error('Failed to get all decks:', err)
    );
  }, [fetchAllDecksForUser]);

  useEffect(() => {
    if (allDecks) {
      const filteredDecks = allDecks.filter((deck) => deck.userId === userId);
      setUserDecks(filteredDecks);

      if (!hasLoggedFilteredDecks) {
        console.log('DECK BUILDER PAGE (FILTERED DECKS):', filteredDecks);
        setHasLoggedFilteredDecks(true); // Update the state to true after logging
      }
    }
  }, [allDecks, userId, hasLoggedFilteredDecks]); // Added hasLoggedFilteredDecks as a dependency

  if (loading) return <LoadingIndicator loading={loading} />;
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
