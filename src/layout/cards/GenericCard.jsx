import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Card, CardActions } from '@mui/material';
import CardMediaSection from './CardMediaSection';
import placeholder from 'assets/images/placeholder.jpeg';

import { useMode, usePopover, useDialogState } from 'context';
import { StyledCardContent } from 'layout/REUSABLE_STYLED_COMPONENTS';
import { GenericActionButtons, RCTypography } from 'layout/REUSABLE_COMPONENTS';

const GenericCard = React.forwardRef((props, ref) => {
  const { dialogState, openDialog } = useDialogState();
  const { setHoveredCard, setIsPopoverOpen, hoveredCard } = usePopover();
  const { theme } = useMode();
  const { card, context, page, isDeckCard } = props;
  const effectiveContext =
    typeof context === 'object' ? context.pageContext : context;
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
  useEffect(() => {
    setIsPopoverOpen(hoveredCard === card);
  }, [hoveredCard, card, setIsPopoverOpen]);
  let cardContent = null;
  if (cardSize !== 'xs' && !isDeckCard) {
    cardContent = (
      <StyledCardContent theme={theme}>
        <RCTypography variant="body1" gutterBottom fontWeight="medium">
          {`${card?.name || 'N/A'}`}
        </RCTypography>
        <RCTypography variant="body2" color="primary" gutterBottom>
          {`Price: ${card?.price || 'N/A'}`}
        </RCTypography>
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
          imgUrl={card?.image || placeholder}
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
