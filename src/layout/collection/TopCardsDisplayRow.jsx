import React, { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useMode } from '../../context';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import placeHolder from '../../assets/images/placeholder.jpeg';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import CardDetailsContainer from '../../components/cards/CardDetailsContainer';
import { useCompileCardData } from '../../context/MISC_CONTEXT/AppContext/useCompileCardData';
import FlexBetween from '../REUSABLE_COMPONENTS/FlexBetween';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';

export const TopCardsDisplayRow = () => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const { selectedCollection } = useSelectedCollection();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { collectionMetaData } = useCompileCardData();
  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);

  return (
    <Swiper
      className="swiper-container"
      modules={[Autoplay, Pagination, Navigation]}
      effect="slide"
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      navigation={true}
      onSlideChange={handleSlideChange}
      style={{
        width: '100%',
      }}
    >
      {collectionMetaData?.topFiveCards?.map((card, index) => (
        <SwiperSlide
          key={index}
          className="swiper-slide"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            transition: 'transform 0.9s',
          }}
        >
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: isMobileView ? 'column' : 'row', // Adjust direction based on screen size
              width: '100%',
              height: '100%',
            }}
          >
            <Card
              sx={{
                flexGrow: 1,
                width: isMobileView ? '100%' : 'auto', // Adjust width based on screen size
                minHeight: '100%', // Ensure card takes full height
                p: theme.spacing(2),
                m: theme.spacing(1),
              }}
            >
              <FlexBetween
                sx={{
                  justifyContent: 'space-around', // Space distribution
                  padding: theme.spacing(2),
                }}
              >
                <CardContent>
                  <DashboardBox gridArea="b">
                    <CardMedia
                      component="img"
                      alt={`Image for ${card.name || 'the card'}`}
                      image={card?.image || placeHolder} // || placeHolder
                      loading="lazy"
                      style={{
                        borderRadius: 0,
                        width: 'auto',
                      }}
                    />
                  </DashboardBox>
                </CardContent>
                <CardContent
                  theme={theme}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'auto',
                  }}
                >
                  <CardDetailsContainer
                    card={card}
                    className="card-details-container-swiper"
                    titles={['Name', 'Description', 'Price']}
                  />
                </CardContent>
              </FlexBetween>
            </Card>
          </MDBox>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
