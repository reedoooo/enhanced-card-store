import React from 'react';
import { IconButton } from '@mui/material';
import deckIcon1 from '../../../assets/deckIcon2.png';

const DeckOfCardsIcon = () => {
  return (
    <IconButton
      aria-label="deck"
      sx={{
        width: 48, // Standard navbar icon size, adjust as needed
        height: 48, // Standard navbar icon size, adjust as needed
        padding: '8px', // Padding to provide some space around the icon
        margin: '0', // Adjust margin as needed based on navbar layout
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Slight effect on hover
        },
        // Ensure the img tag inside the button fits well
        '& img': {
          maxWidth: '100%',
          maxHeight: '100%',
        },
      }}
    >
      <img src={deckIcon1} alt="deck icon" />
    </IconButton>
  );
};

export default DeckOfCardsIcon;
