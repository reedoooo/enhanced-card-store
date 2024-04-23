import React, { useContext, useEffect, useRef } from 'react';
import { CardHeader, Grid, Box, useMediaQuery } from '@mui/material';
import GenericCardDialog from '../components/dialogs/GenericCardDialog';
import DetailsModal from '../components/dialogs/DetailsModal';
import SplashPage2 from '../layout/REUSABLE_COMPONENTS/system-utils/SplashPage2';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import HeroSection from '../layout/home/HeroSection';
import FeatureCardsSection from '../layout/home/FeatureCardsSection';
import useDialogState from '../context/hooks/useDialogState';

const HomePage = () => {
  const { dialogState, data, closeDialog } = useDialogState();

  const splashRef = useRef(null);

  useEffect(() => {
    if (splashRef.current) {
      Object.assign(splashRef.current.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
      });
    }
  }, []);
  const renderSplashPage = () => (
    <div ref={splashRef}>
      <SplashPage2 />
    </div>
  );
  const renderDialogs = () => (
    <>
      {dialogState.isDetailsDialogOpen && (
        <DetailsModal
          open={dialogState.isDetailsDialogOpen}
          onClose={() => closeDialog('isDetailsDialogOpen')}
          selectedCard={data}
        />
      )}
    </>
  );

  return (
    <PageLayout backCol={true}>
      <Grid container spacing={3}>
        {/* HERO SECTION */}
        <Grid item xs={12}>
          <HeroSection />
        </Grid>
        {/* FEATURE CARDS SECTION */}
        <Grid item xs={12}>
          <FeatureCardsSection />
        </Grid>
        {renderDialogs()}
      </Grid>
    </PageLayout>
  );
};

export default HomePage;
