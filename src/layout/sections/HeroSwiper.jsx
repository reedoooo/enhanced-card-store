import React, { useEffect, useRef } from 'react';
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
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import placeHolder from '../../assets/images/placeholder.jpeg';

const HeroSwiper = ({
  cards,
  isMobileView,
  handleSlideChange,
  activeCardIndex,
}) => {
  const swiperRef = useRef(null);

  const swiperConfig = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    resizeObserver: true,
    spaceBetween: 10,
    coverflowEffect: {
      stretch: 0,
      modifier: 1,
      rotate: 0,
      depth: 200,
      slideShadows: false,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [EffectCoverflow, Pagination, Navigation, Autoplay],
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    },
    className: 'swiper_container',
  };

  useEffect(() => {
    // Ensuring the swiper instance is available
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      // Listen to slideChange event
      swiperInstance.on('slideChange', () => {
        const { activeIndex } = swiperInstance;
        handleSlideChange(activeIndex); // Assuming this function you pass handles updating activeCardIndex

        // Check if the slide is every 4th slide (0-indexed, so we check for 3, 7, 11, ...)
        if ((activeIndex + 1) % 4 === 0) {
          swiperInstance.autoplay.stop();
          setTimeout(() => {
            swiperInstance?.autoplay?.start();
          }, 10000); // Pause for 30 seconds
        }
      });
    }
  }, []);

  return (
    <MDBox
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: isMobileView ? 'center' : 'flex-start',
        alignItems: isMobileView ? 'center' : 'center',
        // position: 'relative',
        position: isMobileView ? 'absolute' : 'relative',
        // height: isMobileView ? '100vh' : null,
        height: isMobileView ? 'calc(100vh - 64px)' : null,
        border: 'none',
        // background: '#2d2d34',
      }}
    >
      <Swiper
        {...swiperConfig}
        ref={swiperRef}
        slidesPerView={isMobileView ? 'auto' : 9}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          renderBullet: (index, className) =>
            `<span class="${className}">${cards[index].name}</span>`,
        }}
        style={{
          minWidth: '150vw',
          width: '100%',
          alignItems: isMobileView ? 'center' : 'flex-start',
          position: isMobileView ? 'absolute' : 'absolute',
          height: isMobileView ? 'calc(100vh - 64px)' : null,
          background: 'transparent',

          // pb: '2rem',
          ml: isMobileView ? '0' : '60vw',
          // position: isMobileView ? 'absolute' : 'relative',
        }}
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
              width: '100%',
              // height: '100%',
              height: isMobileView ? 'calc(100vh - 8%)' : '100%',
              transform: index === activeCardIndex ? 'scale(2.2)' : 'scale(1)',
              transition: 'transform 0.9s',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <MDTypography
              className="hero-section-card-title"
              variant="h4"
              sx={{
                color: 'black',
                width: '100%',
                textAlign: 'center',
                zIndex: 10,
                marginBottom: 0,
              }}
            >
              {card.name}
            </MDTypography>
            <img
              src={card?.image || placeHolder}
              alt={`slide_${index}`}
              style={{
                maxWidth: '100%',
                objectFit: 'contain',
                width: 'auto',
                borderRadius: 0,
                height: 'auto',
                transition: 'transform 0.9s',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </MDBox>
  );
};

export default HeroSwiper;
