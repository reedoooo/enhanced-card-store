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

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
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
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  gridItemText: {
    fontWeight: 'bold',
  },
}));

const SelectCollectionList = ({
  onSave,
  openDialog,
  collectionIdFromDialog,
}) => {
  const classes = useStyles();
  const { allCollections, setSelectedCollection, selectedCollection } =
    useCollectionStore();
  const [cookies] = useCookies(['userCookie']);
  const [isLoading, setIsLoading] = useState(false);
  // const userId = cookies.userCookie?.id;
  // const [collections, setCollections] = useState([]);

  const handleSelect = useCallback(
    (selectedId) => {
      const selected = allCollections.find(
        (collection) => collection._id === selectedId
      );
      if (!selected) {
        console.error('Collection not found with ID:', selectedId);
        // Handle the error accordingly, maybe set an error state here
        return;
      }
      setSelectedCollection(selected);
      onSave(selected);
    },
    [allCollections, onSave, setSelectedCollection]
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
                        <Typography>${collection?.currentValue}</Typography>
                      </Grid>
                      <Grid item xs={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Performance:
                        </Typography>
                        {/* Replace with actual data */}
                        <Typography>{collection?.performance} %</Typography>
                      </Grid>
                      <Grid item xs={3} className={classes.gridItem}>
                        <Typography className={classes.gridItemText}>
                          Cards:
                        </Typography>
                        {/* Replace with actual count */}
                        <Typography>{collection?.numberOfCards}</Typography>
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
