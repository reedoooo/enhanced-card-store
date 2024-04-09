import { useState } from 'react';
import placeholder from '../../assets/images/placeholder.jpeg';
export const usePopover = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const hoveredValues = {
    name: hoveredCard?.name,
    imgUrl: hoveredCard?.card_images?.[0]?.image_url || placeholder,
    price: `Price: ${
      hoveredCard?.latestPrice?.num ||
      hoveredCard?.price ||
      hoveredCard?.card_prices?.[0]?.tcgplayer_price ||
      'N/A'
    }`,
  };
  return {
    hoveredCard,
    hoveredValues,
    isPopoverOpen,
    setHoveredCard,
    setIsPopoverOpen,
  };
};
