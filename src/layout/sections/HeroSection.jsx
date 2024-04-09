import React, { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary, useMode, useStatisticsStore } from '../../context';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import placeHolder from '../../assets/images/placeholder.jpeg';
import { HeroSectionSkeleton } from '../../layout/REUSABLE_COMPONENTS/SkeletonVariants';
import { Card, useMediaQuery } from '@mui/material';
import HeroTextSection from './HeroTextSection';
import HeroIconSection from './HeroIconSection';
import HeroSwiper from './HeroSwiper';
import useLocalStorage from '../../context/hooks/useLocalStorage';
import { useCardStoreHook } from '../../context/MAIN_CONTEXT/CardContext/useCardStore';
import HeroChartSection from './HeroChartSection';

const HeroSection = () => {
  const { theme } = useMode();
  const { breakpoints } = theme;
  const { fetchRandomCardsAndSet } = useCardStoreHook();
  const [randomCards, setRandomCards] = useLocalStorage('randomCards', []);
  const isMidView = useMediaQuery(breakpoints.down('md'));
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);
  const defaultCards = new Array(45).fill({}).map((_, index) => ({
    id: `default-${index}`,
    name: `Placeholder ${index + 1}`,
    description: `Description for Placeholder ${index + 1}`,
    image: placeHolder,
  }));
  const cards = [...randomCards, ...defaultCards];
  useEffect(() => setShouldShow(true), []);
  useEffect(() => fetchRandomCardsAndSet(), []);
  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);
  if (!randomCards.length) return <HeroSectionSkeleton />;
  if (!cards.length) {
    return <HeroSectionSkeleton />;
  }

  return (
    <section
      style={{
        display: 'flex',
        position: 'relative',
        minHeight: isMidView ? 'calc(100vh - 64px)' : 'calc(100vh - 64px)',
        flexDirection: isMidView ? 'column' : 'row',
      }}
    >
      <MDBox
        sx={{
          width: isMidView ? '100%' : '60%',
          height: isMidView ? '100%' : 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          position: isMidView ? 'absolute' : 'absolute',
          left: 0,
          justifyContent: 'flex-start', // Align content at the top in mobile view
          zIndex: isMidView ? 1 : 5,
          border: 'none',
          flexDirection: 'column',
          ml: isMidView ? null : '1rem',
          flexGrow: 1,
        }}
      >
        <Card
          className="hero-section-container"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMidView ? null : 'space-around',
            alignItems: 'center',
            backgroundColor: 'transparent',
            flexGrow: 1,
            height: isMidView ? '100%' : '100%',
            overflow: 'hidden', // Hide overflow to maintain the card's dimensions
          }}
        >
          <HeroTextSection shouldShow={shouldShow} />
          {!isMidView && (
            <HeroChartSection
              shouldShow={shouldShow}
              randomCards={randomCards}
              activeCardIndex={activeCardIndex}
            />
          )}
          <HeroIconSection shouldShow={shouldShow} />
        </Card>
      </MDBox>
      <HeroSwiper
        cards={cards}
        isMobileView={isMidView}
        handleSlideChange={handleSlideChange}
        activeCardIndex={activeCardIndex}
      />{' '}
    </section>
  );
};

export default HeroSection;
