import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useStyles } from '../modalStyles';
import useSnackbar from '../../../context/hooks/useSnackBar';
import CardMediaAndDetails from '../../media/CardMediaAndDetails';
import GenericActionButtons from '../../buttons/actionButtons/GenericActionButtons';
import { ModalContext } from '../../../context/ModalContext/ModalContext';
import { styled } from '@mui/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import GenericCard from '../../cards/GenericCard';

const GenericCardModal = ({ open, card, context, imgUrl }) => {
  const classes = useStyles();
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);
  const [snackbar, handleSnackbar, handleCloseSnackbar] = useSnackbar();
  const [hasLoggedCard, setHasLoggedCard] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(2);
  const middleRef = useRef(null);
  const carouselCards = useMemo(() => [card, card, card, card, card], [card]);

  useEffect(() => {
    if (open && card && !hasLoggedCard) {
      handleSnackbar('Card details loaded successfully.', 'success');
      setHasLoggedCard(true);
    }
  }, [open, card, handleSnackbar, hasLoggedCard]);

  useEffect(() => {
    if (!open) {
      setHasLoggedCard(false);
    }
  }, [open]);

  const handleActionSuccess = useCallback(() => {
    handleSnackbar('Action was successful!', 'success');
  }, [handleSnackbar]);

  const handleActionFailure = useCallback(
    (error) => {
      console.error('Action failed:', error);
      handleSnackbar('Action failed. Please try again.', 'error');
    },
    [handleSnackbar]
  );

  // Updated Grid layout styles for responsiveness
  const gridStyles = {
    mediaAndDetails: {
      order: { xs: 1, md: 1 },
    },
    carousel: {
      order: { xs: 3, md: 2 },
      display: 'flex',
      justifyContent: 'center', // Center the carousel on smaller screens
    },
    actionButtons: {
      order: { xs: 2, md: 3 },
    },
  };
  const StyledSwiperSlide = styled('div')(() => ({
    '& .swiper-slide': {
      opacity: 0.5,
      transform: 'scale(0.85)',
      transition: 'transform 0.3s, opacity 0.3s',
      '&-active': {
        opacity: 1,
        transform: 'scale(1.2)',
      },
      '&-next, &-prev': {
        transform: 'scale(0.8)',
      },
    },
  }));

  // const StyledCarousel = styled('div')(() => ({
  //   bottom: theme.spacing(2),
  //   right: theme.spacing(2),
  //   width: isSmall ? '100%' : 300,
  //   height: isSmall ? 150 : 180,
  //   perspective: '1200px',
  // }));
  const StyledCarousel = styled('div')(({ theme }) => ({
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    width: '100%', // Adjust based on your design requirements
    height: 180, // Adjust based on your design requirements
    perspective: '1200px',
  }));
  // const swiperSettings = {
  //   effect: 'coverflow',
  //   grabCursor: true,
  //   centeredSlides: true,
  //   slidesPerView: 'auto',
  //   coverflowEffect: {
  //     rotate: 50,
  //     stretch: 0,
  //     depth: 200,
  //     modifier: 1,
  //     slideShadows: true,
  //   },
  //   loop: true,
  //   pagination: { clickable: true },
  // };
  const swiperSettings = useMemo(
    () => ({
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
      pagination: { clickable: true },
    }),
    []
  );
  return (
    // <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
    //   <DialogTitle className={classes.dialogTitle}>{card?.name}</DialogTitle>
    //   <DialogContent className={classes.dialogContent}>
    //     <Container maxWidth="md">
    //       {/* Add a Container */}
    //       <Grid container spacing={2}>
    //         <Grid item xs={12} md={6} style={gridStyles.mediaAndDetails}>
    //           <CardMediaAndDetails card={card} imgUrl={imgUrl} />
    //         </Grid>
    //         <Grid item xs={12} md={6} style={gridStyles.carousel}>
    //           <StyledCarousel>
    //             <Swiper {...swiperSettings}>
    //               {carouselCards.map((carouselCard, index) => (
    //                 <SwiperSlide key={index}>
    //                   <StyledSwiperSlide>
    //                     <GenericCard card={carouselCard} context="Carousel" />
    //                   </StyledSwiperSlide>
    //                 </SwiperSlide>
    //               ))}
    //             </Swiper>
    //           </StyledCarousel>
    //         </Grid>
    //         <Grid item xs={12} md={6} style={gridStyles.actionButtons}>
    //           {/* Action buttons can be further styled or wrapped in their own component */}
    //           <GenericActionButtons
    //             card={card}
    //             context="Deck"
    //             onSuccess={handleActionSuccess}
    //             onFailure={handleActionFailure}
    //           />
    //           <GenericActionButtons
    //             card={card}
    //             context="Collection"
    //             onSuccess={handleActionSuccess}
    //             onFailure={handleActionFailure}
    //           />
    //           <GenericActionButtons
    //             card={card}
    //             context="Cart"
    //             onSuccess={handleActionSuccess}
    //             onFailure={handleActionFailure}
    //           />
    //         </Grid>
    //       </Grid>
    //     </Container>
    //   </DialogContent>
    //   <Snackbar
    //     open={snackbar.open}
    //     autoHideDuration={6000}
    //     onClose={handleCloseSnackbar}
    //   >
    //     <Alert
    //       onClose={handleCloseSnackbar}
    //       severity={snackbar.severity}
    //       sx={{ width: '100%' }}
    //     >
    //       {snackbar.message}
    //     </Alert>
    //   </Snackbar>
    // </Dialog>
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle className={classes.dialogTitle}>{card?.name}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className={classes.flexCenter}>
              <CardMediaAndDetails card={card} imgUrl={imgUrl} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.flexCenter}>
              <StyledCarousel>
                <Swiper {...swiperSettings}>
                  {carouselCards.map((carouselCard, index) => (
                    <SwiperSlide key={index}>
                      <StyledSwiperSlide>
                        <GenericCard card={carouselCard} context="Carousel" />
                      </StyledSwiperSlide>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </StyledCarousel>
            </Grid>
            <Grid
              item
              xs={12}
              className={`${classes.flexCenter} ${classes.actionButtons}`}
            >
              <GenericActionButtons
                card={card}
                context="Deck"
                onSuccess={handleActionSuccess}
                onFailure={handleActionFailure}
              />
              <GenericActionButtons
                card={card}
                context="Collection"
                onSuccess={handleActionSuccess}
                onFailure={handleActionFailure}
              />
              <GenericActionButtons
                card={card}
                context="Cart"
                onSuccess={handleActionSuccess}
                onFailure={handleActionFailure}
              />
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default GenericCardModal;
