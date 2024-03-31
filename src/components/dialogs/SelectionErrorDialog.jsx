import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import { DialogContent, Slide } from '@mui/material';
import { useSnackbar } from 'notistack';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SelectionErrorDialog(props) {
  const { onClose, selectedValue, open } = props;
  const { allCollections } = useSelectedCollection();
  const { enqueueSnackbar } = useSnackbar();
  const showNotification = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = React.useCallback(
    (collection) => {
      if (collection._id) {
        showNotification('Not implemented yet', 'info');
      } else {
        showNotification(`${collection} selected as backup account`, 'success');
      }
      onClose(collection);
    },
    [onClose, showNotification]
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
