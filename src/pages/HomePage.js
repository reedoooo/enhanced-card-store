import React, { useContext, useEffect, useRef } from 'react';
import {
  Typography,
  CssBaseline,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Box,
  useMediaQuery,
  Paper,
  Stack,
} from '@mui/material';
import { useMode } from '../context/hooks/colormode';
import {
  ModalContext,
  useModalContext,
} from '../context/ModalContext/ModalContext';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DetailsModal from '../components/dialogs/homeDetailsModal/DetailsModal';
import useResponsiveStyles from '../context/hooks/useResponsiveStyles';
import {
  HomePageBox,
  FeatureCard,
  MainContentContainer,
  TertiaryContentContainer,
  SecondaryContentContainer,
  CardUnorderedList,
  CardListItem,
  ActionButton,
} from './pageStyles/StyledComponents';
import { useSpring, animated } from 'react-spring';

import SplashPage2 from './otherPages/SplashPage2';
import pages from '../assets/pages.json';
import { useTheme } from '@emotion/react';
import SingleCardAnimation from '../assets/animations/SingleCardAnimation';
import { useCollectionStore } from '../context';
import CardChart from '../tests/CardChart';
import useCardCronJob from '../tests/useCardCronJob';
// import initialCardData from '../tests/initialCardData';
import { styled } from '@mui/styles';

const AnimatedBox = animated(Box);

const HomePage = () => {
  const { theme } = useMode();
  const theme2 = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const { allCollections } = useCollectionStore();
  const initialCardData = allCollections[0]?.cards[0];
  const { cardData } = useCardCronJob(initialCardData);

  const { isModalOpen, modalContent } = useContext(ModalContext);
  const { selectedCollection } = useCollectionStore();
  const { allFeatureData, showDetailsModal, detailsModalShow } =
    useModalContext();
  const { tiers, introText } = pages;
  const { getTypographyVariant, getIconForTitle } = useResponsiveStyles(theme);
  const handleOpenModal = (itemTitle) => {
    const selectedItem = allFeatureData.find(
      (item) => item.title === itemTitle
    );
    if (selectedItem) {
      showDetailsModal(selectedItem);
    }
  };
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

  // Function to render the splash page animation
  const renderSplashPage = () => (
    <div ref={splashRef}>
      <SplashPage2 />
    </div>
  );
  // Function to render tertiary content
  const renderTertiaryContent = () => (
    <TertiaryContentContainer theme={theme}>
      <HomePageBox theme={theme}>
        <Typography
          component="h1"
          variant={getTypographyVariant()}
          align="center"
          color="text.primary"
          gutterBottom
        >
          {introText.mainTitle}
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          {introText.description}
        </Typography>
      </HomePageBox>
    </TertiaryContentContainer>
  );
  // Function to render secondary content
  const renderSecondaryContent = () => (
    <SecondaryContentContainer theme={theme}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // width: '100%',
          padding: theme.spacing(2),
          background: theme.palette.backgroundC.dark,
          maxWidth: isLgUp ? '100%' : '100%', // Adjust width based on screen size
        }}
      >
        {isMdUp && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // width: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              padding: theme.spacing(2),
            }}
          >
            {/* <Typography variant={isSmUp ? 'h4' : 'h5'}>
            Top Performing Cards
          </Typography> */}
            <SingleCardAnimation cardImage={cardData?.image} />
          </Box>
        )}

        {/* Chart and Card Components */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: isMdUp ? '50%' : '100%', // Adjust width based on screen size
            maxHeight: '100%',
          }}
        >
          <CardChart cardData={allCollections[0]?.cards[0]} />
        </Box>
      </Paper>
    </SecondaryContentContainer>
  );
  // Function to render main content
  const renderMainContent = () => (
    <MainContentContainer maxWidth="100%" theme={theme}>
      <Grid container spacing={isSmUp ? 5 : 2}>
        {tiers.map((tier, index) => {
          const [tiltAnimation, setTiltAnimation] = useSpring(() => ({
            transform:
              'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
          }));
          const handleMouseEnter = () =>
            setTiltAnimation({
              transform:
                'perspective(600px) rotateX(5deg) rotateY(5deg) scale(1.05)',
            });

          const handleMouseLeave = () =>
            setTiltAnimation({
              transform:
                'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
            });
          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={12}
              md={tier.title === 'Enterprise' ? 12 : 4}
              style={{ display: 'flex' }} // Ensure flex display for grid item
            >
              <AnimatedBox
                style={{ ...tiltAnimation, width: '100%' }} // Stretch to fill grid item
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FeatureCard
                  theme={theme}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    style={{
                      backgroundColor: theme.palette.backgroundD.dark,
                    }} // Apply the background color here
                  />
                  <CardContent style={{ flex: 1 }}>
                    <CardUnorderedList>
                      {tier.description.map((line, index) => (
                        <CardListItem key={index} theme={theme}>
                          {line}
                        </CardListItem>
                      ))}
                    </CardUnorderedList>
                  </CardContent>
                  <CardActions style={{ alignSelf: 'end' }}>
                    <ActionButton
                      fullWidth
                      variant="contained"
                      theme={theme}
                      onClick={() => handleOpenModal(tier.title)}
                    >
                      {tier.buttonText}
                    </ActionButton>
                  </CardActions>
                </FeatureCard>
              </AnimatedBox>
            </Grid>
          );
        })}
      </Grid>
    </MainContentContainer>
  );
  // Function to render dialogs (GenericCardDialog and DetailsModal)
  const renderDialogs = () => {
    return (
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
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Main Splash Page */}
      {renderSplashPage()}

      {/* Tertiary Content */}
      {renderTertiaryContent()}

      {/* Secondary Content */}
      {renderSecondaryContent()}

      {/* Main Content */}
      {renderMainContent()}

      {/* Dialogs */}
      {renderDialogs()}
    </React.Fragment>
  );
};

export default HomePage;
