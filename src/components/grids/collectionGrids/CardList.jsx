import React, { useEffect, useState } from 'react';
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
  IconButton,
} from '@mui/material';
import CronTrigger from '../../buttons/CronTrigger';
import { useCollectionStore } from '../../../context/hooks/collection';
import AssessmentIcon from '@mui/icons-material/Assessment';
const CardList = ({ selectedCards, removeCard }) => {
  const {
    getTotalCost,
    selectedCollection,
    removeOneFromCollection,
    addOneToCollection,
  } = useCollectionStore();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  // console.log('SELECTED COLLECTION:', selectedCollection);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = Math.ceil(selectedCards.length / itemsPerPage);

  // Handler to go to the next page
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handler to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const isIdUnique = (id, cards) => {
    let count = 0;
    for (const card of cards) {
      if (card.id === id) count++;
      if (count > 1) return false;
    }
    return true;
  };

  // useEffect(() => {
  //   console.log('CardList rendered with selectedCards:', selectedCards);
  // }, [selectedCards]);

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
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              wordWrap: 'break-word',
              color: 'primary.main',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px #aaa',
              paddingLeft: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton color="primary">
              <AssessmentIcon /> {/* Adding an icon next to the title */}
            </IconButton>
            Cards in Portfolio
          </Typography>
          <CronTrigger /> {/* Include the CronTrigger button */}
        </Stack>
        <Divider variant="middle" />
        {selectedCards && selectedCards?.length > 0 ? (
          selectedCards
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((card, index) => {
              const key = isIdUnique(card?.id || index, selectedCards)
                ? card.id
                : `${card.id}-${index}`;

              return (
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  width={'100%'}
                  key={key}
                >
                  <Grid item xs={7} sm={8} md={9}>
                    <Typography
                      variant="body1"
                      sx={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {card.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={2} md={2}>
                    <Typography variant="body1" sx={{ textAlign: 'right' }}>
                      {card.card_prices &&
                      card?.card_prices[0] &&
                      card?.card_prices[0]?.tcgplayer_price
                        ? `$${card?.card_prices[0]?.tcgplayer_price}`
                        : 'Price not available'}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sm={2} md={1}>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => removeOneFromCollection(card, card?.id)}
                      sx={{
                        fontSize: '0.6rem',
                        minWidth: 'inherit',
                        padding: '2px 4px',
                      }}
                    >
                      Remove
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => addOneToCollection(card, card?.id)}
                      sx={{
                        fontSize: '0.6rem',
                        minWidth: 'inherit',
                        padding: '2px 4px',
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              );
            })
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
          <Typography variant="h5">{`Total: $${selectedCollection?.totalPrice}`}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mt={2}
          sx={{
            width: '100%',
          }}
        >
          <Button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography variant="subtitle1">
            Page {currentPage} of {maxPages}
          </Typography>
          <Button onClick={nextPage} disabled={currentPage === maxPages}>
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CardList;
