import React, { useCallback, useState } from 'react';
import {
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../reusable/indicators/LoadingIndicator';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useStatisticsStore } from '../../../context/StatisticsContext/StatisticsContext';
import { useMode } from '../../../context/hooks/colormode';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  listItemText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: theme.spacing(3),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  editButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  gridItemText: {
    fontWeight: 'bold',
  },
  positivePerformance: {
    color: 'green',
  },
  negativePerformance: {
    color: 'red',
  },
}));

const SelectCollectionList = ({
  onSave,
  openDialog,
  collectionIdFromDialog,
}) => {
  const { theme } = useMode();
  const classes = useStyles();
  const {
    setSelectedCollection,
    selectedCollection,
    allCollections,
    setAllCollections,
  } = useCollectionStore();
  const { stats } = useStatisticsStore();
  const [isLoading, setIsLoading] = useState(false);
  const twentyFourHourChange = stats.twentyFourHourAverage;
  console.log('STATS:', stats);
  function roundToNearestTenth(num) {
    return Math.round(num * 10) / 10;
  }
  console.log('TWENTY FOUR HOUR CHANGE:', twentyFourHourChange);
  // const handleSelect = useCallback(
  //   (selectedId) => {
  //     const selected = allCollections.find(
  //       (collection) => collection._id === selectedId
  //     );
  //     if (!selected) {
  //       console.error('Collection not found with ID:', selectedId);
  //       // Handle the error accordingly, maybe set an error state here
  //       return;
  //     }
  //     setSelectedCollection(selected);
  //     onSave(selected);
  //   },
  //   [allCollections, onSave, setSelectedCollection]
  // );
  const handleSelect = useCallback(
    (selectedId) => {
      const selected = allCollections.find(
        (collection) => collection._id === selectedId
      );
      if (!selected) {
        console.error('Collection not found with ID:', selectedId);
        return;
      }
      setSelectedCollection(selected);
      onSave(selected);

      // Find the index of the selected collection
      const selectedIndex = allCollections.findIndex(
        (collection) => collection._id === selectedId
      );

      if (selectedIndex > 0) {
        // Create a new array with the selected collection moved to the 0 index
        const reorderedCollections = [
          selected,
          ...allCollections.slice(0, selectedIndex),
          ...allCollections.slice(selectedIndex + 1),
        ];

        // Update the state with the reordered collections
        // You need to implement a method in your context to handle this update
        setAllCollections(reorderedCollections);
      }
    },
    [allCollections, onSave, setSelectedCollection, setAllCollections]
  );

  const handleOpenDialog = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      console.log('SELECTED COLLECTION:', collection);
      openDialog(true);
    },
    [openDialog, setSelectedCollection]
  );

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <List className={classes.list}>
          {allCollections
            ?.filter((collection) => !!collection?._id)
            .map((collection) => (
              <React.Fragment key={collection?._id}>
                <ListItem className={classes.listItem}>
                  <ButtonBase
                    sx={{ width: '100%' }}
                    onClick={() => handleSelect(collection?._id)}
                  >
                    <Grid container>
                      <Grid item xs={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Name:
                        </Typography>
                        <Typography>{collection?.name}</Typography>
                      </Grid>
                      <Grid item xs={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Value:
                        </Typography>
                        {/* Replace with actual value */}
                        <Typography>
                          ${roundToNearestTenth(collection?.totalPrice)}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Performance:
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          {twentyFourHourChange?.percentageChange > 0 ? (
                            <ArrowUpwardIcon
                              className={classes.positivePerformance}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              className={classes.negativePerformance}
                            />
                          )}
                          {twentyFourHourChange?.percentageChange}%
                        </Typography>
                      </Grid>
                      <Grid item xs={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Cards:
                        </Typography>
                        {/* Replace with actual count */}
                        <Typography>{collection?.totalQuantity}</Typography>
                      </Grid>
                    </Grid>
                  </ButtonBase>
                  <Button
                    className={classes.editButton}
                    onClick={() => handleOpenDialog(collection)} // Pass the collection object here
                  >
                    Edit
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      )}
    </>
  );
};

SelectCollectionList.propTypes = {
  onSave: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  collectionIdFromDialog: PropTypes.string,
};

export default SelectCollectionList;
