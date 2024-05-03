import React from 'react';
import { Grid } from '@mui/material';
import PageLayout from 'layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
// import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import HeroSection from '../layout/home/HeroSection';
import FeatureCardsSection from '../layout/home/FeatureCardsSection';

// ==============================|| HOME PAGE ||============================== //

const HomePage = () => {
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
      </Grid>
    </PageLayout>
  );
};

export default HomePage;
