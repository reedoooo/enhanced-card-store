import React, { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary, useMode, useStatisticsStore } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import placeHolder from '../../assets/images/placeholder.jpeg';
import { HeroSectionSkeleton } from '../REUSABLE_COMPONENTS/system-utils/SkeletonVariants';
import { Card, useMediaQuery } from '@mui/material';
import HeroTextSection from './HeroTextSection';
import HeroIconSection from './HeroIconSection';
import HeroSwiper from './HeroSwiper';
import useLocalStorage from '../../context/hooks/useLocalStorage';
import { useCardStoreHook } from '../../context/useCardStore';
import HeroChartSection from './HeroChartSection';
import useBreakpoint from '../../context/hooks/useBreakPoint';

const HeroSection = () => {
  const { fetchRandomCardsAndSet } = useCardStoreHook();
  const [randomCards, setRandomCards] = useLocalStorage('randomCards', []);
  const { isMd } = useBreakpoint();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);
  const defaultCards = new Array(45).fill({}).map((_, index) => ({
    id: `default-${index}`,
    name: `Placeholder ${index + 1}`,
    description: `Description for Placeholder ${index + 1}`,
    image: placeHolder,
  }));
  const cards = [...randomCards, ...defaultCards];
  const [cardAtActive, setCardActive] = useState(cards[activeCardIndex]);
  useEffect(() => setShouldShow(true), []);
  useEffect(() => fetchRandomCardsAndSet(), []);
  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);
  // if (!randomCards.length) return <HeroSectionSkeleton />;
  if (!cards.length) {
    return <HeroSectionSkeleton />;
  }

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: isMd ? 'column' : 'row',
        minHeight: isMd ? 'calc(100vh - 64px)' : 'calc(100vh - 64px)',
        padding: isMd ? null : '128px 0', // Center content vertically in medium devices
        position: 'relative',
      }}
    >
      <MDBox
        sx={{
          width: isMd ? '100%' : '60%',
          height: isMd ? '100%' : null,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: isMd ? 'absolute' : 'absolute',
          flexGrow: 1,
          left: 0,
          justifyContent: 'flex-start', // Align content at the top in mobile view
          zIndex: isMd ? 1 : 5,
          border: 'none',
          ml: isMd ? null : '1rem',
          my: isMd ? null : 'auto',
        }}
      >
        <Card
          className="hero-section-container"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMd ? null : 'space-around',
            alignItems: 'center',
            backgroundColor: 'transparent',
            height: isMd ? '100%' : '100%',
            overflow: 'hidden', // Hide overflow to maintain the card's dimensions
          }}
        >
          <HeroTextSection shouldShow={shouldShow} />
          {!isMd && (
            <HeroChartSection
              shouldShow={shouldShow}
              randomCards={randomCards}
              activeCardIndex={activeCardIndex}
              card={cardAtActive}
            />
          )}
          <HeroIconSection shouldShow={shouldShow} />
        </Card>
      </MDBox>
      <HeroSwiper
        cards={cards}
        isMobileView={isMd}
        handleSlideChange={handleSlideChange}
        activeCardIndex={activeCardIndex}
      />{' '}
    </section>
  );
};

export default HeroSection;
