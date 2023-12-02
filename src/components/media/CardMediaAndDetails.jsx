import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import CardMediaSection from './CardMediaSection';
import CardDetailsContainer from '../modals/cardModal/CardDetailsContainer';
import {
  useCardStore,
  useCollectionStore,
  useUserContext,
} from '../../context';

const CardMediaAndDetails = ({ card }) => {
  const [updatedCard, setUpdatedCard] = useState(card);
  const { updateCardInCollection } = useCardStore(); // Method to update the card in the collection
  const { updateCollection, selectedCollection } = useCollectionStore(); // Method to update the card in the collection
  const [imgUrl, setImgUrl] = useState(updatedCard?.card_images[0]?.image_url); // [1
  const { user } = useUserContext();
  useEffect(() => {
    const updateCardData = async () => {
      if (!card.card_images || card.card_images.length === 0) {
        const cardId = card.id;
        try {
          const response = await axios.patch(
            `${process.env.REACT_APP_SERVER}/api/cards/ygopro/${cardId}`,
            { id: card.id, name: card.name, card: card, user: user }
          );
          if (response.data && response.data.data) {
            console.log('RESPONSE DATA', response.data.data);
            setUpdatedCard(response.data.data);
            setImgUrl(response?.data?.data?.card_images[0]?.image_url); // [1
            // updateCardInCollection(response.data.data); // Update the card in the corresponding collection
            updateCollection(response.data.data, 'update', selectedCollection);
          }
        } catch (err) {
          console.error('Error fetching card images:', err);
        }
      }
    };

    updateCardData();
  }, [card, updateCardInCollection]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <CardMediaSection
          isRequired={false}
          card={updatedCard}
          imgUrl={imgUrl}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardDetailsContainer card={updatedCard} />
      </Grid>
    </Grid>
  );
};

export default React.memo(CardMediaAndDetails);

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { Grid } from '@mui/material';
// import CardMediaSection from './CardMediaSection';
// import CardDetailsContainer from '../modals/cardModal/CardDetailsContainer';

// import _ from 'lodash'; // lodash library for deep comparison

// function useDeepCompareEffect(callback, dependencies) {
//   const currentDependenciesRef = useRef();

//   if (!_.isEqual(currentDependenciesRef.current, dependencies)) {
//     currentDependenciesRef.current = dependencies;
//   }

//   useEffect(callback, [currentDependenciesRef.current]);
// }

// const CardMediaAndDetails = ({ card }) => {
//   const [updatedCard, setUpdatedCard] = useState(card);

//   useDeepCompareEffect(() => {
//     const fetchCardImages = async () => {
//       try {
//         if (!card.card_images || card.card_images.length === 0) {
//           const response = await axios.patch(
//             `${process.env.REACT_APP_SERVER}/api/cards/ygopro/${card.id}`
//           );
//           if (response.data && response.data.data) {
//             setUpdatedCard(response.data.data);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching card images:', err);
//       }
//     };

//     fetchCardImages();
//   }, [card]);

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} sm={6}>
//         <CardMediaSection
//           isRequired={false}
//           card={updatedCard}
//           imgUrl={updatedCard?.card_images[0]?.image_url}
//         />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <CardDetailsContainer card={updatedCard} />
//       </Grid>
//     </Grid>
//   );
// };

// export default React.memo(CardMediaAndDetails);

// // import React, { useEffect, useState } from 'react';
// // import { Grid } from '@mui/material';
// // import CardMediaSection from './CardMediaSection'; // Ensure correct import
// // import CardDetailsContainer from '../../containers/CardDetailsContainer';
// // import { fetchCardDetails } from '../../api/yugiohApi';

// // const CardMediaAndDetails = ({ card }) => {
// //   const [cardDetails, setCardDetails] = useState(card);
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     const isCardDataIncomplete = () => {
// //       // Define the logic to check if the card data is incomplete
// //       return !card || !card.card_images || card.card_images.length === 0;
// //     };

// //     if (isCardDataIncomplete()) {
// //       setIsLoading(true);
// //       fetchCardDetails(card?.id) // Replace with the actual ID property
// //         .then((fetchedCard) => {
// //           setCardDetails(fetchedCard);
// //           setIsLoading(false);
// //         })
// //         .catch((error) => {
// //           console.error('Error fetching card details:', error);
// //           setIsLoading(false);
// //         });
// //     }
// //   }, [card]);

// //   if (isLoading) {
// //     return <div>Loading card details...</div>; // Or any loading indicator
// //   }

// //   return (
// //     <Grid container spacing={2}>
// //       <Grid item xs={12} sm={6}>
// //         <CardMediaSection
// //           isRequired={false}
// //           card={cardDetails}
// //           imgUrl={cardDetails?.card_images[0]?.image_url}
// //         />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <CardDetailsContainer card={cardDetails} />
// //       </Grid>
// //     </Grid>
// //   );
// // };

// // export default React.memo(CardMediaAndDetails);
