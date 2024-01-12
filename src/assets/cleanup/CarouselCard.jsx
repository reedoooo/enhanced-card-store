import React, { useContext, useEffect, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  Box,
  Button,
  Container,
  Grid,
  MobileStepper,
  Typography,
} from '@mui/material';
import { useMode } from '../../context/hooks/colormode';
import { makeStyles, styled } from '@mui/styles';
import { ModalContext } from '../../context/ModalContext/ModalContext';
import GenericCard from '../../components/cards/GenericCard';
import {
  MainContainer2,
  MainContainer,
} from '../../pages/pageStyles/StyledComponents';
import { AspectRatio } from '@mui/joy';
import { debounce } from 'lodash';
const useStyles = makeStyles((theme) => ({
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMobile: {
    '@media (max-width: 600px)': {
      width: '100%', // Full width on mobile screens
    },
  },
  // Styles for the chart container on mobile
  chartContainerMobile: {
    '@media (max-width: 600px)': {
      width: '100%', // Full width on mobile screens
      padding: theme.spacing(1), // Reduced padding on mobile
    },
  },
}));

const CarouselCard = ({ card }) => {
  const { theme } = useMode();
  const classes = useStyles();
  const { openModalWithCard } = useContext(ModalContext); // Assuming ModalContext is imported
  const cardRef = useRef(null);
  const chartRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const HEIGHT_TO_WIDTH_RATIO = 1; // Define the ratio here

  const handleClick = () => {
    openModalWithCard(card);
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth;
        const height = width * HEIGHT_TO_WIDTH_RATIO;
        setChartDimensions({ width, height });
      }
    }, 100);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
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
        <Grid item xs={12} sm={4} className={classes.cardMobile}>
          <GenericCard
            card={card}
            onClick={() => handleClick()}
            context={'Collection'}
            ref={cardRef}
          />
        </Grid>
        {/* Top section for card details */}
        <Grid
          item
          xs={12}
          sm={8}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box
            className={classes.chartContainerMobile}
            // sx={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   width: '100%',
            //   height: '100%',
            //   padding: theme.spacing(2),
            // }}
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
                {/* <CardDetailsContainer
                  card={card}
                  className={classes.cardDetails}
                /> */}
                {/* <Typography variant="subtitle2" color={'white'}>
                  Price: ${card?.latestPrice?.num || card?.price || 0}
                </Typography>
                <Typography variant="subtitle2" color={'white'}>
                  Quantity: {card?.quantity}
                </Typography> */}
              </Box>
              <Box
                sx={{
                  padding: theme.spacing(2),
                  width: '100%',
                  border: `1px solid ${theme.palette.background.quaternary}`,
                  borderRadius: theme.shape.borderRadius,
                }}
              >
                {/* <CardDetailsContainer
                  card={card}
                  className={classes.cardDetails}
                /> */}
                <Typography variant="subtitle2" color={'white'}>
                  Price: ${card?.latestPrice?.num || card?.price || 0}
                </Typography>
                <Typography variant="subtitle2" color={'white'}>
                  Quantity: {card?.quantity}
                </Typography>
              </Box>
            </Grid>

            {/* Bottom section for chart */}
            <Grid item xs={12}>
              <AspectRatio ratio="1/1">
                <Container
                  ref={chartRef}
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
                </Container>
              </AspectRatio>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MainContainer2>
  );
};

export default CarouselCard;
