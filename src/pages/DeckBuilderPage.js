// src/pages/DeckBuilder.js
import React, { useContext, useEffect, useState } from 'react';
import DeckBuilderContainer from '../containers/DeckBuilderContainer';
import { useCookies } from 'react-cookie';
import { DeckContext } from '../context/DeckContext/DeckContext';
import { useCardStore } from '../context/CardContext/CardStore';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';

const DeckBuilderPage = () => {
  const [cookies] = useCookies(['userCookie']);
  const { fetchAllDecksForUser, allDecks, deckData, loading, error } =
    useContext(DeckContext);
  const { searchData } = useCardStore();

  const [userDecks, setUserDecks] = useState([]); // Added useState to manage userDecks

  const userId = cookies.userCookie?.id;

  // Added useEffect hook
  useEffect(() => {
    fetchAllDecksForUser().catch((err) => {
      console.error('Failed to get all decks', err);
    });
  }, [fetchAllDecksForUser]);

  // Moved the log statement inside useEffect
  useEffect(() => {
    console.log('All decks:', allDecks);
    console.log('DECK BUILDER PAGE (DECKDATA):', deckData);
    // Filter decks based on userId
    if (allDecks) {
      const filteredDecks = allDecks.filter((deck) => deck.userId === userId);
      setUserDecks(filteredDecks); // Set the state
      console.log('User decks:', filteredDecks);
    }
  }, [allDecks, userId]);
  if (loading) {
    return <LoadingIndicator loading={loading} />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }
  return (
    <div>
      {/* <h1>Yu-Gi-Oh! Deck Builder</h1> */}
      <DeckBuilderContainer userDecks={userDecks} />
    </div>
  );
};

export default DeckBuilderPage;
