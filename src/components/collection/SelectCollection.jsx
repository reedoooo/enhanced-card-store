import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SelectCollectionDialog } from '../dialogs/SelectCollectionDialog';
import SimpleReusableButton from '../buttons/SimpleReusableButton';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import SelectCollectionList from '../grids/collectionGrids/SelectCollectionList';
import { useCollectionStore } from '../../context/hooks/collection';

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
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const openDialog = useCallback(() => {
    setDialogOpen(true);

    // If selectedCollection is defined, then we are editing an existing collection
    if (selectedCollection) {
      // setName(selectedCollection.name);
      // setDescription(selectedCollection.description);
      setEditedName(selectedCollection.name);
      setEditedDescription(selectedCollection.description);
    }
  }, [selectedCollection]);

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

  const handleOpenCollectionModal = useCallback(() => {
    setIsNew(true);
    openDialog();
  }, [openDialog]);

  useEffect(() => {
    if (selectedCollection) {
      setEditedName(selectedCollection.name);
      setEditedDescription(selectedCollection.description);
    }
  }, [selectedCollection]);
  // console.log('SELECTED COLLECTION (SELECT COLLECTION):', selectedCollection);

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
          openDialog={openDialog}
        />
      </div>
      {/* <SelectCollectionDialog
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
        onSave={handleSave}
        name={name}
        isNew={isNew}
        setName={setName}
        description={description}
        setDescription={setDescription}
        userId={userId}
        editedName={editedName}
        setEditedName={setEditedName}
        editedDescription={editedDescription}
        setEditedDescription={setEditedDescription}
      /> */}
      <SelectCollectionDialog
        {...{
          isDialogOpen,
          closeDialog,
          onSave: handleSave,
          // name,
          isNew,
          // setName,
          // description,
          // setDescription,
          // name,
          // description,
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
