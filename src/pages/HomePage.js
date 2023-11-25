import React, { useContext, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  CssBaseline,
  CardActions,
  CardContent,
  CardHeader,
  Card,
  Grid,
  Paper,
} from '@mui/material';
import { useMode } from '../context/hooks/colormode';
import useStyles from './pageStyles/styles';
import DeckOfCardsIcon from '../components/reusable/icons/DeckOfCardsIcon';
import { ModalContext } from '../context/ModalContext/ModalContext';
import GenericCardModal from '../components/modals/cardModal/GenericCardModal';
import {
  TertiaryContainer,
  SecondaryContainer,
} from './pageStyles/StyledComponents';
// import LoadingIndicator2 from '../components/reusable/indicators/LoadingIndicator2';
// import LoadingCardAnimation from '../assets/animations/LoadingCardAnimation';
import pages from './pages.json';
import MoneyIcon from '../components/reusable/icons/MoneyIcon';
import ChartsIcon from '../components/reusable/icons/ChartsIcon';
const CarouselImage = ({ image, caption }) => {
  return (
    <div>
      <img
        src={image}
        alt={caption}
        style={{ height: '600px', width: '100%', objectFit: 'cover' }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          // backgroundColor: (theme) => theme.palette.secondary.main,
          color: (theme) =>
            theme.palette.secondary.contrastText || 'common.white',
          width: '100%',
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          Browse and shop for your favorite trading cards. Whether buying or
          selling, we&apos;ve got something for every collector!
        </Typography>
      </Box>
    </div>
  );
};

const HomePage = () => {
  // const theme = useTheme();
  const { theme, setMode } = useMode();
  const classes = useStyles(theme);
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);
  const { initialState, carouselImages, tiers } = pages;
  const getIconForTitle = (title) => {
    switch (title) {
      case 'Deck Builder':
        return <DeckOfCardsIcon />;
      case 'Collection Tracker':
        return <MoneyIcon />;
      case 'Store':
        return <ChartsIcon />;
      default:
        return null;
    }
  };
  return (
    // <HomeBanner>
    <React.Fragment>
      <CssBaseline />
      <TertiaryContainer>
        <Box
          sx={{
            // background: (theme) =>
            //   `linear-gradient(to right, ${theme.palette.success.light}, ${theme.palette.success.dark})`,
            background: theme.palette.primary.light,
            p: 8,
            m: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Enhanced Cardstore
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            The purpose of this site is to provide an enhanced user experience
            for competitive and novice card collectors alike. We provide an
            advanced collection tracker and deck builder which allows users to
            build decks and track the prices of the cards they need so they can
            make the best financial decisions when buying and selling cards.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
          {/* </Container> */}
        </Box>
        <SecondaryContainer>
          <Paper className={classes.secondaryPaperContainer}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              autoPlay
              // className={classes.carouselContainer}
            >
              {carouselImages.map(({ image, caption }, index) => (
                <CarouselImage
                  key={index}
                  image={image}
                  caption={caption}
                  classes={classes}
                />
              ))}
            </Carousel>
          </Paper>
        </SecondaryContainer>
      </TertiaryContainer>

      <Container
        maxWidth="100%"
        component="main"
        sx={{
          padding: 6,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[10],
        }}
      >
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                  background: theme.palette.success.light,
                }}
              >
                {' '}
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={getIconForTitle(tier.title)}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    background: theme.palette.success.main,
                    // backgroundColor: (theme) =>
                    //   theme.palette.mode === 'light'
                    //     ? theme.palette.grey[200]
                    //     : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  ></Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={'contained'}
                    sx={{ background: theme.palette.success.main }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {isModalOpen && (
        <GenericCardModal
          open={isModalOpen}
          closeModal={closeModal}
          card={modalContent}
          // context and other props if necessary
        />
      )}
    </React.Fragment>
    // </HomeBanner>
  );
};

export default HomePage;
