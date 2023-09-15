// SelectCollectionList.js
import React from 'react';
import {
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
// import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';

export const SelectCollectionList = ({
  userCollection,
  handleSelectCollection,
  handleSaveCollection,
  openDialog,
}) => {
  console.log(
    '(x) -- SELECT COLLECTION LIST (USERCOLLECTION):',
    userCollection
  );

  // const { selectedCollection } = useCollectionStore();
  // console.log('SELECTED COLLECTION:', selectedCollection);
  return (
    <List>
      {userCollection?.map((collection) => (
        <React.Fragment key={collection._id}>
          <ListItem>
            <ButtonBase
              sx={{ width: '100%' }}
              onClick={() => handleSelectCollection(collection._id)}
            >
              <ListItemText primary={collection.name} />
            </ButtonBase>
            <Button onClick={() => openDialog(collection)}>Edit</Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
