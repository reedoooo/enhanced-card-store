import React, { useCallback, useEffect, useState } from 'react';
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
import LongMenu from '../../reusable/LongMenu';
import { roundToNearestTenth } from '../../../context/Helpers';
const useStyles = makeStyles((theme) => ({
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
  listItem: {
    position: 'relative', // Added to position the menu button absolutely
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    width: '100%',
    marginBottom: theme.spacing(1),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '50%', // Half width for xs breakpoint
    justifyContent: 'center',
    padding: theme.spacing(0.5), // Reduced padding
    [theme.breakpoints.up('sm')]: {
      width: '100%', // Full width for larger screens
      padding: theme.spacing(1),
    },
  },
  gridItemText: {
    fontWeight: 'bold',
    fontSize: '0.8rem', // Smaller text size
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem', // Larger text size for larger screens
    },
  },
  positivePerformance: {
    color: 'green',
  },
  negativePerformance: {
    color: 'red',
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    // Adjust padding and margin as needed
  },
}));

const SelectCollectionList = ({
  onSave,
  openDialog,
  handleSelectCollection,
}) => {
  const classes = useStyles();
  const { allCollections, setSelectedCollection, fetchAllCollectionsForUser } =
    useCollectionStore();
  const { statsByCollectionId } = useStatisticsStore();
  const [isLoading, setIsLoading] = useState(false);
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
      handleSelectCollection(selected?._id);
      onSave(selected);
    },
    [allCollections, onSave, setSelectedCollection]
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
        <div className={classes.loadingContainer}>
          <LoadingIndicator />
        </div>
      ) : (
        <List>
          {allCollections?.map((collection, index) => {
            const twentyFourHourChange =
              statsByCollectionId[collection?._id]?.twentyFourHourAverage; // Adjust according to your actual data structure
            const isPlaceholder = index >= allCollections?.length;

            return (
              <React.Fragment key={collection._id}>
                <ListItem
                  className={classes.listItem}
                  style={{ opacity: isPlaceholder ? 0.5 : 1 }}
                >
                  <ButtonBase
                    sx={{ width: '100%' }}
                    disabled={isPlaceholder}
                    onClick={() =>
                      !isPlaceholder && handleSelect(collection._id)
                    }
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Name:
                        </Typography>
                        <Typography>{collection?.name}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Value:
                        </Typography>
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
                            <ArrowUpwardIcon
                              className={classes.positivePerformance}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              className={classes.negativePerformance}
                            />
                          )}
                          {twentyFourHourChange?.percentageChange}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Cards:
                        </Typography>
                        <Typography>{collection?.totalQuantity}</Typography>
                      </Grid>
                    </Grid>
                  </ButtonBase>
                  {!isPlaceholder && (
                    <div className={classes.menuButton}>
                      <LongMenu
                        onEdit={() => handleOpenDialog(collection)}
                        onStats={() => console.log('Stats:', collection)}
                        onView={() => console.log('View:', collection)}
                      />
                    </div>
                  )}
                </ListItem>
                <Divider />
              </React.Fragment>
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
