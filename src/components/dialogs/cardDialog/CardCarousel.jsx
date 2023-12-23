import React from 'react';
import { styled } from '@mui/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import GenericCard from '../../cards/GenericCard';

const StyledCarousel = styled('div')(({ theme }) => ({
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: '100%',
  height: 180,
  perspective: '1200px',
  [theme.breakpoints.up('md')]: {
    width: '50%',
    height: 250,
  },
}));

const StyledSwiperSlide = styled(SwiperSlide)(({ theme }) => ({
  '& .swiper-slide': {
    opacity: 0.5,
    transform: 'scale(0.85)',
    transition: 'transform 0.3s, opacity 0.3s',
    '&-active': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
    '&-next, &-prev': {
      transform: 'scale(0.8)',
    },
  },
}));

const CardCarousel = ({ cards, context }) => {
  const swiperSettings = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    pagination: { clickable: true },
  };

  return (
    <StyledCarousel>
      <Swiper {...swiperSettings}>
        {cards.map((card, index) => (
          <StyledSwiperSlide key={index}>
            <GenericCard card={card} context={context} page={context} />
          </StyledSwiperSlide>
        ))}
      </Swiper>
    </StyledCarousel>
  );
};

export default CardCarousel;
