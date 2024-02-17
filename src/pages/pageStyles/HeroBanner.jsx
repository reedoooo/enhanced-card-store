// In a file like src/components/HeroBanner.js
import React from 'react';
import { Box, Grid } from '@mui/material';
import HeroCenter from './/HeroCenter';

const heroBannerHeight = {
  xs: '7vh',
  sm: '10vh',
  md: '15vh',
  lg: '20vh',
};

const HeroBanner = ({ title, subtitle }) => (
  <Grid
    item
    xs={12}
    sx={{ height: heroBannerHeight, width: '100vw', top: '70px' }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        margin: 'auto',
        flexGrow: 1,
      }}
    >
      <HeroCenter title={title} subtitle={subtitle} />
    </Box>
  </Grid>
);

export default HeroBanner;
