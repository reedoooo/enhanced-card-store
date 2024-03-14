import React, { memo, useRef, useState } from 'react';
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
const FlexContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;
const CollectionListItemSkeleton = ({ count, index }) => (
  <Collapse key={`skeleton-${index}-${count}`} in={true}>
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
      <Card sx={{ width: '100%' }}>
        <CardActionArea sx={{ width: '100%' }} disabled={true}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" sx={{ flexGrow: 1, mx: 2 }} />
            <Skeleton variant="text" width="60%" />
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  </Collapse>
);

CollectionListItemSkeleton.propTypes = {
  count: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const SelectCollectionList = ({ openDialog }) => {
  const { allCollections } = useSelectedCollection();
  // const [skeletonCount, setSkeletonCount] = useState(0);
  const listRef = useRef();
  const minItems = 5;
  const numRequired = minItems - (allCollections?.length || 0);
  const allSkeletonCollections = [...Array(numRequired).keys()].map((index) => (
    <CollectionListItemSkeleton
      key={`skeleton-${index}`}
      count={1}
      index={index}
    />
  ));
  const combinedCollections = [...allCollections, ...allSkeletonCollections];
  return (
    <SimpleCard
      // ref={listRef}
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
    >
      <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
        <TransitionGroup>
          {combinedCollections?.map((collection, index) => (
            <Collapse
              key={
                collection?._id
                  ? `${collection?._id}-${index}-${collection?.name}`
                  : `skeleton-${index}`
              }
            >
              <CollectionListItem
                // key={`${collection?._id}-${index}`}
                collection={collection}
                openDialog={openDialog}
              />
            </Collapse>
          ))}
          {/* <CollectionListItemSkeleton count={skeletonCount} /> */}
        </TransitionGroup>
      </List>
    </SimpleCard>
  );
};

SelectCollectionList.propTypes = {
  openDialog: PropTypes.func.isRequired,
};

export default memo(SelectCollectionList);
