import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import DeckEditPanel from '../../components/dialogs/DeckEditPanel';
import { useDeckStore } from '../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import useDeckStyles from '../../context/hooks/style-hooks/useDeckStyles';
import { SwitchControl } from '../../pages/pageStyles/StyledComponents';
import { useFormContext, useMode } from '../../context';
import DeckSwitch from '../../components/buttons/other/DeckSwitch';

const DeckEditor = () => {
  const { selectedDeck, setSelectedDeck } = useDeckStore();
  const { theme } = useMode();
  const {
    formStates, // Assuming this provides access to the current form state including errors
    formMethods, // Assuming this provides access to register, handleSubmit, etc.
    onSubmit,
    currentForm,
    toggleForm,

    // handleChange,
    // handleBlur,
    // handleFocus,
    // formMethods, // Assuming formMethods provides access to register, handleSubmit, etc.
  } = useFormContext();

  // const { currentForm: currentFormType } = formStates;

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
          {/* <FormControlLabel
            control={<Switch checked={isEditing} onChange={handleToggleEdit} />}
            label={isEditing ? 'Editing' : 'Adding'}
          /> */}
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
            <DeckSwitch
              editMode={currentForm === 'updateDeckForm'}
              onToggle={handleToggleEdit}
            />
          </Box>
        </Box>
        <DeckEditPanel selectedDeck={selectedDeck} />
      </Paper>
    </Box>
  );
};

export default DeckEditor;
