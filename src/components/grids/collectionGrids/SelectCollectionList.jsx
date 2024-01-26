import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
  Button,
  Grid,
  Typography,
  useTheme,
  Skeleton,
  Card,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useStatisticsStore } from '../../../context/SECONDARY_CONTEXT/StatisticsContext/StatisticsContext';
import { roundToNearestTenth } from '../../../context/Helpers';
import { useMode, usePageContext } from '../../../context';
import CollectionListItem from './CollectionListItem';
import {
  AspectRatioBoxSkeleton,
  StyledSkeletonCard,
  ListItemSkeleton,
} from '../../../pages/pageStyles/StyledComponents';
import useCollectionVisibility from '../../../context/hooks/useCollectionVisibility';

const SelectCollectionList = ({ allCollections, openDialog }) => {
  const { theme } = useMode();
  const { setSelectedCollection } = useCollectionStore();
  const { setIsDataLoading, loadingStatus } = usePageContext();
  const { statsByCollectionId } = useStatisticsStore();
  const { showCollections, selectedCollectionId } = useCollectionVisibility();
  const handleOpenDialog = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      openDialog(true);
    },
    [setSelectedCollection]
  );

  return (
    showCollections && (
      <List>
        {allCollections?.map((collection, index) => {
          {
            /* const isLoading = loadingCollectionIds?.includes(collection?._id); */
          }
          if (!allCollections || allCollections.length === 0) {
            setIsDataLoading(true);
          }
          return loadingStatus?.isDataLoading ? (
            <ListItemSkeleton
              theme={theme}
              key={`loading-${collection?.name}-${index}`}
            >
              <StyledSkeletonCard theme={theme}>
                <AspectRatioBoxSkeleton theme={theme}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={50}
                  />
                </AspectRatioBoxSkeleton>
              </StyledSkeletonCard>
            </ListItemSkeleton>
          ) : (
            <CollectionListItem
              key={
                collection?._id ||
                `collectionListItem-${index}-${collection?._id}`
                // `${collection?.name}-${collection?.totalPrice}-${index}`
              }
              collection={collection}
              handleOpenDialog={handleOpenDialog}
              isSelected={selectedCollectionId === collection?._id}
              roundToNearestTenth={roundToNearestTenth}
              statsByCollectionId={statsByCollectionId}
              isPlaceholder={false}
            />
          );
        })}
      </List>
    )
  );
};

SelectCollectionList.propTypes = {
  // onSave: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  // handleSelectCollection: PropTypes.func.isRequired,
  // isLoadingNewCollection: PropTypes.bool,
  allCollections: PropTypes.array.isRequired, // Ensure this is passed or obtained from context
};

export default SelectCollectionList;
