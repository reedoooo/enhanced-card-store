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
} from '@mui/material';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../reusable/indicators/LoadingIndicator';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useStatisticsStore } from '../../../context/StatisticsContext/StatisticsContext';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LongMenu from '../../reusable/LongMenu';
import { roundToNearestTenth } from '../../../context/Helpers';
import useSelectCollectionListStyles from '../../../context/hooks/useSelectCollectionListStyles';
// eslint-disable-next-line react/display-name
const ListItemSkeleton = memo(
  () => {
    const classes = useSelectCollectionListStyles();
    return (
      <ListItem className={classes.listItem}>
        <Skeleton variant="rectangular" height={50} />
      </ListItem>
    );
  },
  () => true
);

// eslint-disable-next-line react/display-name
const CollectionListItem = memo(
  ({
    collection,
    handleSelect,
    handleOpenDialog,
    isSelected,
    statsByCollectionId,
    isPlaceholder,
  }) => {
    const classes = useSelectCollectionListStyles();

    const twentyFourHourChange =
      statsByCollectionId[collection?._id]?.twentyFourHourAverage;
    return (
      <React.Fragment>
        <ListItem
          className={`${classes.listItem} ${
            isSelected ? classes.selectedListItem : ''
          }`}
          style={{ opacity: 1 }}
        >
          <ButtonBase
            sx={{ width: '100%' }}
            disabled={isPlaceholder}
            onClick={() => !isPlaceholder && handleSelect(collection?._id)}
          >
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3} className={classes.gridItem}>
                <Typography className={classes.gridItemText}>Name:</Typography>
                <Typography>{collection?.name}</Typography>
              </Grid>
              <Grid item xs={6} sm={3} className={classes.gridItem}>
                <Typography className={classes.gridItemText}>Value:</Typography>
                <Typography>
                  ${roundToNearestTenth(collection?.totalPrice)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} className={classes.gridItem}>
                <Typography className={classes.gridItemText}>
                  Performance:
                </Typography>
                <Typography
                  component="div"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {twentyFourHourChange?.priceChange > 0 ? (
                    <ArrowUpwardIcon className={classes.positivePerformance} />
                  ) : (
                    <ArrowDownwardIcon
                      className={classes.negativePerformance}
                    />
                  )}
                  {twentyFourHourChange?.percentageChange}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} className={classes.gridItem}>
                <Typography className={classes.gridItemText}>Cards:</Typography>
                <Typography>{collection?.totalQuantity}</Typography>
              </Grid>
            </Grid>
          </ButtonBase>
          <div className={classes.menuButton}>
            <LongMenu
              onEdit={() => handleOpenDialog(collection)}
              onStats={() => console.log('Stats:', collection)}
              onView={() => console.log('View:', collection)}
            />
          </div>
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if specific props have changed
    return (
      prevProps.collection._id === nextProps.collection._id &&
      prevProps.isSelected === nextProps.isSelected
    );
  }
);
const SelectCollectionList = ({
  onSave,
  openDialog,
  handleSelectCollection,
}) => {
  const classes = useSelectCollectionListStyles();
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  const { allCollections, setSelectedCollection, fetchAllCollectionsForUser } =
    useCollectionStore();
  const { statsByCollectionId } = useStatisticsStore();
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = useCallback(
    (selectedId) => {
      setSelectedCollectionId(selectedId); // Keep track of the selected collection ID
      const selected = allCollections.find(
        (collection) => collection._id === selectedId
      );
      if (!selected) {
        console.error('Collection not found with ID:', selectedId);
        return;
      }
      setSelectedCollection(selected);
      handleSelectCollection(selected?._id);
      onSave(selected);
    },
    [allCollections, onSave, setSelectedCollection, handleSelectCollection]
  );
  const handleOpenDialog = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      openDialog(true);
    },
    [openDialog, setSelectedCollection]
  );
  return (
    <>
      {isLoading ? (
        <List>
          {[...new Array(5)].map(
            (
              _,
              index // Render 5 skeleton list items
            ) => (
              <React.Fragment key={index}>
                <ListItemSkeleton />
                <Divider />
              </React.Fragment>
            )
          )}
        </List>
      ) : (
        <List>
          {allCollections?.map((collection) => {
            const isSelected = collection?._id === selectedCollectionId;

            return (
              <CollectionListItem
                key={collection._id}
                collection={collection}
                handleSelect={handleSelect}
                handleOpenDialog={handleOpenDialog}
                isSelected={isSelected}
                classes={classes}
                statsByCollectionId={statsByCollectionId}
                isPlaceholder={false}
              />
            );
          })}
        </List>
      )}
    </>
  );
};

SelectCollectionList.propTypes = {
  onSave: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  handleSelectCollection: PropTypes.func.isRequired,
};

export default SelectCollectionList;
