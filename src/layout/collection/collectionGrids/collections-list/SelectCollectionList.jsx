import React, { memo, useEffect, useRef, useState } from 'react';
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
import CollectionListItem from './CollectionListItem';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import styled from 'styled-components';
import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { CollectionListItemSkeleton } from '../../../REUSABLE_COMPONENTS/SkeletonVariants';

const SelectCollectionList = ({
  openDialog,
  handleSelectAndShowCollection,
}) => {
  const {
    allCollections,
    allIds,
    handleSelectCollection,
    toggleShowCollections,
  } = useSelectedCollection();
  const [collectionList, setCollectionList] = useState([]);
  const numCollections = allIds?.length || 0;
  const nonSkeletonCount = useRef(0);

  useEffect(() => {
    const minItems = 5;
    const numRequired =
      minItems - numCollections > 0 ? minItems - numCollections : 0;
    nonSkeletonCount.current = numCollections;

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
      .map((collection, index) => (
        <Collapse key={collection?._id || `collection-${index}`}>
          <Card
            onClick={() => {
              handleSelectAndShowCollection(collection);
            }}
          >
            <CollectionListItem
              collection={collection}
              openDialog={openDialog}
            />
          </Card>
        </Collapse>
      ))
      .concat(allSkeletonCollections);

    setCollectionList(combinedCollections);
  }, [allIds?.length]); // Dependency on allIds.length instead of allIds and allCollections

  return (
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
      sx={
        {
          // hidden: !showCollections,
        }
      }
    >
      <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
        <TransitionGroup>
          {collectionList?.map((item, index) =>
            React.isValidElement(item) ? (
              item
            ) : (
              <Skeleton key={`skeleton-${index}`} count={1} />
            )
          )}
        </TransitionGroup>
      </List>
    </SimpleCard>
  );
};

SelectCollectionList.propTypes = {
  openDialog: PropTypes.func.isRequired,
};

export default memo(SelectCollectionList);
