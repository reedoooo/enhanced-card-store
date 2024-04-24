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
import useManager from '../../context/MAIN_CONTEXT/CollectionContext/useManager';

const SelectCollectionList = ({ handleSelectAndShowCollection }) => {
  const { isMobile } = useBreakpoint(); // Detect mobile screen
  const { theme } = useMode();
  const {
    fetchCollections,
    deleteCollection,
    collections: allCollections,
    hasFetchedCollections,
  } = useManager();
  // const { entities, hasFetched } = useSelector(
  //   'collections',
  //   defaultValues.defaultCollections
  // );
  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);
  const [collectionList, setCollectionList] = useState([]);
  useEffect(() => {
    console.log('ALL COLLECTIONS:', allCollections);
    // console.log('ENTITIES:', Object.values(entities.byId));
    setCollectionList(allCollections);
    // setCollectionList(Object.values(entities.byId));
  }, [allCollections]);
  // console.log(entities);

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

  // const maxSkeletonItems = 5;
  // const skeletonCount = Math.min(
  //   maxSkeletonItems,
  //   maxSkeletonItems - collectionList.length
  // );
  // for (let i = 0; i < skeletonCount; i++) {
  //   collectionList.push(<CollectionListItemSkeleton key={`skeleton-${i}`} />);
  // }
  // RENDER SKELETON ITEMS EQUAL TO THE DIFFERENCE BETWEEN THE MAX SKELETON ITEMS AND THE LENGTH OF THE COLLECTION LIST
  // const renderedCollectionList = useMemo(() => {
  //   return [
  //    ...collectionList.map((item, index) => renderCollectionItem(item, index)),
  //    ...Array.from({ length: skeletonCount }, (_, i) => (
  //       <CollectionListItemSkeleton key={`skeleton-${i}`} />
  //     )),
  //   ];
  // }, [collectionList, skeletonCount]);
  // const renderedCollectionList = Array.isArray(collectionList) ? (
  //   collectionList.map((item, index) => renderCollectionItem(item, index))
  // ) : (
  // for (let i = 0; i < skeletonCount; i++) {
  //     <CollectionListItemSkeleton key={`skeleton-${i}`} />;
  //   });

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
            <CollectionListItemSkeleton key={`skeleton-${i}`} />
          ))}
        </TransitionGroup>
      </List>
    </SimpleCard>
  );
};

SelectCollectionList.propTypes = {
  handleSelectAndShowCollection: PropTypes.func.isRequired,
};

export default memo(SelectCollectionList);
