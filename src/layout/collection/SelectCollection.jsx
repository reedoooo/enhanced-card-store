import React, { useState, useCallback } from 'react';
import { Box, Card, Grid, Skeleton } from '@mui/material';
import { useCollectionStore } from '../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useFormContext, useMode } from '../../context';
import SelectCollectionHeader from './sub-components/SelectCollectionHeader';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import DashboardLayout from '../Containers/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import SelectCollectionList from './collectionGrids/collections-list/SelectCollectionList';
import CollectionListStats from './collectionGrids/CollectionListStats';
import LoadingIndicator from '../../components/reusable/indicators/LoadingIndicator';

const SelectCollection = () => {
  const { theme } = useMode();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { currentForm } = useFormContext();
  const openNewDialog = useCallback((addOrEdit) => {
    setDialogOpen(true); // Correctly opens the dialog
  }, []);
  const handleDialogToggle = () => setDialogOpen(!isDialogOpen);
  const handleCloseDialog = () => setDialogOpen(false);
  const { allCollections, selectedCollection } = useCollectionStore();

  return (
    <DashboardLayout>
      <MDBox
        sx={{
          // backgroundColor: theme.palette.backgroundE.darker,
          p: theme.spacing(2),
        }}
      >
        <Grid container spacing={2}>
          <Card
            sx={{
              backgroundColor: theme.palette.backgroundE.darker,
              flexGrow: 1,
              width: '100%',
            }}
          >
            <SelectCollectionHeader openNewDialog={openNewDialog} />
          </Card>{' '}
        </Grid>
        <MDBox mt={4.5}>
          <Card
            sx={{
              backgroundColor: theme.palette.backgroundE.darker,
              flexGrow: 1,
              width: '100%',
              p: theme.spacing(2),
            }}
          >
            <CollectionListStats />
          </Card>
        </MDBox>
        <MDBox mt={4.5}>
          <Card
            sx={{
              backgroundColor: theme.palette.backgroundE.darker,
              flexGrow: 1,
              width: '100%',
              p: theme.spacing(2),
            }}
          >
            <SelectCollectionList
              openDialog={handleDialogToggle}
              allCollections={allCollections || []}
            />
          </Card>
        </MDBox>

        {isDialogOpen && (
          <CollectionDialog
            open={isDialogOpen}
            onClose={handleCloseDialog} // Use the simplified close function here
            isNew={currentForm === 'addCollectionForm'}
            collectionData={selectedCollection}
            collectionMode={'add'}
          />
        )}
      </MDBox>
    </DashboardLayout>
  );
};

export default SelectCollection;
