import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { useMode } from '../../../context/hooks/colormode';

const DeckEditPanel = ({ selectedDeck, onSave }) => {
  const { theme } = useMode();
  const [name, setName] = useState(selectedDeck?.name || '');
  const [description, setDescription] = useState(
    selectedDeck?.description || ''
  );

  const handleSave = () => {
    onSave({
      ...selectedDeck,
      name,
      description,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: theme.spacing(4),
        margin: 'auto',
        maxWidth: 600, // Limit the width for better readability
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: theme.spacing(3),
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.primary.main,
        }}
      >
        Edit Deck
      </Typography>
      <TextField
        label="Deck Name"
        value={name}
        variant="outlined"
        fullWidth
        onChange={(e) => setName(e.target.value)}
        sx={{
          marginBottom: theme.spacing(2),
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: theme.palette.primary.dark,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />
      <TextField
        label="Deck Description"
        value={description}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          marginBottom: theme.spacing(3),
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: theme.palette.primary.dark,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          textTransform: 'none',
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.success.dark,
          },
        }}
      >
        Save Changes
      </Button>
    </Paper>
  );
};

export default DeckEditPanel;
