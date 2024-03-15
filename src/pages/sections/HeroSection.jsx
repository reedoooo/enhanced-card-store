import React, { useState } from 'react';
import { useMode, useStatisticsStore } from '../../context';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import placeHolder from '../../assets/images/placeholder.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from 'swiper/modules';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import HeroSectionSkeleton from '../../layout/REUSABLE_COMPONENTS/SkeletonVariants';
import { Box, Card, useMediaQuery } from '@mui/material';

const HeroSection = () => {
  const { theme } = useMode();
  const { breakpoints } = theme;
  const isMobileView = useMediaQuery(breakpoints.down('sm'));
  const isFullView = useMediaQuery(breakpoints.up('lg'));
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { topFiveCards } = useStatisticsStore();
  const defaultCards = new Array(45).fill({}).map((_, index) => ({
    id: `default-${index}`,
    name: `Placeholder ${index + 1}`,
    description: `Description for Placeholder ${index + 1}`,
    image: placeHolder,
  }));
  const cards = [...topFiveCards, ...defaultCards];
  const handleSlideChange = (swiper) => setActiveCardIndex(swiper.realIndex);

  if (!cards || !Array.isArray(cards) || !cards[activeCardIndex]) {
    return <HeroSectionSkeleton />;
  }

  return (
    <section
      style={{
        display: 'flex',
        position: 'relative',
        minHeight: isMobileView ? '50vh' : '70vh',
        flexDirection: isMobileView ? 'column' : 'row',
      }}
    >
      <MDBox
        // className="hero-section-container"
        sx={{
          // width: { xs: '100%', sm: '70%', md: '60%' },
          width: isMobileView ? '100%' : '60%',
          height: isMobileView ? '30%' : '100%',

          // height: isMobileView ? '50%' : '80%',
          // mt: isMobileView ? 0 : '1rem',

          // height: '80%',
          // mt: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: isMobileView ? 'relative' : 'absolute',
          left: 0,
          p: isMobileView ? theme.spacing(0) : theme.spacing(8),
          zIndex: 2, // Higher z-index to be on top
          // py: theme.spacing(64),
          // mb: theme.spacing(32),
        }}
      >
        <Card
          className="hero-section-container"
          sx={{
            width: '100%',
            minHeight: isMobileView ? '30vh' : '50vh',
            backgroundColor: 'transparent', // Make the Card background transparent
          }}
        >
          <Box
            className="hero-section-container"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {/* Content inside the card */}
          </Box>
        </Card>
      </MDBox>

      <MDBox
        sx={{
          // width: '100%', // Ensures the swiper takes the full width but the focused slide will be positioned accordingly
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          // // my: '1rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          // top: isMobileView ? '0' : '50%',
          // transform: isMobileView ? 'none' : 'translateY(-50%)',
        }}
      >
        <Swiper
          // effect={isMobileView ? 'slide' : 'coverflow'}
          effect="coverflow"
          resizeObserver={true}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={isMobileView ? 3 : 9}
          // slidesPerView={isMobileView ? 3 : 9}
          // spaceBetween={10}
          spaceBetween={10}
          // spaceBetween={isMobileView ? -30 : 10}
          coverflowEffect={{
            // rotate: isMobileView ? 0 : 20,
            stretch: 0,
            // depth: 125,
            modifier: 1,
            // // slideShadows: false,

            rotate: 0,
            // stretch: isMobileView ? 50 : 0, // Adjust stretch for mobile view to align slides side by side
            depth: 200, // Increase depth for a more pronounced effect
            // modifier: isMobileView ? 1 : 1, // Adjust modifier if needed for fine-tuning
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          scrollbar={{
            el: '.swiper-scrollbar',
            draggable: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          autoplay={{
            // Enable autoplay with a delay for slow rotation
            delay: 2500, // Delay in milliseconds (2.5 seconds)
            disableOnInteraction: false, // Continues autoplay when interacted with
          }}
          style={{
            minWidth: '150vw',
            width: '100%',
            // marginLeft: '60vw',
            // position: 'absolute', // Position absolute to control its exact location
            position: isMobileView ? 'relative' : 'absolute',
            marginLeft: isMobileView ? '0' : '60vw',
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Include Autoplay module
          className="swiper_container"
          onSlideChange={handleSlideChange}
        >
          {cards?.map((card, index) => (
            <SwiperSlide
              key={card?.id || index}
              className="swiper-slide"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                transform:
                  index === activeCardIndex ? 'scale(1.5)' : 'scale(1)',
                transition: 'transform 0.9s',
                // position: 'relative',
              }}
            >
              <MDTypography
                className="hero-section-card-title"
                variant="h4"
                color="light"
                sx={{
                  position: 'absolute',
                  // mt: '10px',
                  // top: -5, // Position the title at the top of the slide
                  zIndex: 10,
                  // top: '50%', // Center vertically
                  transform: 'translateY(-230%)',
                }}
              >
                {topFiveCards[activeCardIndex]?.name || ''}
              </MDTypography>
              <MDTypography
                className="hero-section-card-subtitle"
                variant="h6"
                color="light"
                sx={{
                  position: 'absolute',
                  bottom: 0, // Position the subtitle at the bottom of the slide
                  zIndex: 10,
                }}
              >
                {topFiveCards[activeCardIndex]?.description || ''}
              </MDTypography>
              <img
                src={card?.image || placeHolder}
                alt={`slide_${index}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.9s', // Smooth transition for the image scaling
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </MDBox>
    </section>
  );
};

export default HeroSection;
