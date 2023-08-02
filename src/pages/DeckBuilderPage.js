// src/pages/DeckBuilder.js
import React, { useContext, useEffect } from 'react';
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
  const { fetchUserDeck, loading, error } = useContext(DeckContext);
  const { searchData } = useCardStore();

  const userId = cookies.userCookie?.id;

  useEffect(() => {
    if (userId) {
      fetchUserDeck(userId).catch((err) =>
        console.error('Failed to get user cart', err)
      );
    }
  }, [userId, fetchUserDeck]);

  if (loading) {
    return <LoadingIndicator loading={loading} />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }
  return (
    <div>
      <h1>Yu-Gi-Oh! Deck Builder</h1>
      <DeckBuilderContainer />
    </div>
  );
};

export default DeckBuilderPage;
