import React, { useEffect, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  Box,
  Button,
  Container,
  Grid,
  MobileStepper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { styled } from 'styled-components';

import { MainContainer } from '../../../pages/pageStyles/StyledComponents';
import CarouselCard from '../../cards/CarouselCard';
import LoadingIndicator from '../../reusable/indicators/LoadingIndicator';
import { useMode } from '../../../context';

const StyledStepper = styled(MobileStepper)(({ theme }) => ({
  background: theme.palette.backgroundB.dark,
  border: `1px solid ${theme.palette.backgroundB.lighter}`,
  borderRadius: theme.shape.borderRadiusLarge,
  color: theme.palette.backgroundA.light,
  overflow: 'hidden',
  padding: theme.spacing(1),
  height: '100%',
  '@media (max-width: 600px)': {
    width: '100%', // Full width on mobile screens
    padding: theme.spacing(0.5), // Reduced padding on mobile
  },
}));

const StyledCardDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledSwipeableView = styled(SwipeableViews)(({ theme }) => ({
  '@media (max-width: 600px)': {
    width: '100%', // Full width on mobile screens
    overflow: 'hidden', // Hide overflow on mobile
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'center',
  background: theme.palette.backgroundB.darker,
  borderRadius: theme.shape.borderRadiusLarge,
  padding: theme.spacing(3),
  color: '#fff',
  '@media (max-width: 600px)': {
    padding: theme.spacing(1), // Reduced padding on mobile
  },
}));

const TopCardsDisplay = () => {
  const { theme } = useMode();
  const theme2 = useTheme();
  const { selectedCollection } = useCollectionStore();
  const [top5Cards, setTop5Cards] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            background: theme.palette.backgroundB.darker,
          }}
        >
          <StyledSwipeableView
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={setActiveStep}
            enableMouseEvents
          >
            {top5Cards?.map((card, index) => (
              <MainContainer key={index}>
                <CarouselCard card={card} />
              </MainContainer>
            ))}
          </StyledSwipeableView>
          <StyledStepper
            steps={maxSteps}
            theme={theme}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{
                  color: theme.palette.backgroundA.light,
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
                  color: theme.palette.backgroundA.light,
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
