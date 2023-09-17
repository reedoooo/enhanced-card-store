// CollectionForm.js

import React, { useState } from 'react';
import { Dialog, DialogContent, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
}));

const CollectionForm = ({ isDialogOpen, closeDialog, onSave, userId }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const newCollectionInfo = {
      name,
      description,
    };
    onSave(userId, newCollectionInfo);
    closeDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogContent>
        <form className={classes.form}>
          <TextField
            label="Collection Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Collection Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
          />
          <div className={classes.buttonContainer}>
            <Button variant="contained" onClick={handleSave} color="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionForm;
