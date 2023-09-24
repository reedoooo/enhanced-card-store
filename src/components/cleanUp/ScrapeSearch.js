import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const ScrapeSearch = ({ onCardNameChange }) => {
  const [cardName, setCardName] = useState('');

  const handleScrape = async () => {
    const finalCardName = cardName || 'Dark Magician';
    try {
      onCardNameChange(finalCardName);

      const response = await axios.get(
        `${
          process.env.REACT_APP_SERVER
        }/api/scrape?cardName=${encodeURIComponent(finalCardName)}`,
        {
          withCredentials: true,
        }
      );

      alert(response.data);
    } catch (error) {
      alert('Error while scraping: ' + error.message);
    }
  };

  return (
    <div>
      <h3>Initiate Scraping</h3>
      <TextField
        label="Card Name"
        variant="outlined"
        value={cardName || 'Dark Magician'} // Set default value here
        onChange={(e) => setCardName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleScrape}>
        Scrape TCGPLAYER
      </Button>
    </div>
  );
};

export default ScrapeSearch;
