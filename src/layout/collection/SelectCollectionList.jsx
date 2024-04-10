import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { List } from '@mui/material';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import CollectionListItem from './CollectionListItem';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import useBreakpoint from '../../context/hooks/useBreakPoint';
import useCollectionManager from '../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import { useMode } from '../../context';
import { CollectionListItemSkeleton } from '../REUSABLE_COMPONENTS/SkeletonVariants';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';

const SelectCollectionList = ({ handleSelectAndShowCollection }) => {
  const { isMobile } = useBreakpoint(); // Detect mobile screen
  const { theme } = useMode();
  const selectionData = useSelectedCollection();
  const collectionData = useCollectionManager();
  if (!collectionData || !selectionData) {
    return <LoadingOverlay />;
  }
  const { allCollections, allIds, refreshCollections } = selectionData;
  const { deleteCollection } = collectionData;
  const handleDelete = useCallback(
    async (collectionId) => {
      if (!collectionId) return;
      try {
        await deleteCollection(collectionId);
        const updatedCollections = allCollections.filter(
          (col) => col._id !== collectionId
        );
        refreshCollections(updatedCollections); // Assuming refreshCollections now directly accepts an updated array
      } catch (error) {
        console.error('Failed to delete collection:', error);
      }
    },
    [deleteCollection, allIds, refreshCollections]
  );
  const collectionList = allCollections?.map((collection, index) => (
    <CollectionListItem
      key={`${collection._id}-collection-${index}`}
      collection={collection}
      handleSelectAndShowCollection={handleSelectAndShowCollection}
      handleDelete={() => handleDelete(collection._id)}
    />
  ));
  const maxSkeletonItems = 5;
  const skeletonCount = Math.min(
    maxSkeletonItems,
    maxSkeletonItems - collectionList.length
  );
  for (let i = 0; i < skeletonCount; i++) {
    collectionList.push(<CollectionListItemSkeleton key={`skeleton-${i}`} />);
  }

  return (
    <>
      <SimpleCard
        theme={uniqueTheme}
        hasTitle={false}
        isPrimary={false}
        noBottomMargin={true}
        sx={{
          ...(isMobile && {
            boxShadow: 'none', // Optionally adjust the SimpleCard's style for mobile
          }),
        }}
      >
        <List
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            mx: 'auto',
            px: '1rem',
            backgroundColor: theme.palette.grey.black,
          }}
        >
          <TransitionGroup>{collectionList}</TransitionGroup>
        </List>
      </SimpleCard>
    </>
  );
};

SelectCollectionList.propTypes = {
  handleSelectAndShowCollection: PropTypes.func.isRequired,
};

export default memo(SelectCollectionList);
