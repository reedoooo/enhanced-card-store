import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import DeckEditPanel from './DeckEditPanel';
import { useDeckStore } from '../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useFormContext, useMode } from '../../context';
import RCSwitch from '../../components/forms/reusable/RCSwitch';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const DeckEditor = () => {
  const { selectedDeck, setSelectedDeck } = useDeckStore();
  const { theme } = useMode();
  const { currentForm, toggleForm, currentSchemaKey } = useFormContext();

  const handleToggleEdit = () => {
    if (currentForm === 'updateDeckForm') {
      toggleForm('addDeckForm');
      setSelectedDeck(null);
    }
    if (currentForm === 'addDeckForm') {
      toggleForm('updateDeckForm');
    }
  };

  return (
    <Box sx={{ margin: theme.spacing(3) }}>
      <Paper elevation={3} sx={{ padding: theme.spacing(3) }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            {selectedDeck ? 'Edit Deck' : 'Create New Deck'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexGrow: 1,
              mx: 'auto',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <RCSwitch
              checked={currentSchemaKey === 'updateDeckForm'}
              onChange={handleToggleEdit}
              labelLeft="Add"
              labelRight="Update"
              iconLeft={<AddCircleOutlineIcon />}
              iconRight={<AddCircleOutlineIcon />}
            />
          </Box>
        </Box>
        <DeckEditPanel selectedDeck={selectedDeck} />
      </Paper>
    </Box>
  );
};

export default DeckEditor;
