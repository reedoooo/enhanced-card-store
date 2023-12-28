// SelectCollection.jsx
import React, { useState, useCallback } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import SelectCollectionList from '../../components/grids/collectionGrids/SelectCollectionList';
import CreateOrEditCollectionDialog from '../../components/dialogs/CreateOrEditCollectionDialog';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import usePortfolioStyles from '../../context/hooks/usePortfolioStyles';
import { useMode, useStatisticsStore } from '../../context';
import { PieChart } from '@mui/x-charts/PieChart';
import SelectCollectionHeader from '../../components/headings/collection/SelectCollectionHeader';
import PieChartStats from '../../components/other/dataDisplay/chart/PieChartStats';
import TotalValueOfCollectionsDisplay from '../../components/other/dataDisplay/TotalValueOfCollectionsDisplay';
import TopFiveExpensiveCards from '../../components/other/dataDisplay/TopFiveExpensiveCards';

const SelectCollection = ({ handleSelectCollection }) => {
  const { theme } = useMode();
  const classes = usePortfolioStyles(theme);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { setSelectedCollection, selectedCollection, allCollections } =
    useCollectionStore();
  const { statsByCollectionId } = useStatisticsStore();
  const [isLoadingNewCollection, setIsLoadingNewCollection] = useState(false);

  const handleDialogToggle = useCallback(() => {
    setDialogOpen(!isDialogOpen);
  }, [isDialogOpen]);

  const handleSave = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      setIsLoadingNewCollection(true);

      // Simulate a delay for adding collection (replace with actual API call or logic)
      setTimeout(() => {
        setSelectedCollection(collection);
        setIsLoadingNewCollection(false); // Set loading state false once added
        setDialogOpen(false);
      }, 1000); // Simulate network or processing delay
    },
    [setSelectedCollection]
  );
  const openNewDialog = () => {
    setIsNew(true);
    setDialogOpen(true);
  };
  // Calculate the total value of all collections
  const totalValue = allCollections.reduce(
    (acc, collection) => acc + collection.totalPrice,
    0
  );
  const topFiveCards = allCollections
    .flatMap((collection) => collection.cards) // Flatten all cards into one array
    .sort((a, b) => b.price - a.price) // Sort by price in descending order
    .slice(0, 5);
  const chartData = allCollections.map((collection) => ({
    id: collection.id,
    value: collection.totalPrice,
    label: collection.name,
  }));

  return (
    <Box className={classes.portfolioBoxB} sx={{ padding: theme.spacing(3) }}>
      <SelectCollectionHeader classes={classes} openNewDialog={openNewDialog} />
      <Grid container spacing={2} sx={{ marginTop: theme.spacing(2) }}>
        <PieChartStats classes={classes} chartData={chartData} />
        <TotalValueOfCollectionsDisplay
          classes={classes}
          totalValue={totalValue}
        />
        <TopFiveExpensiveCards classes={classes} topFiveCards={topFiveCards} />
      </Grid>
      <Box className={classes.listContainer}>
        <SelectCollectionList
          handleSelectCollection={handleSelectCollection}
          onSave={handleSave}
          openDialog={handleDialogToggle}
          isLoadingNewCollection={isLoadingNewCollection} // Pass down the loading state
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
