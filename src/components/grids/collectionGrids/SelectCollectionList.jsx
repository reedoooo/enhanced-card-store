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
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useStatisticsStore } from '../../../context/StatisticsContext/StatisticsContext';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LongMenu from '../../reusable/LongMenu';
import { roundToNearestTenth } from '../../../context/Helpers';
import useSelectCollectionListStyles from '../../../context/hooks/useSelectCollectionListStyles';
import { styled } from '@mui/styles';
import { useMode } from '../../../context';

const StyledSkeletonCard = styled(Card)(({ theme }) => ({
  // Use the same styles as in StyledCard
  display: 'flex',
  flexDirection: 'column',
  minWidth: '109px',
  maxWidth: '100%',
  width: 'auto',
  maxHeight: '80vh',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const AspectRatioBoxSkeleton = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
}));

// eslint-disable-next-line react/display-name
// const ListItemSkeleton = memo(
//   () => {
//     const classes = useSelectCollectionListStyles();
//     return (
//       <ListItem className={classes.listItem}>
//         <StyledSkeletonCard>
//           <AspectRatioBoxSkeleton>
//             <Skeleton variant="rectangular" height={50} />
//           </AspectRatioBoxSkeleton>
//         </StyledSkeletonCard>
//       </ListItem>
//     );
//   },
//   () => true
// );
// eslint-disable-next-line react/display-name
// const ListItemSkeleton = memo(
//   () => {
//     const { theme } = useMode();

//     const classes = useSelectCollectionListStyles(theme);

//     return (
//       <ListItem className={classes.listItemSkeleton}>
//         <Card className={classes.skeletonCard}>
//           <Skeleton variant="rectangular" animation="wave" height={100} />
//         </Card>
//       </ListItem>
//     );
//   },
//   () => true
// );
// eslint-disable-next-line react/display-name
const ListItemSkeleton = memo(
  () => {
    const { theme } = useMode();
    const classes = useSelectCollectionListStyles(theme);
    return (
      <ListItem className={classes.listItemSkeleton}>
        <StyledSkeletonCard theme={theme}>
          <AspectRatioBoxSkeleton theme={theme}>
            <Skeleton variant="rectangular" animation="wave" height={50} />
          </AspectRatioBoxSkeleton>
        </StyledSkeletonCard>
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
    const { theme } = useMode();
    const classes = useSelectCollectionListStyles(theme);

    const twentyFourHourChange =
      statsByCollectionId[collection?._id]?.twentyFourHourAverage;
    return (
      <React.Fragment>
        <ListItem
          className={classes.collectionListItem}
          // className={`${classes.listItem} ${
          //   isSelected ? classes.selectedListItem : ''
          // }`}
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
  isLoadingNewCollection,
}) => {
  const classes = useSelectCollectionListStyles();
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [loadingCollectionIds, setLoadingCollectionIds] = useState([]);

  const { allCollections, setSelectedCollection, fetchAllCollectionsForUser } =
    useCollectionStore();
  const { statsByCollectionId } = useStatisticsStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = useCallback(
    (selectedId) => {
      setSelectedCollectionId(selectedId); // Keep track of the selected collection ID
      const selected = allCollections?.find(
        (collection) => collection._id === selectedId
      );
      if (!selected) {
        console.error('Collection not found with ID:', selectedId);
        return;
      }
      // setSelectedCollection(selected);
      handleSelectCollection(selected?._id);
      onSave(selected);
      setLoadingCollectionIds((prev) => [...prev, selectedId]);
    },
    [allCollections, onSave, handleSelectCollection] // Dependencies
  );
  const handleOpenDialog = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      openDialog(true);
    },
    [openDialog, setSelectedCollection]
  );
  // useEffect(() => {
  //   if (isLoadingNewCollection) {
  //     // Assume new collection is the last one added
  //     const newCollectionId = allCollections[allCollections.length - 1]?._id;
  //     if (newCollectionId) {
  //       setLoadingCollectionIds((prev) => [...prev, newCollectionId]);
  //     }
  //   }
  // }, [isLoadingNewCollection, allCollections]);
  useEffect(() => {
    if (isLoadingNewCollection) {
      // Assume new collection is the last one added
      const newCollectionId = allCollections[allCollections.length - 1]?._id;
      if (newCollectionId) {
        setLoadingCollectionIds((prev) => [...prev, newCollectionId]);
      }
    }
  }, [isLoadingNewCollection, allCollections]);
  // Effect to remove loading state once collection is considered "loaded"
  useEffect(() => {
    // Define a method to "load" collection, maybe after a fetch or certain condition
    const loadCollection = (collectionId) => {
      setLoadingCollectionIds((prev) =>
        prev.filter((id) => id !== collectionId)
      );
    };

    // Simulate loading each collection after a certain time
    loadingCollectionIds.forEach((collectionId) => {
      setTimeout(() => loadCollection(collectionId), 1000); // simulate delay
    });
  }, [loadingCollectionIds]);
  return (
    <List>
      {allCollections.map((collection) => {
        const isSelected = collection._id === selectedCollectionId;
        const isLoading = loadingCollectionIds.includes(collection._id);

        return isLoading ? (
          // Render skeleton if the collection is still loading
          <ListItemSkeleton key={`loading-${collection?._id}`} />
        ) : (
          // Render actual collection item if it's not in loading state
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
  );
};

SelectCollectionList.propTypes = {
  onSave: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  handleSelectCollection: PropTypes.func.isRequired,
};

export default SelectCollectionList;
