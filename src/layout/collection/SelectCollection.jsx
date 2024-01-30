import React, { useState, useCallback } from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import SelectCollectionList from '../../components/grids/collectionGrids/SelectCollectionList';
import { useCollectionStore } from '../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import {
  PortfolioBoxB,
  SelectCollectionListContainer,
} from '../../context/hooks/style-hooks/usePortfolioStyles';
import { useMode, useStatisticsStore } from '../../context';
import SelectCollectionHeader from '../headings/collection/SelectCollectionHeader';
import PieChartStats from '../../components/other/dataDisplay/PieChartStats';
import TotalValueOfCollectionsDisplay from '../../components/other/dataDisplay/TotalValueOfCollectionsDisplay';
import TopFiveExpensiveCards from '../../components/other/dataDisplay/TopFiveExpensiveCards';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import useCollectionVisibility from '../../context/hooks/useCollectionVisibility';
import DashboardLayout from './DashBoard/DashBoardLayout';
import MDBox from './MDBOX';
const SelectCollection = () => {
  const { theme } = useMode();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openNewDialog = () => setDialogOpen(true);
  const handleDialogToggle = () => setDialogOpen(!isDialogOpen);
  // const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, allCollections, selectedCollection } =
    useCollectionStore();
  const { topFiveCards, totalValue, chartData } = useStatisticsStore();
  const { handleSelectCollection } = useCollectionVisibility();
  const handleSave = (collection) => {
    handleSelectCollection(collection._id);
    setDialogOpen(false);
  };
  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* <PortfolioBoxB theme={theme} sx={{ padding: theme.spacing(3) }}> */}
          <SelectCollectionHeader openNewDialog={openNewDialog} />
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              {/* <PieChartStats
                title="Collection Statistics"
                description="(+15%) increase in overall collection value."
                date="updated 4 min ago"
                chartData={chartData}
                iconName="PieChartIcon"
              /> */}
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TotalValueOfCollectionsDisplay
                totalValue={totalValue}
                iconName="AttachMoneyIcon"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TopFiveExpensiveCards
                topFiveCards={topFiveCards}
                iconName="EmojiEventsIcon"
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <SelectCollectionListContainer theme={theme}>
            <SelectCollectionList
              // onSave={handleSave}
              openDialog={handleDialogToggle}
              // isLoadingNewCollection={isLoadingNewCollection}
              allCollections={allCollections || []}
            />
          </SelectCollectionListContainer>{' '}
        </MDBox>
        {isDialogOpen && (
          <CollectionDialog
            open={isDialogOpen}
            onClose={handleDialogToggle}
            onSave={handleSave}
            isNew={!selectedCollection}
            handleSelectCollection={handleSelectCollection}
            name={selectedCollection?.name || ''}
            description={selectedCollection?.description || ''}
            // initialName={selectedCollection?.name || ''}
            // initialDescription={selectedCollection?.description || ''}
          />
        )}{' '}
        {/* </PortfolioBoxB> */}
        {/* </Grid> */}
      </MDBox>
    </DashboardLayout>
  );
};

export default SelectCollection;

// const handleDialogToggle = useCallback(() => {
//   setDialogOpen((prev) => !prev);
// }, []);
// const handleDialogToggle = () => setDialogOpen(!isDialogOpen);

// const handleSave = useCallback(
//   (collection) => {
//     setSelectedCollection(collection);
//     setDialogOpen(false);
//     // handleSelectCollection(collection);
//   },
//   [setSelectedCollection, handleSelectCollection]
// );

// const openNewDialog = () => {
//   setIsNew(true);
//   setDialogOpen(true);
// };

// // Function to render the header
// const renderHeader = () => (
//   <SelectCollectionHeader openNewDialog={openNewDialog} />
// );

// Function to render the statistics section
// const renderStatistics = () => (
//   <Grid container spacing={2} sx={{ marginTop: theme.spacing(2) }}>
//     <PieChartStats chartData={chartData} />
//     <TotalValueOfCollectionsDisplay totalValue={totalValue} />
//     <TopFiveExpensiveCards topFiveCards={topFiveCards} />
//   </Grid>
// );

// // Function to render the collection list
// const renderCollectionList = () => (
//   <SelectCollectionListContainer theme={theme}>
//     <SelectCollectionList
//       handleSelectCollection={handleSelectCollection}
//       onSave={handleSave}
//       openDialog={handleDialogToggle}
//       isLoadingNewCollection={isLoadingNewCollection}
//     />
//   </SelectCollectionListContainer>
// );

// Function to render the dialog for collection
// const renderCollectionDialog = () => (
//   <CollectionDialog
//     handleSelectCollection={handleSelectCollection}
//     isDialogOpen={isDialogOpen}
//     closeDialog={handleDialogToggle}
//     onSave={handleSave}
//     isNew={isNew}
//     name={isNew ? '' : selectedCollection?.name}
//     description={isNew ? '' : selectedCollection?.description}
//     initialName={selectedCollection?.name || ''}
//     initialDescription={selectedCollection?.description || ''}
//   />
// );
// Hide the component if a collection is already selected
// if (selectedCollection) {
//   return null;
// }
