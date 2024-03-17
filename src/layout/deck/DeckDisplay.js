import React, { useContext, useEffect, useState } from 'react';
import { useDeckStore } from '../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useMode, useUserContext } from '../../context';
import DeckEditor from './DeckEditor';
// import CardsDisplay from './CardsDisplay';
import {
  DeckCardsContainer,
  DeckDisplayBox,
  DeckDisplayPaper,
  DeckDisplayTitleTypography,
  DeckStyledButton,
} from '../../pages/pageStyles/StyledComponents';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid, IconButton } from '@mui/material';
import { StyledContainerBoxPrimary } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import SelectDeckList from './SelectDeckList';
import AppsIcon from '@mui/icons-material/Apps';
import useGridItems from '../../context/hooks/useGridItems';

const DeckDisplay = () => {
  const { theme } = useMode();
  const { setSelectedDeck, selectedDeck, allDecks, setSelectedCards } =
    useDeckStore();
  const [showAllDecks, setShowAllDecks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectDeck = (deckId) => {
    const foundDeck = allDecks?.find((deck) => deck?._id === deckId);
    if (foundDeck) {
      setSelectedDeck(foundDeck);
      setSelectedCards(foundDeck?.cards?.slice(0, 30) || []);
    }
  };
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        handleSelectDeck(selectedDeck?._id);
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [selectedDeck]);
  // useEffect(() => {
  //   // Assuming setFormType is a function that can set the form context
  //   setFormType('addDeckForm');
  // }, []);

  const cardDisplay = useGridItems({
    itemsPerPage: 8, // Define as per your requirement
    cards: selectedDeck?.cards || [],
    pageContext: 'DeckDisplay', // Context to pass to GenericCard
    isLoading: isLoading, // Pass the actual loading state
  });

  return (
    <StyledContainerBoxPrimary theme={theme}>
      {/* <DeckDisplayPaper theme={theme}> */}
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid item xs={12}>
          <MDBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: theme.spacing(2),
            }}
          >
            <MDTypography
              variant="h4"
              align="left"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.backgroundA.dark,
                textTransform: 'uppercase',
              }}
            >
              Deck Display
            </MDTypography>
            <IconButton
              aria-label="settings"
              onClick={() => {
                console.log('Settings Clicked');
              }}
              size="large"
            >
              <SettingsIcon />
            </IconButton>
          </MDBox>
        </Grid>

        <Grid item xs={12}>
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: theme.spacing(2),
            }}
          >
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <DeckStyledButton
                  theme={theme}
                  onClick={() => setShowAllDecks(!showAllDecks)}
                  variant="contained"
                  sx={{
                    width: '100%',
                    borderRadius: 0,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                    backgroundColor: theme.palette.backgroundA.dark,
                    margin: theme.spacing(1),
                    color: theme.palette.backgroundA.contrastTextA,
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      backgroundColor: theme.palette.backgroundA.light,
                    },
                  }}
                >
                  <AppsIcon sx={{ mr: 1 }} />
                  {showAllDecks ? 'Hide Decks' : 'Show All Decks'}
                </DeckStyledButton>
              </Grid>
              <Grid item xs={12}>
                {showAllDecks && (
                  <DeckCardsContainer theme={theme}>
                    <SelectDeckList
                      handleSelectDeck={handleSelectDeck}
                      allDecks={allDecks}
                    />
                  </DeckCardsContainer>
                )}
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
        {selectedDeck && (
          <Grid item xs={12}>
            <DeckEditor />
          </Grid>
        )}

        <Grid item xs={12}>
          {selectedDeck && cardDisplay}
        </Grid>
      </Grid>
      {/* </DeckDisplayPaper> */}
    </StyledContainerBoxPrimary>
  );
};

export default DeckDisplay;
