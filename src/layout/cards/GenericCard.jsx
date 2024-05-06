import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Card, CardActions } from '@mui/material';
import CardMediaSection from './CardMediaSection';
import placeholder from 'assets/images/placeholder.jpeg';
import {
  useMode,
  usePopover,
  useManager,
  useDialogState,
  useSelectedContext,
} from 'context';
import { StyledCardContent } from 'layout/REUSABLE_STYLED_COMPONENTS';
import { GenericActionButtons, RCTypography } from 'layout/REUSABLE_COMPONENTS';
const getQuantity = ({
  card,
  cart,
  selectedCollection,
  allCollections,
  selectedDeck,
  allDecks,
}) => {
  const findCardQuantity = (collectionsOrDecks, cardId) =>
    collectionsOrDecks?.reduce(
      (acc, item) =>
        acc + (item?.cards?.find((c) => c.id === cardId)?.quantity ?? 0),
      0
    ) ?? 0;

  const cartQuantity =
    cart?.items?.find((c) => c.id === card.id)?.quantity ?? 0;
  const collectionQuantity = selectedCollection
    ? selectedCollection?.cards?.find((c) => c.id === card.id)?.quantity ?? 0
    : findCardQuantity(allCollections, card.id);
  const deckQuantity = selectedDeck
    ? selectedDeck?.cards?.find((c) => c.id === card.id)?.quantity ?? 0
    : findCardQuantity(allDecks, card.id);

  return {
    cartQuantity,
    collectionQuantity,
    deckQuantity,
  };
};

const GenericCard = React.forwardRef((props, ref) => {
  const {
    collections: allCollections,
    decks: allDecks,
    selectedDeck,
    selectedCollection,
    cart,
    checkForCardInContext,
  } = useManager();
  const { setContext, setIsContextSelected } = useSelectedContext();
  const { dialogState, openDialog } = useDialogState();
  const { setHoveredCard, setIsPopoverOpen, hoveredCard } = usePopover();
  const { card, context, page, isDeckCard } = props;

  const effectiveContext =
    typeof context === 'object' ? context.pageContext : context;
  const { theme } = useMode();
  const cardRef = useRef(null);
  const [cardSize, setCardSize] = useState('md');
  useEffect(() => {
    const measureCard = () => {
      const width = cardRef.current?.offsetWidth;
      if (width) {
        if (width < 120) setCardSize('xs');
        else if (width >= 120 && width < 204) setCardSize('sm');
        else if (width >= 204 && width < 219) setCardSize('md');
        else if (width >= 219) setCardSize('lg');
      }
    };
    measureCard();
    window.addEventListener('resize', measureCard);
    return () => {
      window.removeEventListener('resize', measureCard);
    };
  }, []);
  const handleInteraction = useCallback(
    (hoverState) => {
      setHoveredCard(hoverState ? card : null);
      setIsPopoverOpen(hoverState);
    },
    [setHoveredCard, setIsPopoverOpen, card]
  );
  const handleContextSelect = useCallback(
    (newContext) => {
      setContext(newContext);
      setIsContextSelected(true);
    },
    [setContext, setIsContextSelected]
  );
  useEffect(() => {
    setIsPopoverOpen(hoveredCard === card);
  }, [hoveredCard, card, setIsPopoverOpen]);
  const isInContext = checkForCardInContext(card);
  const name = card?.name;
  const imgUrl = card?.card_images?.[0]?.image_url || placeholder;
  const price = `Price: ${
    card?.price ||
    card?.latestPrice?.num ||
    card?.card_prices?.[0]?.tcgplayer_price ||
    'N/A'
  }`;
  const { cartQuantity, collectionQuantity, deckQuantity } = getQuantity({
    card: card,
    cart: cart,
    selectedCollection: selectedCollection,
    allCollections: allCollections,
    selectedDeck: selectedDeck,
    allDecks: allDecks,
  });
  let cardContent = null;
  if (cardSize !== 'xs' && !isDeckCard) {
    cardContent = (
      <StyledCardContent theme={theme}>
        <RCTypography variant="body1" gutterBottom fontWeight="medium">
          {name}
        </RCTypography>
        <RCTypography variant="body2" color="primary" gutterBottom>
          {price}
        </RCTypography>
        {cardSize !== 'sm' && (
          <>
            <RCTypography
              variant="body1"
              color="primary"
            >{`Cart: ${isInContext ? cartQuantity : 'N/A'}`}</RCTypography>
            <RCTypography
              variant="body1"
              color="primary"
            >{`Collection: ${isInContext ? collectionQuantity : 'N/A'}`}</RCTypography>
            <RCTypography
              variant="body1"
              color="primary"
            >{`Deck: ${isInContext ? deckQuantity : 'N/A'}`}</RCTypography>
          </>
        )}
      </StyledCardContent>
    );
  }

  return (
    <Card ref={cardRef} className={`base-card ${props.cardClasses}`}>
      <Box
        ref={cardRef}
        sx={{
          width: '100%', // Full width of the parent container
          position: 'relative',
          justifyContent: 'center',
        }}
      >
        <CardMediaSection
          isRequired={true}
          imgUrl={imgUrl}
          card={card}
          context={effectiveContext}
          isHovered={hoveredCard === card}
          handleInteraction={handleInteraction}
          isModalOpen={dialogState.isCardDialogOpen}
          ref={cardRef}
        />
      </Box>
      {cardContent}
      <CardActions
        sx={{
          justifyContent: 'center',
          display: cardSize !== 'xs' && !isDeckCard ? 'flex' : 'none',
        }}
      >
        <GenericActionButtons
          card={card}
          context={effectiveContext}
          cardSize={cardSize}
        />
      </CardActions>
    </Card>
  );
});

GenericCard.displayName = 'GenericCard';

export default GenericCard;
