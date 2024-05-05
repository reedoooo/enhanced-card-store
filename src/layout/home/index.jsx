import React, { useEffect, useState } from 'react';
import placeHolder from 'assets/images/placeholder.jpeg';
import { Card } from '@mui/material';

import HeroTextSection from './HeroTextSection';
import HeroIconSection from './HeroIconSection';
import HeroSwiper from './HeroSwiper';
import HeroChartSection from './HeroChartSection';

import { useBreakpoint, useCardStore, useLocalStorage } from 'context';
import { HeroSectionSkeleton, MDBox } from 'layout/REUSABLE_COMPONENTS';

const HeroSection = () => {
  const { isMd } = useBreakpoint();
  const { fetchRandomCardsAndSet, loadingRandomCards } = useCardStore();
  const [randomCards, setRandomCards] = useLocalStorage('randomCards', []);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);
  const defaultCards = new Array(45).fill({}).map((_, index) => ({
    id: `default-${index}`,
    name: `Placeholder ${index + 1}`,
    description: `Description for Placeholder ${index + 1}`,
    image: placeHolder,
  }));
  const [hasFetchedCards, setHasFetchedCards] = useState(false);
  const [cards, setCards] = useState([...randomCards, ...defaultCards]);
  useEffect(() => {
    setShouldShow(true);
    const fetchData = async () => {
      if (!randomCards.length && !loadingRandomCards && !hasFetchedCards) {
        await fetchRandomCardsAndSet();
        setHasFetchedCards(true);
      }
    };
    fetchData();
  }, [
    fetchRandomCardsAndSet,
    randomCards.length,
    loadingRandomCards,
    hasFetchedCards,
  ]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'randomCards') {
        const newRandomCards = JSON.parse(event.newValue);
        if (newRandomCards) {
          setRandomCards(newRandomCards);
          setCards([...newRandomCards, ...defaultCards]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [defaultCards]);
  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);
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
              card={cards[activeCardIndex]}
            />
          )}
          <HeroIconSection shouldShow={shouldShow} />
        </Card>
      </MDBox>
      <HeroSwiper
        cards={cards}
        handleSlideChange={handleSlideChange}
        activeCardIndex={activeCardIndex}
      />
    </section>
  );
};

export default HeroSection;
