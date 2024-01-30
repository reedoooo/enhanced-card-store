import React, { useContext, useEffect, useState } from 'react';
import { useDeckStore } from '../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useMode, useUserContext } from '../../context';

import DeckListToggle from './DeckListToggle';
import DeckEditor from './DeckEditor';
import CardsDisplay from './CardsDisplay';
import {
  DeckDisplayBox,
  DeckDisplayPaper,
  DeckDisplayTitleTypography,
} from '../../pages/pageStyles/StyledComponents';

const DeckDisplay = () => {
  const { theme } = useMode();
  const { setSelectedDeck, selectedDeck, allDecks, setSelectedCards } =
    useDeckStore();
  const [showAllDecks, setShowAllDecks] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setSelectedCards(selectedDeck?.cards?.slice(0, 30) || []);
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [selectedDeck]);
  const handleSelectDeck = (deckId) => {
    const foundDeck = allDecks?.find((deck) => deck?._id === deckId);
    if (foundDeck) {
      setSelectedDeck(foundDeck);
      setSelectedCards(foundDeck?.cards?.slice(0, 30) || []);
      handleToggleEdit({ target: { checked: true } });
    }
  };
  const handleToggleEdit = (event) => {
    setIsEditing(event.target.checked);
    if (!event.target.checked) {
      setSelectedDeck(null);
    }
  };

  return (
    <DeckDisplayBox theme={theme}>
      <DeckDisplayPaper theme={theme}>
        <DeckDisplayTitleTypography variant="h5" theme={theme}>
          Your Decks
        </DeckDisplayTitleTypography>
        <DeckListToggle
          showAllDecks={showAllDecks}
          setShowAllDecks={setShowAllDecks}
          handleSelectDeck={handleSelectDeck}
          allDecks={allDecks}
        />
        <DeckEditor
          selectedDeck={selectedDeck}
          setSelectedDeck={setSelectedDeck}
          isEditing={isEditing}
          handleToggleEdit={handleToggleEdit}
        />
        <CardsDisplay selectedDeck={selectedDeck} isLoading={isLoading} />
      </DeckDisplayPaper>
    </DeckDisplayBox>
  );
};

export default DeckDisplay;
