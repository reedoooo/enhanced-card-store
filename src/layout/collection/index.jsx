import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMode } from '../../context';
import DashboardLayout from '../REUSABLE_COMPONENTS/layout-utils/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { Grid } from '@mui/material';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import SelectCollectionList from './SelectCollectionList';
import useDialogState from '../../context/hooks/useDialogState';
import DashboardBox from '../REUSABLE_COMPONENTS/layout-utils/DashboardBox';
import StatBoard from './StatBoard';
import { Tab, Tabs } from '@mui/material';
import ChartGridLayout from './ChartGridLayout';
import CollectionPortfolioHeader from './CollectionPortfolioHeader';
import PageHeader from '../REUSABLE_COMPONENTS/layout-utils/PageHeader';
import useUserData from '../../context/MAIN_CONTEXT/UserContext/useUserData';
import { useFormManagement } from '../../components/forms/hooks/useFormManagement';
import RCButton from '../REUSABLE_COMPONENTS/RCBUTTON';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import useManager from '../../context/useManager';

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
    collections: allCollections,
    handleSelectCollection,
    selectedCollectionId,
  } = useManager();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    <Tab label="Collections" value={0} key={'collections-tab'} />,
    ...(selectedCollectionId
      ? [
          <Tab
            label="Portfolio View"
            value={1}
            key={`${selectedCollectionId}-collectionId`}
          />,
        ]
      : []),
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSelectAndShowCollection = useCallback(
    (collection) => {
      handleSelectCollection(collection);
      setActiveTab(1); // Switch to Portfolio View tab
    },
    [handleSelectCollection]
  );

  if (!allCollections) {
    return <LoadingOverlay />;
  }

  return (
    <MDBox theme={theme} sx={{ flexGrow: 1 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="collection portfolio tabs"
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          p: theme.spacing(4),
        }}
      >
        {tabs}
      </Tabs>
      {activeTab === 0 && (
        <CollectionsView
          openDialog={openDialog}
          handleTabAndSelect={handleSelectAndShowCollection}
        />
      )}
      {activeTab === 1 && selectedCollectionId && (
        <PortfolioView
          selectedCollection={allCollections?.find(
            (c) => c._id === selectedCollectionId
          )}
          handleBackToCollections={() => setActiveTab(0)}
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
