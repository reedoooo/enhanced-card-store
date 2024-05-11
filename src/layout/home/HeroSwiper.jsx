import React, { useEffect, useRef } from 'react';
import placeholder from 'assets/images/placeholder.jpeg';
import { useBreakpoint } from 'context';
import { MDBox, RCTypography } from 'layout/REUSABLE_COMPONENTS';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const HeroSwiper = ({ cards, handleSlideChange, activeCardIndex }) => {
  const { isMd } = useBreakpoint();

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
    <MDBox
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: isMd ? 'center' : 'flex-start',
        alignItems: isMd ? 'center' : 'center',
        position: isMd ? 'absolute' : 'relative',
        height: isMd ? 'calc(100vh - 64px)' : null,
        border: 'none',
      }}
      ref={swiperRef}
    >
      <Swiper
        {...swiperConfig}
        ref={swiperRef}
        slidesPerView={isMd ? 'auto' : 9}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          renderBullet: (index, className) =>
            `<span class="${className}">${cards[index].name}</span>`,
        }}
        style={{
          minWidth: isMd ? '100vw' : '150vw',
          width: '100%',
          alignItems: isMd ? 'center' : 'flex-start',
          position: isMd ? 'absolute' : 'absolute',
          height: isMd ? 'calc(100vh - 64px)' : null,
          background: 'transparent',
          ml: isMd ? '0' : '60vw',
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
              minWidth: isMd ? '300px' : '16vw',
              height: isMd ? 'calc(100vh - 8%)' : '100%',
              transform: index === activeCardIndex ? 'scale(4.2)' : 'scale(1)',
              transition: 'transform 2s',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <RCTypography
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
            </RCTypography>
            <img
              src={card?.image || placeholder}
              alt={`slide_${index}`}
              style={{
                maxWidth: '100%',
                objectFit: 'contain',
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
