import React, { useMemo } from 'react';
import { Grid, Grow, IconButton, Tooltip } from '@mui/material';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import GenericCard from '../../components/cards/GenericCard';
import { SkeletonCard } from '../../layout/REUSABLE_COMPONENTS/system-utils/SkeletonVariants';
import useMode from '../useMode';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useCardStoreHook } from '../useCardStore';
import useManager from '../useManager';
const useGridItems = ({
  itemsPerPage,
  cards,
  pageContext,
  isLoading,
  type,
  deckId,
}) => {
  const { loadingSearchResults } = useCardStoreHook();
  const { theme } = useMode();
  const { removeItemFromDeck } = useManager();
  const calculateTimeout = (index) => index * 400; // Adjust this value for faster or slower animations
  const gridItems = useMemo(() => {
    return (
      isLoading || loadingSearchResults
        ? Array.from({ length: itemsPerPage })
        : cards
    )?.map((card, index) => (
      <Grid
        item
        xs={6}
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
                  cardClasses="base-card-no-quantity"
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
                        zIndex: 5,
                        opacity: 1,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 1,
                        },
                        fontSize: '2rem', // Adjust based on your preference
                        '& .MuiSvgIcon-root': {
                          fontSize: '2rem', // Adjust based on your preference
                        },
                      }}
                      size="small"
                      onClick={() => {
                        console.log('Delete icon clicked for', card?.id);
                        removeItemFromDeck(card, card?.id, deckId);
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
