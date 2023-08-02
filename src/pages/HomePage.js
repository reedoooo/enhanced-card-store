import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  arrowStyles: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#ccc', // change as needed
    borderRadius: '50%',
  },
  imageStyles: {
    height: '600px',
    width: '100%', // use 100% for responsive design
    objectFit: 'cover', // to maintain aspect ratio
  },
  captionBox: {
    position: 'absolute', // to position it at the bottom of the image
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    color: 'white',
    padding: '1rem',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerBox: {
    backgroundImage: 'linear-gradient(to right, #add8e6, #87ceeb)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem', // spacing around the banner
  },
  carouselContainer: {
    padding: '2rem', // spacing around the carousel container
    backgroundColor: '#fff', // background color for the container
    borderRadius: '2rem', // rounded corners
  },
  welcomeMessage: {
    marginBottom: '2rem', // spacing after the welcome message
    textAlign: 'center', // center aligned text
    color: '#333', // text color
    fontWeight: 'bold', // bold text
  },
});

// Carousel image data
const carouselImages = [
  {
    image: '/yugiohCards.jpg',
    caption: 'Yu-Gi-Oh!',
  },
  {
    image: '/pokemonCard.jpg',
    caption: 'Pokemon',
  },
  {
    image: '/magicCard.jpg',
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

// ... rest of the code

const CarouselImage = ({ image, caption }) => {
  const classes = useStyles();

  return (
    <div>
      <img src={image} alt={caption} className={classes.imageStyles} />
      <Box className={classes.captionBox}>
        <Typography>
          Here we host a platform to buy your favorite trading cards. Have a
          collection that&apos;s missing a particular card? Check out our
          listings to see if you can find it! If you&apos;re looking to sell,
          soon we also have a platform for you to sell your cards to other
          collectors.
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
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && (
          <div onClick={onClickHandler} className={classes.arrowStyles}>
            {'<'} {/* replace with suitable arrow design or icon */}
          </div>
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <div onClick={onClickHandler} className={classes.arrowStyles}>
            {'>'} {/* replace with suitable arrow design or icon */}
          </div>
        )
      }
    >
      {carouselImages.map((item, i) => (
        <CarouselImage key={i} image={item.image} caption={item.caption} />
      ))}
    </Carousel>
  );
};

const Home = () => {
  return (
    <HomeBanner>
      <Container
        sx={{
          padding: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: 10,
        }}
        maxWidth="md"
      >
        <WelcomeMessage />
        <CarouselContainer />
      </Container>
    </HomeBanner>
  );
};

export default Home;
