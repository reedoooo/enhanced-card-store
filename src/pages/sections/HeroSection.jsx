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
import {
  Box,
  Card,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import DashboardBox from '../../layout/REUSABLE_COMPONENTS/DashboardBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Replace headerItems with realistic card store data
const storeInfoItems = [
  { icon: <AttachMoneyIcon />, label: 'Total Sales', value: '$152,300' },
  { icon: <AttachMoneyIcon />, label: 'Average Order', value: '$350' },
  { icon: <AttachMoneyIcon />, label: 'Total Products', value: '1250' },
];
const StoreInfoItem = ({ icon, label, value, delay }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      style={{
        transitionDelay: `${delay}ms`,
        display: 'flex',
        alignItems: 'center',
        zIndex: 20,
      }}
    >
      <Box sx={{ marginRight: 2, display: 'inline-flex' }}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Grid>
  );
};
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
        minHeight: isMobileView ? '50vh' : 'calc(100vh - 64px)',
        flexDirection: isMobileView ? 'column' : 'row',
      }}
    >
      <MDBox
        sx={{
          width: isMobileView ? '100%' : '60%',
          height: isMobileView ? '30%' : '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: isMobileView ? 'relative' : 'absolute',
          left: 0,
          p: isMobileView ? theme.spacing(0) : theme.spacing(8),
          zIndex: 5, // Make sure this z-index is higher than Swiper's but in the same context
          border: 'none',
        }}
      >
        <Card
          className="hero-section-container"
          sx={{
            width: '100%',
            minHeight: isMobileView ? '30vh' : '80vh',
            backgroundColor: 'transparent', // Make the Card background transparent
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <DashboardBox
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirectino: 'row',
                alignItems: 'center',
                padding: 1,
                width: '100%',
              }}
            >
              <IconButton
                onClick={console.log(cards[activeCardIndex].id)}
                aria-label="Back to Collections"
                color="inherit"
                sx={{
                  marginRight: '6px',
                  background: 'white',
                }}
              >
                <AttachMoneyIcon
                  color={theme.palette.chartTheme.greenAccent.default}
                />
              </IconButton>
              <Grid container spacing={2}>
                {storeInfoItems.map((item, index) => (
                  <StoreInfoItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    delay={index * 300} // Adjust delay as needed
                  />
                ))}
              </Grid>
            </DashboardBox>
          </Box>
        </Card>
      </MDBox>

      <MDBox
        sx={{
          // width: isMobileView ? '100%' : '60%',
          // height: isMobileView ? '30%' : '100%',
          width: '100%',
          display: 'flex',
          justifyContent: isMobileView ? 'center' : 'flex-start',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Swiper
          effect="coverflow"
          resizeObserver={true}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={isMobileView ? 'auto' : 9}
          spaceBetween={10}
          coverflowEffect={{
            stretch: 0,
            modifier: 1,
            rotate: 0,
            depth: 200, // Increase depth for a more pronounced effect
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            renderBullet: (index, className) =>
              `<span class="${className}">${cards[index].name}</span>`, // Rendering titles as bullets
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
            delay: 2500, // Delay in milliseconds (2.5 seconds)
            disableOnInteraction: false, // Continues autoplay when interacted with
          }}
          style={{
            // minWidth: '150vw',
            minWidth: '150vw',
            width: '100%',
            alignItems: isMobileView ? 'center' : 'flex-start',
            position: isMobileView ? 'relative' : 'absolute',
            ml: isMobileView ? '0' : '60vw',
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
                width: '100%',
                height: '100%',
                transform:
                  index === activeCardIndex ? 'scale(2.2)' : 'scale(1)',
                transition: 'transform 0.9s',
                position: 'relative', // Ensure the slide content is positioned relatively
              }}
            >
              <MDTypography
                className="hero-section-card-title"
                variant="h4"
                sx={{
                  color: 'black',
                  width: '100%', // Ensure the label spans the whole width
                  textAlign: 'center', // Center align the text
                  zIndex: 10, // Ensure it's above the image
                  marginBottom: 0, // Remove bottom margin to place directly above the image
                }}
              >
                {card.name}
              </MDTypography>
              <img
                src={card?.image || placeHolder}
                alt={`slide_${index}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%', // Adjust based on your need to ensure it doesn't overflow
                  objectFit: 'contain', // Ensure the image fits within the container
                  width: 'auto', // Maintain aspect ratio
                  borderRadius: 0, // Remove border-radius
                  height: 'auto', // Maintain aspect ratio
                  transition: 'transform 0.9s', // Smooth transition for scaling
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
