import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Paper, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    borderRadius: '12px',
    backgroundColor: theme.palette.grey[100],
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  },
  header: {
    paddingBottom: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  textField: {
    marginTop: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.dark,
      },
    },
  },
  saveButton: {
    marginTop: theme.spacing(3),
    borderRadius: '24px',
    textTransform: 'none',
    fontSize: 18,
    padding: theme.spacing(1, 4),
  },
}));

const CollectionEditPanel = ({
  collection,
  onSave,
  isNew,
  name,
  setName,
  setDescription,
  description,
}) => {
  const classes = useStyles();

  const handleSave = () => {
    onSave({
      ...collection,
      name,
      description,
    });
  };

  return (
    <Paper elevation={6} className={classes.root}>
      <Typography variant="h5" className={classes.header}>
        {isNew ? 'Create Collection' : 'Edit Collection'}
      </Typography>
      <TextField
        className={classes.textField}
        label="Collection Name"
        value={name}
        variant="outlined"
        fullWidth
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Collection Description"
        value={description}
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        className={classes.saveButton}
        onClick={handleSave}
      >
        {isNew ? 'Create Collection' : 'Save Changes'}
      </Button>
    </Paper>
  );
};

export default CollectionEditPanel;
