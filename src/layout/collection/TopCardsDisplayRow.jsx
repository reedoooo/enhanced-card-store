import React, { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
  Icon,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useMode } from '../../context';
import placeHolder from '../../assets/images/placeholder.jpeg';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import CardDetailsContainer from '../../components/cards/CardDetailsContainer';
import { useCompileCardData } from '../../context/MISC_CONTEXT/AppContext/useCompileCardData';
import FlexBetween from '../REUSABLE_COMPONENTS/layout-utils/FlexBetween';
import DashboardBox from '../REUSABLE_COMPONENTS/layout-utils/DashboardBox';
import BoxHeader from '../REUSABLE_COMPONENTS/layout-utils/BoxHeader';
import { useCollectionMetaData } from '../../context/MISC_CONTEXT/AppContext/useCollectionMetaData';
import { CardWrapper } from '../REUSABLE_STYLED_COMPONENTS/SpecificStyledComponents';

export const TopCardsDisplayRow = () => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { collectionMetaData } = useCollectionMetaData();
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
        mx: 'auto',
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
            justifyContent: 'center',
            width: '100%',
            transition: 'transform 0.9s',
            flexGrow: 1,
            mx: 'auto',
          }}
        >
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: isMobileView ? 'column' : 'row', // Adjust direction based on screen size
              width: '100%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              border: 'none',
            }}
          >
            <CardWrapper border={false} content={false} theme={theme}>
              {/* <Card
                sx={{
                  flexGrow: 1,
                  width: isMobileView ? '100%' : 'auto', // Adjust width based on screen size
                  minHeight: '100%', // Ensure card takes full height
                  alignItems: 'flex-start',
                  flexDirection: isMobileView ? 'column' : 'row', // Adjust direction based on screen size
                  justifyContent: 'center',
                  // p: theme.spacing(2),
                  // m: theme.spacing(1),
                }}
              > */}
              <FlexBetween
                sx={{
                  // justifyContent: 'space-around', // Space distribution
                  justifyContent: isMobileView ? 'center' : 'space-around', // Adjust direction based on screen size
                  padding: theme.spacing(2),
                  // alignItems: 'flex-start',
                  // alignItems: isMobileView ? 'center' : 'flex-start',
                  flexDirection: isMobileView ? 'column' : 'row', // Adjust direction based on screen size
                }}
              >
                <CardContent
                  sx={{
                    // width: '100%',
                    // mb: theme.spacing(10),
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    mx: 'auto',
                    my: 'auto',
                  }}
                >
                  <BoxHeader
                    title={card.name}
                    subtitle="none"
                    sideText="none"
                    icon={
                      <MDBox
                        sx={{
                          border: 'none',
                          p: theme.spacing(2),
                        }}
                      >
                        <Icon
                          sx={{
                            fontSize: '3rem',
                            color: theme.palette.greenAccent.pureGreenBlue,
                          }}
                        >
                          check_circle
                        </Icon>
                      </MDBox>
                    }
                  />
                  <DashboardBox gridArea="b">
                    {/* <MDTypography
                      variant="h5"
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      {card.name}
                    </MDTypography> */}
                    {/* <BoxHeader
                      title={card.name}
                      subtitle="none"
                      sideText="none"
                      icon={
                        <MDBox
                          sx={{
                            border: 'none',
                            p: theme.spacing(2),
                          }}
                        >
                          <Icon
                            sx={{
                              fontSize: '3rem',
                              color: theme.palette.greenAccent.pureGreenBlue,
                            }}
                          >
                            check_circle
                          </Icon>
                        </MDBox>
                      }
                    /> */}
                    <CardMedia
                      component="img"
                      alt={`Image for ${card.name || 'the card'}`}
                      image={card?.image || placeHolder} // || placeHolder
                      loading="lazy"
                      style={{
                        borderRadius: 0,
                        width: 'auto',
                        // height: 'auto',
                        mx: 'auto',
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
                    my: 'auto',
                  }}
                >
                  <CardDetailsContainer
                    card={card}
                    className="card-details-container-swiper"
                    titles={['Name', 'Description', 'Price']}
                  />
                </CardContent>
              </FlexBetween>
              {/* </Card> */}
            </CardWrapper>
          </MDBox>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
