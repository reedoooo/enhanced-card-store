// CollectionSelectorDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
} from '@mui/material';
import { useStyles } from '../../components/dialogs/dialogStyles';

const CollectionSelectorDialog = ({
  open,
  allCollections,
  onClose,
  onCollectionSelect,
}) => {
  const classes = useStyles();

  if (!Array.isArray(allCollections)) {
    console.error('collection is not an array', allCollections);
    return null; // or return a default empty array or some placeholder content
  }

  const handleSelectCollection = (collection) => {
    onCollectionSelect(
      `Collection "${collection.name}" selected successfully!`
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select a Collection</DialogTitle>
      <List>
        {allCollections?.map((collection) => (
          <React.Fragment key={collection._id}>
            <ListItem className={classes.listItem}>
              <ButtonBase
                style={{ width: '100%' }}
                onClick={() => handleSelectCollection(collection)}
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
    </Dialog>
  );
};

export default CollectionSelectorDialog;
