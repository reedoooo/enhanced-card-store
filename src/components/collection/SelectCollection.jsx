// SelectCollection.js
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { SelectCollectionList } from '../grids/collectionGrids/SelectCollectionList';
import { SelectCollectionDialog } from '../dialogs/SelectCollectionDialog';

export const SelectCollection = ({
  handleSelectCollection,
  handleSaveCollection,
  userCollection = [],
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const { createUserCollection, collectionData } = useCollectionStore();
  console.log('(1) -- SELECT COLLECTION (USERCOLLECTION):', collectionData);
  const openDialog = (collection = null) => {
    setEditingCollection(collection);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingCollection(null);
  };

  const handleSave = (collection) => {
    handleSaveCollection(collection);
    closeDialog();
  };

  const handleAddNewCollection = () => {
    const newCollection = createUserCollection(); // Replace this with the actual function call
    openDialog(newCollection);
  };

  return (
    <Box>
      <Typography variant="h5">Choose a Collection</Typography>
      <Button
        variant="outlined"
        onClick={handleAddNewCollection}
        color="primary"
      >
        Add New Collection
      </Button>
      <SelectCollectionList
        userCollection={userCollection}
        handleSelectCollection={handleSelectCollection}
        handleSaveCollection={handleSaveCollection}
        openDialog={openDialog}
      />
      <SelectCollectionDialog
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
        selectedCollection={editingCollection}
        onSave={handleSave}
      />
    </Box>
  );
};

export default SelectCollection;
