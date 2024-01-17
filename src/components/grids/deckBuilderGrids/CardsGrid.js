import React, { useMemo, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import DeckItem from '../gridItems/DeckItem';
import { useDeckStore } from '../../../context/DeckContext/DeckContext';
import SkeletonDeckItem from '../gridItems/SkeletonDeckItem';
import GridLayout from '../searchResultsGrids/GridLayout';
const CardsGrid = ({ isLoading }) => {
  const { selectedCards } = useDeckStore();
  const [error, setError] = useState('');

  const flattenSelectedCards = useMemo(() => {
    if (!selectedCards || !Array.isArray(selectedCards)) return [];

    try {
      return selectedCards?.reduce((acc, card) => {
        const filledArray = Array(card?.quantity)
          .fill(card)
          .map((cardItem, index) => ({
            ...cardItem,
            uniqueKey: `${cardItem.id}-${index}`,
          }));
        return [...acc, ...filledArray];
      }, []);
    } catch (e) {
      console.error('Error processing cards:', e);
      setError('Failed to load cards');
      return [];
    }
  }, [selectedCards]);

  const skeletonCount = 12;
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  console.log('LOADING', isLoading);

  return (
    <GridLayout
      containerStyles={{ marginTop: '1rem' }}
      isLoading={isLoading}
      skeletonCount={9}
      gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 4 }}
    >
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <CSSTransition key={index} timeout={500} className="card">
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <SkeletonDeckItem context={'Deck'} />
              </Grid>
            </CSSTransition>
          ))
        : flattenSelectedCards?.map((card, index) => (
            <CSSTransition
              key={card?.uniqueKey || index}
              timeout={500}
              className="card"
            >
              <Grid item xs={6} sm={4} md={4} lg={3}>
                <DeckItem
                  card={card}
                  page={'Deck'}
                  index={index}
                  context={'Deck'}
                />
              </Grid>
            </CSSTransition>
          ))}
    </GridLayout>
  );
};

export default React.memo(CardsGrid); // Using React.memo for memoization

// import React, { useMemo } from 'react';
// import { Grid } from '@mui/material';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import GenericCard from '../../cards/GenericCard';
// import { useDeckStyles } from '../gridStyles';
// import DeckItem from '../DeckItem';

// const CardsGrid = ({ selectedCards }) => {
//   const flattenSelectedCards = useMemo(
//     () =>
//       selectedCards.reduce((acc, card) => {
//         return selectedCards.reduce((acc, card) => {
//           const filledArray = Array(card.quantity)
//             .fill(card)
//             .map((cardItem, index) => ({
//               ...cardItem,
//               uniqueKey: `${cardItem.id}-${index}`,
//             }));
//           return [...acc, ...filledArray];
//         }, []);
//       }, []),
//     [selectedCards]
//   );

//   return (
//     <Grid container spacing={2}>
//       <TransitionGroup component={null}>
//         {flattenSelectedCards.map((card, index) => (
//           <CSSTransition
//             key={card?.uniqueKey || index}
//             timeout={500}
//             classNames="card"
//           >
//             <Grid item xs={6} sm={4} md={3} lg={3}>
//               <DeckItem
//                 card={card}
//                 page={'Deck'}
//                 index={index}
//                 context={'Deck'}
//               />
//             </Grid>
//           </CSSTransition>
//         ))}
//       </TransitionGroup>
//     </Grid>
//   );
// };

// export default React.memo(CardsGrid); // Using React.memo for memoization
