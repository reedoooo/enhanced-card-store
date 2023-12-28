import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeckStore, useMode } from '../../../context';
import useDeckStyles from '../../../context/hooks/useDeckStyles';

const DeckEditPanel = ({ selectedDeck, handleToggleEdit, isEditing }) => {
  const { theme } = useMode();
  const { updateDeckDetails, deleteUserDeck } = useDeckStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState('');
  const [newTag, setNewTag] = useState('');
  const { switchControlStyles } = useDeckStyles();

  useEffect(() => {
    if (selectedDeck) {
      setName(selectedDeck.name || '');
      setDescription(selectedDeck.description || '');
      setTags(selectedDeck.tags || []);
      setColor(selectedDeck.color || '');
    }
  }, [selectedDeck]);

  const handleSave = () => {
    const updatedInfo = { name, description, tags, color };
    updateDeckDetails(selectedDeck?._id, updatedInfo);
  };

  const handleDelete = () => {
    deleteUserDeck(selectedDeck._id);
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleTagSubmit = (event) => {
    event.preventDefault();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        margin: 2,
        // backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: 2, color: theme.palette.text.primary }}
        >
          Deck Editor
        </Typography>
        <FormControlLabel
          control={<Switch checked={isEditing} onChange={handleToggleEdit} />}
          label={isEditing ? 'Edit Deck' : 'Create New Deck'}
          sx={switchControlStyles}
        />
      </Box>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <form onSubmit={handleTagSubmit}>
        <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
            />
          ))}
          <TextField
            label="New Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
        </Stack>
      </form>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="deck-color-selector-label">Color</InputLabel>
        <Select
          labelId="deck-color-selector-label"
          value={color}
          label="Color"
          onChange={(e) => setColor(e.target.value)}
        >
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="yellow">Yellow</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            flexGrow: 1,
            margin: '4px',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ flexGrow: 1, margin: '4px' }}
        >
          Delete Deck
        </Button>
      </Box>
    </Paper>
  );
};
export default DeckEditPanel;

// import React, { useEffect, useState } from 'react';
// import {
//   Button,
//   TextField,
//   Paper,
//   Typography,
//   Chip,
//   Stack,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControl,
// } from '@mui/material';
// import { useMode } from '../../../context/hooks/colormode';
// import DeleteIcon from '@material-ui/icons/Delete';
// import { FormWrapper } from '../../forms/styled';

// const DeckEditPanel = ({
//   selectedDeck,
//   onSave,
//   onDelete,
//   isEditing,
//   userId,
//   deckId,
// }) => {
//   const { theme } = useMode();
//   const [name, setName] = useState(selectedDeck?.name || '');
//   const [description, setDescription] = useState(
//     selectedDeck?.description || ''
//   );
//   const [tags, setTags] = useState(selectedDeck?.tags || []);
//   const [color, setColor] = useState(selectedDeck?.color || '');

//   const handleSave = () => {
//     onSave({
//       ...selectedDeck,
//       userId: userId,
//       deckId: deckId,
//       updatedInfo: {
//         name: name || 'Unnamed',
//         description: description || '',
//         tags: tags || [],
//         color: color || 'red',
//       },
//     });
//   };

//   const handleDeleteDeck = () => {
//     // Placeholder for delete logic
//     onDelete(deckId);
//   };

//   const handleDeleteTag = (tagToDelete) => {
//     setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
//   };

//   const handleAddTag = (event) => {
//     if (event.key === 'Enter' && event.target.value !== '') {
//       setTags([...tags, event.target.value]);
//       event.target.value = '';
//     }
//   };

//   useEffect(() => {
//     // Update form state when selectedDeck changes
//     setName(selectedDeck?.name || '');
//     setDescription(selectedDeck?.description || '');
//     setTags(selectedDeck?.tags || []);
//     setColor(selectedDeck?.color || '');
//   }, [selectedDeck]);

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: theme.spacing(4),
//         margin: 'auto',
//         maxWidth: 600,
//         borderRadius: theme.shape.borderRadius,
//         boxShadow: theme.shadows[3],
//         backgroundColor: theme.palette.background.paper,
//         color: theme.palette.text.secondary,
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{
//           marginBottom: theme.spacing(3),
//           fontWeight: theme.typography.fontWeightBold,
//           color: theme.palette.primary.main,
//         }}
//       >
//         {isEditing ? 'Edit Deck' : 'Create New Deck'}
//       </Typography>
//       <FormWrapper onSubmit={handleFormSubmit}>
//         {/* Deck Name Input */}
//         <TextField
//           label="Deck Name"
//           value={name}
//           variant="outlined"
//           fullWidth
//           onChange={(e) => setName(e.target.value)}
//           sx={{ marginBottom: theme.spacing(2) }}
//         />
//         {/* Deck Description Input */}
//         <TextField
//           label="Deck Description"
//           value={description}
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           onChange={(e) => setDescription(e.target.value)}
//           sx={{ marginBottom: theme.spacing(2) }}
//         />
//         {/* Tags Input */}
//         <TextField
//           label="Add Tag"
//           value={tags}
//           variant="outlined"
//           fullWidth
//           onChange={(e) => setTags(e.target.value)}
//           // onKeyPress={handleAddTag}
//           sx={{ marginBottom: theme.spacing(2) }}
//         />
//         <Stack
//           direction="row"
//           spacing={1}
//           sx={{ marginBottom: theme.spacing(2) }}
//         >
//           {tags.map((tag) => (
//             <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
//           ))}
//         </Stack>
//         {/* Color Selector */}
//         <FormControl fullWidth sx={{ marginBottom: theme.spacing(3) }}>
//           <InputLabel id="deck-color-label">Deck Color</InputLabel>
//           <Select
//             labelId="deck-color-label"
//             value={color}
//             label="Deck Color"
//             onChange={(e) => setColor(e.target.value)}
//           >
//             <MenuItem value="red">Red</MenuItem>
//             <MenuItem value="blue">Blue</MenuItem>
//             <MenuItem value="green">Green</MenuItem>
//             <MenuItem value="yellow">Yellow</MenuItem>
//           </Select>
//         </FormControl>
//         {/* Save Button */}
//         <Button
//           variant="contained"
//           onClick={handleSave}
//           sx={{
//             textTransform: 'none',
//             backgroundColor: theme.palette.success.main,
//             color: theme.palette.success.contrastText,
//             '&:hover': {
//               backgroundColor: theme.palette.success.dark,
//             },
//           }}
//         >
//           Save Changes
//         </Button>
//         {/* Delete Deck Button */}
//         {isEditing && (
//           <Button
//             variant="contained"
//             startIcon={<DeleteIcon />}
//             onClick={handleDeleteDeck}
//             sx={{
//               textTransform: 'none',
//               backgroundColor: theme.palette.error.main,
//               color: theme.palette.error.contrastText,
//               '&:hover': {
//                 backgroundColor: theme.palette.error.dark,
//               },
//             }}
//           >
//             Delete Deck
//           </Button>
//         )}
//       </FormWrapper>
//     </Paper>
//   );
// };

// export default DeckEditPanel;
