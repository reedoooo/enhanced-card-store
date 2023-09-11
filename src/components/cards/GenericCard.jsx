import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
} from '@mui/material';
import CardToolTip from './CardToolTip';
import DeckCardDialog from '../dialogs/DeckCardDialog';
import CardMediaSection from '../media/CardMediaSection';
import GenericActionButtons from '../buttons/GenericActionButtons';
import placeholderImage from '../../assets/placeholder.jpeg';
import { CartContext } from '../../context/CartContext/CartContext';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import {
  mergeStyles,
  commonStyles,
  deckCardStyles,
  productCardStyles,
} from './cardStyles';
import './deckcard.css';

const GenericCard = ({ card, context, cardInfo }) => {
  const deckContext = useContext(DeckContext);
  const cartContext = useContext(CartContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const tooltipRef = useRef(null);
  const cardRef = useRef(null);
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const classes = mergeStyles(
    commonStyles(),
    context === 'Deck' ? deckCardStyles() : productCardStyles()
  );

  useEffect(() => {
    if (isHovering && tooltipRef.current && cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      tooltipRef.current.style.top = `${cardRect.top}px`;
      tooltipRef.current.style.left = `${cardRect.right}px`;
    }
  }, [isHovering]);

  // Logic for getting context-specific actions and state
  const getContextSpecificProps = () => {
    switch (context) {
      case 'Deck':
        return {
          deckCardQuantity: deckContext.deckCardQuantity,
          addOne: deckContext.addOneToDeck,
          removeOne: deckContext.removeOneFromDeck,
          removeAll: deckContext.removeAllFromDeck,
        };
      case 'Cart':
      default:
        return {
          deckCardQuantity: cartContext.cartData,
          addOne: cartContext.addToCart,
          removeOne: cartContext.removeFromCart,
          removeAll: cartContext.removeAllFromCart,
        };
    }
  };
  const contextProps = getContextSpecificProps();

  const ProductCardContent = () => (
    <>
      <Typography variant="body2" color="text.secondary">
        Price: {card?.card_prices?.[0]?.tcgplayer_price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Quantity:{' '}
        {contextProps.deckCardQuantity?.quantityOfSameId || 'Not in cart'}
      </Typography>
    </>
  );

  return (
    <Card ref={cardRef} className={classes.card}>
      {context === 'Deck' ? (
        <CardMediaSection
          imgUrl={imgUrl}
          className={classes.media}
          openModal={openModal}
          setHovering={setHovering}
          cardRef={cardRef}
          card={card}
          cardInfo={cardInfo}
        />
      ) : (
        <CardMedia component="img" alt={card.name} image={imgUrl} />
      )}
      <CardContent>
        <Typography variant="h5" className={classes.text}>
          {card.name}
        </Typography>
        {context === 'Product' && (
          <ProductCardContent className={classes.content} />
        )}
      </CardContent>
      <CardActions>
        <GenericActionButtons card={card} context={context} {...contextProps} />
      </CardActions>
      {context === 'Deck' && isHovering && (
        <CardToolTip
          cardInfo={cardInfo}
          isHovering={isHovering}
          classes={classes}
          isModalOpen={isModalOpen}
          tooltipRef={tooltipRef}
        />
      )}
      {context === 'Deck' && (
        <DeckCardDialog
          isOpen={isModalOpen}
          classes={classes}
          onClose={closeModal}
          card={card}
          cardInfo={cardInfo}
        />
      )}
    </Card>
  );
};

export default GenericCard;
