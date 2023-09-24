import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, Button, TextField } from '@mui/material';
import { useCollectionStore } from '../../context/hooks/collection';

export const SelectCollectionDialog = ({
  isDialogOpen,
  closeDialog,
  onSave,
  // name,
  // description,
  // setName,
  // setDescription,
  isNew,
  userId,
  editedName,
  setEditedName,
  editedDescription,
  setEditedDescription,
}) => {
  const { createUserCollection, addOneToCollection } = useCollectionStore();

  const handleSave = () => {
    const newCollectionInfo = {
      name: editedName,
      description: editedDescription,
      userId,
    };

    if (isNew) {
      createUserCollection(newCollectionInfo);
    } else {
      if (editedName && editedDescription) {
        addOneToCollection(newCollectionInfo);
      } else {
        console.error('No card to add to the collection');
      }
    }

    onSave(newCollectionInfo);
    closeDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogContent>
        <div>
          <TextField
            label="Collection Name"
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

SelectCollectionDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  // name: PropTypes.string,
  // description: PropTypes.string,
  // setName: PropTypes.func.isRequired,
  // setDescription: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  userId: PropTypes.string,
  editedName: PropTypes.string,
  setEditedName: PropTypes.func.isRequired,
  editedDescription: PropTypes.string,
  setEditedDescription: PropTypes.func.isRequired,
};

export default SelectCollectionDialog;
