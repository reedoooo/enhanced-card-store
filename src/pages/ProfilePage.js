import React from 'react';
import { Grid } from '@mui/material';

import { HelmetMetaData } from 'data';

import Overview from 'layout/profile/index';

import { PageLayout } from 'layout/REUSABLE_COMPONENTS';

// ==============================|| PROFILE PAGE ||============================== //

const ProfilePage = () => {
  return (
    <>
      <HelmetMetaData
        title="Profile | Enhanced Cardstore"
        description="Explore our vast collection of cards."
        image="https://example.com/default-og-image.jpg"
        url="https://enhanced-cardstore.netlify.app/profile"
      />
      <PageLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Overview />
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
};

export default ProfilePage;
