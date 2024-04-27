import React, { memo, useCallback, useEffect, useState } from 'react';
import { List, Collapse, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import CollectionListItem from './CollectionListItem';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import useBreakpoint from '../../context/hooks/useBreakPoint';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import { useMode } from '../../context';
import { CollectionListItemSkeleton } from '../REUSABLE_COMPONENTS/system-utils/SkeletonVariants';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import useManager from '../../context/useManager';

const SelectCollectionList = ({ handleSelectAndShowCollection }) => {
  const { isMobile } = useBreakpoint();
  const { theme } = useMode();
  const {
    fetchCollections,
    deleteCollection,
    collections: allCollections,
    hasFetchedCollections,
  } = useManager();
  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);
  const [collectionList, setCollectionList] = useState([]);
  const [showSkeletons, setShowSkeletons] = useState(true);
  useEffect(() => {
    // Auto hide skeletons after a delay to simulate loading
    const timer = setTimeout(() => setShowSkeletons(false), 200); // Adjust the delay to match your fetch timing or interaction
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('ALL COLLECTIONS:', allCollections);
    setCollectionList(allCollections);
  }, [allCollections]);

  if (!allCollections) {
    return <LoadingOverlay />;
  }

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
  const skeletonCount = 5 - collectionList.length;

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
          {/* {[...Array(skeletonCount).keys()].map((i) => (
            <CollectionListItemSkeleton key={`skeleton-${i}`} />
          ))} */}
        </TransitionGroup>
      </List>
    </SimpleCard>
  );
};

SelectCollectionList.propTypes = {
  handleSelectAndShowCollection: PropTypes.func.isRequired,
};

export default memo(SelectCollectionList);
