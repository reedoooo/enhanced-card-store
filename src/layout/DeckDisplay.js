import React, { useContext, useEffect, useState } from 'react';
import {
  Paper,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SelectDeckList from '../components/grids/deckBuilderGrids/SelectDeckList';
import CardsGrid from '../components/grids/deckBuilderGrids/CardsGrid';
import DeckEditPanel from '../components/other/InputComponents/DeckEditPanel';
import { useDeckStore } from '../context/DeckContext/DeckContext';
import { useUserContext } from '../context';
import useDeckStyles from '../context/hooks/useDeckStyles';

const DeckDisplay = () => {
  const {
    setSelectedDeck,
    selectedDeck,
    allDecks,
    createUserDeck,
    updateDeckDetails,
    deleteUserDeck,
    selectedCards,
    setSelectedCards,
  } = useDeckStore();

  const { userId } = useUserContext();
  const [showAllDecks, setShowAllDecks] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    mainBoxStyles,
    paperStyles,
    titleTypographyStyles,
    buttonStyles,
    switchControlStyles,
    cardsContainerStyles,
    noCardsTypographyStyles,
  } = useDeckStyles();

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
    <Box sx={mainBoxStyles}>
      <Paper sx={paperStyles}>
        <Typography variant="h5" sx={titleTypographyStyles}>
          Your Decks
        </Typography>
        <Button
          onClick={() => setShowAllDecks(!showAllDecks)}
          variant="contained"
          color="primary"
          sx={buttonStyles}
        >
          <AppsIcon sx={{ mr: 1 }} />
          {showAllDecks ? 'Hide Decks' : 'Show All Decks'}
        </Button>
        {showAllDecks && (
          <Box sx={cardsContainerStyles}>
            <SelectDeckList handleSelectDeck={handleSelectDeck} />
          </Box>
        )}
        <FormControlLabel
          control={<Switch checked={isEditing} onChange={handleToggleEdit} />}
          label={isEditing ? 'Edit Deck' : 'Create New Deck'}
          sx={switchControlStyles}
        />
        {isEditing ? (
          selectedDeck && (
            <DeckEditPanel
              selectedDeck={selectedDeck}
              onSave={(updatedDeck) =>
                updateDeckDetails(userId, selectedDeck?._id, updatedDeck)
              }
              onDelete={() => deleteUserDeck(selectedDeck?._id)}
              isEditing={isEditing}
              userId={userId}
              deckId={selectedDeck?._id}
            />
          )
        ) : (
          <DeckEditPanel
            onSave={(newDeck) => createUserDeck(userId, newDeck)}
            isEditing={isEditing}
          />
        )}
        <Box sx={cardsContainerStyles}>
          {selectedDeck?.cards?.length > 0 ? (
            <CardsGrid isLoading={isLoading} />
          ) : (
            <Typography sx={noCardsTypographyStyles}>
              No cards to display
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default DeckDisplay;
