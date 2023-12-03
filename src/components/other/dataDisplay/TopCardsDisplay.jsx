import React, { useContext, useEffect, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useMode } from '../../../context/hooks/colormode';
import { makeStyles, styled } from '@mui/styles';
import { ModalContext } from '../../../context/ModalContext/ModalContext';
import GenericCard from '../../cards/GenericCard';
import {
  MainContainer2b,
  MainContainerb,
  MainContainer2,
  MainContainer,
} from '../../../pages/pageStyles/StyledComponents';
import { AspectRatio } from '@mui/joy';
import { debounce } from 'lodash';
const useStyles = makeStyles((theme) => ({
  stepper: {
    // backgroundColor: theme.palette.success.main,
    background: theme.palette.background.main,
    border: `1px solid ${theme.palette.background.quaternary}`,
    borderRadius: theme.shape.borderRadiusLarge,
    color: theme.palette.success.light,
    overflow: 'hidden',
    padding: theme.spacing(1),
    height: '100%',
    // marginTop: 'auto',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'center',
  // background: theme.palette.background.main,
  background: theme.palette.background.dark,
  borderRadius: theme.shape.borderRadiusLarge,
  padding: theme.spacing(3),
  color: '#fff', // White text color
  // padding: 2,
  // borderRadius: 4,
}));

const CarouselCard = ({ card }) => {
  const { theme } = useMode();
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);
  const cardRef = useRef(null);
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [chartContainerDimensions, setChartContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const HEIGHT_TO_WIDTH_RATIO = 1;

  const handleClick = () => {
    openModalWithCard(card);
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.offsetWidth;
        const height = width * HEIGHT_TO_WIDTH_RATIO;
        setChartContainerDimensions({ width, height });
        // setChartContainerDimensions({ width, height });
      }
      // }, 100);
    }, 100);

    const handleResize2 = debounce(() => {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth;
        const height = width * HEIGHT_TO_WIDTH_RATIO;
        setChartDimensions({ width, height });
        // setChartContainerDimensions({ width, height });
      }
      // }, 100);
    }, 100);

    window.addEventListener('resize', handleResize);
    handleResize();

    window.addEventListener('resize', handleResize2);
    handleResize2();

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();

      window.removeEventListener('resize', handleResize2);
      handleResize2.cancel();
    };
  }, []);
  return (
    <MainContainer2>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Grid item xs={4} md={4}>
          {/* <Grid item xs={4} md={4}> */}
          <GenericCard
            card={card}
            onClick={() => handleClick()}
            context={'Collection'}
            ref={cardRef}
          />
          {/* </Grid> */}
        </Grid>
        {/* Top section for card details */}
        <Grid
          container
          item
          xs={8}
          md={8}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              padding: theme.spacing(2),
            }}
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: theme.spacing(2),
                  width: '100%',
                  border: `1px solid ${theme.palette.background.quaternary}`,
                  borderRadius: theme.shape.borderRadius,
                }}
              >
                <Typography variant="h6" color={theme.palette.success.main}>
                  {card?.name}
                </Typography>
                <Typography variant="subtitle2" color={'white'}>
                  Price: ${card?.latestPrice?.num || card?.price || 0}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                {card?.desc}
              </Typography> */}
              </Box>
            </Grid>
            {/* Bottom section for chart */}
            <Grid item xs={12}>
              <AspectRatio ratio="1/1">
                <Container
                  ref={chartContainerRef}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    padding: theme.spacing(2),
                    background: theme.palette.background.dark,
                  }}
                >
                  <Box
                    ref={chartRef}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      background: '#111',
                    }}
                  >
                    {/* Chart component goes here */}
                  </Box>
                  {/* </AspectRatio> */}
                </Container>
              </AspectRatio>
            </Grid>
          </Box>
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

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <StyledContainer>
      <Grid item xs={12}>
        <Box
          sx={{
            background: theme.palette.background.dark,
            // margin: '20px',
          }}
        >
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={setActiveStep}
            enableMouseEvents
            style={{
              flexGrow: 1,
              width: '100%', // Use full width of the container
              background: theme.palette.background.dark,
            }}
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
