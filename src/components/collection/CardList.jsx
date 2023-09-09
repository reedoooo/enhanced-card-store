import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const CardList = ({ cards, removeCard }) => (
  <Box mb={4}>
    <Typography fontSize="md">Cards in Portfolio:</Typography>
    <ul>
      {cards
        ? cards.map((card, index) => (
            <li key={index}>
              {`${card.name} - $${card.price}`}
              <Button
                size="small" // 'xs' size is not available in MUI, using 'small'
                color="secondary" // 'colorScheme' prop is not available in MUI, using 'color'
                onClick={() => removeCard(index)}
                style={{ marginLeft: 8 }} // 'ml' prop is not available in MUI Button, using inline styles
              >
                Remove
              </Button>
            </li>
          ))
        : 'Loading...'}
    </ul>
  </Box>
);

export default CardList;
