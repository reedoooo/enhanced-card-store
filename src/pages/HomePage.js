import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Typography, Box } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  arrowStyles: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: '50%',
  },
  imageStyles: {
    height: '600px',
    width: '100%',
    objectFit: 'cover',
  },
  captionBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  bannerBox: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    minHeight: '100vh',
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
  },
  welcomeMessage: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
}));

const carouselImages = [
  { image: '/images/yugioh.jpeg', caption: 'Yu-Gi-Oh!' },
  { image: '/images/pokemon.jpeg', caption: 'Pokemon' },
  {
    image: '/images/magic-the-gathering.jpeg',
    caption: 'Magic: The Gathering',
  },
];

const HomeBanner = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.bannerBox}>{children}</Box>;
};

const WelcomeMessage = () => {
  const classes = useStyles();
  return (
    <Typography variant="h2" className={classes.welcomeMessage}>
      Welcome to Mythical Card-Mart!
    </Typography>
  );
};

const CarouselImage = ({ image, caption }) => {
  const classes = useStyles();
  return (
    <div>
      <img src={image} alt={caption} className={classes.imageStyles} />
      <Box className={classes.captionBox}>
        <Typography variant="body1">
          Browse and shop for your favorite trading cards. Whether buying or
          selling, we&apos;ve got something for every collector!
        </Typography>
      </Box>
    </div>
  );
};

const CarouselContainer = () => {
  const classes = useStyles();

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay
      className={classes.carouselContainer}
    >
      {carouselImages.map(({ image, caption }, index) => (
        <CarouselImage key={index} image={image} caption={caption} />
      ))}
    </Carousel>
  );
};

const HomePage = () => {
  const theme = useTheme();

  return (
    <HomeBanner>
      <Container
        sx={{
          padding: theme.spacing(3),
          borderRadius: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[10],
        }}
        maxWidth="md"
      >
        <WelcomeMessage />
        <CarouselContainer />
      </Container>
    </HomeBanner>
  );
};

export default HomePage;
