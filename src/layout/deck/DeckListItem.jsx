import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Collapse,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useFormContext, useMode } from '../../context';
import useDeckManager from '../../context/MAIN_CONTEXT/DeckContext/useDeckManager';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
import useDialogState from '../../context/hooks/useDialogState';
import PropTypes from 'prop-types';
import DeckBuilderIcon from '../REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import DeckEditor from './DeckEditor';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import DeckDialog from '../../components/dialogs/DeckDialog';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import useGridItems from '../../context/hooks/useGridItems';
import useLocalStorage from '../../context/hooks/useLocalStorage';
import { useLoading } from '../../context/hooks/useLoading';
import { defaultValues } from '../../context/simplified_constants';
// import card_info from '../../data/initialCardData.jsx';

const DeckInfoItem = ({ label, value }) => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid
      item
      xs={4}
      sm={4}
      md={3}
      // style={{ padding: isMobileView ? '8px' : '16px' }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          maxHeight: '3rem',
        }}
      >
        {' '}
        <MDTypography
          variant={isMobileView ? 'body2' : 'h4'}
          sx={{ color: theme.palette.chartTheme.grey.darkest }}
        >
          {label}:
        </MDTypography>
        <MDTypography
          variant={isMobileView ? 'body1' : 'h6'}
          fontWeight="medium"
          sx={{ color: theme.palette.chartTheme.grey.light }}
        >
          {value}
        </MDTypography>
      </CardContent>
    </Grid>
  );
};
const IconWrapper = ({ children }) => (
  <Box
    sx={{
      borderRadius: '50%',
      width: 40,
      height: 40,
      minHeight: '4rem',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    }}
  >
    {children}
  </Box>
);
const DeckListItem = memo(
  ({ deck, cards, isEditPanelOpen, onToggleEditPanel }) => {
    const { theme } = useMode();
    const { deleteDeck, hasFetchedDecks } = useDeckManager();
    const {
      handleSelectDeck,
      allDecks,
      selectedDeck,
      deckHasBeenSelected,
      deckHasBeenUpdated,
      selectedDeckId,
      updatedCards,
    } = useSelectedDeck();
    const [decks] = useLocalStorage('decks', {});
    const specificDeck = decks.byId[deck?._id] || {};
    const { isLoading } = useLoading();
    const pageContext = 'Deck'; // Context to pass to GenericCard
    // const fetchUpdatedCardsFromLocalStorage = () => {
    //   // Assuming `useLocalStorage` manages synchronization with localStorage automatically
    //   // If `decks` state is synchronized with localStorage, you just need to access the cards from the selected deck
    //   return decks.byId[selectedDeckId]?.cards || [];
    // };
    // const updatedCards =
    //   allDecks?.find((d) => d?._id === selectedDeck?._id)?.cards || [];
    // const getUpdatedCards = () => {
    //   const updatedArray = [];
    //   if (allDecks) {
    //     allDecks.forEach((d) => {
    //       if (
    //         d?._id === selectedDeck?._id &&
    //         d?.cards.length !== cards?.length
    //       ) {
    //         console.log(d?.cards);
    //         updatedArray.push(d?.cards);
    //       }
    //     });
    //     return updatedArray;
    //   }
    //   if (specificDeck.cards.length !== cards?.length) {
    //     console.log(specificDeck?.cards);
    //     updatedArray.push(specificDeck?.cards);
    //   }
    //   return updatedArray;
    // };
    // console.log('UPDATED CARDS', specificDeck?.cards);
    // const [updatedCards, setUpdatedCards] = useState([]);

    // const [updatedCards, setUpdatedCards] = useState(getUpdatedCards());
    const cardDisplay = useGridItems({
      itemsPerPage: 8, // Define as per your requirement
      cards: updatedCards,
      isLoading: isLoading('fetchDecks'), // Pass the actual loading state
      hasFetched: hasFetchedDecks, // Pass the actual loading state
      allItems: allDecks, // Pass the actual loading state
      validSelection: deckHasBeenSelected,
      type: 'inventory',
      pageContext,
    });
    const handleSelection = useCallback(
      (deck) => {
        console.log('Deck Selected:', deck);
        handleSelectDeck(deck);
        // setUpdatedCards(cards || []);
        // setCurrentDeckCards(deck?.cards || []);
        onToggleEditPanel(deck?._id);
      },
      [handleSelectDeck]
    );
    return (
      <Card>
        <MDBox
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <CardActionArea
            onClick={() => handleSelection(deck)}
            // onClick={() => onToggleEditPanel(deck?._id)}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                // maxHeight: '10rem',
                minHeight: '8rem',
              }}
            >
              <IconWrapper>
                <DeckBuilderIcon style={{ fontSize: 20, color: 'white' }} />
              </IconWrapper>
            </CardContent>
            <Grid container alignItems="center" justify="center" spacing={2}>
              <DeckInfoItem label="Name" value={deck?.name} theme={theme} />
              <DeckInfoItem
                label="Value"
                value={`$${deck?.totalPrice}`}
                theme={theme}
              />
              <DeckInfoItem
                label="Cards"
                value={deck?.totalQuantity}
                theme={theme}
              />
            </Grid>
          </CardActionArea>
        </MDBox>
        <Collapse in={isEditPanelOpen}>
          <DeckEditor
            deck={deck}
            onClose={() => onToggleEditPanel(deck?._id)}
          />
          <Collapse in={deckHasBeenSelected}>{cardDisplay}</Collapse>
        </Collapse>
        {/* <Collapse in={deckHasBeenSelected}>{cardDisplay}</Collapse> */}
      </Card>
    );
  }
);

DeckListItem.displayName = 'DeckListItem';

DeckListItem.propTypes = {
  deck: PropTypes.object.isRequired,
  isEditPanelOpen: PropTypes.bool.isRequired,
  onToggleEditPanel: PropTypes.func.isRequired,
};

export default DeckListItem;

// useEffect(() => {
//   // Defining this function inside the useEffect ensures it captures the latest state and props
//   const fetchUpdatedCards = () => {
//     if (
//       !selectedDeck ||
//       !allDecks ||
//       !hasFetchedDecks ||
//       !deckHasBeenSelected
//     ) {
//       return [];
//     }

//     // Finding the current deck in allDecks to get the most updated cards array
//     const currentDeck = allDecks.find(
//       (deck) => deck?._id === selectedDeck?._id
//     );
//     return currentDeck &&
//       deckHasBeenUpdated &&
//       decks.byId[selectedDeckId]?.cards?.length !== cards?.length
//       ? decks.byId[selectedDeckId]?.cards
//       : [];
//   };

//   // Update the cards for the selected deck
//   const fetchedCards = fetchUpdatedCards();
//   setUpdatedCards(fetchedCards);

//   // This function will be called again if `selectedDeck` or `allDecks` changes
// }, [deckHasBeenUpdated]);
