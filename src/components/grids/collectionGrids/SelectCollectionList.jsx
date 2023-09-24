import React, { useCallback } from 'react';
import {
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { useCollectionStore } from '../../../context/hooks/collection';

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

const SelectCollectionList = ({ onSave, openDialog }) => {
  const classes = useStyles();
  const { allCollections, setSelectedCollection, selectedCollection } =
    useCollectionStore();
  const [cookies] = useCookies(['userCookie']);
  const userId = cookies.userCookie?.id;

  const handleSelect = useCallback(
    (selectedId) => {
      const selected = allCollections.find(
        (collection) => collection._id === selectedId
      );
      if (!selected) {
        console.error('Collection not found with ID:', selectedId);
        // Handle the error accordingly, maybe set an error state here
        return;
      }
      onSave(selected);
    },
    [allCollections, onSave]
  );

  // console.log(
  //   'SELECTED COLLECTION (SELECT COLLECTIN LIST):',
  //   selectedCollection
  // );

  return (
    <List className={classes.list}>
      {allCollections
        ?.filter((collection) => !!collection?._id)
        .map((collection) => (
          <React.Fragment key={collection?._id}>
            <ListItem className={classes.listItem}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleSelect(collection?._id)}
              >
                <ListItemText
                  primary={collection?.name}
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

SelectCollectionList.propTypes = {
  handleSelectCollection: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};

export default SelectCollectionList;

// import React from 'react';
// import {
//   List,
//   ListItem,
//   ButtonBase,
//   ListItemText,
//   Divider,
//   Button,
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
// import { useCookies } from 'react-cookie';

// const useStyles = makeStyles((theme) => ({
//   listItem: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: theme.spacing(2),
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     marginBottom: theme.spacing(2),
//     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   listItemText: {
//     flex: 1,
//     textAlign: 'left',
//     marginLeft: theme.spacing(3),
//   },
//   editButton: {
//     marginLeft: theme.spacing(2),
//     backgroundColor: theme.palette.primary.main,
//     color: '#ffffff',
//     '&:hover': {
//       backgroundColor: theme.palette.primary.dark,
//     },
//   },
// }));

// export const SelectCollectionList = ({
//   // userCollection,
//   // collectionData,
//   // allCollections,
//   handleSelectCollection,
//   // handleSaveCollection,
//   openDialog,
// }) => {
//   const classes = useStyles();
//   const { allCollections, setSelectedCollection } = useCollectionStore();
//   const [cookies] = useCookies(['userCookie']);
//   const userId = cookies.userCookie?.id;
//   // console.log('SELECTED USERID:', userId);
//   // console.log('SELECTED COLLECTION:', selectedCollection);
//   console.log('ALL COLLECTIONS:', allCollections);

//   const handleSelect = (selectedId) => {
//     const selected = allCollections.find(
//       (collection) => collection._id === selectedId
//     );
//     setSelectedCollection(selected); // update the selectedCollection in context
//   };

//   return (
//     <List className={classes.list}>
//       {allCollections
//         ?.filter((collection) => !!collection?._id)
//         .map((collection) => (
//           <React.Fragment key={collection?._id}>
//             <ListItem className={classes.listItem}>
//               <ButtonBase
//                 sx={{ width: '100%' }}
//                 onClick={() => handleSelect(collection?._id)} // modified here
//               >
//                 <ListItemText
//                   primary={collection?.name}
//                   className={classes.listItemText}
//                 />
//               </ButtonBase>
//               <Button
//                 className={classes.editButton}
//                 onClick={() => openDialog(collection)}
//               >
//                 Edit
//               </Button>
//             </ListItem>
//             <Divider />
//           </React.Fragment>
//         ))}
//     </List>
//   );
// };

// export default SelectCollectionList;
