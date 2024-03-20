import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Collapse,
  Grid,
  List,
  Skeleton,
} from '@mui/material';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import DeckListItem from './DeckListItem'; // Adjusted import
import styled from 'styled-components';
import { useDeckStore } from '../../context';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { DeckListItemSkeleton } from '../REUSABLE_COMPONENTS/SkeletonVariants';

// const DeckListItemSkeleton = ({ count, index }) => (
//   <Collapse key={`skeleton-${index}-${count}`} in={true}>
//     <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
//       <Card sx={{ width: '100%' }}>
//         <CardActionArea sx={{ width: '100%' }} disabled={true}>
//           <Grid container spacing={2} sx={{ p: 2 }}>
//             <Skeleton variant="circular" width={40} height={40} />
//             <Skeleton variant="text" sx={{ flexGrow: 1, mx: 2 }} />
//             <Skeleton variant="text" width="60%" />
//           </Grid>
//         </CardActionArea>
//       </Card>
//     </Box>
//   </Collapse>
// );

// DeckListItemSkeleton.propTypes = {
//   count: PropTypes.number.isRequired,
//   index: PropTypes.number.isRequired,
// };

const SelectDeckList = () => {
  const { allDecks } = useSelectedDeck();
  const [deckList, setDeckList] = useState([]);
  const [openEditorDeckId, setOpenEditorDeckId] = useState(null);
  const handleToggleEditPanel = (deckId) => {
    setOpenEditorDeckId(openEditorDeckId === deckId ? null : deckId);
  };
  const numDecks = allDecks?.length || 0;
  useEffect(() => {
    const minItems = 5;
    const numRequired = minItems - numDecks > 0 ? minItems - numDecks : 0;
    const allSkeletonDecks = [...Array(numRequired).keys()].map((index) => (
      <DeckListItemSkeleton
        key={`skeleton-${index}`}
        count={numRequired}
        index={index}
      />
    ));
    const combinedDecks = [...allDecks, ...allSkeletonDecks];
    setDeckList(combinedDecks);
  }, [numDecks]);

  return (
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
    >
      <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
        <TransitionGroup>
          {deckList?.map((item, index) =>
            item?.type === DeckListItemSkeleton ? (
              item
            ) : (
              <Collapse key={`deck-${item?._id}-${index}`}>
                <DeckListItem
                  deck={item}
                  cards={item?.cards}
                  isEditPanelOpen={openEditorDeckId === item?._id}
                  onToggleEditPanel={handleToggleEditPanel}
                />
              </Collapse>
            )
          )}
        </TransitionGroup>
      </List>
    </SimpleCard>
  );
};

export default memo(SelectDeckList);
