import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { CardActions, Typography } from '@mui/material';
import CardMediaSection from './media/CardMediaSection';
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
import {
  AspectRatioBox,
  QuantityLine,
  StyledCard,
  StyledCardContent,
} from './cardStyledComponents';
const GenericCard = React.forwardRef((props, ref) => {
  const { card, context, page } = props;

  // console.log('ref', ref);
  const { theme } = useMode();
  const theme2 = useTheme();
  const cardRef = useRef(null);
  const { cartData } = useCartStore();
  const { selectedCollection, allCollections } = useCollectionStore();
  const { selectedDeck, allDecks } = useDeckStore();
  const { openModalWithCard, setModalOpen, setClickedCard } = useModalContext();
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

  // const isCardInContext = useCallback(() => {
  //   switch (context) {
  //     case 'Collection':
  //       return !!selectedCollection?.cards?.find((c) => c?.id === card?.id);
  //     case 'Deck':
  //       return !!selectedDeck?.cards?.find((c) => c?.id === card?.id);
  //     case 'Cart' || 'Store':
  //       return !!cartData?.cart?.find((c) => c?.id === card?.id);
  //     default:
  //       return false;
  //   }
  // }, [context, card, selectedCollection, selectedDeck, cartData]);
  const isCardInContext = useCallback(() => {
    const cardsList = {
      Collection: selectedCollection?.cards,
      Deck: selectedDeck?.cards,
      Cart: cartData?.cart,
    };
    return !!cardsList[context]?.find((c) => c?.id === card?.id);
  }, [context, card.id, selectedCollection, selectedDeck, cartData]);

  const isInContext = isCardInContext();
  const name = card?.name;
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const price = `Price: ${
    card?.latestPrice?.num ||
    card?.price ||
    card?.card_prices?.[0]?.tcgplayer_price ||
    'N/A'
  }`;
  // Get the quantity of card across all contexts
  const getQuantity = useCallback(() => {
    const findCardQuantity = (collectionsOrDecks) =>
      collectionsOrDecks?.reduce(
        (acc, item) =>
          acc + (item?.cards?.find((c) => c.id === card.id)?.quantity ?? 0),
        0
      ) ?? 0;

    const cartQuantity = isInContext
      ? cartData?.cart?.find((c) => c.id === card.id)?.quantity ?? 0
      : 0;
    const collectionQuantity =
      isInContext && selectedCollection
        ? selectedCollection?.cards?.find((c) => c.id === card.id)?.quantity ??
          0
        : findCardQuantity(allCollections);
    const deckQuantity =
      isInContext && selectedDeck
        ? selectedDeck?.cards?.find((c) => c.id === card.id)?.quantity ?? 0
        : findCardQuantity(allDecks);

    return Math.max(cartQuantity, collectionQuantity, deckQuantity);
  }, [
    card,
    cartData,
    selectedCollection,
    allCollections,
    selectedDeck,
    allDecks,
  ]);

  // let cartQuantity = isInContext
  //   ? cartData?.cart?.find((c) => c?.id === card?.id)?.quantity
  //   : 0;
  // let storeQuantity = isInContext
  //   ? cartData?.cart?.find((c) => c?.id === card?.id)?.quantity
  //   : 0;

  // // Modify the logic to calculate quantity across all decks or collections if none is selected
  // let deckQuantity = selectedDeck
  //   ? selectedDeck?.cards?.find((c) => c.id === card.id)?.quantity
  //   : allDecks?.reduce((acc, deck) => {
  //       const foundCard = deck?.cards?.find((c) => c.id === card.id);
  //       return foundCard ? acc + foundCard.quantity : acc;
  //     }, 0);

  // let collectionQuantity = selectedCollection
  //   ? selectedCollection?.cards?.find((c) => c.id === card.id)?.quantity
  //   : allCollections?.reduce((acc, collection) => {
  //       const foundCard = collection?.cards?.find((c) => c.id === card.id);
  //       return foundCard ? acc + foundCard.quantity : acc;
  //     }, 0);
  // // Simplify the method to retrieve the relevant quantity
  // let relevantQuantity = 0;
  // switch (page) {
  //   case 'Store':
  //   case 'StorePage':
  //     relevantQuantity = storeQuantity;
  //     break;
  //   case 'Cart':
  //   case 'CartPage':
  //     relevantQuantity = cartQuantity;
  //     break;
  //   case 'Deck':
  //   case 'DeckPage':
  //   case 'DeckBuilder':
  //     relevantQuantity = deckQuantity;
  //     break;
  //   case 'Collection':
  //     relevantQuantity = collectionQuantity;
  //     break;
  //   default:
  //     relevantQuantity = card?.quantity;
  // }

  // Function to render the card's media section
  const renderCardMediaSection = () => (
    <AspectRatioBox ref={cardRef} theme={theme}>
      <CardMediaSection
        isRequired={true}
        imgUrl={imgUrl}
        card={card}
        context={context}
        page={page}
        quantity={getQuantity()}
        isHovered={hoveredCard === card}
        handleInteraction={handleInteraction}
        handleClick={handleClick}
        ref={cardRef}
      />
    </AspectRatioBox>
  );
  const renderCardContent = () => {
    return (
      <StyledCardContent theme={theme2}>
        <Typography variant="body2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {price}
        </Typography>
        <QuantityLine theme={theme}>{`Cart: ${
          cartData?.cart?.find((c) => c.id === card.id)?.quantity ?? 0
        }`}</QuantityLine>

        <QuantityLine theme={theme}>
          {`Collection: ${
            selectedCollection?.cards?.find((c) => c.id === card.id)
              ?.quantity ?? 0
          }`}
        </QuantityLine>
        <QuantityLine>{`Deck: ${
          selectedDeck?.cards?.find((c) => c.id === card.id)?.quantity ?? 0
        }`}</QuantityLine>
      </StyledCardContent>
    );
  };
  const renderCardActions = () => (
    <CardActions sx={{ justifyContent: 'center', padding: theme.spacing(0.5) }}>
      <GenericActionButtons card={card} context={context} page={page} />
    </CardActions>
  );

  return (
    <StyledCard ref={cardRef} theme={theme}>
      {renderCardMediaSection()}
      {renderCardContent()}
      {renderCardActions()}
    </StyledCard>
  );
});

GenericCard.displayName = 'GenericCard';

export default GenericCard;
