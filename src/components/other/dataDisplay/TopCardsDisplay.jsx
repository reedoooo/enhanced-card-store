import React, { useContext, useEffect, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useMode } from '../../../context/hooks/colormode';
import { makeStyles } from '@mui/styles';
import { ModalContext } from '../../../context/ModalContext/ModalContext';
import GenericCard from '../../cards/GenericCard';
import {
  MainContainer2b,
  MainContainerb,
  MainContainer2,
  MainContainer,
} from '../../../pages/pageStyles/StyledComponents';
const useStyles = makeStyles((theme) => ({
  stepper: {
    // backgroundColor: theme.palette.success.main,
    background: theme.palette.primary.light,
    color: 'white',
    marginTop: 'auto',
  },
}));

const CarouselCard = ({ card }) => {
  const { theme } = useMode();
  const classes = useStyles();
  const placeholderImage = '../../assets/images/placeholder.jpeg';
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);
  const cardRef = useRef(null);

  const handleClick = () => {
    openModalWithCard(card);
  };
  return (
    <MainContainer2>
      <Grid container>
        <Grid item xs={4} md={4}>
          <GenericCard
            card={card}
            onClick={handleClick}
            context={'Collection'}
            ref={cardRef}
          />
        </Grid>
        <Grid item xs={8} md={8} sx={{ padding: theme.spacing(2) }}>
          <Typography variant="h6" color={theme.palette.success.main}>
            {card?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card?.description}
          </Typography>
          <Typography variant="subtitle2" color={'white'}>
            Price: ${card?.latestPrice?.num ?? 'N/A'}
          </Typography>
          {/* Additional statistics */}
        </Grid>
      </Grid>
    </MainContainer2>
  );
};

const TopCardsDisplay = () => {
  const { theme } = useMode();
  const { selectedCollection } = useCollectionStore();
  const [top5Cards, setTop5Cards] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const sortedCards = selectedCollection?.cards
      ?.map((card) => {
        const latestPrice = card.latestPrice?.num ?? 0;
        const lastSavedPrice = card.lastSavedPrice?.num ?? 0;

        if (
          latestPrice === 0 ||
          latestPrice === undefined ||
          lastSavedPrice === 0 ||
          lastSavedPrice === undefined
        ) {
          console.warn(`Price missing for card: ${card.name}`);
          return { ...card, diff: 0 };
        }

        console.log('latestPrice', latestPrice);
        console.log('lastSavedPrice', lastSavedPrice);
        return { ...card, diff: Math.abs(latestPrice - lastSavedPrice) };
      })
      .sort((a, b) => b.diff - a.diff || b.price - a.price)
      .slice(0, 5);

    console.log('sortedCards', sortedCards);
    setTop5Cards(sortedCards);
  }, [selectedCollection]);

  const maxSteps = top5Cards.length;

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <Box sx={{ margin: '20px' }}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={setActiveStep}
        enableMouseEvents
        style={{
          flexGrow: 1,
          width: '100%', // Use full width of the container
        }}
      >
        {top5Cards.map((card, index) => (
          <MainContainer key={index}>
            <CarouselCard card={card} />
          </MainContainer>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}{' '}
            Next
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}{' '}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default TopCardsDisplay;
