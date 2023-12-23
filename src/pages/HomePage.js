import React, { useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Typography,
  Stack,
  CssBaseline,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Box,
} from '@mui/material';
import { useMode } from '../context/hooks/colormode';
import {
  ModalContext,
  useModalContext,
} from '../context/ModalContext/ModalContext';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import pages from '../assets/pages.json';
import { CarouselImage } from './pageStyles/CarouselImage';
import DetailsModal from '../components/dialogs/homeDetailsModal/DetailsModal';
import useResponsiveStyles from '../context/hooks/useResponsiveStyles';
import {
  HomePageBox,
  CarouselContainer,
  ActionButton,
  FeatureCard,
  MainContentContainer,
  TertiaryContentContainer,
  SecondaryContentContainer,
  CardListItem,
  CardUnorderedList,
} from './pageStyles/StyledComponents';

const HomePage = () => {
  const { theme } = useMode();
  const { isModalOpen, modalContent } = useContext(ModalContext);
  const { allFeatureData, showDetailsModal, detailsModalShow } =
    useModalContext();
  const { carouselImages, tiers, introText } = pages;
  const { getTypographyVariant, getIconForTitle } = useResponsiveStyles(theme);

  const handleOpenModal = (itemTitle) => {
    const selectedItem = allFeatureData.find(
      (item) => item.title === itemTitle
    );
    if (selectedItem) {
      showDetailsModal(selectedItem);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
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
        <CarouselContainer theme={theme}>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
          >
            {carouselImages?.map(({ image, caption }, index) => (
              <CarouselImage key={index} image={image} caption={caption} />
            ))}
          </Carousel>
        </CarouselContainer>
      </SecondaryContentContainer>

      <React.Fragment>
        <MainContentContainer maxWidth="100%" theme={theme}>
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={6}
                md={tier.title === 'Enterprise' ? 12 : 4}
              >
                <FeatureCard theme={theme}>
                  <CardHeader
                    theme={theme}
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={getIconForTitle(tier.title)}
                    subheaderTypographyProps={{ align: 'center' }}
                  />
                  <CardContent>
                    <CardUnorderedList>
                      {tier.description.map((line, index) => (
                        <CardListItem key={index}>
                          {line} {/* Directly using line as content */}
                        </CardListItem>
                      ))}
                    </CardUnorderedList>
                  </CardContent>
                  <CardActions>
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
              </Grid>
            ))}
          </Grid>
        </MainContentContainer>
      </React.Fragment>
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
