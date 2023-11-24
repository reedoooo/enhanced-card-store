import React, { useContext, useEffect } from 'react';
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
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { ModalContext } from '../../context/ModalContext/ModalContext';
import { PopoverContext } from '../../context/PopoverContext/PopoverContext';
import { useMode } from '../../context/hooks/colormode';

const AspectRatioBox = styled('div')(({ theme }) => ({
  width: '100%', // Full width of the parent container
  // paddingTop: '2%', // Aspect ratio of 16:9
  position: 'relative',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%', // Ensure it doesn't exceed the parent width
  width: 'auto', // Adjust if needed
  maxHeight: '80vh', // Max height based on the viewport height
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
  const { card, context, setClickedCard } = props;
  // const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const { selectedCollection } = useCollectionStore();
  const { openModalWithCard, setModalOpen } = useContext(ModalContext);
  const { setHoveredCard, setIsPopoverOpen, hoveredCard } =
    useContext(PopoverContext);

  const handleClick = () => {
    openModalWithCard(card);
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
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const price = `Price: ${card?.card_prices?.[0]?.tcgplayer_price || 'N/A'}`;

  const renderCardContent = () => {
    // Adjust content based on the screen size
    let variant = 'body2';
    if (isSmallScreen) {
      // variant = 'caption';
      variant = 'h6';
    } else if (isMediumScreen) {
      variant = 'body2';
    } else if (isLargeScreen) {
      variant = 'body2';
    }

    return (
      <CardContent>
        <Typography variant={variant}>{card?.name}</Typography>
        <Typography variant={variant} color="text.secondary" noWrap>
          {price}
        </Typography>
      </CardContent>
    );
  };
  return (
    <StyledCard ref={ref}>
      <AspectRatioBox>
        <CardMediaSection
          isRequired={true}
          imgUrl={imgUrl}
          card={card}
          setClickedCard={setClickedCard}
          isHovered={hoveredCard === card}
          handleInteraction={handleInteraction}
          handleClick={handleClick}
        />
      </AspectRatioBox>

      {renderCardContent()}
      <CardActions container>
        <GenericActionButtons card={card} context={context} />
      </CardActions>
    </StyledCard>
  );
});

GenericCard.displayName = 'GenericCard';

export default GenericCard;

// import React, { useContext, useEffect } from 'react';
// import { Card, CardContent, CardActions, Typography } from '@mui/material';
// import CardMediaSection from '../media/CardMediaSection';
// import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
// import placeholderImage from '../../assets/images/placeholder.jpeg';
// import { useStyles } from './cardStyles';
// import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
// import { ModalContext } from '../../context/ModalContext/ModalContext';
// import { PopoverContext } from '../../context/PopoverContext/PopoverContext';

// const GenericCard = React.forwardRef((props, ref) => {
//   const {
//     card,
//     context,
//     // isModalOpen,
//     // setModalOpen,
//     // hoveredCard,
//     // setHoveredCard,
//     // setIsPopoverOpen,
//     setClickedCard,
//   } = props;
//   const classes = useStyles();
//   const { selectedCollection } = useCollectionStore();
//   const {
//     openModalWithCard,
//     closeModal,
//     isModalOpen,
//     setModalOpen,
//     modalContent,
//   } = useContext(ModalContext);
//   const { setHoveredCard, setIsPopoverOpen, hoveredCard } =
//     useContext(PopoverContext);

//   const requiresDoubleButtons = context === 'Deck' || context === 'Collection'; // Added this line
//   const checkCardInCollection = () => {
//     if (selectedCollection) {
//       const cardIds = selectedCollection?.cards?.map((card) => card.id);
//       return cardIds?.includes(card.id);
//     }
//     return false;
//   };

//   const handleClick = () => {
//     const cardIsInCollection = checkCardInCollection();
//     console.log('Modal opened with card:', card);
//     openModalWithCard(card);
//     console.log('Card is in collection:', cardIsInCollection);

//     setModalOpen(true);
//     setIsPopoverOpen(false);
//   };
//   // setIsPopoverOpen(false);

//   // Function to handle hover interactions with the card
//   // const handleInteraction = (hoverState) => {
//   //   if (!isModalOpen) {
//   //     setHoveredCard((prev) => (hoverState ? card : null));
//   //     setIsPopoverOpen(hoverState);
//   //   }
//   // };
//   const handleInteraction = (hoverState) => {
//     if (!isModalOpen) {
//       setHoveredCard(hoverState ? card : null);
//       setIsPopoverOpen(hoverState);
//     }
//   };
//   // Effect to close popover when modal is open or reactivate when modal closes
//   useEffect(() => {
//     setIsPopoverOpen(isModalOpen ? false : hoveredCard === card);
//     if (isModalOpen) {
//       setHoveredCard(null);
//     }
//   }, [isModalOpen, hoveredCard, card, setIsPopoverOpen, setHoveredCard]);

//   // Get the card image URL, or use placeholder if not available
//   const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
//   const price = `Price: ${card?.card_prices?.[0]?.tcgplayer_price || 'N/A'}`;
//   console.log(typeof handleInteraction); // Should log 'function'

//   return (
//     <Card className={classes.card} ref={ref}>
//       <CardMediaSection
//         isRequired={true}
//         imgUrl={imgUrl}
//         card={card}
//         setClickedCard={setClickedCard}
//         isHovered={hoveredCard === card}
//         handleInteraction={handleInteraction}
//         handleClick={handleClick}
//         ref={ref}
//       />
//       <CardContent className={classes.content}>
//         <Typography variant="h6">{card?.name}</Typography>
//         <Typography variant="body2" color="text.secondary" noWrap>
//           {price}
//         </Typography>
//       </CardContent>
//       <CardActions className={classes.cardActions}>
//         {requiresDoubleButtons ? (
//           <>
//             <GenericActionButtons
//               card={card}
//               context="Collection"
//               // setModalOpen={setModalOpen}
//             />
//             {/* TODO fix card to display buttons for both collections and decks */}
//           </>
//         ) : (
//           <GenericActionButtons
//             card={card}
//             context={context}
//             // setModalOpen={setModalOpen}
//           />
//         )}
//       </CardActions>
//     </Card>
//   );
// });

// GenericCard.displayName = 'GenericCard';

// export default GenericCard;
