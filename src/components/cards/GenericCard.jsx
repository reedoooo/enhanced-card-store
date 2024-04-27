import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Card, CardActions, Typography } from '@mui/material';
import CardMediaSection from './CardMediaSection';
import placeholder from '../../assets/images/placeholder.jpeg';
import { useMode } from '../../context';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { useSnackbar } from 'notistack';
import useSelectedContext from '../../context/hooks/useSelectedContext';
import {
  AspectRatioBox,
  StyledCard,
  StyledCardContent,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { usePopover } from '../../context/hooks/usePopover';
import GenericActionButtons from '../../layout/REUSABLE_COMPONENTS/GenericActionButtons';
import useDialogState from '../../context/hooks/useDialogState';
import useManager from '../../context/useManager';
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
        <MDTypography variant="body1" gutterBottom fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="body2" color="primary" gutterBottom>
          {price}
        </MDTypography>
        {cardSize !== 'sm' && (
          <>
            <MDTypography
              variant="body1"
              color="primary"
            >{`Cart: ${isInContext ? cartQuantity : 'N/A'}`}</MDTypography>
            <MDTypography
              variant="body1"
              color="primary"
            >{`Collection: ${isInContext ? collectionQuantity : 'N/A'}`}</MDTypography>
            <MDTypography
              variant="body1"
              color="primary"
            >{`Deck: ${isInContext ? deckQuantity : 'N/A'}`}</MDTypography>
          </>
        )}
      </StyledCardContent>
    );
  }

  return (
    <Card ref={cardRef} className={`base-card ${props.cardClasses}`}>
      <AspectRatioBox ref={cardRef} theme={theme}>
        <CardMediaSection
          isRequired={true}
          imgUrl={imgUrl}
          card={card}
          context={effectiveContext}
          page={page}
          quantity={card?.quantity}
          isHovered={hoveredCard === card}
          handleInteraction={handleInteraction}
          isModalOpen={dialogState.isCardDialogOpen}
          ref={cardRef}
        />
      </AspectRatioBox>
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
{
  /* <StyledCard */
}
//   ref={cardRef}
//   theme={theme}
//   className={`base-card base-card-hover ${props.cardClasses}`}
//   sx={{
//     position: 'initial',
//     top: 0,
//     left: `${quantityIndex * 10}%`, // Offset each card by 10% of the card's width
//     width: '100%', // Assuming card takes full width of its container
//     height: '100%', // Adjust based on your card's height
//     ml: isDeckCard ? `-${(100 % Math.max(3, quantityIndex)) * 90}%` : 0,
//   }}
// >
