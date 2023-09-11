import React from 'react';
import { Box, Input, Button } from '@mui/material';

const AddCardForm = ({
  newCard,
  setNewCard,
  newCardPrice,
  setNewCardPrice,
  newCardCondition,
  setNewCardCondition, // New prop for card condition
  addCard,
}) => {
  return (
    <Box mb={4}>
      <Input
        placeholder="Enter card name"
        value={newCard}
        onChange={(e) => setNewCard(e.target.value)}
      />
      <Input
        placeholder="Enter card price"
        value={newCardPrice}
        onChange={(e) => setNewCardPrice(e.target.value)}
        mt={2}
      />
      <Input
        placeholder="Enter card condition"
        value={newCardCondition} // New state variable
        onChange={(e) => setNewCardCondition(e.target.value)} // New state setter function
        mt={2}
      />
      <Button onClick={addCard} mt={2}>
        Add Card
      </Button>
    </Box>
  );
};

export default AddCardForm;
