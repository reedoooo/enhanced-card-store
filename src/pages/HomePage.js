import React, { useContext, useEffect, useRef } from 'react';
import { CardHeader, Grid, Box, useMediaQuery } from '@mui/material';
import {
  ModalContext,
  useModalContext,
} from '../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DetailsModal from '../components/dialogs/homeDetailsModal/DetailsModal';
import SplashPage2 from './SplashPage2';
import pages from '../assets/data/pages.json';
import SingleCardAnimation from '../assets/animations/SingleCardAnimation';
import {
  useAuthContext,
  useCollectionStore,
  useMode,
  usePageContext,
  useUserContext,
} from '../context';
import useCardCronJob from '../tests/useCardCronJob';
import PageLayout from '../layout/Containers/PageLayout';
import HeroSection from './sections/HeroSection';
import MainContentSection from './sections/MainContentSection';
import FeatureCardsSection from './sections/FeatureCardsSection';
import useSelectedCollection from '../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useCollectionManager from '../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import { DEFAULT_COLLECTION } from '../context/constants';

const getHomePageSkeletonConfigs = (tiers) => {
  const { theme } = useMode();
  const { tertiaryContent, secondaryContent, mainContentFeatureCard } =
    theme.skeletonLayouts;

  const homePageSkeletonConfigs = [
    {
      ...tertiaryContent,
      skeletons: [...tertiaryContent.baseSkeletons],
    },
    {
      ...secondaryContent,
      skeletons: [secondaryContent.baseSkeleton],
    },
    {
      ...secondaryContent,
      skeletons: [secondaryContent.baseSkeleton], // Assuming similar style for another secondary content
    },
    ...Array.from({ length: tiers.length }, () => ({
      ...mainContentFeatureCard,
      skeletons: [...mainContentFeatureCard.baseSkeletons],
    })),
  ];

  return homePageSkeletonConfigs;
};
const HomePage = () => {
  const { theme } = useMode();
  const { tiers, introText } = pages;
  const { hasFetchedCollections } = useCollectionManager();
  const { allCollections, selectedCollection } = useSelectedCollection();
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
