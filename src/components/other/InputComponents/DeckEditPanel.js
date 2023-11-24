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
        margin: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: theme.spacing(3),
          fontWeight: theme.typography.fontWeightBold,
          fontSize: theme.typography.h6.fontSize,
          color: theme.palette.text.primary,
        }}
      >
        Edit Deck
      </Typography>
      <TextField
        sx={{
          marginBottom: theme.spacing(3),
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: theme.palette.secondary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.secondary.main,
            },
          },
          '& .MuiInputBase-input': {
            fontSize: theme.typography.subtitle1.fontSize,
          },
        }}
        label="Deck Name"
        value={name}
        variant="outlined"
        fullWidth
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        sx={{
          marginBottom: theme.spacing(3),
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: theme.palette.secondary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.secondary.main,
            },
          },
          '& .MuiInputBase-input': {
            fontSize: theme.typography.subtitle1.fontSize,
          },
        }}
        label="Deck Description"
        value={description}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{
          boxShadow: theme.shadows[1],
          textTransform: 'none',
          fontSize: theme.typography.button.fontSize,
          padding: theme.spacing(1, 4),
          lineHeight: theme.typography.button.lineHeight,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: theme.shadows[2],
          },
        }}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </Paper>
  );
};

export default DeckEditPanel;
