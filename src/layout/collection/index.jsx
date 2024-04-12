import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMode } from '../../context';
import DashboardLayout from '../REUSABLE_COMPONENTS/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { Grid } from '@mui/material';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import SelectCollectionList from './SelectCollectionList';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useDialogState from '../../context/hooks/useDialogState';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import StatBoard from './StatBoard';
import { Tab, Tabs } from '@mui/material';
import RCHeader from '../REUSABLE_COMPONENTS/RCHeader';
import ChartGridLayout from './ChartGridLayout';
import CollectionPortfolioHeader from './CollectionPortfolioHeader';
import PageHeader from '../REUSABLE_COMPONENTS/PageHeader';
import useUserData from '../../context/MAIN_CONTEXT/UserContext/useUserData';
import { useFormManagement } from '../../components/forms/hooks/useFormManagement';
import RCButton from '../REUSABLE_COMPONENTS/RCBUTTON';
import { useCompileCardData } from '../../context/MISC_CONTEXT/AppContext/useCompileCardData';

const CollectionsView = ({ openDialog, handleTabAndSelect }) => {
  const { theme } = useMode();
  const { setActiveFormSchema } = useFormManagement();
  const { user } = useUserData();

  const handleOpenAddDialog = useCallback(() => {
    setActiveFormSchema('addCollectionForm');
    openDialog('isAddCollectionDialogOpen');
  }, [openDialog, setActiveFormSchema]);
  return (
    <DashboardLayout>
      <MDBox theme={theme}>
        <DashboardBox sx={{ p: theme.spacing(2) }}>
          <PageHeader
            title="Collection Portfolio"
            description={`Last updated: ${new Date().toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}`}
            buttonText="Add New Collection"
            headerName="Collection Portfolio"
            username={user.username}
            handleOpenDialog={handleOpenAddDialog}
            actions={
              <RCButton
                color="success"
                size="large"
                variant="holo"
                onClick={() => {
                  setActiveFormSchema('addCollectionForm');
                  openDialog('isAddCollectionDialogOpen');
                }}
              >
                Add New Collection
              </RCButton>
            }
          />
        </DashboardBox>
        <DashboardBox sx={{ px: theme.spacing(2) }}>
          <StatBoard />
        </DashboardBox>
        <DashboardBox sx={{ px: theme.spacing(2), py: theme.spacing(2) }}>
          <SelectCollectionList
            handleSelectAndShowCollection={handleTabAndSelect}
            openNewDialog={() => openDialog('isEditCollectionDialogOpen')}
          />
        </DashboardBox>
      </MDBox>
    </DashboardLayout>
  );
};
const PortfolioView = ({ selectedCollection, handleBackToCollections }) => (
  <DashboardLayout>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CollectionPortfolioHeader
          onBack={handleBackToCollections}
          collection={selectedCollection}
        />
      </Grid>
      <Grid item xs={12}>
        <ChartGridLayout />
      </Grid>
    </Grid>
  </DashboardLayout>
);
const CollectionPortfolio = () => {
  const { theme } = useMode();
  const {
    selectedCollectionId,
    selectedCollection,
    allCollections,
    handleSelectCollection,
  } = useSelectedCollection();
  const { chartData, setChartData } = useCompileCardData();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [<Tab label="Collections" value={0} key={'collections-tab'} />];
  if (selectedCollectionId) {
    tabs.push(<Tab label="Portfolio View" value={1} key={'portfolio-tab'} />);
  }
  const handleTabChange = (event, newValue) => {
    if (newValue === 0 || (newValue === 1 && selectedCollectionId)) {
      setActiveTab(newValue);
    }
  };
  // const handleSelectAndShowCollection = useCallback(
  //   (collection) => {
  //     handleSelectCollection(collection); // Assume this function sets the selectedCollectionId
  //     setActiveTab(1); // Switch to Portfolio View tab
  //   },
  //   [handleSelectCollection]
  // );
  const handleSelectAndShowCollection = useCallback(
    (collection) => {
      handleSelectCollection(collection); // Sets the selectedCollectionId and selectedCollection
      if (collection.averagedChartData) {
        const selectedChartDataKey = Object.keys(
          collection.averagedChartData
        )[0]; // Get the first key as default
        const selectedChartDataValue =
          collection.averagedChartData[selectedChartDataKey];
        setChartData(selectedChartDataValue); // Update the selectedChartData
      }
      setActiveTab(1); // Switch to Portfolio View tab
    },
    [handleSelectCollection, setChartData]
  );
  return (
    <MDBox theme={theme} sx={{ flexGrow: 1 }}>
      <MDBox
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          p: theme.spacing(4),
        }}
      >
        <RCHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <MDBox>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="collection portfolio tabs"
          >
            {tabs}
          </Tabs>
        </MDBox>
      </MDBox>
      {activeTab === 0 && (
        <CollectionsView
          openDialog={openDialog}
          handleTabAndSelect={handleSelectAndShowCollection}
        />
      )}

      {activeTab === 1 && selectedCollectionId && (
        <PortfolioView
          selectedCollection={selectedCollection}
          handleBackToCollections={() => {
            setActiveTab(0); // Switch back to collections tab when going back
          }}
          // allCollections={allCollections}
        />
      )}
      {dialogState.isAddCollectionDialogOpen && (
        <CollectionDialog
          open={dialogState.isAddCollectionDialogOpen}
          onClose={() => closeDialog('isAddCollectionDialogOpen')}
          collectionData={null}
          isNew={true}
        />
      )}
    </MDBox>
  );
};

export default CollectionPortfolio;
