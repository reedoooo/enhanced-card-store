import React, { useCallback, useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import SelectCollectionList from '../grids/collectionGrids/SelectCollectionList';
import CreateOrEditCollectionDialog from '../dialogs/CreateOrEditCollectionDialog';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context/hooks/colormode';
import {
  ListContainer,
  MiddleContainer,
  RootContainer,
} from '../../pages/pageStyles/StyledComponents';

const useSelectCollectionStyles = makeStyles((theme) => ({
  boxStyle: {
    p: 2,
    justifyContent: 'center',
    margin: 'auto',
  },
  typographyStyle: {
    fontWeight: 'bold',
    color: 'black',
    m: 'auto',
  },
  button: {
    variant: 'outlined',
    '& .MuiTypography-root': {
      variant: 'button',
      [theme.breakpoints.down('sm')]: {
        variant: 'caption',
      },
    },
  },
}));

const SelectCollection = ({ handleSelectCollection }) => {
  const { theme } = useMode();
  const classes = useSelectCollectionStyles(theme);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, selectedCollection } = useCollectionStore();

  const handleOpenCollectionModal = useCallback(() => {
    setDialogOpen(true);
    setIsNew(true);
  }, []);

  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      closeDialog();
    },
    [setSelectedCollection, closeDialog]
  );

  const openDialog = useCallback((isNewCollection) => {
    setDialogOpen(true);
    setIsNew(isNewCollection);
  }, []);

  return (
    <MiddleContainer>
      <RootContainer>
        <Grid container>
          <Grid item xs={6}>
            <Box className={classes.boxStyle}>
              <Typography variant="h5" className={classes.typographyStyle}>
                Choose a Collection
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.boxStyle}>
              <Button
                className={classes.button}
                onClick={handleOpenCollectionModal}
              >
                <Typography variant="button">Add New Collection</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
        <ListContainer>
          <SelectCollectionList
            handleSelectCollection={handleSelectCollection}
            onSave={handleSave}
            openDialog={() => openDialog(false)}
          />
        </ListContainer>
        <CreateOrEditCollectionDialog
          isDialogOpen={isDialogOpen}
          closeDialog={closeDialog}
          onOpen={handleOpenCollectionModal}
          onSave={handleSave}
          isNew={isNew}
          initialName={isNew ? '' : selectedCollection?.name}
          initialDescription={isNew ? '' : selectedCollection?.description}
        />
      </RootContainer>
    </MiddleContainer>
  );
};

SelectCollection.propTypes = {
  handleSelectCollection: PropTypes.func.isRequired,
};

export default SelectCollection;
