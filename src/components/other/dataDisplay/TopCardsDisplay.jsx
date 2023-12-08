import React, { useEffect, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Box, Button, Container, Grid, MobileStepper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useMode } from '../../../context/hooks/colormode';
import { makeStyles, styled } from '@mui/styles';
import { MainContainer } from '../../../pages/pageStyles/StyledComponents';
import CarouselCard from '../../cards/CarouselCard';
import LoadingIndicator from '../../reusable/indicators/LoadingIndicator';
const useStyles = makeStyles((theme) => ({
  stepper: {
    background: theme.palette.background.main,
    border: `1px solid ${theme.palette.background.quaternary}`,
    borderRadius: theme.shape.borderRadiusLarge,
    color: theme.palette.success.light,
    overflow: 'hidden',
    padding: theme.spacing(1),
    height: '100%',
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'center',
  background: theme.palette.background.dark,
  borderRadius: theme.shape.borderRadiusLarge,
  padding: theme.spacing(3),
  color: '#fff',
}));

const TopCardsDisplay = () => {
  const { theme } = useMode();
  const { selectedCollection } = useCollectionStore();
  const [top5Cards, setTop5Cards] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const sortedCards = selectedCollection?.cards
      ?.map((card) => {
        const latestPrice = card?.latestPrice?.num ?? 0;
        const lastSavedPrice = card?.lastSavedPrice?.num ?? 0;
        if (latestPrice === undefined) {
          console.warn(`Price missing for card: ${card.name}`);
          return { ...card, diff: 0 };
        }
        return { ...card, diff: Math.abs(latestPrice - lastSavedPrice) };
      })
      .sort((a, b) => b.diff - a.diff || b.price - a.price)
      .slice(0, 5);
    setTop5Cards(sortedCards);
  }, [selectedCollection]);

  const maxSteps = top5Cards?.length;
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  if (!selectedCollection) {
    return (
      <StyledContainer>
        <LoadingIndicator />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Grid item xs={12}>
        <Box
          sx={{
            background: theme.palette.background.dark,
          }}
        >
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={setActiveStep}
            enableMouseEvents
            className={classes.swipeableView}
          >
            {top5Cards?.map((card, index) => (
              <MainContainer key={index}>
                <CarouselCard card={card} />
              </MainContainer>
            ))}
          </SwipeableViews>
          <MobileStepper
            steps={maxSteps}
            theme={theme}
            position="static"
            activeStep={activeStep}
            className={classes.stepper}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{
                  color: theme.palette.success.main,
                  // backGround: theme.palette.success.main,
                }}
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
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  color: theme.palette.success.main,
                  '&.Mui-disabled': {
                    // background: theme.palette.background.disabled,
                    color: theme.palette.background.disabled,
                  },
                }}
              >
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
      </Grid>
    </StyledContainer>
  );
};

export default TopCardsDisplay;
