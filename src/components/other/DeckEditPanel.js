import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  textField: {
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.dark,
      },
    },
  },
  saveButton: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.primary.main}`,
    lineHeight: 1.5,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
      boxShadow: 'none',
    },
  },
}));

const DeckEditPanel = ({ selectedDeck, onSave }) => {
  const classes = useStyles();
  const [name, setName] = useState(selectedDeck?.name || '');
  const [description, setDescription] = useState(
    selectedDeck?.description || ''
  );

  const handleSave = () => {
    // Log the new deck name and description before saving
    console.log('New Deck Name:', name);
    console.log('New Deck Description:', description);

    onSave({
      ...selectedDeck,
      name,
      description,
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
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
        color="primary"
        className={classes.saveButton}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </Paper>
  );
};

export default DeckEditPanel;
