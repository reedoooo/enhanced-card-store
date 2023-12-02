import React, { useEffect, useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import SimpleReusableButton from '../reusable/SimpleReusableButton';
import SelectCollectionList from '../grids/collectionGrids/SelectCollectionList';
import CreateOrEditCollectionDialog from '../dialogs/CreateOrEditCollectionDialog';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context/hooks/colormode';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
    padding: theme.spacing(4),
    alignItems: 'stretch',
    height: '80vh',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    // width: '50vw',
  },
  button: {
    marginBottom: theme.spacing(2),
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  list: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.success.evenLighter,
    boxShadow: theme.shadows[3],
    width: '100%',
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // marginTop: theme.spacing(1),
    // alignSelf: 'start',
    justifySelf: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.quinternary,
    boxShadow: theme.shadows[3],
    width: '80%',
    height: '100%',
    // margin: 0,
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
    // height: '100%',
  },
}));

const SelectCollection = ({
  handleSelectCollection,
  handleCollectionSelect,
  setShowCollections,
  setShowPortfolio,
}) => {
  const theme = useMode();
  const classes = useStyles(theme);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, selectedCollection } = useCollectionStore();
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const openDialog = useCallback(
    (isNewCollection) => {
      setDialogOpen(true);
      setIsNew(isNewCollection);

      if (isNewCollection) {
        setEditedName('');
        setEditedDescription('');
      } else if (selectedCollection) {
        setEditedName(selectedCollection.name);
        setEditedDescription(selectedCollection.description);
      }
    },
    [selectedCollection]
  );

  const handleOpenCollectionModal = useCallback(() => {
    openDialog(true);
  }, [openDialog]);

  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      setShowCollections(false);
      setShowPortfolio(true);
      closeDialog();
    },
    [setSelectedCollection, closeDialog]
  );

  useEffect(() => {
    if (selectedCollection) {
      setEditedName(selectedCollection.name);
      setEditedDescription(selectedCollection.description);
    }
  }, [selectedCollection]);

  return (
    <Box className={classes.middleContainer}>
      <Box className={classes.root}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            m: 'auto',
          }}
        >
          Choose a Collection
        </Typography>
        <Box sx={{ p: 2, justifyContent: 'center', margin: 'auto' }}>
          <SimpleReusableButton
            variant="outlined"
            onClick={handleOpenCollectionModal}
            // color="primary"
            // className={classes.button}
          >
            Add New Collection
          </SimpleReusableButton>
        </Box>
        <div className={classes.list}>
          <SelectCollectionList
            handleSelectCollection={handleSelectCollection}
            handleCollectionSelect={handleCollectionSelect}
            onSave={handleSave}
            openDialog={() => openDialog(false)} // Indicate that this is not a new collection
          />
        </div>
        <CreateOrEditCollectionDialog
          {...{
            isDialogOpen,
            closeDialog,
            onOpen: handleOpenCollectionModal,
            onSave: handleSave,
            isNew,
            editedName,
            setEditedName,
            editedDescription,
            setEditedDescription,
          }}
        />
      </Box>
    </Box>
  );
};

SelectCollection.propTypes = {
  handleSelectCollection: PropTypes.func.isRequired,
};

export default SelectCollection;
