// import React, { useState, useEffect, useRef } from 'react';
// import DeckCardMedia from '../media/DeckCardMedia';
// import CardToolTip from './CardToolTip';
// import DeckCardDialog from '../dialogs/DeckCardDialog';
// import placeholderImage from '../../assets/placeholder.jpeg';
// import './deckcard.css'; // Assuming you have styles here
// import { makeStyles } from '@mui/styles';
// import CardMediaSection from '../media/CardMediaSection';

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

// const DeckCard = ({ card, cardInfo }) => {
//   const [isDeckModalOpen, setDeckModalOpen] = useState(false);
//   const [isHovering, setHovering] = useState(false);
//   const [hasLoggedCard, setHasLoggedCard] = useState(false);
//   const [imgLoadError, setImgLoadError] = useState(false); // For error handling

//   const tooltipRef = useRef(null);
//   const cardRef = useRef(null);
//   const classes = useStyles();

//   const imgUrl =
//     !imgLoadError && (card?.card_images?.[0]?.image_url || placeholderImage);

//   const openDeckModal = () => setDeckModalOpen(true);
//   const closeDeckModal = () => setDeckModalOpen(false);

//   useEffect(() => {
//     if (process.env.NODE_ENV !== 'production') {
//       // Log only in development mode
//       if (!hasLoggedCard) {
//         console.log('CARD:', card);
//         setHasLoggedCard(true);
//       }
//     }

//     if (isHovering && tooltipRef.current && cardRef.current) {
//       const cardRect = cardRef.current.getBoundingClientRect();
//       tooltipRef.current.style.top = `${cardRect.top}px`;
//       tooltipRef.current.style.left = `${cardRect.right}px`;
//     }
//   }, [isHovering, card, hasLoggedCard]);

//   // This useEffect is for debugging, remove in production
//   useEffect(() => {
//     if (process.env.NODE_ENV !== 'production') {
//       console.log('isHovering:', isHovering);
//       console.log('isDeckModalOpen:', isDeckModalOpen);
//     }
//   }, [isHovering, isDeckModalOpen]);

//   return (
//     <>
//       <CardMediaSection
//         imgUrl={imgUrl}
//         card={card}
//         cardInfo={cardInfo}
//         classes={classes}
//         openDeckModal={openDeckModal}
//         setHovering={setHovering}
//         cardRef={cardRef}
//       />
//       <CardToolTip
//         cardInfo={cardInfo}
//         classes={classes}
//         isHovering={isHovering}
//         isDeckModalOpen={isDeckModalOpen}
//         tooltipRef={tooltipRef}
//       />
//       <DeckCardDialog
//         isOpen={isDeckModalOpen}
//         classes={classes}
//         onClose={closeDeckModal}
//         card={card}
//         cardInfo={cardInfo}
//         cardRef={cardRef}
//       />
//     </>
//   );
// };

// export default DeckCard;
