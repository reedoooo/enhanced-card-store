// SelectCollection.js

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { SelectCollectionList } from '../grids/collectionGrids/SelectCollectionList';
import { SelectCollectionDialog } from '../dialogs/SelectCollectionDialog';
import SimpleReusableButton from '../buttons/SimpleReusableButton';
import { useCookies } from 'react-cookie';

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
  handleSaveCollection,
  userCollection = [],
  selectedCards,
  setSelectedCards,
}) => {
  const classes = useStyles();
  const [cookies] = useCookies(['userCookie']);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false); // For creating a new collection
  const { collectionData, selectedCollection, setSelectedCollection } =
    useCollectionStore();
  const userId = cookies.userCookie.userId;

  // State for name and description
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const openDialog = () => {
    setDialogOpen(true);

    // Set name and description based on collection data (if available)
    if (selectedCollection) {
      setName(selectedCollection.name || '');
      setDescription(selectedCollection.description || '');
    } else {
      // Clear name and description for creating a new collection
      setName('');
      setDescription('');
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedCollection(null);
  };

  const handleSave = (collection) => {
    handleSaveCollection(collection);
    closeDialog();
  };

  const handleOpenCollectionModal = () => {
    setIsNew(true);
    openDialog();
  };

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
          key={userCollection?._id}
          userCollection={userCollection}
          allCollections={collectionData}
          handleSelectCollection={handleSelectCollection}
          handleSaveCollection={handleSaveCollection}
          openDialog={openDialog}
        />
      </div>
      <SelectCollectionDialog
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
        onSave={handleSave}
        name={name}
        isNew={isNew}
        setName={setName}
        description={description}
        setDescription={setDescription}
        userId={userId}
      />
    </Box>
  );
};

export default SelectCollection;
