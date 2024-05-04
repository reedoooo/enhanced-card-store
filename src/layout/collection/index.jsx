import React, { useCallback, useEffect, useState } from 'react';
import { useMode } from 'context';
import DashboardLayout from 'layout/REUSABLE_COMPONENTS/layout-utils/DashBoardLayout';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import { Grid } from '@mui/material';
import CollectionDialog from 'components/dialogs/CollectionDialog';
import useDialogState from 'context/hooks/useDialogState';
import DashboardBox from 'layout/REUSABLE_COMPONENTS/layout-utils/DashboardBox';
import StatBoard from './CollectionsViewLayout/StatBoard';
import { Tab, Tabs } from '@mui/material';
import CollectionPortfolioHeader from './PortfolioViewLayout/CollectionPortfolioHeader';
import PageHeader from 'layout/REUSABLE_COMPONENTS/layout-utils/PageHeader';
import useUserData from 'context/state/useUserData';
import { useFormManagement } from 'context/formHooks/useFormManagement';
import LoadingOverlay from 'layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import useManager from 'context/useManager';
import CollectionsViewLayout from './CollectionsViewLayout';
import PortfolioViewLayout from './PortfolioViewLayout';

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
            action={{ route: '', tooltip: 'Add Collection' }}
          />
        </DashboardBox>
        <DashboardBox sx={{ px: theme.spacing(2) }}>
          <StatBoard />
        </DashboardBox>
        <DashboardBox sx={{ px: theme.spacing(2), py: theme.spacing(2) }}>
          <CollectionsViewLayout
            handleSelectAndShowCollection={handleTabAndSelect}
            openNewDialog={() => openDialog('isEditCollectionDialogOpen')}
          />
        </DashboardBox>
      </MDBox>
    </DashboardLayout>
  );
};
const PortfolioView = ({ handleBackToCollections }) => (
  <DashboardLayout>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CollectionPortfolioHeader onBack={handleBackToCollections} />
      </Grid>
      <Grid item xs={12}>
        <PortfolioViewLayout />
      </Grid>
    </Grid>
  </DashboardLayout>
);
const CollectionPortfolio = () => {
  const { theme } = useMode();
  const { collections, handleSelectCollection } = useManager();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);
  const selectedCollectionId = localStorage.getItem('selectedCollectionId');

  const tabs = [
    <Tab
      label="Collections"
      value={0}
      key={selectedCollectionId === null ? 0 : 1}
    />,
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
    if (newValue === 0) {
      handleSelectCollection(null);
    } else {
      handleSelectCollection(
        collections.find(
          (collection) => collection._id === selectedCollectionId
        )
      );
    }
  };

  const handleSelectAndShowCollection = useCallback(
    (collection) => {
      handleSelectCollection(collection);
      setActiveTab(1); // Switch to Portfolio View tab
    },
    [handleSelectCollection]
  );
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (
        event.key === 'selectedCollectionId' ||
        event.key === 'selectedCollection'
      ) {
        const updatedCollectionId = event.newValue;
        const updatedCollection = collections.find(
          (collection) => collection._id === updatedCollectionId
        );
        if (updatedCollection) {
          // setActiveTab(collections.indexOf(updatedDeck));
          handleSelectCollection(updatedCollection);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [collections, handleSelectCollection]);

  if (!collections) {
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
          selectedCollection={collections?.find(
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
