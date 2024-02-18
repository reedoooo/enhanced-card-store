import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import useCollectionVisibility from '../../context/hooks/useCollectionVisibility';
import { useCollectionStore, useMode } from '../../context';
import DashboardLayout from '../Containers/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';
import { PortfolioBoxA } from '../../pages/pageStyles/StyledComponents';
import { Grid, Card, Typography } from '@mui/material';
import { useFormContext } from '../../context';
import SelectCollectionHeader from './sub-components/SelectCollectionHeader';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import collectionPortfolioData from './data/collectionPortfolioData';
import ChartGridLayout from './collectionGrids/ChartGridLayout';
import StatisticsCardGrid from './collectionGrids/StatisticsCardsGrid';
import CollectionPortfolioHeader from './sub-components/CollectionPortfolioHeader';
import CollectionListStats from './collectionGrids/CollectionListStats';
import SelectCollectionList from './collectionGrids/collections-list/SelectCollectionList';

const CollectionPortfolio = () => {
  const { theme } = useMode();
  const {
    selectedCollection,
    hasFetchedCollections,
    allCollections,
    totalQuantity,
    removeOneFromCollection,
  } = useCollectionStore();
  const { handleBackToCollections } = useCollectionVisibility();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { currentForm } = useFormContext();
  const openNewDialog = useCallback((addOrEdit) => {
    setDialogOpen(true); // Correctly opens the dialog
  }, []);
  const handleDialogToggle = () => setDialogOpen(!isDialogOpen);
  const handleCloseDialog = () => setDialogOpen(false);
  const [collectionName, setCollectionName] = useState(
    selectedCollection?.name || ''
  );
  const { columns, data } = collectionPortfolioData(
    selectedCollection?.cards,
    null,
    null,
    null
  );
  return (
    <MDBox
      py={2}
      px={1}
      sx={{
        flexGrow: 1,
        backgroundColor: theme.palette.backgroundE.lightestBlue,
        borderColor: theme.palette.backgroundE.darkest,
        borderWidth: '4px',
      }}
    >
      <PortfolioBoxA theme={theme}>
        {selectedCollection && hasFetchedCollections ? (
          <DashboardLayout>
            <Grid container spacing={1}>
              {/* HEADER */}
              <Grid item xs={12}>
                <CollectionPortfolioHeader
                  onBack={handleBackToCollections}
                  collectionName={collectionName}
                  selectedCollection={selectedCollection}
                  totalQuantity={totalQuantity}
                />
              </Grid>
              {/* STATISTICS FEATURE GRID */}
              <Grid item xs={12}>
                <StatisticsCardGrid selectedCollection={selectedCollection} />
              </Grid>
              {/* CHARTS */}
              <Grid item xs={12}>
                <ChartGridLayout
                  selectedCards={selectedCollection?.cards}
                  removeCard={removeOneFromCollection}
                  columns={columns}
                  data={data}
                />
              </Grid>
            </Grid>
          </DashboardLayout>
        ) : (
          <DashboardLayout>
            <MDBox
              sx={{
                p: theme.spacing(2),
              }}
            >
              {/* HEADER */}
              <Grid container spacing={2}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.backgroundE.darker,
                    flexGrow: 1,
                    width: '100%',
                  }}
                >
                  <SelectCollectionHeader openNewDialog={openNewDialog} />
                </Card>
              </Grid>
              {/* COLLECTION LIST STATS DISPLAY */}
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
              {/* COLLECTION LIST */}
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
        )}
      </PortfolioBoxA>
    </MDBox>
  );
};

CollectionPortfolio.propTypes = {
  selectedCollection: propTypes.object,
  hasFetchedCollections: propTypes.bool,
  allCollections: propTypes.array,
  totalQuantity: propTypes.number,
  removeOneFromCollection: propTypes.func,
};

CollectionPortfolio.defaultProps = {
  selectedCollection: {},
  hasFetchedCollections: false,
  allCollections: [],
  totalQuantity: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeOneFromCollection: () => {},
};

export default CollectionPortfolio;
