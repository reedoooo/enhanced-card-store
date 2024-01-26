import React, { useMemo } from 'react';
import { Grid, Container } from '@mui/material';
import DeckItem from '../gridItems/DeckItem';
import { CSSTransition } from 'react-transition-group';

import ReusableSkeletonItem from '../gridItems/ReusableSkeletonItem';
import useLocalStorage from '../../../context/hooks/useLocalStorage';
import GridLayout from './GridLayout';

const DeckSearchCardGrid = ({
  userDecks,
  cards,
  page,
  itemsPerPage,
  isLoading,
  searchData,
}) => {
  return (
    <GridLayout
      containerStyles={{ marginTop: '1rem' }}
      isLoading={isLoading}
      skeletonCount={itemsPerPage}
      gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 4 }}
    >
      {!cards.length ? (
        <ReusableSkeletonItem
          count={itemsPerPage}
          gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 4 }}
        />
      ) : (
        cards.map((card, index) => (
          <CSSTransition key={card.id} timeout={500} classNames="card">
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <DeckItem
                card={card}
                userDecks={userDecks}
                context={'Deck'}
                page={'DeckBuilder'}
              />
            </Grid>
          </CSSTransition>
        ))
      )}
    </GridLayout>
  );
};

export default DeckSearchCardGrid;
