import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  Container,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import CronTrigger from '../../buttons/CronTrigger';

const CardList = ({ selectedCards, removeCard }) => {
  const { getTotalCost, selectedCollection } = useCollectionStore();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const collectionId = selectedCollection?.id;
  const collectionCost = getTotalCost(collectionId);

  // Calculate the total cost only if selectedCards is available
  const totalCost = selectedCards
    ? selectedCards.reduce((total, card) => {
        if (
          card.card_prices &&
          card.card_prices[0] &&
          card.card_prices[0].tcgplayer_price
        ) {
          return total + parseFloat(card.card_prices[0].tcgplayer_price);
        }
        return total;
      }, 0)
    : 0;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 2,
          borderRadius: 2,
          width: isSmScreen ? '100%' : '100%',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" gutterBottom sx={{ wordWrap: 'break-word' }}>
            Cards in Portfolio
          </Typography>
          <CronTrigger /> {/* Include the CronTrigger button */}
        </Stack>
        <Divider variant="middle" />
        {selectedCards && selectedCards.length > 0 ? (
          selectedCards.map((card, index) => (
            <Grid
              container
              alignItems="center"
              spacing={2}
              width={'100%'}
              key={index}
            >
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
                  {card.card_prices &&
                  card.card_prices[0] &&
                  card.card_prices[0].tcgplayer_price
                    ? `$${card.card_prices[0].tcgplayer_price}`
                    : 'Price not available'}
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
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={2}
          sx={{
            width: '100%', // Ensure the total cost aligns to the right
          }}
        >
          <Typography variant="h5">
            {`Total: $${totalCost.toFixed(2)}`}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CardList;
