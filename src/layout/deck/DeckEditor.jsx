import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import DeckEditPanel from '../../components/other/InputComponents/DeckEditPanel';
import { useDeckStore } from '../../context/DeckContext/DeckContext';
import useDeckStyles from '../../context/hooks/useDeckStyles';

const DeckEditor = ({
  selectedDeck,
  setSelectedDeck,
  isEditing,
  handleToggleEdit,
}) => {
  // const { switchControlStyles } = useDeckStyles();
  const [editorKey, setEditorKey] = useState(Math.random());

  useEffect(() => {
    setEditorKey(Math.random()); // Reset key to remount the editor component when the selected deck changes
  }, [selectedDeck]);

  return (
    <>
      <Box key={editorKey} elevation={3}>
        {/* <FormControlLabel
          control={<Switch checked={isEditing} onChange={handleToggleEdit} />}
          label={isEditing ? 'Edit Deck' : 'Create New Deck'}
          sx={switchControlStyles}
        /> */}
        {isEditing ? (
          selectedDeck ? (
            <DeckEditPanel
              selectedDeck={selectedDeck}
              handleToggleEdit={handleToggleEdit}
              isEditing={isEditing}
            />
          ) : null
        ) : (
          <DeckEditPanel
            handleToggleEdit={handleToggleEdit}
            isEditing={isEditing}
          />
        )}
      </Box>
    </>
  );
};

export default DeckEditor;
