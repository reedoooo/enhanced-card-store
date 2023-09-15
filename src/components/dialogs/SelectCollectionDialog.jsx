// SelectCollectionDialog.js
import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import CollectionEditPanel from './CollectionEditPanel';

export const SelectCollectionDialog = ({
  isDialogOpen,
  closeDialog,
  selectedCollection,
  onSave,
}) => (
  <Dialog open={isDialogOpen} onClose={closeDialog}>
    <DialogContent>
      <CollectionEditPanel
        selectedCollection={selectedCollection}
        onSave={onSave}
      />
    </DialogContent>
  </Dialog>
);
