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
  TextareaAutosize,
  Skeleton,
  Card,
  Avatar,
  Button,
} from '@mui/material';
import {
  ModalContext,
  useModalContext,
} from '../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import DetailsModal from '../components/dialogs/homeDetailsModal/DetailsModal';
// import useResponsiveStyles from '../context/hooks/style-hooks/useResponsiveStyles';
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
import pages from '../assets/data/pages.json';
import SingleCardAnimation from '../assets/animations/SingleCardAnimation';
import {
  useAuthContext,
  useCollectionStore,
  useMode,
  usePageContext,
  useUserContext,
} from '../context';
import CardChart from '../tests/CardChart';
import useCardCronJob from '../tests/useCardCronJob';
import useSkeletonRender from '../context/hooks/useSkeletonRender';
import { AnimatedFeatureCard } from '../components/cards/AnimatedFeatureCard';
import MDAvatar from '../layout/REUSABLE_COMPONENTS/MDAVATAR';
import placeHolder from '../assets/images/placeholder.jpeg';
const getHomePageSkeletonConfigs = (tiers) => {
  const { theme } = useMode();
  const { tertiaryContent, secondaryContent, mainContentFeatureCard } =
    theme.skeletonLayouts;

  const homePageSkeletonConfigs = [
    {
      ...tertiaryContent,
      skeletons: [...tertiaryContent.baseSkeletons],
    },
    {
      ...secondaryContent,
      skeletons: [secondaryContent.baseSkeleton],
    },
    {
      ...secondaryContent,
      skeletons: [secondaryContent.baseSkeleton], // Assuming similar style for another secondary content
    },
    ...Array.from({ length: tiers.length }, () => ({
      ...mainContentFeatureCard,
      skeletons: [...mainContentFeatureCard.baseSkeletons],
    })),
  ];

  return homePageSkeletonConfigs;
};
// Helper functions to centralize repeated logic
const getTypographyProps = (variant, theme, breakpoints) => ({
  component: variant,
  variant: theme.responsiveStyles.getTypographyVariant(breakpoints),
  align: 'center',
  color: 'text.primary',
  gutterBottom: true,
  sx: {
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontSize: '2.5rem',
    lineHeight: '1.2',
    letterSpacing: 'normal',
  },
});
const getGridItemProps = (title) => ({
  xs: 12,
  sm: 12,
  md: title === 'Enterprise' ? 12 : 4,
  style: { display: 'flex' },
});
const HomePage = () => {
  const { theme } = useMode();
  const breakpoints = theme.breakpoints;
  const isSmUp = useMediaQuery(breakpoints.up('sm'));
  const isMdUp = useMediaQuery(breakpoints.up('md'));
  const isLgUp = useMediaQuery(breakpoints.up('lg'));
  const { homeCardStyles, homeTypographyStyles } = theme.pageStyles;
  const { authUser, basicData } = useAuthContext();
  const { user } = useUserContext();
  const { allCollections, selectedCollection } = useCollectionStore();
  const isDataLoaded = allCollections && allCollections.length > 0;
  const { tiers, introText } = pages;

  const initialCardData = isDataLoaded ? allCollections[0].cards[0] : null;
  const { cardData } = useCardCronJob(initialCardData);
  const { loadingStatus } = usePageContext();
  const {
    allFeatureData,
    showDetailsModal,
    detailsModalShow,
    isModalOpen,
    modalContent,
  } = useModalContext();
  const homePageSkeletonConfigs = getHomePageSkeletonConfigs(tiers);
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
  const renderDialogs = () => (
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
  const renderStatItem = (label, value) => (
    <Typography variant="body1" component="div">
      <strong>{label}:</strong> {value}
    </Typography>
  );
  return (
    <CssBaseline>
      {loadingStatus?.isPageLoading ? (
        <Skeleton>
          <Skeleton variant="rectangular" width="100%" height="100vh" />
        </Skeleton>
      ) : (
        <>
          {renderSplashPage()}
          <TertiaryContentContainer
            theme={theme}
            sx={{ padding: '20px', textAlign: 'center' }}
          >
            <HomePageBox
              theme={theme}
              sx={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}
            >
              <Typography
                {...getTypographyProps('h1', theme, breakpoints)}
                sx={theme.pageStyles.homeTypographyStyles}
              >
                {introText.mainTitle}
              </Typography>
              <Typography variant="h6" paragraph>
                {introText.description}
              </Typography>
            </HomePageBox>
          </TertiaryContentContainer>{' '}
          <SecondaryContentContainer theme={theme}>
            <Paper sx={theme.pageStyles.homePaperStyles}>
              <Stack direction={isMdUp ? 'row' : 'column'} spacing={2}>
                {isMdUp && (
                  <Box sx={theme.pageStyles.homeCardAnimationBoxStyles}>
                    <SingleCardAnimation cardImage={cardData?.image} />
                  </Box>
                )}

                {/* Chart and Card Components */}
                <Box sx={theme.pageStyles.homeCardChartBoxStyles}>
                  <CardChart cardData={cardData} />
                </Box>
              </Stack>
            </Paper>
            {authUser && (
              <Paper sx={theme.pageStyles.homePaperStyles}>
                <Card>
                  <CardHeader
                    title="User Account"
                    subheader={`Welcome back, ${basicData.firstName}!`}
                    avatar={
                      <MDAvatar src={placeHolder} size="xs" alt={'alt-desc'} />
                    }
                  />
                  <CardContent>
                    <Stack direction={isMdUp ? 'row' : 'column'} spacing={2}>
                      {renderStatItem(
                        'Total Value of Collections',
                        selectedCollection?.totalPrice
                      )}
                      {renderStatItem(
                        'Number of Decks',
                        user?.allDecks?.length
                      )}
                      {renderStatItem(
                        'Number of Collections',
                        allCollections?.length
                      )}
                      {renderStatItem(
                        'Total Cards Purchased',
                        user?.allCollections?.reduce(
                          (acc, collection) => acc + collection.cards.length,
                          0
                        )
                      )}
                      {/* Add more stats as needed */}
                    </Stack>
                  </CardContent>
                  <CardActions
                    background={theme.palette.backgroundE.light}
                    sx={{
                      justifyContent: 'space-between',
                      padding: theme.spacing(2),
                    }}
                  >
                    <Button
                      variant="contained"
                      background={theme.palette.backgroundE.light}
                      color="primary"
                      // color={theme.palette.backgroundA.darker}
                    >
                      Manage Collections
                    </Button>
                    <Button
                      variant="outlined"
                      // color={theme.palette.backgroundA.darker}
                    >
                      View Purchase History
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            )}
          </SecondaryContentContainer>
          <MainContentContainer maxWidth="100%" theme={theme}>
            <Grid
              container
              spacing={isSmUp ? 5 : 2}
              sx={
                {
                  // m: 0,
                  // mt: 2,
                }
              }
            >
              {tiers.map((tier, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={12}
                  md={4}
                  // md={tier.title === 'Store' ? 12 : 4}
                  style={{ display: 'flex', flexGrow: 1 }} // Ensure flex display for grid item
                >
                  <AnimatedFeatureCard
                    tier={tier}
                    onOpenModal={handleOpenModal}
                    theme={theme}
                  />
                </Grid>
              ))}
            </Grid>
          </MainContentContainer>{' '}
          {renderDialogs()}
        </>
      )}
    </CssBaseline>
  );
};

export default HomePage;
