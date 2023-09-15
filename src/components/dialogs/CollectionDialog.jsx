import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const CollectionDialog = ({ open, onClose }) => {
  const [newCollectionInfo, setNewCollectionInfo] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollectionInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)}>
      <DialogTitle>Create a New Collection</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You don&apos;t have an existing collection. Would you like to create
          one?
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Collection Name"
          type="text"
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Collection Description"
          type="text"
          fullWidth
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onClose(newCollectionInfo)} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionDialog;
