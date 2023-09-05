// src/components/DeckDisplay.js
import React, { useContext, useMemo } from 'react';
import { useCardStore } from '../../context/CardContext/CardStore';
import { makeStyles } from '@mui/styles';
import DeckCard from '../cards/DeckCard';
import { Grid, IconButton, Paper } from '@mui/material';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%', // Set the height to 100%
    position: 'relative', // Required for the aspect-ratio trick
    animation: 'fadeIn 0.5s ease-in-out', // Add animation
  },
  deckCard: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    aspectRatio: '2 / 3', // Adjusted the aspect ratio
  },
  '@global': {
    '.card-enter': {
      opacity: 0,
    },
    '.card-enter-active': {
      opacity: 1,
      transition: 'opacity 500ms',
    },
    '.card-exit': {
      opacity: 1,
    },
    '.card-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms',
    },
  },
}));

const DeckDisplay = () => {
  // const { deckSearchData, savedDeckData } = useCardStore();
  const {
    allDecks,
    deckData,
    deckSearchData,
    savedDeckData,
    selectedDeck,
    setSelectedDeck,
  } = useContext(DeckContext); // Include allDecks from context
  const classes = useStyles();
  // const isCardDataValid = allDecks?.deck && Array.isArray(allDecks);
  console.log('allDecks', allDecks);
  // const deckOptions = allDecks; // Here, deckOptions is the same as allDecks

  const limitedCardsToRender = useMemo(
    () => (allDecks?.deck ? Array.from(allDecks?.deck).slice(0, 30) : []),
    [allDecks]
  );

  const handleSelectDeck = (deckId) => {
    console.log('Clicked deck ID:', deckId);
    const selectedDeck = allDecks.find((deck) => deck._id === deckId);

    console.log('Selected deck:', selectedDeck);
    if (!selectedDeck) {
      console.error(`No deck found with ID: ${deckId}`);
      return;
    }

    setSelectedDeck(selectedDeck.cards);
    // setLoadDeckCards(selectedDeck.cards);
  };
  console.log('SELECTED DECK STATE SET:', selectedDeck);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* {isCardDataValid && ( */}
        {limitedCardsToRender && limitedCardsToRender.length > 0 && (
          <Grid container spacing={3}>
            <TransitionGroup component={null}>
              {limitedCardsToRender?.map((card, index) => (
                <CSSTransition
                  key={`${card.id}-${index}`}
                  timeout={500}
                  classNames="card"
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <DeckCard card={card} className={classes.deckCard} />
                  </Grid>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </Grid>
        )}
      </Paper>
      <div className={classes.sidebar}>
        <Grid container spacing={1}>
          {allDecks?.map((deckOption) => (
            <Grid item xs={4} key={deckOption.id}>
              <IconButton
                color="primary"
                onClick={() => handleSelectDeck(deckOption)}
              >
                <RadioButtonUncheckedIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default DeckDisplay;
