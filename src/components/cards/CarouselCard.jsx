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
import { ModalContext } from '../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import GenericCard from './GenericCard';
import {
  MainContainer2,
  CardMobile,
  ChartContainerMobile,
  CardDetails,
  CardDetailsContainer,
  ChartContainer,
} from '../../pages/pageStyles/StyledComponents';
import { AspectRatio } from '@mui/joy';
import { debounce } from 'lodash';
import { useMode } from '../../context';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
const CarouselCard = ({ card }) => {
  const { theme } = useMode();
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
      {/* <Box sx={{ width: '100%', overflow: 'hidden' }}> */}{' '}
      {/* Ensure the container doesn't overflow */}
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          // md={4}
          // lg={4}
          zeroMinWidth
          sx={{
            flexGrow: '1',
            maxHeight: '90%',
            minHeight: '90%',
            // width: 'auto',
            // height: '100%',
          }}
        >
          <Container
            sx={{
              '&.MuiContainer-root': {
                padding: '0 !important',
                margin: '0',
                width: '100%',
                height: '100%',
                flexGrow: '1',
                display: 'flex',
              },
            }}
          >
            <GenericCard
              card={card}
              // onClick={() => handleClick()}
              context={'Collection'}
              ref={cardRef}
            />
          </Container>
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
          <ChartContainerMobile>
            <Grid item xs={12}>
              <CardDetails>
                <Typography variant="h6" color={theme.palette.backgroundA.dark}>
                  {card?.name}
                </Typography>
              </CardDetails>

              <CardDetails>
                <MDTypography variant="subtitle2" color={'white'}>
                  Price: ${card?.latestPrice?.num || card?.price || 0}
                </MDTypography>
                <MDTypography variant="subtitle2" color={'white'}>
                  Quantity: {card?.quantity}
                </MDTypography>
                {/* </Box> */}
              </CardDetails>
            </Grid>

            {/* Bottom section for chart */}
            <Grid item xs={12}>
              <AspectRatio ratio="1/1">
                <ChartContainer ref={chartRef}>
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
                </ChartContainer>
              </AspectRatio>
            </Grid>
          </ChartContainerMobile>
        </Grid>
      </Grid>
      {/* </Box> */}
    </MainContainer2>
  );
};

export default CarouselCard;
