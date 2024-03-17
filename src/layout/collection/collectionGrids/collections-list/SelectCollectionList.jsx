import React, { memo, useEffect, useState } from 'react';
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
  const { allCollections, allIds } = useSelectedCollection();
  const [collectionList, setCollectionList] = useState([]);
  const numCollections = allIds?.length || 0;

  useEffect(() => {
    const minItems = 5;
    // const numCollections = allCollections?.length || 0;
    const numRequired =
      minItems - numCollections > 0 ? minItems - numCollections : 0;
    const allSkeletonCollections = [...Array(numRequired).keys()].map(
      (index) => (
        <CollectionListItemSkeleton
          key={`skeleton-${index}`}
          count={1}
          index={index}
        />
      )
    );
    const combinedCollections = [...allCollections, ...allSkeletonCollections];
    setCollectionList(combinedCollections);
  }, [numCollections]);

  return (
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
    >
      <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
        <TransitionGroup>
          {collectionList.map((item, index) =>
            item.type === CollectionListItemSkeleton ? (
              item
            ) : (
              <Collapse key={item?._id || `collection-${index}`}>
                <CollectionListItem collection={item} openDialog={openDialog} />
              </Collapse>
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
