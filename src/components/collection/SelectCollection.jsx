import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import PropTypes from 'prop-types';
import SimpleReusableButton from '../reusable/SimpleReusableButton';
import SelectCollectionList from '../grids/collectionGrids/SelectCollectionList';
import CreateOrEditCollectionDialog from '../dialogs/CreateOrEditCollectionDialog';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context/hooks/colormode';

const SelectCollection = ({
  handleSelectCollection,
  setShowCollections,
  setShowPortfolio,
}) => {
  const { theme } = useMode();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, selectedCollection } = useCollectionStore();
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmallCard = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumCard = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMediumLargeCard = useMediaQuery(
    theme.breakpoints.between('md', 'lg')
  );

  const buttonSize = isSmallCard ? 'small' : isMediumCard ? 'medium' : 'large';
  const buttonStyle = {
    padding: buttonSize === 'small' ? theme.spacing(1) : theme.spacing(2),
    fontSize: buttonSize === 'small' ? 'small' : 'default',
    color: theme.palette.info.main,
  };

  const handleOpenCollectionModal = useCallback(() => {
    setDialogOpen(true);
    setIsNew(true);
    setEditedName('');
    setEditedDescription('');
  }, []);

  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      setShowCollections(false);
      setShowPortfolio(true);
      closeDialog();
    },
    [setSelectedCollection, setShowCollections, setShowPortfolio, closeDialog]
  );

  useEffect(() => {
    if (selectedCollection) {
      setEditedName(selectedCollection.name);
      setEditedDescription(selectedCollection.description);
    }
  }, [selectedCollection]);

  const openDialog = useCallback(
    (isNewCollection) => {
      setDialogOpen(true);
      setIsNew(isNewCollection);
      if (!isNewCollection && selectedCollection) {
        setEditedName(selectedCollection.name);
        setEditedDescription(selectedCollection.description);
      }
    },
    [selectedCollection]
  );

  const MiddleContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.quinternary,
    boxShadow: theme.shadows[3],
    width: '100%',
    height: isXSmallScreen ? 'auto' : '100%', // Example of responsive height
  }));
  const RootContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
    alignItems: 'stretch',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      padding: theme.spacing(2),
    },
    height: '100%',
    padding: isXSmallScreen ? theme.spacing(2) : theme.spacing(4), // Adjust padding
  }));
  const ListContainer = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.success.evenLighter,
    boxShadow: theme.shadows[3],
    width: '100%',
    height: '100%',
    padding: theme.spacing(isXSmallScreen ? 1 : 2),
  }));

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
                sx={{
                  ...buttonStyle,
                }}
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
            editedName,
            setEditedName,
            editedDescription,
            setEditedDescription,
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
