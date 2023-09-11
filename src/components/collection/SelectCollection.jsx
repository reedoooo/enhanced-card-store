import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
  Dialog,
  DialogContent,
  Button,
} from '@mui/material';
import CollectionEditPanel from './CollectionEditPanel'; // Import the CollectionEditPanel
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

export const SelectCollection = ({
  userCollection,
  handleSelectCollection,
  handleSaveCollection, // You can pass this as a prop to save the edited or new collection
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const { createUserCollection } = useCollectionStore();

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
      <List>
        {userCollection.map((collection) => (
          <React.Fragment key={collection._id}>
            <ListItem>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleSelectCollection(collection._id)}
              >
                <ListItemText primary={collection.name} />
              </ButtonBase>
              <Button onClick={() => openDialog(collection)}>Edit</Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogContent>
          <CollectionEditPanel
            selectedCollection={editingCollection}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SelectCollection;
