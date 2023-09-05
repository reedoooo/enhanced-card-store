// src/pages/DeckBuilder.js
import React, { useContext, useEffect, useState } from 'react';
import DeckBuilderContainer from '../containers/DeckBuilderContainer';
import { BeatLoader } from 'react-spinners';
import { useCookies } from 'react-cookie';
import { DeckContext } from '../context/DeckContext/DeckContext';
import { useCardStore } from '../context/CardContext/CardStore';

const LoadingIndicator = ({ loading }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BeatLoader color={'#123abc'} loading={loading} size={24} />
    </div>
  );
};

const ErrorIndicator = ({ error }) => {
  return <div>Error: {error}</div>;
};

const DeckBuilderPage = () => {
  const [cookies] = useCookies(['userCookie']);
  const { fetchAllDecksForUser, allDecks, loading, error } =
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
