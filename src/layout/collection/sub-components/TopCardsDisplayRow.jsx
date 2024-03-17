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
import { AspectRatioBox } from '../../../components/cards/styles/cardStyledComponents';
import { FormBox } from '../../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import CardDetail from '../../../components/cards/CardDetail';

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
        autoplay={{ delay: 5000 }}
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
          <SwiperSlide
            key={index}
            // className="swiper-slide"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              // height: '100%',
              // transform: index === activeCardIndex ? 'scale(1.7)' : 'scale(1)',
              transition: 'transform 0.9s',
              // position: 'relative', // Ensure the slide content is positioned relatively
            }}
          >
            <MDBox
              sx={{
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: 'center',
                // alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <Card
                sx={{
                  minWidth: '25%',
                  height: '100%',
                  p: theme.spacing(2),
                  m: theme.spacing(1),
                }}
              >
                <CardMedia
                  component="img"
                  alt={`Image for ${card.name || 'the card'}`}
                  image={card?.image || placeHolder} // || placeHolder
                  loading="lazy"
                  style={{
                    borderRadius: 0,
                    // transform: 'scale(1)',
                    width: 'auto',
                    // height: 'auto',
                  }}
                  z
                />
              </Card>
              <Card
                sx={{
                  minWidth: '50%',
                  maxWidth: '70%',
                  height: '100%',
                  minHeight: '100%',
                  p: theme.spacing(2),
                  m: theme.spacing(1),
                  my: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* <CardContent
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    mx: 'auto',
                    px: 'auto',
                  }}
                > */}
                <FormBox
                  theme={theme}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CardDetail
                    className={'card-detail'}
                    // icon={<FaRegCopy />}
                    title="Description"
                    value={card?.desc}
                  />
                  <CardDetail
                    className={'card-detail'}
                    // icon={<FaRegCopy />}
                    title="Description"
                    value={card?.desc}
                  />
                  <CardDetail
                    className={'card-detail'}
                    // icon={<FaRegCopy />}
                    title="Description"
                    value={card?.desc}
                  />
                </FormBox>
                {/* </CardContent> */}
              </Card>
            </MDBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};
