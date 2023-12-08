import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
  Snackbar,
} from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useStyles } from '../../components/dialogs/dialogStyles';

const ChooseCollectionDialog = ({ onSave, isOpen, onClose }) => {
  const { setSelectedCollection, allCollections } = useCollectionStore();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSelectCollection = useCallback(
    (collectionId) => {
      const foundCollection = allCollections.find(
        (collection) => collection._id === collectionId
      );

      if (foundCollection) {
        setSelectedCollection(foundCollection);
        if (onSave) onSave(foundCollection);
        onClose();
        setSnackbarOpen(true); // open snackbar on successful selection
      } else {
        setError('Collection not found!');
      }
    },
    [allCollections, setSelectedCollection, onSave, onClose]
  );
  if (isOpen) {
    console.log('DIALOG OPEEPEPPE opened!)');
  }

  return (
    <Dialog open={false} onClose={onClose}>
      <DialogTitle>Select a Collection</DialogTitle>

      <List className={classes.list}>
        {allCollections.map((collection) => (
          <React.Fragment key={collection._id}>
            <ListItem className={classes.listItem}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleSelectCollection(collection._id)}
              >
                <ListItemText
                  primary={collection.name}
                  className={classes.listItemText}
                />
              </ButtonBase>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {error && (
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Collection selected successfully!"
        autoHideDuration={3000}
      />
    </Dialog>
  );
};

export default ChooseCollectionDialog;
