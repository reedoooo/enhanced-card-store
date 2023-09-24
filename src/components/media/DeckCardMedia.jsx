// import React, { useState, useRef, useEffect } from 'react';
// import { CardMedia } from '@mui/material';
// import placeholderImage from '../../assets/placeholder.jpeg';

// const DeckCardMedia = ({
//   card,
//   classes,
//   openDeckModal,
//   setHovering,
//   cardRef,
// }) => {
//   const [hasLoggedCard, setHasLoggedCard] = useState(false);
//   // const cardRef = useRef(null);

//   const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;

//   useEffect(() => {
//     if (!hasLoggedCard) {
//       console.log('CARD:', card);
//       setHasLoggedCard(true);
//     }
//   }, [hasLoggedCard, card]);

//   return (
//     <div ref={cardRef}>
//       <CardMedia
//         component="img"
//         alt={card?.name || 'Card Name'}
//         image={imgUrl}
//         onClick={openDeckModal}
//         onMouseOver={() => setHovering(true)}
//         onMouseOut={() => setHovering(false)}
//       />
//     </div>
//   );
// };

// export default DeckCardMedia;
