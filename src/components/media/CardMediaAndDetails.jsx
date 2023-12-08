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
