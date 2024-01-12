import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent } from '@mui/material';
import CollectionForm from '../forms/CollectionForm';

const CollectionDialog = ({
  isDialogOpen,
  closeDialog,
  onSave,
  isNew,
  initialName = '',
  initialDescription = '',
}) => {
  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogContent>
        <CollectionForm
          onSave={onSave}
          isNew={isNew}
          isDialogOpen={isDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

CollectionDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  initialName: PropTypes.string,
  initialDescription: PropTypes.string,
};

export default CollectionDialog;
