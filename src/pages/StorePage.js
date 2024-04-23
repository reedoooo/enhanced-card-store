import React, { useEffect, useRef, useState } from 'react';
import GenericCardDialog from '../components/dialogs/GenericCardDialog';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import StoreSearch from '../layout/store';
import { Grid, Typography, Box } from '@mui/material';
import { useMode } from '../context';
import useDialogState from '../context/hooks/useDialogState';

const heroBannerHeight = {
  xs: '7vh',
  sm: '10vh',
  md: '15vh',
  lg: '20vh',
};
const HeroBanner = ({ title, subtitle }) => {
  const { theme } = useMode();
  return (
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            justifyContent: 'space-around', // Distributes space evenly
            alignItems: 'center',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            background: theme.palette.greenAccent.lighterSeaGreen,
            padding: theme.spacing(2), // Adjust padding as needed
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            color={theme.palette.text.primary}
            // sx={{
            //   fontSize: {
            //     xs: theme2.typography.h4.fontSize, // smaller screens
            //     sm: theme2.typography.h3.fontSize, // medium screens
            //     md: theme2.typography.h2.fontSize, // larger screens
            //     lg: theme2.typography.h1.fontSize, // extra large screens
            //   },
            //   fontWeight: theme2.typography.fontWeightBold,
            //   color: theme.palette.text.primary,
            // }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.subtitle1.fontSize,
              color: theme.palette.text.secondary,
              maxWidth: '54ch',
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const StorePage = () => {
  const { closeDialog, dialogState, data, cardDialogState, open } =
    useDialogState();
  // useEffect(() => {
  //   console.log(cardDialogState);
  // }, []);
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
        <HeroBanner
          title="Welcome to Store"
          subtitle="Search for cards and add them to your cart."
        />
        <StoreSearch />
        {/* {dialogState.isCardDialogOpen && (
          <GenericCardDialog
            open={dialogState.isCardDialogOpen}
            context={'Cart'}
            card={data}
            onClose={() => closeDialog('isCardDialogOpen')}
          />
        )} */}
      </MDBox>
    </PageLayout>
  );
};

export default StorePage;
