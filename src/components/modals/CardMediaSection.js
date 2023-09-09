import React from 'react';
import { CardMedia } from '@mui/material';
import placeholderImage from '../../assets/placeholder.jpeg';

const CardMediaSection = ({ card }) => {
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  return <CardMedia component="img" alt={card?.name} image={imgUrl} />;
};

export default CardMediaSection;
