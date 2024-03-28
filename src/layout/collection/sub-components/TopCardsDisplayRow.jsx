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
import { useMode } from '../../../context';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import placeHolder from '../../../assets/images/placeholder.jpeg';
import GenericCard from '../../../components/cards/GenericCard';
import { StyledSwiperSlide } from '../../../pages/pageStyles/StyledComponents';
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';
import { AspectRatioBox } from '../../../components/cards/styles/cardStyledComponents';
import { FormBox } from '../../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import CardDetail from '../../../components/cards/CardDetail';
import CardDetailsContainer from '../../../components/cards/CardDetailsContainer';

export const TopCardsDisplayRow = () => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

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
        flexDirection: isMobileView ? 'column' : 'row', // Stack items vertically on mobile
      }}
    >
      <Swiper
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
        {topFiveCards?.map((card, index) => (
          <SwiperSlide
            key={index}
            // className="swiper-slide"
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
                  // minWidth: '40%',
                  minWidth: 290,
                  width: isMobileView ? '100%' : '50%', // Adjust width based on screen size
                  height: '100%',
                  p: theme.spacing(2),
                  m: theme.spacing(1),
                }}
              >
                <CardMedia
                  component="img"
                  alt={`Image for ${card.name || 'the card'}`}
                  image={card?.image || placeHolder} // || placeHolder
                  // image={placeHolder}
                  // src={placeHolder}
                  loading="lazy"
                  style={{
                    borderRadius: 0,
                    width: 'auto',
                    // minWidth: 280,
                    // height: '20%', // Ensure image covers the height on mobile
                  }}
                  z
                />
              </Card>
              <Card
                sx={{
                  // minWidth: isMobileView ? '100%' : '50%',
                  // maxWidth: '70%',
                  flexGrow: 1, // Card grows to fill available space
                  width: isMobileView ? '100%' : 'auto', // Ensure card stretches on mobile
                  height: '100%',
                  minHeight: '100%',
                  p: theme.spacing(2),
                  m: theme.spacing(1),
                  my: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* <FormBox
                  theme={theme}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                > */}
                <CardDetailsContainer
                  card={card}
                  isSwiperContent={true}
                  // isTextSection={true}
                  className={'card-details-container-swiper'}
                  titles={['Name', 'Description', 'Price']}
                />
                {/* </FormBox> */}
              </Card>
            </MDBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};
