import React from 'react';
import { Grid, Grow } from '@mui/material';
import ReusableSkeletonItem from '../gridItems/ReusableSkeletonItem';
import StoreItem from '../gridItems/StoreItem';
import DeckItem from '../gridItems/DeckItem';
import { useCardStoreHook } from '../../../context/hooks/useCardStore';

const useGridItems = ({ itemsPerPage, cards, pageContext }) => {
  const { loadingSearchResults } = useCardStoreHook();

  return React.useMemo(() => {
    return cards?.map((card, index) => {
      const ItemComponent = pageContext === 'Cart' ? StoreItem : DeckItem;

      return (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          key={`${card?.id}-${index}`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...(loadingSearchResults ? { timeout: (index + 1) * 300 } : {})}
          >
            <div>
              {loadingSearchResults ? (
                <ReusableSkeletonItem key={index} />
              ) : (
                <ItemComponent
                  card={card}
                  context={pageContext}
                  index={index}
                />
              )}
            </div>
          </Grow>
        </Grid>
      );
    });
  }, [itemsPerPage, cards, pageContext, loadingSearchResults]);
};

export default useGridItems;
