import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import PropTypes from 'prop-types';
import SimpleReusableButton from '../reusable/SimpleReusableButton';
import SelectCollectionList from '../grids/collectionGrids/SelectCollectionList';
import CreateOrEditCollectionDialog from '../dialogs/CreateOrEditCollectionDialog';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context/hooks/colormode';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     margin: 'auto',
//     padding: theme.spacing(4),
//     alignItems: 'stretch',
//     height: '80vh',
//     width: '100%',
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: theme.shape.borderRadius,
//     // width: '50vw',
//   },
//   button: {
//     marginBottom: theme.spacing(2),
//     margin: theme.spacing(2),
//     padding: theme.spacing(2),
//   },
//   list: {
//     flexGrow: 1,
//     overflowY: 'auto',
//     overflowX: 'hidden',
//     padding: theme.spacing(2),
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: theme.palette.success.evenLighter,
//     boxShadow: theme.shadows[3],
//     width: '100%',
//   },
//   middleContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     // marginTop: theme.spacing(1),
//     // alignSelf: 'start',
//     justifySelf: 'center',
//     alignItems: 'center',
//     gap: theme.spacing(2),
//     padding: theme.spacing(4),
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: theme.palette.background.quinternary,
//     boxShadow: theme.shadows[3],
//     width: '100%',
//     height: '100%',
//     // margin: 0,
//     // marginLeft: theme.spacing(2),
//     // marginRight: theme.spacing(2),
//     // height: '100%',
//   },
// }));

const SelectCollection = ({
  handleSelectCollection,
  handleCollectionSelect,
  setShowCollections,
  setShowPortfolio,
}) => {
  const { theme } = useMode();
  // const toolbarRef = useRef(null);
  // const [toolbarHeight, setToolbarHeight] = useState('50px'); // Default height

  // const classes = useStyles(theme);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, selectedCollection } = useCollectionStore();
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  // const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  // const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // const isSmallCard = useMediaQuery(theme.breakpoints.down('sm'));
  // const isMediumCard = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  // const isMediumLargeCard = useMediaQuery(
  //   theme.breakpoints.between('md', 'lg')
  // );
  const openDialog = useCallback(
    (isNewCollection) => {
      setDialogOpen(true);
      setIsNew(isNewCollection);

      if (isNewCollection) {
        setEditedName('');
        setEditedDescription('');
      } else if (selectedCollection) {
        setEditedName(selectedCollection.name);
        setEditedDescription(selectedCollection.description);
      }
    },
    [selectedCollection]
  );

  const handleOpenCollectionModal = useCallback(() => {
    openDialog(true);
  }, [openDialog]);

  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      setShowCollections(false);
      setShowPortfolio(true);
      closeDialog();
    },
    [setSelectedCollection, closeDialog]
  );

  useEffect(() => {
    if (selectedCollection) {
      setEditedName(selectedCollection.name);
      setEditedDescription(selectedCollection.description);
    }
  }, [selectedCollection]);

  const isSmallCard = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumCard = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMediumLargeCard = useMediaQuery(
    theme.breakpoints.between('md', 'lg')
  );

  const buttonSize = isSmallCard ? 'small' : isMediumCard ? 'medium' : 'large';
  const buttonStyle = {
    padding: buttonSize === 'small' ? theme.spacing(1) : theme.spacing(2),
    fontSize: buttonSize === 'small' ? 'small' : 'default',
    // background: theme.palette.info.main,
    color: theme.palette.info.main,
    // Add other style adjustments as needed
  };

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
    // <Box className={classes.middleContainer}>
    <MiddleContainer>
      {/* <Box className={classes.root}> */}
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
                  // Add other style adjustments as needed
                }}
                // color={theme.palette.info.main}
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
        {/* <div className={classes.list}> */}
        <ListContainer>
          <SelectCollectionList
            handleSelectCollection={handleSelectCollection}
            handleCollectionSelect={handleCollectionSelect}
            onSave={handleSave}
            openDialog={() => openDialog(false)} // Indicate that this is not a new collection
            isXSmallScreen={isXSmallScreen} // Pass this prop to adjust styles inside the list
          />
          {/* </div> */}
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
        {/* </Box> */}
      </RootContainer>
      {/* </Box> */}
    </MiddleContainer>
  );
};

SelectCollection.propTypes = {
  handleSelectCollection: PropTypes.func.isRequired,
};

export default SelectCollection;
