import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { useMode } from '../../context/hooks/colormode';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3], // Utilize theme's predefined shadows
    backgroundColor: theme.palette.background.paper, // Use theme's paper background color
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: theme.typography.fontWeightBold, // Use theme's font weight for bold text
    fontSize: theme.typography.h6.fontSize, // Align font size with h6 variant
    color: theme.palette.text.primary, // Use theme's primary text color
  },
  textField: {
    marginBottom: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.light, // Use secondary color for hover state
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main, // Use secondary main color for focus
      },
    },
    '& .MuiInputBase-input': {
      fontSize: theme.typography.subtitle1.fontSize, // Align with subtitle1 font size
    },
  },
  saveButton: {
    boxShadow: theme.shadows[1], // Use a softer shadow from theme
    textTransform: 'none',
    fontSize: theme.typography.button.fontSize, // Align with button font size
    padding: theme.spacing(1, 4),
    lineHeight: theme.typography.button.lineHeight, // Align with button line height
    backgroundColor: theme.palette.secondary.main, // Use secondary color for button
    color: theme.palette.secondary.contrastText, // Contrast text for readability
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark, // Darken on hover
      boxShadow: theme.shadows[2], // Slightly elevate shadow on hover
    },
  },
}));

const DeckEditPanel = ({ selectedDeck, onSave }) => {
  const { theme } = useMode();
  const classes = useStyles(theme);
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
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Edit Deck
      </Typography>
      <TextField
        className={classes.textField}
        label="Deck Name"
        value={name}
        variant="outlined"
        fullWidth
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className={classes.textField}
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
        className={classes.saveButton}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </Paper>
  );
};

export default DeckEditPanel;
