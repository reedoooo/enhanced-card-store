import React, { useState } from 'react';
import { useMode, useStatisticsStore } from '../../context';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import placeHolder from '../../assets/images/placeholder.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Corrected imports for Swiper modules
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from 'swiper/modules';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import HeroSectionSkeleton from '../../layout/REUSABLE_COMPONENTS/SkeletonVariants';

// const
//   return cards?.map((card, index) => (
//     <SwiperSlide key={card?.id || index} className="swiper-slide">
//       {/* <Box
//         className="swiper-slide"
//         sx={{
//           padding: 2, // Provides padding around the image
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100%',
//           boxSizing: 'border-box',
//         }}
//       > */}
//       <img
//         src={card?.image || placeHolder}
//         className="swiper-slide"
//         alt={`slide_${index}`}
//         style={{
//           maxWidth: '100%',
//           maxHeight: '100%',
//           objectFit: 'contain',
//         }}
//       />
//       {/* </Box> */}
//     </SwiperSlide>
//   ));
// };

const HeroSection = () => {
  const { theme } = useMode();
  // const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { topFiveCards } = useStatisticsStore();
  // Create 30 default card objects
  const defaultCards = new Array(30).fill({}).map((_, index) => ({
    id: `default-${index}`,
    name: `Placeholder ${index + 1}`,
    description: `Description for Placeholder ${index + 1}`,
    image: placeHolder, // Use the placeholder image for all default cards
  }));

  // Combine topFiveCards with defaultCards
  const cards = [...topFiveCards, ...defaultCards];
  const handleSlideChange = (swiper) => {
    setActiveCardIndex(swiper.realIndex);
  };

  if (!cards || !Array.isArray(cards) || !cards[activeCardIndex]) {
    return <HeroSectionSkeleton />;
  }

  return (
    <section className="hero-section">
      <MDBox
        className="hero-section-container"
        sx={{
          position: 'relative',
          overflow: 'visible', // Changed from 'hidden' to 'visible'
          color: '#fafafc',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ensure there's always a string value, even if it's empty */}
        <MDTypography
          className="hero-section-card-title"
          variant="h4"
          // gutterBottom
          color="light"
          sx={{ zIndex: 10 }}
        >
          {topFiveCards[activeCardIndex]?.name || ''}
        </MDTypography>

        {/* Same for the description */}
        <MDTypography
          className="hero-section-card-subtitle"
          variant="h6"
          // gutterBottom
          color="light"
          sx={{ zIndex: 10 }}
        >
          {topFiveCards[activeCardIndex]?.description || ''}
        </MDTypography>

        <Swiper
          effect="coverflow"
          resizeObserver={true}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={7} // Ensures 7 slides are visible within the 100vw width
          // slidesPerView={'auto'}
          // spaceBetween={-900} // Reduced space between slides
          spaceBetween={10}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
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
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Include Autoplay module
          className="swiper_container"
          onSlideChange={handleSlideChange}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={card?.id || index} className="swiper-slide">
              <img
                src={card?.image || placeHolder}
                alt={`slide_${index}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
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
//           </SwiperSlide>
//           {return cards?.map((card, index) => (
//             <SwiperSlide key={card?.id || index} className="swiper-slide">
//               {/* <Box
//                 className="swiper-slide"
//                 sx={{
//                   padding: 2, // Provides padding around the image
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   height: '100%',
//                   boxSizing: 'border-box',
//                 }}
//               > */}
//               <img
//                 src={card?.image || placeHolder}
//                 class="swiper-slide post"
//                 alt={`slide_${index}`}
//                 style={{
//                   maxWidth: '100%',
//                   maxHeight: '100%',
//                   objectFit: 'contain',
//                 }}
//               />
//               {/* </Box> */}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </MDBox>
//     </section>
//   );
// };

// export default HeroSection;
// import React, { useState } from 'react';
// import { Box, Typography } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// // import { EffectCoverflow, Pagination, Navigation } from 'swiper';
// import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
// import placeHolder from '../../assets/images/placeholder.jpeg';
// import { useStatisticsStore } from '../../context';

// const HeroSection = () => {
//   const [activeCardIndex, setActiveCardIndex] = useState(0);
//   const { topFiveCards } = useStatisticsStore();

//   if (!topFiveCards || !Array.isArray(topFiveCards)) {
//     return null;
//   }

//   // Handle the slide change event
//   const handleSlideChange = (swiper) => {
//     setActiveCardIndex(swiper.realIndex);
//   };

//   const createSlider = (cards) => {
//     return (
//       <Swiper
//         effect="coverflow"
//         grabCursor={true}
//         centeredSlides={true}
//         loop={true}
//         slidesPerView={3}
//         spaceBetween={30}
//         coverflowEffect={{
//           rotate: 0,
//           stretch: 50,
//           depth: 100,
//           modifier: 1,
//           slideShadows: false,
//         }}
//         pagination={{
//           clickable: true,
//           el: '.swiper-pagination', // Ensure pagination is correctly targeted
//         }}
//         navigation={true}
//         modules={[EffectCoverflow, Pagination, Navigation]}
//         className="swiper_container"
//         onSlideChange={handleSlideChange} // Update active index on slide change
//       >
//         {cards.map((card, index) => (
//           <SwiperSlide key={card?.id || index}>
//             <Box
//               sx={{
//                 padding: 2,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100%',
//                 boxSizing: 'border-box',
//               }}
//             >
//               <img
//                 src={card?.image || placeHolder}
//                 alt={`slide_${index}`}
//                 style={{
//                   maxWidth: '100%',
//                   maxHeight: '100%',
//                   objectFit: 'contain',
//                 }}
//               />
//             </Box>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     );
//   };

//   return (
//     <MDBox
//       sx={{
//         position: 'relative',
//         overflow: 'hidden',
//         color: '#fafafc',
//         minHeight: '75vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Typography variant="h1" className="heading" gutterBottom>
//         {topFiveCards[activeCardIndex]?.name}
//       </Typography>
//       {createSlider(topFiveCards)}
//       <Typography>{topFiveCards[activeCardIndex]?.description}</Typography>
//     </MDBox>
//   );
// };

// export default HeroSection;
