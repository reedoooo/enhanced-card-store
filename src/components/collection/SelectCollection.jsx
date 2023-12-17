import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import PropTypes from 'prop-types';
import SimpleReusableButton from '../reusable/SimpleReusableButton';
import SelectCollectionList from '../grids/collectionGrids/SelectCollectionList';
import CreateOrEditCollectionDialog from '../dialogs/CreateOrEditCollectionDialog';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context/hooks/colormode';
import {
  ListContainer,
  MiddleContainer,
  RootContainer,
  buttonStyle,
} from '../../pages/pageStyles/StyledComponents';

const SelectCollection = ({
  handleSelectCollection,
  // setShowCollections,
  // setShowPortfolio,
}) => {
  const { theme } = useMode();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, selectedCollection } = useCollectionStore();
  // const [editedName, setEditedName] = useState('');
  // const [editedDescription, setEditedDescription] = useState('');
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmallCard = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumCard = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMediumLargeCard = useMediaQuery(
    theme.breakpoints.between('md', 'lg')
  );
  const buttonSize = isSmallCard ? 'small' : isMediumCard ? 'medium' : 'large';
  const handleOpenCollectionModal = useCallback(() => {
    setDialogOpen(true);
    setIsNew(true);
    // No need to set editedName and editedDescription here
  }, []);

  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      // setShowCollections(false);
      // setShowPortfolio(true);
      closeDialog();
    },
    [setSelectedCollection, closeDialog]
  );

  const openDialog = useCallback((isNewCollection) => {
    setDialogOpen(true);
    setIsNew(isNewCollection);
    // No need to set editedName and editedDescription here
  }, []);

  return (
    <MiddleContainer>
      <RootContainer>
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ p: 2, justifyContent: 'center', margin: 'auto' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: 'black',
                  m: 'auto',
                }}
              >
                Choose a Collection
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 2, justifyContent: 'center', margin: 'auto' }}>
              <Button
                variant={'outlined'}
                onClick={handleOpenCollectionModal}
                sx={buttonStyle(theme, buttonSize)}
              >
                <Typography
                  variant={buttonSize === 'small' ? 'caption' : 'button'}
                >
                  Add New Collection
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
        <ListContainer>
          <SelectCollectionList
            handleSelectCollection={handleSelectCollection}
            onSave={handleSave}
            openDialog={() => openDialog(false)} // Indicate that this is not a new collection
            isXSmallScreen={isXSmallScreen} // Pass this prop to adjust styles inside the list
          />
        </ListContainer>
        <CreateOrEditCollectionDialog
          {...{
            isDialogOpen,
            closeDialog,
            onOpen: handleOpenCollectionModal,
            onSave: handleSave,
            isNew,
            initialName: isNew ? '' : selectedCollection?.name, // Pass initial values
            initialDescription: isNew ? '' : selectedCollection?.description,
          }}
        />
      </RootContainer>
    </MiddleContainer>
  );
};

SelectCollection.propTypes = {
  handleSelectCollection: PropTypes.func.isRequired,
};

export default SelectCollection;
