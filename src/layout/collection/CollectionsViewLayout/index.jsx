import React, { memo, useCallback, useEffect, useState } from 'react';
import { List, Collapse } from '@mui/material';
import PropTypes from 'prop-types';

import { TransitionGroup } from 'react-transition-group';

import CollectionListItem from './CollectionListItem';

import {
  CollectionListItemSkeleton,
  LoadingOverlay,
  RCCard,
} from 'layout/REUSABLE_COMPONENTS';

import { useMode, useBreakpoint, useManager } from 'context';

const CollectionsViewLayout = ({ handleSelectAndShowCollection }) => {
  const { isMobile } = useBreakpoint();
  const { theme } = useMode();
  const {
    fetchCollections,
    deleteCollection,
    collections: allCollections,
    hasFetchedCollections,
    setHasFetchedCollections,
    status,
    handleSelectCollection,
  } = useManager();
  const [collectionList, setCollectionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionData = await fetchCollections();
        console.log('ALL COLLECTIONS:', collectionData);
        setCollectionList(collectionData);
        const storedCollectionId = localStorage.getItem('selectedCollectionId');
        const initialCollection = collectionData?.find(
          (collection) => collection._id === storedCollectionId
        );
        if (initialCollection) {
          console.log('INITIAL COLLECTION:', initialCollection);
          // setActiveTab(initialDeck ? loadedDecks?.indexOf(initialDeck) : 0);
          handleSelectCollection(initialCollection); // Ensure the deck is selected in context or state
        }
      } catch (error) {
        console.error('Failed to fetch collections:', error);
      }
    }; // Adjust the delay to match your fetch timing or interaction
    if (!hasFetchedCollections && status !== 'loading') {
      fetchData();
      setHasFetchedCollections(true);
    }
  }, [
    hasFetchedCollections,
    fetchCollections,
    status,
    setHasFetchedCollections,
    setCollectionList,
  ]);

  const [showSkeletons, setShowSkeletons] = useState(true);
  const handleDelete = useCallback(
    async (collectionId) => {
      try {
        await deleteCollection(collectionId);
      } catch (error) {
        console.error('Failed to delete collection:', error);
      }
    },
    [deleteCollection]
  );

  const renderCollectionItem = useCallback(
    (collection, index) => (
      <Collapse
        key={`${collection._id}-collapse-${index}`}
        in={true}
        timeout={500}
      >
        <CollectionListItem
          key={`${collection._id}-collection-${index}`}
          collection={collection}
          handleSelectAndShowCollection={handleSelectAndShowCollection}
          handleDelete={() => handleDelete(collection._id)}
        />
      </Collapse>
    ),
    [handleSelectAndShowCollection, handleDelete]
  );
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeletons(false), 200); // Adjust the delay to match your fetch timing or interaction
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   console.log('ALL COLLECTIONS:', allCollections);
  //   setCollectionList(allCollections);
  // }, [allCollections]);

  if (!allCollections) {
    return <LoadingOverlay />;
  }

  const skeletonCount = 5 - collectionList.length;

  return (
    <RCCard
      hasTitle={false}
      noBottomMargin={true}
      sx={{
        ...(isMobile && {
          boxShadow: 'none',
        }),
      }}
    >
      <List
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          mx: 'auto',
          px: '1rem',
          backgroundColor: theme.palette.black.darker,
        }}
      >
        <TransitionGroup>
          {collectionList?.map((item, index) =>
            renderCollectionItem(item, index)
          )}
          {[...Array(skeletonCount).keys()].map((i) => (
            <Collapse
              key={`skeleton-${i}`}
              in={showSkeletons}
              timeout={500}
              unmountOnExit
            >
              <CollectionListItemSkeleton />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </RCCard>
  );
};

CollectionsViewLayout.propTypes = {
  handleSelectAndShowCollection: PropTypes.func.isRequired,
};

export default memo(CollectionsViewLayout);
