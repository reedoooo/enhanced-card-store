// import React from 'react';
// import styled from 'styled-components';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Pagination } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import GenericCard from './GenericCard';
// import {
//   StyledCarousel,
//   StyledSwiperSlide,
// } from '../../pages/pageStyles/StyledComponents';

// const CardCarousel = ({ cards, context }) => {
//   const swiperSettings = {
//     effect: 'coverflow',
//     grabCursor: true,
//     centeredSlides: true,
//     slidesPerView: 'auto',
//     coverflowEffect: {
//       rotate: 50,
//       stretch: 0,
//       depth: 200,
//       modifier: 1,
//       slideShadows: true,
//     },
//     loop: true,
//     pagination: { clickable: true },
//   };

//   return (
//     <StyledCarousel className="card-carousel">
//       <Swiper {...swiperSettings}>
//         {cards.map((card, index) => (
//           <StyledSwiperSlide key={index}>
//             <GenericCard card={card} context={context} page={context} />
//           </StyledSwiperSlide>
//         ))}
//       </Swiper>
//     </StyledCarousel>
//   );
// };

// export default CardCarousel;
