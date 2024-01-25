import React, { useState, useCallback } from 'react';
import { Box, Grid } from '@mui/material';
import SelectCollectionList from '../../components/grids/collectionGrids/SelectCollectionList';
import { useCollectionStore } from '../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import usePortfolioStyles, {
  PortfolioBoxB,
  SelectCollectionListContainer,
} from '../../context/hooks/style-hooks/usePortfolioStyles';
import { useMode, useStatisticsStore } from '../../context';
import SelectCollectionHeader from '../headings/collection/SelectCollectionHeader';
import PieChartStats from '../../components/other/dataDisplay/chart/PieChartStats';
import TotalValueOfCollectionsDisplay from '../../components/other/dataDisplay/TotalValueOfCollectionsDisplay';
import TopFiveExpensiveCards from '../../components/other/dataDisplay/TopFiveExpensiveCards';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import useCollectionVisibility from '../../context/hooks/useCollectionVisibility';

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
    <PortfolioBoxB theme={theme} sx={{ padding: theme.spacing(3) }}>
      <SelectCollectionHeader openNewDialog={openNewDialog} />
      <Grid container spacing={2} sx={{ marginTop: theme.spacing(2) }}>
        <PieChartStats chartData={chartData} />
        <TotalValueOfCollectionsDisplay totalValue={totalValue} />
        <TopFiveExpensiveCards topFiveCards={topFiveCards} />
      </Grid>{' '}
      <SelectCollectionListContainer theme={theme}>
        <SelectCollectionList
          // onSave={handleSave}
          openDialog={handleDialogToggle}
          // isLoadingNewCollection={isLoadingNewCollection}
          allCollections={allCollections || []}
        />
      </SelectCollectionListContainer>{' '}
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
    </PortfolioBoxB>
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
