import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CardActions, Typography } from '@mui/material';
import CardMediaSection from './CardMediaSection';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import placeholder from '../../assets/images/placeholder.jpeg';
import { useModalContext } from '../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
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
import { useCartManager } from '../../context/MAIN_CONTEXT/CartContext/useCartManager';
import LoadingOverlay from '../../layout/REUSABLE_COMPONENTS/LoadingOverlay';
import { useCompileCardData } from '../../context/MISC_CONTEXT/AppContext/useCompileCardData';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
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
  const { card, context, page } = props;
  const effectiveContext =
    typeof context === 'object' ? context.pageContext : context;
  const { theme } = useMode();
  const cardRef = useRef(null);
  const [cardSize, setCardSize] = useState('md'); // Default to 'sm'
  useEffect(() => {
    const measureCard = () => {
      const width = cardRef.current?.offsetWidth;
      if (width) {
        if (width < 143) setCardSize('xs');
        else if (width >= 143 && width < 204) setCardSize('sm');
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
  const { cart } = useCartManager();
  const collectiondata = useSelectedContext();
  if (!collectiondata) return <LoadingOverlay />;
  const { selectedCollection, allCollections } = collectiondata;
  const { selectedDeck, allDecks } = useSelectedDeck();
  const { setContext, setIsContextSelected } = useSelectedContext();
  const { isCardInContext } = useCompileCardData();
  const { openModalWithCard, setModalOpen, setClickedCard, isModalOpen } =
    useModalContext();
  const { setHoveredCard, setIsPopoverOpen, hoveredCard } = usePopover();
  const { enqueueSnackbar } = useSnackbar(); // Assuming useOverlay has enqueueSnackbar method

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
  const isInContext = isCardInContext(card);
  const name = card?.name;
  const imgUrl = card?.card_images?.[0]?.image_url || placeholder;
  const price = `Price: ${
    card?.latestPrice?.num ||
    card?.price ||
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
  if (cardSize !== 'xs') {
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
    <StyledCard ref={cardRef} theme={theme}>
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
          handleClick={handleClick}
          isModalOpen={isModalOpen}
          ref={cardRef}
        />
      </AspectRatioBox>
      {cardContent}
      <CardActions
        sx={{
          justifyContent: 'center',
          display: cardSize !== 'xs' ? 'flex' : 'none',
        }}
      >
        <GenericActionButtons
          card={card}
          context={effectiveContext}
          onClick={() => handleContextSelect(effectiveContext)}
          onSuccess={() =>
            enqueueSnackbar(
              {
                title: 'Action successful',
                message: `Card added to ${card?.name || ''} successfully.`,
              },
              'success',
              null
            )
          }
          onFailure={(error) =>
            enqueueSnackbar(
              {
                title: 'Action failed',
                message: `Failed to add card to ${card?.name || ''}.`,
              },
              'error',
              error
            )
          }
          page={page}
          cardSize={cardSize}
        />
      </CardActions>
    </StyledCard>
  );
});

GenericCard.displayName = 'GenericCard';

export default GenericCard;
