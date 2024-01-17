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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LongMenu from '../../reusable/LongMenu';
import { roundToNearestTenth } from '../../../context/Helpers';
import styled from 'styled-components';
import {
  useCollectionStore,
  useMode,
  usePageContext,
  useStatisticsStore,
} from '../../../context';
import CollectionListItem from './CollectionListItem';
import {
  StyledSkeletonCard,
  AspectRatioBoxSkeleton,
} from '../../../pages/pageStyles/StyledComponents';
import useList from '../../../context/hooks/useList';
import useMap from '../../../context/hooks/useMap';

// eslint-disable-next-line react/display-name
const ListItemSkeleton = memo(
  () => {
    const { theme } = useMode();
    return (
      <ListItemSkeleton theme={theme}>
        <StyledSkeletonCard theme={theme}>
          <AspectRatioBoxSkeleton theme={theme}>
            <Skeleton variant="rectangular" animation="wave" height={50} />
          </AspectRatioBoxSkeleton>
        </StyledSkeletonCard>
      </ListItemSkeleton>
    );
  },
  () => true
);

const SelectCollectionList = ({
  onSave,
  openDialog,
  handleSelectCollection,
  isLoadingNewCollection,
}) => {
  const { theme } = useMode();
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [loadingCollectionIds, setLoadingCollectionIds] = useState([]);
  const { allCollections, setSelectedCollection, selectedCollection } =
    useCollectionStore();
  const { setLoading } = usePageContext();
  const { statsByCollectionId } = useStatisticsStore();
  // const { list: allCollections } = useList(); // Assuming allCollections is initially fetched
  const { mapData: loadingCollectionMap, setMap, deleteKey } = useMap();

  const handleSelect = useCallback(
    (selectedId) => {
      console.log('selectedId', selectedId);
      setSelectedCollectionId(selectedId); // Keep track of the selected collection ID
      const selected = allCollections?.find(
        (collection) => collection._id === selectedId
      );
      if (!selected) {
        console.error('Collection not found with ID:', selectedId);
        return;
      }
      // setSelectedCollection(selected);
      setMap(selected?._id, true); // Set loading state for the selected collection
      handleSelectCollection(selected?._id);
      onSave(selected);
      setLoadingCollectionIds((prev) => [...prev, selectedId]);
    },
    [setMap, allCollections, onSave, handleSelectCollection] // Dependencies
  );
  const handleOpenDialog = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      openDialog(true);
    },
    [openDialog, setSelectedCollection]
  );

  useEffect(() => {
    if (isLoadingNewCollection) {
      setLoading('isLoading', true);
      const newCollectionId = allCollections[allCollections?.length - 1]?._id;
      if (newCollectionId) {
        setMap(newCollectionId, true); // Set loading state for new collection
        setLoading('isLoading', false);
      }
    }
  }, [isLoadingNewCollection, allCollections, setMap, setLoading]);

  useEffect(() => {
    loadingCollectionMap.forEach((_, collectionId) => {
      setTimeout(() => deleteKey(collectionId), 1000); // Simulate delay and delete loading state
    });
  }, [loadingCollectionMap, deleteKey]);

  return (
    <List>
      {allCollections?.map((collection) => {
        const isSelected = collection?._id === selectedCollectionId;
        {
          /* const isLoading = loadingCollectionIds?.includes(collection?._id); */
        }
        const isLoading = loadingCollectionMap.has(collection?._id);

        return isLoading ? (
          // Render skeleton if the collection is still loading
          <ListItemSkeleton key={`loading-${collection?._id}`} />
        ) : (
          // Render actual collection item if it's not in loading state
          <CollectionListItem
            key={collection?._id}
            collection={collection}
            handleSelect={handleSelect}
            handleOpenDialog={handleOpenDialog}
            roundToNearestTenth={roundToNearestTenth}
            isSelected={isSelected}
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
  isLoadingNewCollection: PropTypes.bool,
};

export default SelectCollectionList;
// eslint-disable-next-line react/display-name
// const CollectionListItem = memo(
//   ({
//     collection,
//     handleSelect,
//     handleOpenDialog,
//     isSelected,
//     statsByCollectionId,
//     isPlaceholder,
//   }) => {
//     const { theme } = useMode();
//     const classes = useSelectCollectionListStyles(theme);
//     console.log('statsByCollectionId', statsByCollectionId);
//     const twentyFourHourChange = statsByCollectionId?.twentyFourHourAverage;
//     return (
//       <React.Fragment>
//         <ListItem
//           className={classes.collectionListItem}
//           // className={`${classes.listItem} ${
//           //   isSelected ? classes.selectedListItem : ''
//           // }`}
//           style={{ opacity: 1 }}
//         >
//           <ButtonBase
//             sx={{ width: '100%' }}
//             disabled={isPlaceholder}
//             onClick={() => !isPlaceholder && handleSelect(collection?._id)}
//           >
//             <Grid container spacing={1}>
//               <Grid item xs={6} sm={3} className={classes.gridItem}>
//                 <Typography className={classes.gridItemText}>Name:</Typography>
//                 <Typography>{collection?.name}</Typography>
//               </Grid>
//               <Grid item xs={6} sm={3} className={classes.gridItem}>
//                 <Typography className={classes.gridItemText}>Value:</Typography>
//                 <Typography>
//                   ${roundToNearestTenth(collection?.totalPrice)}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3} className={classes.gridItem}>
//                 <Typography className={classes.gridItemText}>
//                   Performance:
//                 </Typography>
//                 <Typography
//                   component="div"
//                   sx={{ display: 'flex', alignItems: 'center' }}
//                 >
//                   {twentyFourHourChange?.priceChange > 0 ? (
//                     <ArrowUpwardIcon className={classes.positivePerformance} />
//                   ) : (
//                     <ArrowDownwardIcon
//                       className={classes.negativePerformance}
//                     />
//                   )}
//                   {twentyFourHourChange?.percentageChange}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3} className={classes.gridItem}>
//                 <Typography className={classes.gridItemText}>Cards:</Typography>
//                 <Typography>{collection?.totalQuantity}</Typography>
//               </Grid>
//             </Grid>
//           </ButtonBase>
//           <div className={classes.menuButton}>
//             <LongMenu
//               onEdit={() => handleOpenDialog(collection)}
//               onStats={() => console.log('Stats:', collection)}
//               onView={() => console.log('View:', collection)}
//             />
//           </div>
//         </ListItem>
//         <Divider />
//       </React.Fragment>
//     );
//   },
//   (prevProps, nextProps) => {
//     // Only re-render if specific props have changed
//     return (
//       prevProps.collection._id === nextProps.collection._id &&
//       prevProps.isSelected === nextProps.isSelected
//     );
//   }
// );
// useEffect(() => {
//   if (isLoadingNewCollection) {
//     setLoading('isLoading', true);
//     const newCollectionId = allCollections[allCollections?.length - 1]?._id;
//     if (newCollectionId) {
//       setLoadingCollectionIds((prev) => [...prev, newCollectionId]);
//       setLoading('isLoading', false);
//     }
//     setMap(newCollectionId, true); // Set loading state for new collection
//   }
// }, [isLoadingNewCollection, allCollections, setMap]);
// Effect to remove loading state once collection is considered "loaded"
// useEffect(() => {
//   // Define a method to "load" collection, maybe after a fetch or certain condition
//   const loadCollection = (collectionId) => {
//     setLoadingCollectionIds((prev) =>
//       prev.filter((id) => id !== collectionId)
//     );
//   };
//   loadingCollectionIds?.forEach((collectionId) => {
//     setTimeout(() => loadCollection(collectionId), 1000); // simulate delay
//   });
// }, [loadingCollectionIds]);
// useEffect(() => {
//   fetchAllCollectionsForUser().catch((err) =>
//     console.error('Failed to get all collections:', err)
//   );
// }. [fetchAllCollectionsForUser]);
