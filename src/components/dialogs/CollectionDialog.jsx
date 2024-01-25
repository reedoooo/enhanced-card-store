import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent } from '@mui/material';
import CollectionForm from '../forms/CollectionForm';
import { useCollectionStore } from '../../context';

const CollectionDialog = ({ open, onClose, isNew }) => {
  const { createUserCollection } = useCollectionStore();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <CollectionForm onSave={createUserCollection} isNew={isNew} />
      </DialogContent>
    </Dialog>
  );
};

CollectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default CollectionDialog;
