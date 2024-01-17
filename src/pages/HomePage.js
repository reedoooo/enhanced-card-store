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
import {
  ModalContext,
  useModalContext,
} from '../context/ModalContext/ModalContext';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DetailsModal from '../components/dialogs/homeDetailsModal/DetailsModal';
import useResponsiveStyles from '../context/hooks/style-hooks/useResponsiveStyles';
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
import SingleCardAnimation from '../assets/animations/SingleCardAnimation';
import { useCollectionStore, useMode, usePageContext } from '../context';
import CardChart from '../tests/CardChart';
import useCardCronJob from '../tests/useCardCronJob';
import useSkeletonRender from '../context/hooks/useSkeletonRender';

const AnimatedBox = animated(Box);

const HomePage = () => {
  const { theme } = useMode();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const { allCollections } = useCollectionStore();
  const isDataLoaded = allCollections && allCollections.length > 0;

  const initialCardData = isDataLoaded ? allCollections[0].cards[0] : null;
  const { cardData } = useCardCronJob(initialCardData);
  const { loadingStatus } = usePageContext();
  const { isModalOpen, modalContent } = useContext(ModalContext);
  const { selectedCollection } = useCollectionStore();
  const { allFeatureData, showDetailsModal, detailsModalShow } =
    useModalContext();
  const { tiers, introText } = pages;
  const { getTypographyVariant, getIconForTitle } = useResponsiveStyles(theme);
  const homePageSkeletonConfigs = [
    {
      // Tertiary Content Skeletons
      xs: 12,
      sm: 12,
      md: 12,
      gap: 3,
      skeletons: [
        { variant: 'rectangular', height: 60 }, // Main title skeleton
        { variant: 'text', width: '80%' }, // Description text skeletons
        { variant: 'text', width: '70%' },
        { variant: 'text', width: '60%' },
      ],
    },
    {
      // Secondary Content Skeletons
      xs: 12,
      sm: 6,
      md: 6,
      gap: 2,
      skeletons: [
        { variant: 'rectangular', height: 200 }, // Card animation skeleton
      ],
    },
    {
      xs: 12,
      sm: 6,
      md: 6,
      gap: 2,
      skeletons: [
        { variant: 'rectangular', height: 200 }, // Chart component skeleton
      ],
    },
    ...Array.from({ length: tiers.length }, () => ({
      // Main Content Feature Card Skeletons
      xs: 12,
      sm: 12,
      md: 4,
      gap: 2,
      skeletons: [
        { variant: 'rectangular', height: 180 }, // Card image/header skeleton
        { variant: 'text' }, // Text skeletons for card content
        { variant: 'text' },
        { variant: 'text' },
      ],
    })),
  ];
  const Skeletons = useSkeletonRender(homePageSkeletonConfigs);

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
  const renderSplashPage = () => (
    <div ref={splashRef}>
      <SplashPage2 />
    </div>
  );
  // Function to render tertiary content
  const renderTertiaryContent = () => (
    <TertiaryContentContainer
      // ref={splashRef}
      theme={theme}
      style={{ padding: '20px', textAlign: 'center' }}
    >
      <HomePageBox
        theme={theme}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}
      >
        <Typography
          component="h1"
          variant={getTypographyVariant()}
          align="center"
          color="text.primary"
          gutterBottom
          style={{
            fontWeight: 'bold',
            marginBottom: '1rem',
            fontSize: '2.5rem',
            lineHeight: '1.2',
            letterSpacing: 'normal',
          }}
        >
          {introText.mainTitle}
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          style={{
            fontSize: '1.25rem',
            lineHeight: '1.6',
            margin: '0 auto',
            maxWidth: '680px',
            marginTop: '1rem',
          }}
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
          mx: 'auto',
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
          <CardChart
            cardData={isDataLoaded ? allCollections[0]?.cards[0] : null}
          />
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
                    sx={{
                      backgroundColor: theme.palette.backgroundA.dark,
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
                  <CardActions sx={{ alignSelf: 'end' }}>
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
      {loadingStatus?.isPageLoading ? (
        <Skeletons />
      ) : (
        <React.Fragment>
          {/* Main Splash Page */}
          {/* {renderSplashPage()} */}

          {/* Tertiary Content */}
          {renderTertiaryContent()}

          {/* Secondary Content */}
          {renderSecondaryContent()}

          {/* Main Content */}
          {renderMainContent()}

          {/* Dialogs */}
          {renderDialogs()}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomePage;
