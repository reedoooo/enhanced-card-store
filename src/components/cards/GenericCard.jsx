import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { CardActions, Typography } from '@mui/material';
import CardMediaSection from './media/CardMediaSection';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import placeholderImage from '../../assets/images/placeholder.jpeg';
import { useModalContext } from '../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import { PopoverContext } from '../../context/UTILITIES_CONTEXT/PopoverContext/PopoverContext';
import { Box } from '@mui/system';
import { useCartStore } from '../../context/MAIN_CONTEXT/CartContext/CartContext';
import { useCollectionStore } from '../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useDeckStore } from '../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useTheme } from 'styled-components';
import {
  AspectRatioBox,
  QuantityLine,
  StyledCard,
  StyledCardContent,
} from './styles/cardStyledComponents';
import { getQuantity } from '../componentHelpers';
import { useMode } from '../../context';
import { useAppContext } from '../../context';
const GenericCard = React.forwardRef((props, ref) => {
  const { card, context, page } = props;
  const { theme } = useMode();
  const theme2 = useTheme();
  const cardRef = useRef(null);
  const { cartData } = useCartStore();
  const { selectedCollection, allCollections } = useCollectionStore();
  const { selectedDeck, allDecks } = useDeckStore();
  const { isCardInContext } = useAppContext();
  const { openModalWithCard, setModalOpen, setClickedCard, isModalOpen } =
    useModalContext();
  const { setHoveredCard, setIsPopoverOpen, hoveredCard } =
    useContext(PopoverContext);
  const handleClick = useCallback(() => {
    openModalWithCard(card);
    setModalOpen(true);
    setIsPopoverOpen(false);
  }, [openModalWithCard, setModalOpen, setIsPopoverOpen, card]);

  const handleInteraction = useCallback(
    (hoverState) => {
      setHoveredCard(hoverState ? card : null);
      setIsPopoverOpen(hoverState);
    },
    [setHoveredCard, setIsPopoverOpen, card]
  );

  useEffect(() => {
    setIsPopoverOpen(hoveredCard === card);
  }, [hoveredCard, card, setIsPopoverOpen]);
  const isInContext = isCardInContext();
  const name = card?.name;
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const price = `Price: ${
    card?.latestPrice?.num ||
    card?.price ||
    card?.card_prices?.[0]?.tcgplayer_price ||
    'N/A'
  }`;
  const quantities = getQuantity({
    card: card,
    cartData: cartData,
    selectedCollection: selectedCollection,
    allCollections: allCollections,
    selectedDeck: selectedDeck,
    allDecks: allDecks,
  });

  return (
    <StyledCard ref={cardRef} theme={theme}>
      <AspectRatioBox ref={cardRef} theme={theme}>
        <CardMediaSection
          isRequired={true}
          imgUrl={imgUrl}
          card={card}
          context={context}
          page={page}
          quantity={card?.quantity}
          isHovered={hoveredCard === card}
          handleInteraction={handleInteraction}
          handleClick={handleClick}
          isModalOpen={isModalOpen}
          ref={cardRef}
        />
      </AspectRatioBox>{' '}
      <StyledCardContent theme={theme2}>
        <Typography variant="body2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {price}
        </Typography>
        <QuantityLine>{`Cart: ${quantities.cart}`}</QuantityLine>
        <QuantityLine>{`Collection: ${quantities.collection}`}</QuantityLine>
        <QuantityLine>{`Deck: ${quantities.deck}`}</QuantityLine>
      </StyledCardContent>
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
// const isCardInContext = useCallback(() => {
//   const cardsList = {
//     Collection: selectedCollection?.cards,
//     Deck: selectedDeck?.cards,
//     Cart: cartData?.cart,
//   };
//   return !!cardsList[context]?.find((c) => c?.id === card?.id);
// }, [context, card.id, selectedCollection, selectedDeck, cartData]);
