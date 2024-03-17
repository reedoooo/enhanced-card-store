import React, { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useMode } from '../../../context';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import placeHolder from '../../../assets/images/placeholder.jpeg';
import GenericCard from '../../../components/cards/GenericCard';
import { StyledSwiperSlide } from '../../../pages/pageStyles/StyledComponents';
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';

export const TopCardsDisplayRow = () => {
  const { theme } = useMode();
  const { selectedCollection } = useSelectedCollection();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);

  const topFiveCards = useMemo(
    () =>
      selectedCollection?.cards?.sort((a, b) => b.price - a.price).slice(0, 5),
    [selectedCollection?.cards]
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: theme.spacing(2),
        background: theme.palette.backgroundB.darker,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        effect="slide"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        navigation={true}
        onSlideChange={handleSlideChange}
        style={{
          width: '100%',
          // height: '320px', // Adjusted height to maintain aspect ratio
          // bottom: theme.spacing(2),
          // right: theme.spacing(2),
          // width: '100%',
          // height: 180,
          // perspective: '1200px',
          // [theme.breakpoints.up('md')]: {
          //   width: '50%',
          //   height: 250,
          // },
        }}
      >
        {topFiveCards?.map((card, index) => (
          <StyledSwiperSlide key={index}>
            <MDBox>
              <GenericCard
                card={card}
                context={'Collection'}
                page={'Collection'}
                isSwiperStyles={true}
              />
            </MDBox>
          </StyledSwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};
