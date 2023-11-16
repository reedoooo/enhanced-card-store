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
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  listItemText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: theme.spacing(3),
  },
}));

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
