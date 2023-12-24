// SelectCollection.jsx
import React, { useState, useCallback } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import SelectCollectionList from '../grids/collectionGrids/SelectCollectionList';
import CreateOrEditCollectionDialog from '../dialogs/CreateOrEditCollectionDialog';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import usePortfolioStyles from '../../context/hooks/usePortfolioStyles';
import { useMode } from '../../context';

const SelectCollection = ({ handleSelectCollection }) => {
  const { theme } = useMode();
  const classes = usePortfolioStyles(theme);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, selectedCollection } = useCollectionStore();

  const handleDialogToggle = useCallback(() => {
    setDialogOpen(!isDialogOpen);
  }, [isDialogOpen]);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      closeDialog();
    },
    [setSelectedCollection, closeDialog]
  );
  const openNewDialog = () => {
    setIsNew(true);
    handleDialogToggle();
  };

  return (
    <Box className={classes.portfolioBoxB}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.typography}>
            Choose a Collection
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridItem}>
          <Button className={classes.button} onClick={openNewDialog}>
            Add New Collection
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.listContainer}>
        <SelectCollectionList
          handleSelectCollection={handleSelectCollection}
          onSave={handleSave}
          openDialog={handleDialogToggle}
        />
      </Box>
      <CreateOrEditCollectionDialog
        isDialogOpen={isDialogOpen}
        closeDialog={handleDialogToggle}
        onSave={handleSave}
        isNew={isNew}
        initialName={isNew ? '' : selectedCollection?.name}
        initialDescription={isNew ? '' : selectedCollection?.description}
      />
    </Box>
  );
};

export default SelectCollection;
