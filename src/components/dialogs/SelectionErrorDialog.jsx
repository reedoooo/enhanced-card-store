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
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import { DialogContent, Slide } from '@mui/material';
import useSnackbarManager from '../../context/hooks/useSnackbarManager';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SelectionErrorDialog(props) {
  const { onClose, selectedValue, open } = props;
  const { allCollections } = useSelectedCollection();
  const { showSuccess, showError, showInfo } = useSnackbarManager(); // Using custom snackbar hook

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = React.useCallback(
    (collection) => {
      if (collection._id) {
        showInfo('Not implemented yet'); // Show an informational snackbar
      } else {
        showSuccess(`${collection} selected as backup account`); // Show a success snackbar
      }
      onClose(collection);
    },
    [onClose, showInfo, showSuccess]
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
        </List>
      </DialogContent>
    </Dialog>
  );
}

SelectionErrorDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
};

export default SelectionErrorDialog;
