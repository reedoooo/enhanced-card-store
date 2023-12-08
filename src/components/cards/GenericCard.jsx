import React, { useContext, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  styled,
  useMediaQuery,
  Container,
} from '@mui/material';
import CardMediaSection from '../media/CardMediaSection';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import placeholderImage from '../../assets/images/placeholder.jpeg';
import { useModalContext } from '../../context/ModalContext/ModalContext';
import { PopoverContext } from '../../context/PopoverContext/PopoverContext';
import { useMode } from '../../context/hooks/colormode';
import { Box } from '@mui/system';
const AspectRatioBox = styled('div')(({ theme }) => ({
  width: '100%', // Full width of the parent container
  // paddingTop: '2%', // Aspect ratio of 16:9
  position: 'relative',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '109px', //! Important for the card to be responsive. This may change a lot...
  maxWidth: '100%', // Ensure it doesn't exceed the parent width
  width: 'auto', // Adjust if needed
  maxHeight: '80vh', // Max height based on the viewport height
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const GenericCard = React.forwardRef((props, ref) => {
  const { theme } = useMode();
  const cardRef = useRef(null);
  const { card, context, page } = props;
  const { openModalWithCard, setModalOpen, setClickedCard } = useModalContext();
  const { setHoveredCard, setIsPopoverOpen, hoveredCard } =
    useContext(PopoverContext);

  const handleClick = () => {
    openModalWithCard(card);
    // setClickedCard(card);
    setModalOpen(true);
    setIsPopoverOpen(false);
  };

  const handleInteraction = (hoverState) => {
    if (!hoverState) {
      setHoveredCard(hoverState ? card : null);
      setIsPopoverOpen(hoverState);
    }
  };

  useEffect(() => {
    setIsPopoverOpen(hoveredCard === card);
  }, [hoveredCard, card, setIsPopoverOpen]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // const isSmallCard = ref?.current?.offsetWidth < 150;
  const name = card?.name;

  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const price = `Price: ${
    card?.latestPrice?.num ||
    card?.price ||
    card?.card_prices?.[0]?.tcgplayer_price ||
    'N/A'
  }`;
  const quantity = card?.quantity || 0;
  let cartQuantity = 0;

  if (context === 'Cart' || page === 'CartPage' || page === 'StorePage') {
    cartQuantity = card?.quantity;
  }

  const isSmallCard = cardRef.current && cardRef.current.offsetWidth < 140;

  const renderCardContent = () => {
    return (
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            fontSize: {
              xs: '0.8rem', // smaller font size for extra-small devices
              sm: '0.9rem', // slightly larger for small devices
              md: '1rem', // default size for medium devices and up
            },
          }}
        >
          {name}
        </Typography>
        {!isSmallCard && (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{
                fontSize: {
                  xs: '0.8rem', // smaller font size for extra-small devices
                  sm: '0.9rem', // slightly larger for small devices
                  md: '1rem', // default size for medium devices and up
                },
              }}
            >
              {price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{
                fontSize: {
                  xs: '0.8rem', // smaller font size for extra-small devices
                  sm: '0.9rem', // slightly larger for small devices
                  md: '1rem', // default size for medium devices and up
                },
              }}
            >
              {quantity && `Quantity: ${quantity}`}
            </Typography>
          </>
        )}
      </CardContent>
    );
  };

  // useEffect(() => {
  //   if (cardData === cartCard) {
  //     console.log('cardData: ', cardData);
  //   }
  // }, [cardData]);

  return (
    <StyledCard ref={cardRef}>
      <AspectRatioBox ref={ref}>
        <CardMediaSection
          isRequired={true}
          imgUrl={imgUrl}
          card={card}
          setClickedCard={setClickedCard}
          isHovered={hoveredCard === card}
          handleInteraction={handleInteraction}
          handleClick={handleClick}
        />
      </AspectRatioBox>

      {renderCardContent()}
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <CardActions
          sx={{
            inherit: true,
            maxWidth: 'fit-content',
          }}
        > */}
        {/* <Box
          sx={{
            position: 'absolute', // Position relative to the parent card
            bottom: 0, // Align with the bottom of the card
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center', // Center the actions
            paddingBottom: theme.spacing(1), // Add some padding at the bottom
          }}
        > */}
        <GenericActionButtons card={card} context={context} page={page} />
        {/* </Box> */}
        {/* </CardActions> */}
      </Box>
    </StyledCard>
  );
});

GenericCard.displayName = 'GenericCard';

export default GenericCard;
