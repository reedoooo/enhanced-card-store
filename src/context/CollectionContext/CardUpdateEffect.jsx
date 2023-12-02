import { useEffect } from 'react';
import axios from 'axios';
import { useCollectionStore } from './CollectionContext';

const CardUpdateEffect = ({ allCollections, user, updateCollectionData }) => {
  const { updateCollection } = useCollectionStore();
  useEffect(() => {
    const updateCardTotalPrice = async (card, collection) => {
      try {
        const updatedTotalPrice = card.price * card.quantity;
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER}/api/cards/ygopro/${card.id}`,
          {
            id: card.id,
            user: user,
            totalPrice: updatedTotalPrice,
            // Include other fields as necessary
          }
        );

        if (response.data && response.data.data) {
          // Update card in the local state or context
          updateCollection(response.data.data, 'update', collection, user.id);
        }
      } catch (error) {
        console.error(
          `Error updating total price for card ID ${card.id}:`,
          error
        );
      }
    };

    const processCollections = () => {
      allCollections.forEach((collection) => {
        collection.cards.forEach((card) => {
          const originalTotalPrice = card.price * card.quantity;
          if (card.totalPrice !== originalTotalPrice) {
            updateCardTotalPrice(card, collection);
          }
        });
      });
    };

    processCollections();
  }, [allCollections, user, updateCollectionData]);

  return null; // Since this component doesn't render anything
};

export default CardUpdateEffect;
