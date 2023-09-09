import React, { useContext, useEffect, useState } from 'react';
import DeckBuilderContainer from '../containers/DeckBuilderContainer';
import { useCookies } from 'react-cookie';
import { DeckContext } from '../context/DeckContext/DeckContext';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';

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
    <div>
      <DeckBuilderContainer userDecks={userDecks} />
    </div>
  );
};

export default DeckBuilderPage;
