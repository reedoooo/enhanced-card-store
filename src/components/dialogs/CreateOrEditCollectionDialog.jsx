import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, Typography, Alert } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { StyledButton, StyledTextField } from '../forms/styled';
import { useMode } from '../../context';

const CreateOrEditCollectionDialog = ({
  isDialogOpen,
  closeDialog,
  onSave,
  isNew,
  initialName = '',
  initialDescription = '',
  // editedName,
  // setEditedName,
  // editedDescription,
  // setEditedDescription,
}) => {
  const { theme } = useMode();
  const [error, setError] = useState('');
  const [editedName, setEditedName] = useState(initialName);
  const [editedDescription, setEditedDescription] =
    useState(initialDescription);

  const {
    createUserCollection,
    removeCollection,
    selectedCollection,
    updateCollectionDetails,
  } = useCollectionStore();
  const [cookies] = useCookies(['authUser']);
  const userId = cookies?.authUser?.id;

  useEffect(() => {
    setError('');
  }, [isDialogOpen]);
  useEffect(() => {
    // Update internal state when dialog opens
    setEditedName(initialName);
    setEditedDescription(initialDescription);
  }, [initialName, initialDescription, isDialogOpen]);

  const handleSave = () => {
    if (!editedName.trim() || !editedDescription.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const newCollectionInfo = {
      name: editedName,
      description: editedDescription,
      userId: userId,
      tag: 'new',
    };

    if (isNew) {
      createUserCollection(userId, newCollectionInfo, 'create');
    } else {
      updateCollectionDetails(newCollectionInfo, selectedCollection._id);
    }

    onSave(newCollectionInfo);
    closeDialog();
  };

  const handleRemove = (e) => {
    e.preventDefault();
    removeCollection(selectedCollection);
    closeDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogContent>
        <Typography variant="h6">
          {isNew ? 'Create a new collection' : 'Edit your collection'}
        </Typography>
        {error && (
          <Alert severity="error" style={{ marginBottom: '16px' }}>
            {error}
          </Alert>
        )}
        <StyledTextField
          label="Collection Name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          theme={theme}
        />
        <StyledTextField
          label="Collection Description"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          theme={theme}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '16px',
          }}
        >
          <StyledButton
            variant="contained"
            onClick={handleSave}
            color="primary"
            theme={theme}
          >
            {isNew ? 'Create Collection' : 'Save Changes'}
          </StyledButton>
          {!isNew && (
            <StyledButton
              variant="outlined"
              onClick={handleRemove}
              color="secondary"
              style={{ marginLeft: '16px' }}
              theme={theme}
            >
              Delete
            </StyledButton>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

CreateOrEditCollectionDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  editedName: PropTypes.string,
  setEditedName: PropTypes.func,
  editedDescription: PropTypes.string,
  setEditedDescription: PropTypes.func,
};

export default CreateOrEditCollectionDialog;
