import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import { DialogContent, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SelectionErrorDialog(props) {
  const { onClose, selectedValue, open, showSnackbar } = props;
  const {
    handleBackToCollections,
    showCollections,
    allCollections,
    handleSelectCollection,
  } = useSelectedCollection();
  const handleClose = () => {
    onClose(selectedValue);
  };

  // const handleListItemClick = (value) => {
  //   if (typeof value?._id === 'string') {
  //     showSnackbar('Not implemented yet', 'successs');
  //   } else {
  //     showSnackbar(`${value} selected as backup account`, 'success');
  //   }
  //   onClose(value);
  // };
  const handleListItemClick = React.useCallback(
    (collection) => {
      if (collection._id) {
        showSnackbar('Not implemented yet', 'info'); // Assuming 'successs' was a typo, corrected to 'info' for a non-implemented feature
      } else {
        showSnackbar(`${collection} selected as backup account`, 'success');
      }
      onClose(collection);
    },
    [onClose, showSnackbar]
  );
  const handleAction = React.useCallback(
    (message, severity, error) => {
      showSnackbar(message, severity);
      if (error) console.error('Action failed:', error);
    },
    [showSnackbar]
  );

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {allCollections?.map((collection) => (
            <ListItem disableGutters key={collection?.name}>
              <ListItemButton onClick={() => handleListItemClick(collection)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2">{collection?.name}</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              // onClick={() => handleListItemClick(collection)}
              // onClick={() => handleContextSelect(mappedContext)}
              onSuccess={() =>
                handleAction(
                  {
                    title: 'Action successful',
                    message: `Card added to ${selectedValue} successfully.`,
                  },
                  'success',
                  null
                )
              }
              onFailure={(error) =>
                handleAction(
                  {
                    title: 'Action failed',
                    message: `Failed to add card to ${selectedValue}.`,
                  },
                  'error',
                  error
                )
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primaryTypograph />
            </ListItemButton>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

SelectionErrorDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default withDynamicSnackbar(SelectionErrorDialog);
