import React from 'react';
import { Box, Button, Typography, Paper, Grid, Divider } from '@mui/material';

const CardList = ({ selectedCards, removeCard }) => {
  // Calculate the total price
  console.log('SELECTED CARDS:', selectedCards);
  console.log('SELECTED CARDS PRICES:', selectedCards.card_prices);
  console.log(
    'SELECTED CARDS PRICES:',
    selectedCards.reduce(
      (total, card) => total + parseFloat(card.tcgplayer_price),
      0
    )
  );

  const totalPrice = selectedCards.reduce(
    (total, card) => total + parseFloat(card.tcgplayer_price),
    0
  );

  return (
    <Box mb={4} width="100%">
      <Paper elevation={8} sx={{ padding: 2, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ wordWrap: 'break-word' }}>
          Cards in Portfolio
        </Typography>
        <Divider variant="middle" />
        {selectedCards.length > 0 ? (
          selectedCards.map((card, index) => (
            <Grid container alignItems="center" spacing={2} key={index}>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body1"
                  sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                >
                  {card.name}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={2} md={2}>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                  {`$${card.price}`}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => removeCard(index)}
                  sx={{
                    fontSize: '0.6rem',
                    minWidth: 'inherit',
                    padding: '2px 4px',
                  }}
                >
                  Remove
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No cards selected.
          </Typography>
        )}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Typography variant="h5">{`Total: $${totalPrice.toFixed(
            2
          )}`}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default CardList;
