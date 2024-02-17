import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
const GenericCard = React.forwardRef((props, ref) => {
  const { card, context, page } = props;
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

    // Measure the card on the first render
    measureCard();
    // Add resize event listener to re-measure when window size changes
    window.addEventListener('resize', measureCard);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', measureCard);
    };
  }, []);

  const { cartData } = useCartStore();
  const { selectedCollection, allCollections } = useCollectionStore();
  const { selectedDeck, allDecks } = useDeckStore();
  // const { isCardInContext } = useAppContext();
  const isCardInContext = useCallback(
    (selectedCollection, selectedDeck, cartData, context, card) => {
      const cardsList = {
        Collection: selectedCollection?.cards,
        Deck: selectedDeck?.cards,
        Cart: cartData?.cart,
      };
      return !!cardsList[context]?.find((c) => c?.id === card?.id);
    },
    [context, selectedCollection, selectedDeck, cartData]
  );
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
  const isInContext = isCardInContext(
    selectedCollection,
    selectedDeck,
    cartData,
    context,
    card
  );
  const name = card?.name;
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const price = `Price: ${
    card?.latestPrice?.num ||
    card?.price ||
    card?.card_prices?.[0]?.tcgplayer_price ||
    'N/A'
  }`;
  const { cartQuantity, collectionQuantity, deckQuantity } = getQuantity({
    card: card,
    cartData: cartData,
    selectedCollection: selectedCollection,
    allCollections: allCollections,
    selectedDeck: selectedDeck,
    allDecks: allDecks,
  });
  let cardContent = null;
  if (cardSize === 'sm') {
    cardContent = (
      <StyledCardContent theme={theme}>
        <MDTypography variant="body1" gutterBottom fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="body2" color="primary" gutterBottom>
          {price}
        </MDTypography>
      </StyledCardContent>
    );
  } else if (cardSize !== 'xs') {
    cardContent = (
      <StyledCardContent theme={theme}>
        <MDTypography variant="body1" gutterBottom fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="body2" color="primary" gutterBottom>
          {price}
        </MDTypography>
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
          context={context}
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
      {/* </StyledCardContent> */}
      <CardActions
        sx={{
          justifyContent: 'center',
          display: cardSize !== 'xs' ? 'flex' : 'none',
        }}
      >
        <GenericActionButtons
          card={card}
          context={context}
          page={page}
          cardSize={cardSize}
        />
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
