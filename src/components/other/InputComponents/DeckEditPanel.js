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
  Switch,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeckStore, useMode } from '../../../context';
import {
  StyledFormControl,
  SwitchControl,
} from '../../../pages/pageStyles/StyledComponents';

const DeckEditPanel = ({ selectedDeck, handleToggleEdit, isEditing }) => {
  const { theme } = useMode();
  const { updateDeckDetails, deleteUserDeck } = useDeckStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState('');
  const [newTag, setNewTag] = useState('');

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
        backgroundColor: theme.palette.backgroundA.lightest,
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
        <SwitchControl
          theme={theme}
          control={<Switch checked={isEditing} onChange={handleToggleEdit} />}
          label={isEditing ? 'Edit Deck' : 'Create New Deck'}
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
      {/* <form onSubmit={handleTagSubmit}> */}
      <StyledFormControl
        onSubmit={handleTagSubmit}
        fullWidth
        variant="filled"
        theme={theme}
      >
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
      </StyledFormControl>
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
            backgroundColor: theme.palette.backgroundA.dark,
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
