import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { List, Collapse } from '@mui/material';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import CollectionListItem from './CollectionListItem';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import useBreakpoint from '../../context/hooks/useBreakPoint';
import useCollectionManager from '../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import { useMode } from '../../context';
import { CollectionListItemSkeleton } from '../REUSABLE_COMPONENTS/system-utils/SkeletonVariants';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';

const SelectCollectionList = ({ handleSelectAndShowCollection }) => {
  const { isMobile } = useBreakpoint(); // Detect mobile screen
  const { theme } = useMode();
  const selectionData = useSelectedCollection();
  const collectionData = useCollectionManager();
  if (!collectionData || !selectionData) {
    return <LoadingOverlay />;
  }
  const { hasFetchedCollections, fetchCollections } = collectionData;
  const {
    allCollections,
    allIds,
    refreshCollections,
    refreshCollections2,
    collections,
  } = selectionData;
  const [collectionList, setCollectionList] = useState(allCollections);
  const [safeCollectionList, setSafeCollectionList] = useState([]);
  const [error, setError] = useState(null);
  const collectionsRef = useRef([]);
  useEffect(() => {
    setCollectionList(allCollections);
    setSafeCollectionList(allCollections);
  }, []);
  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
      collectionsRef.current = allCollections;
      setSafeCollectionList(allCollections);
      console.log('DECKS REF', collectionsRef.current);
      // fetchDecks();
    }
  }, [hasFetchedCollections]);
  useEffect(() => {
    const handleStorageChange = () => {
      const newData = JSON.parse(localStorage.getItem('collections') || '{}');
      if (
        newData !== collections &&
        newData.lastUpdated !== collections.lastUpdated
      ) {
        // filter out any collections with _id value containing empty strings
        const newAllCollections = Object.values(newData?.byId).filter(
          (collection) => collection?._id !== ''
        );
        if (!newAllCollections.length) {
          setError('No decks found in storage.');
          return;
        }
        collectionsRef.current = newAllCollections;
        setSafeCollectionList(newAllCollections);
        refreshCollections2();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  const { deleteCollection } = collectionData;
  const handleDelete = useCallback(
    async (collectionId) => {
      if (!collectionId) return;
      try {
        await deleteCollection(collectionId);
        // const updatedCollections = allCollections.filter(
        //   (col) => col._id !== collectionId
        // );
        setCollectionList((prev) =>
          prev.filter((col) => col._id !== collectionId)
        );
        // console.log('UPDATED COLLECTIONS', updatedCollections);
        // refreshCollections(updatedCollections); // Assuming refreshCollections now directly accepts an updated array
      } catch (error) {
        console.error('Failed to delete collection:', error);
      }
    },
    [deleteCollection, allIds, refreshCollections]
  );

  const renderCollectionItem = (collection, index) => (
    <Collapse
      key={`${collection._id}-collapse-${index}`}
      in={true}
      timeout={500}
    >
      <CollectionListItem
        key={`${collection._id}-collection-${index}`}
        // key={item.key}
        collection={collection}
        handleSelectAndShowCollection={handleSelectAndShowCollection}
        handleDelete={() => handleDelete(collection._id)}
      />
    </Collapse>
  );

  const maxSkeletonItems = 5;
  const skeletonCount = Math.min(
    maxSkeletonItems,
    maxSkeletonItems - collectionList.length
  );
  for (let i = 0; i < skeletonCount; i++) {
    collectionList.push(<CollectionListItemSkeleton key={`skeleton-${i}`} />);
  }

  return (
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
        <TransitionGroup>
          {safeCollectionList?.map((item, index) =>
            renderCollectionItem(item, index)
          )}
          {/* {collectionList?.map((item, index) =>
              renderCollectionItem(item, index)
            )} */}
        </TransitionGroup>
      </List>
    </SimpleCard>
  );
};

SelectCollectionList.propTypes = {
  handleSelectAndShowCollection: PropTypes.func.isRequired,
};

export default memo(SelectCollectionList);
