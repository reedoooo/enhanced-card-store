import React from 'react';
import {
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';

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
  editButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const SelectCollectionList = ({
  userCollection,
  allCollections,
  handleSelectCollection,
  handleSaveCollection,
  openDialog,
  key,
}) => {
  const classes = useStyles();
  // const { collectionData } = useCollectionStore();
  const userId = userCollection.userId;

  console.log('allCollections:', userCollection);

  return (
    <List className={classes.list}>
      {userCollection?.map((collection) => (
        <React.Fragment key={collection._id}>
          <ListItem className={classes.listItem} key={key}>
            <ButtonBase
              sx={{ width: '100%' }}
              onClick={() => handleSelectCollection(collection._id)}
            >
              <ListItemText
                primary={collection.name}
                className={classes.listItemText}
              />
            </ButtonBase>
            <Button
              className={classes.editButton}
              onClick={() => openDialog(collection)}
            >
              Edit
            </Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
