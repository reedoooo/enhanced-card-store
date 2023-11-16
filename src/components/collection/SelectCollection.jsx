import React, { useEffect, useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import SimpleReusableButton from '../reusable/SimpleReusableButton';
import SelectCollectionList from '../grids/collectionGrids/SelectCollectionList';
import CreateOrEditCollectionDialog from '../dialogs/CreateOrEditCollectionDialog';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%',
    width: '50vw',
    padding: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  list: {
    flexGrow: 1,
  },
}));

const SelectCollection = ({
  handleSelectCollection,
  setShowCollections,
  setShowPortfolio,
}) => {
  const classes = useStyles();
  const [cookies] = useCookies(['userCookie']);
  const userId = cookies.userCookie?.userId;
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
    <Box className={classes.root}>
      <Typography variant="h5">Choose a Collection</Typography>
      <SimpleReusableButton
        variant="outlined"
        onClick={handleOpenCollectionModal}
        color="primary"
        className={classes.button}
      >
        Add New Collection
      </SimpleReusableButton>
      <div className={classes.list}>
        <SelectCollectionList
          handleSelectCollection={handleSelectCollection}
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
          userId,
          editedName,
          setEditedName,
          editedDescription,
          setEditedDescription,
        }}
      />
    </Box>
  );
};

SelectCollection.propTypes = {
  handleSelectCollection: PropTypes.func.isRequired,
};

export default SelectCollection;
