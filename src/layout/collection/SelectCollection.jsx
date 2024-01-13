import React, { useState, useCallback } from 'react';
import { Box, Grid } from '@mui/material';
import SelectCollectionList from '../../components/grids/collectionGrids/SelectCollectionList';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import usePortfolioStyles from '../../context/hooks/usePortfolioStyles';
import { useMode, useStatisticsStore } from '../../context';
import SelectCollectionHeader from '../../components/headings/collection/SelectCollectionHeader';
import PieChartStats from '../../components/other/dataDisplay/chart/PieChartStats';
import TotalValueOfCollectionsDisplay from '../../components/other/dataDisplay/TotalValueOfCollectionsDisplay';
import TopFiveExpensiveCards from '../../components/other/dataDisplay/TopFiveExpensiveCards';
import CollectionDialog from '../../components/dialogs/CollectionDialog';

const SelectCollection = ({ handleSelectCollection }) => {
  const { theme } = useMode();
  const classes = usePortfolioStyles(theme);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, selectedCollection, allCollections } =
    useCollectionStore();
  const [isLoadingNewCollection, setIsLoadingNewCollection] = useState(false);
  const { topFiveCards, totalValue, chartData } = useStatisticsStore();

  const handleDialogToggle = useCallback(() => {
    setDialogOpen((prev) => !prev);
  }, []);

  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      setDialogOpen(false);
      handleSelectCollection(collection);
    },
    [setSelectedCollection, handleSelectCollection]
  );

  const openNewDialog = () => {
    setIsNew(true);
    setDialogOpen(true);
  };

  // Function to render the header
  const renderHeader = () => (
    <SelectCollectionHeader classes={classes} openNewDialog={openNewDialog} />
  );

  // Function to render the statistics section
  const renderStatistics = () => (
    <Grid container spacing={2} sx={{ marginTop: theme.spacing(2) }}>
      <PieChartStats classes={classes} chartData={chartData} />
      <TotalValueOfCollectionsDisplay
        classes={classes}
        totalValue={totalValue}
      />
      <TopFiveExpensiveCards classes={classes} topFiveCards={topFiveCards} />
    </Grid>
  );

  // Function to render the collection list
  const renderCollectionList = () => (
    <Box className={classes.listContainer}>
      <SelectCollectionList
        handleSelectCollection={handleSelectCollection}
        onSave={handleSave}
        openDialog={handleDialogToggle}
        isLoadingNewCollection={isLoadingNewCollection}
      />
    </Box>
  );

  // Function to render the dialog for collection
  const renderCollectionDialog = () => (
    <CollectionDialog
      handleSelectCollection={handleSelectCollection}
      isDialogOpen={isDialogOpen}
      closeDialog={handleDialogToggle}
      onSave={handleSave}
      isNew={isNew}
      initialName={isNew ? '' : selectedCollection?.name}
      initialDescription={isNew ? '' : selectedCollection?.description}
    />
  );

  return (
    <Box className={classes.portfolioBoxB} sx={{ padding: theme.spacing(3) }}>
      {renderHeader()}
      {renderStatistics()}
      {renderCollectionList()}
      {renderCollectionDialog()}
    </Box>
  );
};

export default SelectCollection;
