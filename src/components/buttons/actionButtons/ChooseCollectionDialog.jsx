import React, { useCallback, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ButtonBase,
  Typography,
  ListItemButton,
} from '@mui/material';
import { useCollectionStore } from '../../../context/hooks/collection';
import { useModal } from '../../../context/hooks/modal';
import SelectCollectionList from '../../grids/collectionGrids/SelectCollectionList';

const ChooseCollectionDialog = ({ onSave, isOpen, onClose, card }) => {
  const { allCollections, setSelectedCollection, selectedCollection } =
    useCollectionStore();
  const { hideModal } = useModal();
  const [error, setError] = useState(null);

  const handleAddToCollection = (collectionId) => {
    if (!collectionId) return;

    const foundCollection = allCollections?.find(
      (collection) => collection._id === collectionId
    );

    if (!foundCollection) {
      console.error('Collection not found with ID:', collectionId);
      setError('Collection not found!');
      return;
    }

    setSelectedCollection(foundCollection);
    onSave(foundCollection);
    hideModal();
  };

  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      if (collection) {
        // Assuming you have some logic to add the card to the selected collection
        // handleAddToCollection(card);
        onSave(collection);
        onClose();
      } else {
        setError('Collection not found!');
      }
    },
    [setSelectedCollection, onClose]
  );

  console.log('SELECTED COLLECTION (SELECT COLLECTION):', selectedCollection);

  return (
    // <Dialog onClose={hideModal} open={true}>
    <Dialog open={isOpen} onClose={onClose} /*... other props */>
      <DialogTitle>Select a Collection</DialogTitle>
      <SelectCollectionList onSave={handleSave} />
      {error && (
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      )}
    </Dialog>
  );
};

export default ChooseCollectionDialog;
