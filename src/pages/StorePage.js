import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

import StoreSearch from 'layout/store';

import { useMode } from 'context';
import { MDBox, PageLayout } from 'layout/REUSABLE_COMPONENTS';

const StorePage = () => {
  const { theme } = useMode();

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
        <Grid
          item
          xs={12}
          sx={{
            height: {
              xs: '7vh',
              sm: '10vh',
              md: '15vh',
              lg: '20vh',
            },
            width: '100vw',
            top: '70px',
          }}
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
                background: theme.palette.success.main,
                padding: theme.spacing(2), // Adjust padding as needed
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                color={theme.palette.text.primary}
              >
                {'Welcome to Store'}
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.subtitle1.fontSize,
                  color: theme.palette.text.secondary,
                  maxWidth: '54ch',
                }}
              >
                {'Search for cards and add them to your cart.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <StoreSearch />
      </MDBox>
    </PageLayout>
  );
};

export default StorePage;
