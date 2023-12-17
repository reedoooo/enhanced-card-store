import React, { useContext } from 'react';
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
  useMediaQuery,
} from '@mui/material';
import { useMode } from '../context/hooks/colormode';
import useStyles from './pageStyles/styles';
import DeckOfCardsIcon from '../components/reusable/icons/DeckOfCardsIcon';
import MoneyIcon from '../components/reusable/icons/MoneyIcon';
import ChartsIcon from '../components/reusable/icons/ChartsIcon';
import { ModalContext } from '../context/ModalContext/ModalContext';
import GenericCardModal from '../components/modals/cardModal/GenericCardModal';
import {
  TertiaryContainer,
  SecondaryContainer,
} from './pageStyles/StyledComponents';
import pages from '../assets/pages.json';
import { CarouselImage } from './pageStyles/CarouselImage';

const HomePage = () => {
  const { theme } = useMode();
  const classes = useStyles(theme);
  const { closeModal, isModalOpen, modalContent } = useContext(ModalContext);
  const { carouselImages, tiers, introText } = pages;
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  const getTypographyVariant = () => {
    if (isXSmall) return 'h4';
    if (isSmall) return 'h3';
    if (isMedium) return 'h2';
    return 'h2';
  };
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
    <React.Fragment>
      <CssBaseline />
      <TertiaryContainer>
        <Box
          sx={{
            background: theme.palette.primary.light,
            p: { xs: 2, sm: 4, md: 8 },
            m: { xs: 1, sm: 2, md: 4 },
            borderRadius: 2,
          }}
        >
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
        </Box>
        <SecondaryContainer>
          <Paper className={classes.secondaryPaperContainer}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              autoPlay
            >
              {carouselImages?.map(({ image, caption }, index) => (
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
          padding: { xs: 2, sm: 4, md: 6 },
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
              sm={6}
              md={tier.title === 'Enterprise' ? 12 : 4}
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
                    variant="contained"
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
        />
      )}
    </React.Fragment>
  );
};

export default HomePage;
