import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Collapse,
  Grid,
  List,
  Skeleton,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import CollectionListItem from './CollectionListItem';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { CollectionListItemSkeleton } from '../../../REUSABLE_COMPONENTS/SkeletonVariants';
import { useMode } from '../../../../context';
import LoadingOverlay from '../../../REUSABLE_COMPONENTS/LoadingOverlay';

const SelectCollectionList = ({ handleSelectAndShowCollection }) => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screen
  const collectionData = useSelectedCollection();

  if (!collectionData) {
    // Handle the scenario where collectionData is null
    // Maybe set some default state or perform error handling
    return <LoadingOverlay />;
  }

  const {
    selectedCollection,
    allCollections,
    allIds,
    refreshCollections,
    // other returned values
  } = collectionData;
  const [collectionList, setCollectionList] = useState([]);
  const numCollections = allIds?.length || 0;
  const nonSkeletonCount = useRef(0);
  // useEffect(() => {
  //   // This effect will run whenever `allCollections` changes, including when a collection is deleted.
  //   refreshCollections(); // Fetch the latest collections whenever the component mounts or updates.
  // }, [refreshCollections]); // Dependency on `allCollections.length` to trigger re-fetching.

  useEffect(() => {
    const minItems = 5;
    const numRequired =
      minItems - numCollections > 0 ? minItems - numCollections : 0;
    nonSkeletonCount.current = numCollections;

    // const allSkeletonCollections = [...Array(numRequired).keys()].map(
    //   (index) => (
    //     <CollectionListItemSkeleton
    //       key={`skeleton-${index}`}
    //       count={1}
    //       index={index}
    //     />
    //   )
    // );
    const allSkeletonCollections = [...Array(numRequired).keys()].map(
      (index) => (
        <CollectionListItemSkeleton
          key={`skeleton-${index}`}
          count={1}
          index={index}
        />
      )
    );
    const combinedCollections = allCollections
      ?.map((collection, index) => (
        <CollectionListItem
          key={collection?._id || `collection-${index}`}
          collection={collection}
          handleSelectAndShowCollection={handleSelectAndShowCollection}
          // openEditDialog={openNewDialog}
        />
      ))
      .concat(allSkeletonCollections);

    setCollectionList(combinedCollections);
  }, [allIds?.length, isMobile]); // Dependency on allIds.length instead of allIds and allCollections

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
      <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
        <TransitionGroup>
          {collectionList?.map((item, index) => item)}
          {/* {collectionList?.map((item, index) =>
            React.isValidElement(item) ? (
              item
            ) : (
              <Skeleton key={`skeleton-${index}`} count={1} />
            )
          )} */}
        </TransitionGroup>
      </List>
    </SimpleCard>
  );
};

SelectCollectionList.propTypes = {
  // openNewDialog: PropTypes.func.isRequired,
  handleSelectAndShowCollection: PropTypes.func.isRequired,
};

export default memo(SelectCollectionList);
