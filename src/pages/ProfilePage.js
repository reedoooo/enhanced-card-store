import React, { useState } from 'react';
import Overview from 'layout/profile/index';
import PageLayout from 'layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import { Grid } from '@mui/material';

// ==============================|| PROFILE PAGE ||============================== //

const ProfilePage = () => {
  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Overview />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default ProfilePage;
