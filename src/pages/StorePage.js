import React, { useRef, useState } from 'react';
import { Grid } from '@mui/material';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';
import StoreSearch from '../layout/store/StoreSearch';
import useLoadingAndModal from './pageStyles/useLoadingAndModal';
import HeroBanner from './pageStyles/HeroBanner';
import PageLayout from '../layout/Containers/PageLayout';
const StorePage = () => {
  const { loadingStatus, returnDisplay, isModalOpen, modalContent } =
    useLoadingAndModal();
  return (
    <PageLayout>
      <MDBox
        sx={{
          top: 0,
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        {loadingStatus?.isPageLoading && returnDisplay()}

        <HeroBanner
          title="Welcome to Store"
          subtitle="Search for cards and add them to your cart."
        />
        <StoreSearch />
        {isModalOpen && (
          <GenericCardDialog
            open={isModalOpen}
            context={'Cart'}
            card={modalContent}
          />
        )}
      </MDBox>
    </PageLayout>
  );
};

export default StorePage;
