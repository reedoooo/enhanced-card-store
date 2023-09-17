import React, { useState } from 'react';
import { Dialog, DialogContent, Button, TextField } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

export const SelectCollectionDialog = ({
  isDialogOpen,
  closeDialog,
  selectedCollection,
  name,
  onSave,
  description,
  setName,
  setDescription,
  isNew,
  userId,
}) => {
  const { createUserCollection, addOneToCollection } = useCollectionStore();
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleSave = () => {
    const newCollectionInfo = {
      name: editedName,
      description: editedDescription,
      userId,
    };

    if (isNew === true) {
      // Call the createUserCollection function with user ID, name, and description
      createUserCollection(
        newCollectionInfo.name,
        newCollectionInfo.description,
        newCollectionInfo
      );
    } else {
      // Use either 'name' or 'editedName' based on isNew
      const collectionNameToUse = isNew ? name : editedName;
      // Check if 'card' is defined before calling addOneToCollection
      if (selectedCollection && selectedCollection.cards) {
        addOneToCollection(
          selectedCollection.cards[0] || {},
          collectionNameToUse,
          newCollectionInfo
        );
      } else {
        console.error('No card to add to the collection');
      }
    }

    closeDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogContent>
        <div>
          <TextField
            label="Collection Name"
            // value={isNew ? name : editedName}
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Collection Description"
            // value={isNew ? description : editedDescription}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '16px',
          }}
        >
          <Button variant="contained" onClick={handleSave} color="primary">
            {isNew ? 'Create Collection' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectCollectionDialog;
