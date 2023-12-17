import React, { useContext, useEffect, useState } from 'react';
import {
  Paper,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import SelectDeckList from '../components/grids/deckBuilderGrids/SelectDeckList';
import CardsGrid from '../components/grids/deckBuilderGrids/CardsGrid';
import DeckEditPanel from '../components/other/InputComponents/DeckEditPanel';
import { useMode } from '../context/hooks/colormode';
import AppsIcon from '@mui/icons-material/Apps';
import { useDeckStore } from '../context/DeckContext/DeckContext';
import { useUserContext } from '../context';
const DeckDisplay = () => {
  const { theme } = useMode();
  const {
    setSelectedDeck,
    selectedDeck,
    allDecks,
    createUserDeck,
    updateAndSyncDeck,
    updateDeckDetails,
    deleteUserDeck,
    selectedCards,
    setSelectedCards,
  } = useDeckStore();
  const { userId } = useUserContext();
  const [showAllDecks, setShowAllDecks] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // New state to track edit mode
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isMounted = true; // flag to track whether the component is mounted
    setIsLoading(true);

    // Simulated delay to fetch data
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        // Only update state if the component is still mounted
        setSelectedCards(selectedDeck?.cards?.slice(0, 30) || []);
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
      clearTimeout(timeoutId); // Clear the timeout
    };
  }, [selectedDeck]);

  const handleSelectDeck = (deckId) => {
    const foundDeck = allDecks?.find((deck) => deck?._id === deckId);
    if (foundDeck) {
      setSelectedDeck(foundDeck);
      setSelectedCards(foundDeck?.cards?.slice(0, 30) || []);
      handleToggleEdit({ target: { checked: true } });
      // Reset edit mode when switching decks
    }
  };

  const handleToggleEdit = (event) => {
    setIsEditing(event.target.checked);
    if (!event.target.checked) {
      // Reset selected deck when switching to create mode
      setSelectedDeck(null);
    }
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        margin: 'auto',
        maxWidth: '800px', // set max-width for larger screens
      }}
    >
      <Paper
        sx={{
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[4],
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            marginBottom: theme.spacing(2),
          }}
        >
          Your Decks
        </Typography>
        <Button
          onClick={() => setShowAllDecks(!showAllDecks)}
          variant="contained"
          color="primary"
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AppsIcon sx={{ mr: 1 }} />
          {showAllDecks ? 'Hide Decks' : 'Show All Decks'}
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing(2),
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          {showAllDecks && (
            <SelectDeckList handleSelectDeck={handleSelectDeck} />
          )}
        </Box>
        {/* Rest of the component content */}
        <FormControlLabel
          control={<Switch checked={isEditing} onChange={handleToggleEdit} />}
          label={isEditing ? 'Edit Deck' : 'Create New Deck'}
          sx={{ margin: theme.spacing(2) }}
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
          // For creating a new deck
          <DeckEditPanel
            onSave={(newDeck) => createUserDeck(userId, newDeck)}
            isEditing={isEditing}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing(2),
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          {selectedDeck?.cards?.length > 0 ? (
            <CardsGrid isLoading={isLoading} />
          ) : (
            <Typography
              sx={{
                marginTop: theme.spacing(2),
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              No cards to display
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default DeckDisplay;
