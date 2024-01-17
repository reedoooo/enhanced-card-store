import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent } from '@mui/material';
import CollectionForm from '../forms/CollectionForm';
import { useCollectionStore } from '../../context';

const CollectionDialog = ({ isDialogOpen, closeDialog, isNew }) => {
  const { createUserCollection } = useCollectionStore();

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogContent>
        <CollectionForm onSave={createUserCollection} isNew={isNew} />
      </DialogContent>
    </Dialog>
  );
};

CollectionDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default CollectionDialog;
