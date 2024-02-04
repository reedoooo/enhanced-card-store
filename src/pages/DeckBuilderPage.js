import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useModalContext } from '../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import { usePageContext } from '../context/UTILITIES_CONTEXT/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DeckSearch from '../components/other/search/DeckSearch';
import DeckDisplay from '../layout/deck/DeckDisplay';
import { useMode } from '../context';
import DeckBuilder from '../layout/deck';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';

const DeckBuilderPage = () => {
  const { theme } = useMode();
  const heroBannerHeight = {
    xs: '10vh', // 10% for extra-small screens
    sm: '15vh', // 20% for small screens and up
    md: '20vh', // 25% for medium screens and up
    lg: '25vh', // 30% for large screens and up
  };
  // const deckBuilderHeight = {
  //   xs: '90vh', // 90% for mobile screens
  //   sm: '85vh', // 80% for small screens and up
  //   md: '80vh', // 75% for medium screens and up
  //   lg: '75vh', // 70% for large screens and up
  // };
  const { loadingStatus, returnDisplay, setIsPageLoading } = usePageContext();
  const { isModalOpen, modalContent } = useModalContext();
  return (
    <MDBox
      sx={{
        top: 0,
        left: -20,
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Grid container sx={{ height: '100vh', width: '100vw', p: 0 }}>
        {loadingStatus?.isPageLoading && returnDisplay()}
        <Grid
          item
          xs={12}
          sx={{
            height: heroBannerHeight,
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
            <HeroCenter
              title="Welcome to Deck Builder"
              subtitle="Craft, refine, and explore your deck strategies in one place."
            />
          </Box>
        </Grid>
        <DeckBuilder />
        {isModalOpen && (
          <GenericCardDialog
            open={isModalOpen}
            context={'Deck'}
            card={modalContent}
          />
        )}
      </Grid>
    </MDBox>
  );
};

export default DeckBuilderPage;
