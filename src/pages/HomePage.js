import React from 'react';
import { Grid } from '@mui/material';
import PageLayout from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/PageLayout';
import HeroSection from 'layout/home';
import FeatureCardsSection from 'layout/home/FeatureCardsSection';
import { HelmetMetaData } from 'data';

// ==============================|| HOME PAGE ||============================== //

const HomePage = () => {
  return (
    <>
      <HelmetMetaData
        title="Home | Enhanced Cardstore"
        description="Explore our vast collection of cards."
        image="https://example.com/default-og-image.jpg"
        url="https://enhanced-cardstore.netlify.app/home"
      />
      <PageLayout>
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
    </>
  );
};

export default HomePage;
