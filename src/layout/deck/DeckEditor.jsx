import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useMode } from '../../context';
import DeckForm from '../../components/forms/DeckForm';

const DeckEditor = ({ deck, onClose }) => {
  const { theme } = useMode();

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
            {deck ? 'Edit Deck' : 'Create New Deck'}
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
          ></Box>
        </Box>
        <DeckForm actionType="update" deckData={deck} />{' '}
      </Paper>
    </Box>
  );
};

export default DeckEditor;
