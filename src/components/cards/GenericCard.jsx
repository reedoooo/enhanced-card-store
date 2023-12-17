import React, { useCallback, useContext, useEffect, useRef } from 'react';
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
import { useCartStore } from '../../context/CartContext/CartContext';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useDeckStore } from '../../context/DeckContext/DeckContext';
import { useTheme } from '@mui/styles';
const AspectRatioBox = styled('div')(({ theme }) => ({
  width: '100%', // Full width of the parent container
  position: 'relative',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '120px', // Adjusted for better responsiveness
  maxWidth: '100%',
  width: 'auto',
  maxHeight: '100%', // Adjusted for better height management
  flexGrow: 1,
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
  const theme2 = useTheme();
  const cardRef = useRef(null);
  const { card, context, page } = props;
  const { cartData } = useCartStore();
  const { selectedCollection } = useCollectionStore();
  const { selectedDeck } = useDeckStore();
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
  const isMediumScreen = useMediaQuery(theme2.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  // if ((isMediumScreen && page === 'Deck') || page === 'DeckBuilder') {
  //   console.log('small');
  // }
  // const deckBuilder
  const isCardInContext = useCallback(() => {
    switch (context) {
      case 'Collection':
        return !!selectedCollection?.cards?.find((c) => c?.id === card?.id);
      case 'Deck':
        return !!selectedDeck?.cards?.find((c) => c?.id === card?.id);
      case 'Cart' || 'Store':
        return !!cartData?.cart?.find((c) => c?.id === card?.id);
      default:
        return false;
    }
  }, [card.id, context, selectedCollection, selectedDeck, cartData]);

  const isInContext = isCardInContext();

  // const isSmallCard = ref?.current?.offsetWidth < 150;
  const name = card?.name;

  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const price = `Price: ${
    card?.latestPrice?.num ||
    card?.price ||
    card?.card_prices?.[0]?.tcgplayer_price ||
    'N/A'
  }`;
  // const quantity = card?.quantity || 0;
  // let quantity = 0;
  let cartQuantity = isInContext
    ? cartData?.cart?.find((c) => c?.id === card?.id)?.quantity
    : 0;
  let storeQuantity = isInContext
    ? cartData?.cart?.find((c) => c?.id === card?.id)?.quantity
    : 0;

  let deckQuantity = isInContext
    ? selectedDeck?.cards?.find((c) => c?.id === card?.id)?.quantity
    : 0;
  // let collectionQuantity = isInContext ? card?.quantity : 0;
  let collectionQuantity = isInContext
    ? selectedCollection?.cards?.find((c) => c?.id === card?.id)?.quantity
    : 0;
  // Simplify the method to retrieve the relevant quantity
  let relevantQuantity = 0;
  switch (page) {
    case 'Store':
    case 'StorePage':
      relevantQuantity = storeQuantity;
      break;
    case 'Cart':
    case 'CartPage':
      relevantQuantity = cartQuantity;
      break;
    case 'Deck':
    case 'DeckPage':
    case 'DeckBuilder':
      relevantQuantity = deckQuantity;
      break;
    case 'Collection':
      relevantQuantity = collectionQuantity;
      break;
    default:
      relevantQuantity = card?.quantity;
  }

  const isSmallCard = cardRef.current && cardRef.current.offsetWidth < 140;
  const getFontSize = () => ({
    xs: '0.7rem',
    sm: '0.8rem',
    md: '0.9rem',
    lg: '1rem',
  });
  const renderCardContent = () => {
    return (
      <CardContent
        sx={{ flexGrow: 1, textAlign: 'left', padding: theme.spacing(1) }}
      >
        {' '}
        {/* Align text to left */}
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}
        >
          {name}
        </Typography>
        {!isSmallCard && (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}
            >
              {price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}
            >
              {cartQuantity && `Cart: ${cartQuantity}`}
              {collectionQuantity && `Collection: ${collectionQuantity}`}
              {deckQuantity && `Deck: ${deckQuantity}`}
            </Typography>
          </>
        )}
      </CardContent>
    );
  };

  return (
    <StyledCard ref={cardRef}>
      <AspectRatioBox ref={ref}>
        <CardMediaSection
          isRequired={true}
          imgUrl={imgUrl}
          card={card}
          cartQuantity={cartQuantity}
          deckQuantity={deckQuantity}
          collectionQuantity={collectionQuantity}
          storeQuantity={storeQuantity}
          context={context}
          page={page}
          quantity={relevantQuantity || card?.quantity}
          setClickedCard={setClickedCard}
          isHovered={hoveredCard === card}
          handleInteraction={handleInteraction}
          handleClick={handleClick}
        />
      </AspectRatioBox>

      {renderCardContent()}
      <CardActions
        sx={{ justifyContent: 'center', padding: theme.spacing(0.5) }}
      >
        <GenericActionButtons card={card} context={context} page={page} />
      </CardActions>
    </StyledCard>
  );
});

GenericCard.displayName = 'GenericCard';

export default GenericCard;
