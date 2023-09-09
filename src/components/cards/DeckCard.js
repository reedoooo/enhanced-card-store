import React, { useState, useEffect, useRef } from 'react';
import DeckCardMedia from './DeckCardMedia';
import CardToolTip from './CardToolTip';
import DeckCardDialog from './DeckCardDialog';
import placeholderImage from '../../assets/placeholder.jpeg';
import './deckcard.css'; // Assuming you have styles here
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative', // Add this
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    flexGrow: 1,
  },
  media: {
    width: '100%',
    objectFit: 'contain',
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    // padding: theme.spacing(1),
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  actionButtons: {
    backgroundColor: '#f5f5f5',
    // padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    borderRadius: '4px',
    overflow: 'auto',
  },
  dialog: {
    position: 'absolute', // Add this
    top: 0,
    right: 0,
    zIndex: 1000, // High z-index value
  },
}));

const DeckCard = ({ card, cardInfo }) => {
  const [isDeckModalOpen, setDeckModalOpen] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const [hasLoggedCard, setHasLoggedCard] = useState(false);
  const [imgLoadError, setImgLoadError] = useState(false); // For error handling

  const tooltipRef = useRef(null);
  const cardRef = useRef(null);

  const imgUrl =
    !imgLoadError && (card?.card_images?.[0]?.image_url || placeholderImage);

  const openDeckModal = () => setDeckModalOpen(true);
  const closeDeckModal = () => setDeckModalOpen(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Log only in development mode
      if (!hasLoggedCard) {
        console.log('CARD:', card);
        setHasLoggedCard(true);
      }
    }

    if (isHovering && tooltipRef.current && cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      tooltipRef.current.style.top = `${cardRect.top}px`;
      tooltipRef.current.style.left = `${cardRect.right}px`;
    }
  }, [isHovering, card, hasLoggedCard]);

  // This useEffect is for debugging, remove in production
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('isHovering:', isHovering);
      console.log('isDeckModalOpen:', isDeckModalOpen);
    }
  }, [isHovering, isDeckModalOpen]);

  const handleImgError = () => {
    setImgLoadError(true);
  };

  return (
    <>
      <DeckCardMedia
        imgUrl={imgUrl}
        openDeckModal={openDeckModal}
        setHovering={setHovering}
        cardRef={cardRef}
        card={card}
        cardInfo={cardInfo}
        onError={handleImgError} // To handle image errors
      />
      <CardToolTip
        cardInfo={cardInfo}
        isHovering={isHovering}
        isDeckModalOpen={isDeckModalOpen}
        tooltipRef={tooltipRef}
      />
      <DeckCardDialog
        isOpen={isDeckModalOpen}
        onClose={closeDeckModal}
        card={card}
        cardInfo={cardInfo}
        cardRef={cardRef}
      />
    </>
  );
};

export default DeckCard;

// import React, { useState, useContext, useEffect, useRef } from 'react';
// import {
//   Card,
//   CardContent,
//   CardActions,
//   CardMedia,
//   Button,
// } from '@mui/material';
// import DeckCardModal from '../modals/DeckCardModal';
// import { DeckContext } from '../../context/DeckContext/DeckContext';
// import { makeStyles } from '@mui/styles';
// import placeholderImage from '../../assets/placeholder.jpeg';
// import CardModal from '../../components/modals/CardModal'; // Importing CardModal
// // import { GridItem } from '@chakra-ui/react'; // Assuming you might want to use this
// import './deckcard.css'; // Assuming you have styles here

// const useStyles = makeStyles((theme) => ({
//   card: {
//     position: 'relative', // Add this
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100%',
//     width: '100%',
//     flexGrow: 1,
//   },
//   media: {
//     width: '100%',
//     objectFit: 'contain',
//   },
//   content: {
//     flex: '1 1 auto',
//     overflow: 'hidden',
//     // padding: theme.spacing(1),
//   },
//   text: {
//     textOverflow: 'ellipsis',
//     overflow: 'hidden',
//     whiteSpace: 'nowrap',
//   },
//   actionButtons: {
//     backgroundColor: '#f5f5f5',
//     // padding: theme.spacing(1),
//     margin: theme.spacing(1, 0),
//     borderRadius: '4px',
//     overflow: 'auto',
//   },
//   dialog: {
//     position: 'absolute', // Add this
//     top: 0,
//     right: 0,
//     zIndex: 1000, // High z-index value
//   },
// }));

// const DeckCard = ({
//   card,
//   cardInfo,
//   loadedCardInfo,
//   cardAddedToDeck,
//   userDecks,
//   setCardAddedToDeck,
//   setDeckCards,
//   safeDeck,
//   deckCards,
//   setCurrentlyEditingDeck,
//   currentlyEditingDeck,
//   cards,
//   loadDeck,
//   setLoadDeck,
//   loadedCards,
//   deck,
//   setDeck,
// }) => {
//   const classes = useStyles();
//   // const { deckData, getCardQuantity } = useContext(DeckContext); // Commented out as unused
//   const [isDeckModalOpen, setDeckModalOpen] = useState(false);
//   const [isHovering, setHovering] = useState(false);
//   const tooltipRef = useRef(null);
//   const cardRef = useRef(null);
//   const openDeckModal = () => setDeckModalOpen(true);
//   const closeDeckModal = () => setDeckModalOpen(false);

//   const [hasLoggedCard, setHasLoggedCard] = useState(false); // New state to track logging

//   const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;

//   useEffect(() => {
//     if (!hasLoggedCard) {
//       // Check if logging has already been done
//       console.log('CARD:', card);
//       setHasLoggedCard(true); // Update the state to true after logging
//     }

//     if (isHovering && tooltipRef.current && cardRef.current) {
//       const cardRect = cardRef.current.getBoundingClientRect();
//       tooltipRef.current.style.top = `${cardRect.top}px`;
//       tooltipRef.current.style.left = `${cardRect.right}px`;
//     }
//   }, [isHovering, card, hasLoggedCard]); // Added hasLoggedCard as a dependency
//   // console.log('CARD INFO:', cardInfo);
//   // console.log('LOADED CARD INFO:', loadedCardInfo);
//   const tooltipDisplay = (cardInfo) => (
//     <>
//       {cardInfo?.name && <h4 className="tooltip-title">{cardInfo.name}</h4>}
//       {cardInfo?.level && (
//         <span>
//           <strong>LV:</strong> {cardInfo.level}
//         </span>
//       )}
//       {cardInfo?.type && (
//         <span>
//           <strong>Type:</strong> {cardInfo.type}
//         </span>
//       )}
//       {cardInfo?.race && (
//         <span>
//           <strong>Race:</strong> {cardInfo.race}
//         </span>
//       )}
//       {cardInfo?.attribute && (
//         <span>
//           <strong>Attribute:</strong> {cardInfo.attribute}
//         </span>
//       )}
//       {cardInfo?.atk && (
//         <span>
//           <strong>ATK:</strong> {cardInfo.atk}
//         </span>
//       )}
//       {cardInfo?.def && (
//         <span>
//           <strong>DEF:</strong> {cardInfo.def}
//         </span>
//       )}
//       {cardInfo?.desc && (
//         <span>
//           <strong>Description:</strong> {cardInfo.desc}
//         </span>
//       )}
//     </>
//   );
//   const dialogDisplay = () => (
//     <DeckCardModal
//       isOpen={isDeckModalOpen}
//       onClose={closeDeckModal}
//       card={card}
//       cardInfo={cardInfo}
//       cardAddedToDeck={cardAddedToDeck}
//       setCardAddedToDeck={setCardAddedToDeck}
//       setDeckCards={setDeckCards}
//       safeDeck={safeDeck}
//       deckCards={deckCards}
//       userDecks={userDecks}
//       setCurrentlyEditingDeck={setCurrentlyEditingDeck}
//       currentlyEditingDeck={currentlyEditingDeck}
//       cards={cards}
//       loadDeck={loadDeck}
//       setLoadDeck={setLoadDeck}
//       loadedCards={loadedCards}
//       deck={deck}
//       setDeck={setDeck}
//     />
//   );

//   return (
//     <React.Fragment>
//       {' '}
//       {/* Explicitly using React.Fragment */}
//       <div ref={cardRef}>
//         <CardMedia
//           component="img"
//           alt={card?.name}
//           image={imgUrl}
//           onClick={openDeckModal}
//           onMouseOver={() => setHovering(true)}
//           onMouseOut={() => setHovering(false)}
//         />
//       </div>
//       <div
//         ref={tooltipRef}
//         className={`tooltip ${isHovering && !isDeckModalOpen ? 'show' : ''}`}
//       >
//         {tooltipDisplay(card)}
//       </div>
//       {dialogDisplay()}
//     </React.Fragment>
//   );
// };

// export default DeckCard;
