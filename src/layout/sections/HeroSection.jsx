import React, { useEffect, useState } from 'react';
import { useMode, useStatisticsStore } from '../../context';
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
import { Card, useMediaQuery } from '@mui/material';
import pages from '../../data/pages.json';
import HeroTextSection from './HeroTextSection';
import HeroIconSection from './HeroIconSection';
import HeroSwiper from './HeroSwiper';
import FlexBetween from '../REUSABLE_COMPONENTS/FlexBetween';

const HeroSection = () => {
  const { theme } = useMode();
  const { breakpoints } = theme;
  const { introText } = pages;
  const isMobileView = useMediaQuery(breakpoints.down('sm'));
  const isFullView = useMediaQuery(breakpoints.up('lg'));
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);
  const { topFiveCards } = useStatisticsStore();
  const defaultCards = new Array(45).fill({}).map((_, index) => ({
    id: `default-${index}`,
    name: `Placeholder ${index + 1}`,
    description: `Description for Placeholder ${index + 1}`,
    image: placeHolder,
  }));
  const cards = [...topFiveCards, ...defaultCards];
  const swiperConfig = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    resizeObserver: true,
    spaceBetween: 10,
    coverflowEffect: {
      stretch: 0,
      modifier: 1,
      rotate: 0,
      depth: 200,
      slideShadows: false,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [EffectCoverflow, Pagination, Navigation, Autoplay],
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    },
    className: 'swiper_container',
  };
  useEffect(() => setShouldShow(true), []);

  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);

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
      }}
    >
      <MDBox
        sx={{
          width: isMobileView ? '100%' : '60%',
          height: isMobileView ? 'calc(100vh - 64px)' : '100%',
          display: 'flex',
          // justifyContent: 'center',
          alignItems: 'center',
          position: isMobileView ? 'absolute' : 'absolute',
          left: 0,
          justifyContent: 'flex-start', // Align content at the top in mobile view
          // overflow: 'hidden', // Prevents content from overflowing
          p: isMobileView ? theme.spacing(0) : theme.spacing(8),
          zIndex: isMobileView ? 1 : 5,
          // zIndex: 5, // Make sure this z-index is higher than Swiper's but in the same context
          border: 'none',
        }}
      >
        <Card
          className="hero-section-container"
          sx={{
            width: '100%',
            height: isMobileView ? 'calc(100vh - 64px)' : '50vh',
            minHeight: isMobileView ? '30vh' : '80vh',
            backgroundColor: isMobileView ? 'none' : 'transparent',
            alignItems: isMobileView ? 'space-between' : 'center',
            flexDirection: 'column',
            // mt: isMobileView ? null : '50%',
            // position: isMobileView ? 'relative' : 'absolute',
          }}
        >
          <HeroTextSection shouldShow={shouldShow} />
          <HeroIconSection shouldShow={shouldShow} />
          {/* </MDBox> */}
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
