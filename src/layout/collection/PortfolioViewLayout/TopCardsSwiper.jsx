import React, { useState, useRef, useEffect } from 'react';
import { CardMedia, CardContent, Icon } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useMode } from 'context';
import placeHolder from 'assets/images/placeholder.jpeg';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import CardDetailsContainer from 'layout/cards/CardDetailsContainer';
import FlexBetween from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/FlexBetween';
import DashboardBox from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/DashboardBox';
import BoxHeader from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/BoxHeader';
import { CardWrapper } from 'layout/REUSABLE_STYLED_COMPONENTS/SpecificStyledComponents';
import useManager from 'context/state/useManager';
import useBreakpoint from 'context/hooks/useBreakPoint';

const TopCardsSwiper = () => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  const swiperRef = useRef(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { collectionMetaData } = useManager();
  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);
  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.on('slideChange', () => {
        const { activeIndex } = swiperInstance;
        handleSlideChange(activeIndex);
        if ((activeIndex + 1) % 4 === 0) {
          swiperInstance.autoplay.stop();
          setTimeout(() => {
            swiperInstance?.autoplay?.start();
          }, 10000);
        }
      });
    }
  }, []);
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
              flexDirection: isMobile ? 'column' : 'row', // Adjust direction based on screen size
              width: '100%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              border: 'none',
            }}
          >
            <CardWrapper border={false} content={false} theme={theme}>
              <FlexBetween
                sx={{
                  justifyContent: isMobile ? 'center' : 'space-around', // Adjust direction based on screen size
                  padding: theme.spacing(2),
                  flexDirection: isMobile ? 'column' : 'row', // Adjust direction based on screen size
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
                            color: '#4e93a6',
                          }}
                        >
                          check_circle
                        </Icon>
                      </MDBox>
                    }
                  />
                  <DashboardBox gridArea="b">
                    <CardMedia
                      component="img"
                      alt={`Image for ${card.name || 'the card'}`}
                      image={card?.image || placeHolder} // || placeHolder
                      loading="lazy"
                      style={{
                        borderRadius: 0,
                        width: 'auto',
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
            </CardWrapper>
          </MDBox>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopCardsSwiper;
