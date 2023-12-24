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
import SplashPage3 from './otherPages/SplashPage3';
import SingleCardRowAnimation from '../assets/animations/SingleCardRowAnimation';
import SingleCardAnimation from '../assets/animations/SingleCardAnimation';
import { useCollectionStore } from '../context';

const AnimatedBox = animated(Box);

const HomePage = () => {
  const { theme } = useMode();
  const theme2 = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

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
      splashRef.current.style.position = 'fixed';
      splashRef.current.style.top = '0';
      splashRef.current.style.left = '0';
      splashRef.current.style.width = '100%';
      splashRef.current.style.height = '100%';
      splashRef.current.style.zIndex = '-1';
    }
  }, []);
  const titleStyles = {
    padding: theme.spacing(2), // consistent padding with the theme
    textAlign: 'center',
    color: theme.palette.backgroundD.contrastText,
    background: theme.palette.background.dark,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2),
    // Add more styles as per the theme or design requirements
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div ref={splashRef}>
        {/* <SplashPage2 /> */}
        <SplashPage2 />
      </div>
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
      <SecondaryContentContainer theme={theme}>
        <Typography
          variant={isSmUp ? 'h4' : 'h5'} // Responsive font size
          style={titleStyles}
        >
          Top Performing Cards
        </Typography>
        <SingleCardAnimation card={selectedCollection?.cards[0]} />
        {/* <SingleCardRowAnimation /> This is your animation component */}
      </SecondaryContentContainer>
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
      {isModalOpen && (
        <GenericCardDialog
          open={isModalOpen}
          context={'Home'}
          card={modalContent}
        />
      )}
      {detailsModalShow && <DetailsModal />}
    </React.Fragment>
  );
};

export default HomePage;
