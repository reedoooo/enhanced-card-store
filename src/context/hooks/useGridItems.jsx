import React, { useMemo } from 'react';
import { Grid, Grow, IconButton, Tooltip } from '@mui/material';
import { useCardStoreHook } from './useCardStore';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import GenericCard from '../../components/cards/GenericCard';
import { SkeletonCard } from '../../layout/REUSABLE_COMPONENTS/SkeletonVariants';
import DeleteIcon from '@mui/icons-material/Delete';
import useMode from '../UTILITIES_CONTEXT/ColorModeContext/useMode';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import useDeckManager from '../MAIN_CONTEXT/DeckContext/useDeckManager';
const useGridItems = ({
  itemsPerPage,
  cards,
  pageContext,
  isLoading,
  hasFetched,
  allItems,
  validSelection,
  type,
  deckId,
}) => {
  const { loadingSearchResults } = useCardStoreHook();
  const skeletonCount = isLoading ? itemsPerPage : cards?.length;
  const { theme } = useMode();
  const { removeOneFromDeck } = useDeckManager();
  const calculateTimeout = (index) => index * 400; // Adjust this value for faster or slower animations
  const gridItems = useMemo(() => {
    console.log('GRID ITEMS:', cards);
    return (
      isLoading || loadingSearchResults
        ? Array.from({ length: itemsPerPage })
        : cards
    )?.map((card, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={isLoading ? `skeleton-${index}` : `card-${card?.id}-${index}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative', // Needed to position the delete icon correctly
        }}
      >
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          timeout={calculateTimeout(index)}
        >
          <MDBox
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative', // Ensure the MDBox can act as a reference for the delete icon's positioning
            }}
          >
            {isLoading || loadingSearchResults ? (
              <SkeletonCard />
            ) : (
              <React.Fragment>
                <GenericCard
                  card={card}
                  page={pageContext}
                  context={pageContext}
                  // context={`${pageContext}`}
                />
                {type === 'deck' && (
                  <Tooltip title="Delete">
                    <IconButton
                      sx={{
                        position: 'absolute',
                        background: theme.palette.error.main,
                        borderColor: 'black',
                        borderWidth: 5,
                        color: theme.palette.error.contrastText,
                        top: 3,
                        right: 3,
                        // bottom: '85%',
                        // left: '85%',
                        // top: 8,
                        // right: 8,
                        zIndex: 5,
                        opacity: 1,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 1,
                        },
                        // Adjust icon size here
                        fontSize: '2rem', // Adjust based on your preference
                        '& .MuiSvgIcon-root': {
                          // Directly target the icon SVG
                          fontSize: '2rem', // Adjust based on your preference
                        },
                      }}
                      size="small"
                      onClick={() => {
                        // Add delete logic here
                        console.log('Delete icon clicked for', card?.id);
                        removeOneFromDeck(card, card?.id, deckId);
                        console.log(
                          'Card removed from deck',
                          card,
                          card?.id,
                          deckId
                        );
                      }}
                    >
                      <HighlightOffRoundedIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </React.Fragment>
            )}
            {/* TODO: create a very small delete icon which appears on hover at the top right of the grid Item. It will need to be a higher z index or posiito naboslujte or somethihng to be visible above the card */}
          </MDBox>
        </Grow>
      </Grid>
    ));
  }, [isLoading, loadingSearchResults, cards, itemsPerPage]);

  return (
    <Grid container spacing={2}>
      {gridItems}
    </Grid>
  );
};

export default useGridItems;
