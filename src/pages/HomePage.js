import React, { useContext, useEffect, useRef } from 'react';
import { CardHeader, Grid, Box, useMediaQuery } from '@mui/material';
import { useModalContext } from '../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DetailsModal from '../components/dialogs/homeDetailsModal/DetailsModal';
import SplashPage2 from '../layout/REUSABLE_COMPONENTS/SplashPage2';
import PageLayout from '../layout/Containers/PageLayout';
import HeroSection from './sections/HeroSection';
import MainContentSection from './sections/MainContentSection';
import FeatureCardsSection from './sections/FeatureCardsSection';

const HomePage = () => {
  const {
    allFeatureData,
    showDetailsModal,
    detailsModalShow,
    isModalOpen,
    modalContent,
  } = useModalContext();
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
      {isModalOpen && (
        <GenericCardDialog
          open={isModalOpen}
          context={'Home'}
          card={modalContent}
        />
      )}
      {detailsModalShow && <DetailsModal />}
    </>
  );

  return (
    <PageLayout backCol={true}>
      {renderSplashPage()}
      <Grid container spacing={3}>
        {/* INTRO SECTION */}
        <Grid item xs={12}>
          <HeroSection />
        </Grid>
        {/* MAIN CONTENT SECTION */}
        <Grid item xs={12}>
          <MainContentSection />
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
