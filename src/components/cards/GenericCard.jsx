import React, { useEffect } from 'react';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import CardMediaSection from '../media/CardMediaSection';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import placeholderImage from '../../assets/images/placeholder.jpeg';
import { useStyles } from './cardStyles';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

const GenericCard = React.forwardRef((props, ref) => {
  const {
    card,
    context,
    isModalOpen,
    setModalOpen,
    hoveredCard,
    setHoveredCard,
    setIsPopoverOpen,
    setClickedCard,
  } = props;
  const classes = useStyles();
  const { selectedCollection } = useCollectionStore();
  const requiresDoubleButtons = context === 'Deck' || context === 'Collection'; // Added this line
  const checkCardInCollection = () => {
    if (selectedCollection) {
      const cardIds = selectedCollection?.cards?.map((card) => card.id);
      return cardIds?.includes(card.id);
    }
    return false;
  };

  const handleClick = () => {
    const cardIsInCollection = checkCardInCollection();
    console.log('Modal opened with card:', card);
    console.log('Card is in collection:', cardIsInCollection);

    setModalOpen(true);
    setIsPopoverOpen(false);
  };

  // Function to handle hover interactions with the card
  const handleInteraction = (hoverState) => {
    if (!isModalOpen) {
      setHoveredCard((prev) => (hoverState ? card : null));
      setIsPopoverOpen(hoverState);
    }
  };

  // Effect to close popover when modal is open or reactivate when modal closes
  useEffect(() => {
    setIsPopoverOpen(isModalOpen ? false : hoveredCard === card);
    if (isModalOpen) {
      setHoveredCard(null);
    }
  }, [isModalOpen, hoveredCard, card, setIsPopoverOpen, setHoveredCard]);

  // Get the card image URL, or use placeholder if not available
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const price = `Price: ${card?.card_prices?.[0]?.tcgplayer_price || 'N/A'}`;
  console.log(typeof handleInteraction); // Should log 'function'

  return (
    <Card className={classes.card} ref={ref}>
      <CardMediaSection
        isRequired={true}
        imgUrl={imgUrl}
        card={card}
        setClickedCard={setClickedCard}
        isHovered={hoveredCard === card}
        handleInteraction={handleInteraction}
        handleClick={handleClick}
        ref={ref}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6">{card?.name}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {price}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {/* Conditionally render action buttons based on context */}
        {requiresDoubleButtons ? (
          <>
            {/* <GenericActionButtons
              card={card}
              context="Deck"
              setModalOpen={setModalOpen}
            /> */}
            <GenericActionButtons
              card={card}
              context="Collection"
              setModalOpen={setModalOpen}
            />
          </>
        ) : (
          <GenericActionButtons
            card={card}
            context={context}
            setModalOpen={setModalOpen}
          />
        )}
      </CardActions>
    </Card>
  );
});

GenericCard.displayName = 'GenericCard';

export default GenericCard;
