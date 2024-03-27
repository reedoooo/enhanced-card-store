import React, { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary, useMode, useStatisticsStore } from '../../context';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import placeHolder from '../../assets/images/placeholder.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from 'swiper/modules';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { HeroSectionSkeleton } from '../../layout/REUSABLE_COMPONENTS/SkeletonVariants';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Zoom,
  useMediaQuery,
} from '@mui/material';
import pages from '../../data/pages.json';
import HeroTextSection from './HeroTextSection';
import HeroIconSection from './HeroIconSection';
import HeroSwiper from './HeroSwiper';
import FlexBetween from '../REUSABLE_COMPONENTS/FlexBetween';
import RCHeader from '../REUSABLE_COMPONENTS/RCHeader';
import styled from 'styled-components';
import { ChartArea } from '../../pages/pageStyles/StyledComponents';
import { useCardStoreHook } from '../../context/hooks/useCardStore';
import useLocalStorage from '../../context/hooks/useLocalStorage';
import { AspectRatio } from '@mui/joy';
import { useLoading } from '../../context/hooks/useLoading';
import useSkeletonLoader from '../collection/collectionGrids/cards-datatable/useSkeletonLoader';
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from 'recharts';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import BoxHeader from '../REUSABLE_COMPONENTS/BoxHeader';

const HeroSection = () => {
  const { theme } = useMode();
  const { breakpoints } = theme;
  const { introText } = pages;
  const { fetchRandomCardsAndSet } = useCardStoreHook();
  const [randomCards, setRandomCards] = useLocalStorage('randomCards', []);
  const isMobileView = useMediaQuery(breakpoints.down('sm'));
  const isMidView = useMediaQuery(breakpoints.down('md'));
  const isFullView = useMediaQuery(breakpoints.up('lg'));
  const { isLoading } = useLoading();
  const { SkeletonLoader } = useSkeletonLoader();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);
  const defaultCards = new Array(45).fill({}).map((_, index) => ({
    id: `default-${index}`,
    name: `Placeholder ${index + 1}`,
    description: `Description for Placeholder ${index + 1}`,
    image: placeHolder,
  }));
  const cards = [...randomCards, ...defaultCards];
  // const swiperConfig = {
  //   effect: 'coverflow',
  //   grabCursor: true,
  //   centeredSlides: true,
  //   loop: true,
  //   resizeObserver: true,
  //   spaceBetween: 10,
  //   coverflowEffect: {
  //     stretch: 0,
  //     modifier: 1,
  //     rotate: 0,
  //     depth: 200,
  //     slideShadows: false,
  //   },
  //   autoplay: {
  //     delay: 2500,
  //     disableOnInteraction: false,
  //   },
  //   modules: [EffectCoverflow, Pagination, Navigation, Autoplay],
  //   scrollbar: {
  //     el: '.swiper-scrollbar',
  //     draggable: true,
  //   },
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //     clickable: true,
  //   },
  //   className: 'swiper_container',
  // };
  useEffect(() => setShouldShow(true), []);
  useEffect(() => fetchRandomCardsAndSet(), []);

  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);
  if (!randomCards.length) return <HeroSectionSkeleton />;

  const chartData = useMemo(() => {
    return randomCards[activeCardIndex]?.averagedChartData?.['30d']?.data || [];
  }, [randomCards, activeCardIndex]);

  if (!cards.length) {
    return <HeroSectionSkeleton />;
  }

  return (
    <section
      style={{
        display: 'flex',
        position: 'relative',
        minHeight: isMobileView ? 'calc(100vh - 64px)' : 'calc(100vh - 64px)',
        flexDirection: isMobileView ? 'column' : 'row',
        // flexDirection: 'column',
      }}
    >
      <MDBox
        sx={{
          width: isMobileView ? '100%' : '60%',
          height: isMobileView ? '100%' : 'calc(100vh - 64px)',
          // height: isMobileView ? 'calc(100vh - 64px)' : '100vh',
          display: 'flex',
          alignItems: 'center',
          position: isMobileView ? 'absolute' : 'absolute',
          left: 0,
          justifyContent: 'flex-start', // Align content at the top in mobile view
          // p: isMobileView ? theme.spacing(0) : theme.spacing(8),
          zIndex: isMobileView ? 1 : 5,
          border: 'none',
          flexDirection: 'column',
        }}
      >
        <Card
          className="hero-section-container"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
            flexGrow: 1,
            height: isMobileView ? '100%' : 'calc(100vh - 64px)',
            overflow: 'hidden', // Hide overflow to maintain the card's dimensions
            marginY: isMobileView ? 0 : '10vh', // Conditional margin based on mobile view
          }}
        >
          <HeroTextSection shouldShow={shouldShow} />
          {!isMidView && (
            <FlexBetween
              sx={{
                width: '100%',
                // Allow this component to expand, filling the available space,
                // but limit its maximum height
                maxHeight: 'calc(1000% - 64px)', // Adjust for padding/margins as necessary
                overflow: 'auto', // Allow scrolling within the component if content exceeds its height
              }}
            >
              <Zoom in={shouldShow}>
                <MDBox
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    flexGrow: 1, // Allow this box to grow as needed
                    padding: theme.spacing(1),
                  }}
                >
                  <Card sx={{ height: '100%' }}>
                    <FlexBetween>
                      {/* <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        padding: theme.spacing(2),
                      }}
                    > */}
                      {/* </Box> */}
                      <CardContent className="hero-section-container">
                        <DashboardBox gridArea="b">
                          {/* <BoxHeader
                            title="Profit and Revenue"
                            // eslint-disable-next-line max-len
                            subtitle={`${cards[activeCardIndex]?.name}: top line represents revenue, bottom line represents expenses`}
                            sideText="+4%"
                          /> */}
                          <img src={placeHolder} />
                        </DashboardBox>
                      </CardContent>
                      <CardContent
                        className="hero-section-container"
                        sx={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: theme.spacing(1),
                          margin: theme.spacing(1),
                          elevation: 2,
                          boxShadow: 2,
                          marginTop: 2,
                        }}
                      >
                        <ErrorBoundary>
                          <DashboardBox gridArea="b">
                            <BoxHeader
                              title="Profit and Revenue"
                              // eslint-disable-next-line max-len
                              subtitle={`${cards[activeCardIndex]?.name}: top line represents revenue, bottom line represents expenses`}
                              sideText="+4%"
                            />
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart
                                data={chartData}
                                margin={{
                                  top: 20,
                                  right: 0,
                                  left: -10,
                                  bottom: 55,
                                }}
                              >
                                <CartesianGrid
                                  vertical={false}
                                  stroke={theme.palette.chartTheme.grey.default}
                                />
                                <XAxis
                                  dataKey="x"
                                  style={{ fontSize: '10px' }}
                                />
                                <YAxis
                                  tickLine={false}
                                  axisLine={false}
                                  style={{ fontSize: '10px' }}
                                />
                                <Tooltip />
                                <Legend
                                  height={20}
                                  wrapperStyle={{
                                    margin: '0 0 10px 0',
                                  }}
                                />{' '}
                                <Line
                                  type="monotone"
                                  dataKey="y"
                                  stroke="#8884d8"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </DashboardBox>
                        </ErrorBoundary>
                      </CardContent>
                    </FlexBetween>
                  </Card>
                </MDBox>
              </Zoom>
            </FlexBetween>
          )}
          <HeroIconSection shouldShow={shouldShow} />
        </Card>
      </MDBox>
      <HeroSwiper
        cards={cards}
        isMobileView={isMobileView}
        handleSlideChange={handleSlideChange}
        activeCardIndex={activeCardIndex}
      />{' '}
    </section>
  );
};

export default HeroSection;
