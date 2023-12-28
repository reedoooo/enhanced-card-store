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
import SelectDeckList from '../../components/grids/deckBuilderGrids/SelectDeckList';
import CardsGrid from '../../components/grids/deckBuilderGrids/CardsGrid';
// import DeckEditPanel from '../../components/other/InputComponents/DeckEditPanel';
import { useDeckStore } from '../../context/DeckContext/DeckContext';
import { useUserContext } from '../../context';
import useDeckStyles from '../../context/hooks/useDeckStyles';
import DeckListToggle from './DeckListToggle';
import DeckEditor from './DeckEditor';
import CardsDisplay from './CardsDisplay';

const DeckDisplay = () => {
  const {
    setSelectedDeck,
    selectedDeck,
    allDecks,

    setSelectedCards,
  } = useDeckStore();

  const { userId } = useUserContext();
  const [showAllDecks, setShowAllDecks] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { mainBoxStyles, paperStyles, titleTypographyStyles } = useDeckStyles();

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

  // const { theme } = useMode();
  // const [name, setName] = useState(selectedDeck?.name || '');
  // const [description, setDescription] = useState(
  //   selectedDeck?.description || ''
  // );
  // const [tags, setTags] = useState(selectedDeck?.tags || []);
  // const [color, setColor] = useState(selectedDeck?.color || '');

  // const handleSave = () => {
  //   onSave({
  //     ...selectedDeck,
  //     userId: userId,
  //     deckId: deckId,
  //     updatedInfo: {
  //       name: name || 'Unnamed',
  //       description: description || '',
  //       tags: tags || [],
  //       color: color || 'red',
  //     },
  //   });
  // };

  // const handleDeleteDeck = () => {
  //   // Placeholder for delete logic
  //   onDelete(deckId);
  // };

  // const handleDeleteTag = (tagToDelete) => {
  //   setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  // };

  // const handleAddTag = (event) => {
  //   if (event.key === 'Enter' && event.target.value !== '') {
  //     setTags([...tags, event.target.value]);
  //     event.target.value = '';
  //   }
  // };

  // useEffect(() => {
  //   // Update form state when selectedDeck changes
  //   setName(selectedDeck?.name || '');
  //   setDescription(selectedDeck?.description || '');
  //   setTags(selectedDeck?.tags || []);
  //   setColor(selectedDeck?.color || '');
  // }, [selectedDeck]);

  return (
    <Box sx={mainBoxStyles}>
      <Paper sx={paperStyles}>
        <Typography variant="h5" sx={titleTypographyStyles}>
          Your Decks
        </Typography>
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
      </Paper>
    </Box>
    // <Box sx={mainBoxStyles}>
    //   <Paper sx={paperStyles}>
    //     <Typography variant="h5" sx={titleTypographyStyles}>
    //       Your Decks
    //     </Typography>
    //     <Button
    //       onClick={() => setShowAllDecks(!showAllDecks)}
    //       variant="contained"
    //       color="primary"
    //       sx={buttonStyles}
    //     >
    //       <AppsIcon sx={{ mr: 1 }} />
    //       {showAllDecks ? 'Hide Decks' : 'Show All Decks'}
    //     </Button>
    //     {showAllDecks && (
    //       <Box sx={cardsContainerStyles}>
    //         <SelectDeckList handleSelectDeck={handleSelectDeck} />
    //       </Box>
    //     )}
    //     <FormControlLabel
    //       control={<Switch checked={isEditing} onChange={handleToggleEdit} />}
    //       label={isEditing ? 'Edit Deck' : 'Create New Deck'}
    //       sx={switchControlStyles}
    //     />
    //     {isEditing ? (
    //       selectedDeck && (
    //         <Paper
    //           elevation={3}
    //           sx={{
    //             padding: theme.spacing(4),
    //             margin: 'auto',
    //             maxWidth: 600,
    //             borderRadius: theme.shape.borderRadius,
    //             boxShadow: theme.shadows[3],
    //             backgroundColor: theme.palette.background.paper,
    //             color: theme.palette.text.secondary,
    //           }}
    //         >
    //           <Typography
    //             variant="h6"
    //             sx={{
    //               marginBottom: theme.spacing(3),
    //               fontWeight: theme.typography.fontWeightBold,
    //               color: theme.palette.primary.main,
    //             }}
    //           >
    //             {isEditing ? 'Edit Deck' : 'Create New Deck'}
    //           </Typography>
    //           <FormWrapper onSubmit={handleFormSubmit}>
    //             {/* Deck Name Input */}
    //             <TextField
    //               label="Deck Name"
    //               value={name}
    //               variant="outlined"
    //               fullWidth
    //               onChange={(e) => setName(e.target.value)}
    //               sx={{ marginBottom: theme.spacing(2) }}
    //             />
    //             {/* Deck Description Input */}
    //             <TextField
    //               label="Deck Description"
    //               value={description}
    //               variant="outlined"
    //               fullWidth
    //               multiline
    //               rows={4}
    //               onChange={(e) => setDescription(e.target.value)}
    //               sx={{ marginBottom: theme.spacing(2) }}
    //             />
    //             {/* Tags Input */}
    //             <TextField
    //               label="Add Tag"
    //               value={tags}
    //               variant="outlined"
    //               fullWidth
    //               onChange={(e) => setTags(e.target.value)}
    //               // onKeyPress={handleAddTag}
    //               sx={{ marginBottom: theme.spacing(2) }}
    //             />
    //             <Stack
    //               direction="row"
    //               spacing={1}
    //               sx={{ marginBottom: theme.spacing(2) }}
    //             >
    //               {tags.map((tag) => (
    //                 <Chip
    //                   key={tag}
    //                   label={tag}
    //                   onDelete={() => handleDeleteTag(tag)}
    //                 />
    //               ))}
    //             </Stack>
    //             {/* Color Selector */}
    //             <FormControl fullWidth sx={{ marginBottom: theme.spacing(3) }}>
    //               <InputLabel id="deck-color-label">Deck Color</InputLabel>
    //               <Select
    //                 labelId="deck-color-label"
    //                 value={color}
    //                 label="Deck Color"
    //                 onChange={(e) => setColor(e.target.value)}
    //               >
    //                 <MenuItem value="red">Red</MenuItem>
    //                 <MenuItem value="blue">Blue</MenuItem>
    //                 <MenuItem value="green">Green</MenuItem>
    //                 <MenuItem value="yellow">Yellow</MenuItem>
    //               </Select>
    //             </FormControl>
    //             {/* Save Button */}
    //             <Button
    //               variant="contained"
    //               onClick={handleSave}
    //               sx={{
    //                 textTransform: 'none',
    //                 backgroundColor: theme.palette.success.main,
    //                 color: theme.palette.success.contrastText,
    //                 '&:hover': {
    //                   backgroundColor: theme.palette.success.dark,
    //                 },
    //               }}
    //             >
    //               Save Changes
    //             </Button>
    //             {/* Delete Deck Button */}
    //             {isEditing && (
    //               <Button
    //                 variant="contained"
    //                 startIcon={<DeleteIcon />}
    //                 onClick={handleDeleteDeck}
    //                 sx={{
    //                   textTransform: 'none',
    //                   backgroundColor: theme.palette.error.main,
    //                   color: theme.palette.error.contrastText,
    //                   '&:hover': {
    //                     backgroundColor: theme.palette.error.dark,
    //                   },
    //                 }}
    //               >
    //                 Delete Deck
    //               </Button>
    //             )}
    //           </FormWrapper>
    //         </Paper>
    //       )
    //     ) : (
    //       <DeckEditPanel
    //         onSave={(newDeck) => createUserDeck(userId, newDeck)}
    //         isEditing={isEditing}
    //       />
    //     )}
    //     <Box sx={cardsContainerStyles}>
    //       {selectedDeck?.cards?.length > 0 ? (
    //         <CardsGrid isLoading={isLoading} />
    //       ) : (
    //         <Typography sx={noCardsTypographyStyles}>
    //           No cards to display
    //         </Typography>
    //       )}
    //     </Box>
    //   </Paper>
    // </Box>
  );
};

export default DeckDisplay;
